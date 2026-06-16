import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import {
  AdminContactNotificationEmail,
  UserContactConfirmationEmail,
} from '@/emails/contact';
import { contactFormSchema } from '@/lib/schemas/contact-schema';
import { getResendEnv } from '@/lib/server/resend-env';
import {
  peekSlidingWindow,
  recordSlidingWindowEvent,
} from '@/lib/server/memory-rate-limit';
import {
  CONTACT_RATE_LIMIT_MAX,
  CONTACT_RATE_LIMIT_WINDOW_MS,
  contactRateLimitKeys,
} from '@/lib/server/contact-rate-limit';
import { z } from 'zod';

export const runtime = 'nodejs';

export async function POST(request: Request) {
  let json: unknown;
  try {
    json = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false as const, error: 'Invalid JSON body' },
      { status: 400 },
    );
  }

  const parsed = contactFormSchema.safeParse(json);
  if (!parsed.success) {
    const { errors, properties } = z.treeifyError(parsed.error);
    return NextResponse.json(
      {
        ok: false as const,
        error: errors[0] ?? 'Validation failed',
        fieldErrors: Object.fromEntries(
          Object.entries(properties ?? {}).map(([key, value]) => [
            key,
            value?.errors ?? [],
          ]),
        ),
      },
      { status: 422 },
    );
  }

  const data = parsed.data;
  const rateKeys = contactRateLimitKeys(request, data.email.toLowerCase());
  const rateCheck = peekSlidingWindow(
    rateKeys,
    CONTACT_RATE_LIMIT_MAX,
    CONTACT_RATE_LIMIT_WINDOW_MS,
  );
  if (!rateCheck.ok) {
    return NextResponse.json(
      {
        ok: false as const,
        code: 'rate_limit' as const,
        error: 'Daily message limit reached.',
        retryAfterSeconds: rateCheck.retryAfterSeconds,
      },
      {
        status: 429,
        headers: {
          'Retry-After': String(rateCheck.retryAfterSeconds),
        },
      },
    );
  }

  const env = getResendEnv();
  if (!env) {
    return NextResponse.json(
      {
        ok: false as const,
        error:
          'Email delivery is not configured on this server. Try again later.',
      },
      { status: 503 },
    );
  }

  const resend = new Resend(env.RESEND_API_KEY);

  const payload = {
    name: data.name,
    email: data.email,
    subject: data.subject,
    message: data.message,
  };

  const [toAdmin, toUser] = await Promise.all([
    resend.emails.send({
      from: env.RESEND_FROM_EMAIL,
      to: env.RESEND_ADMIN_EMAIL,
      replyTo: data.email,
      subject: `[Tools] Contact: ${data.subject}`,
      react: AdminContactNotificationEmail(payload),
    }),
    resend.emails.send({
      from: env.RESEND_FROM_EMAIL,
      to: data.email,
      subject: 'We received your message',
      react: UserContactConfirmationEmail(payload),
    }),
  ]);

  if (toAdmin.error || toUser.error) {
    console.error('[api/contact] Resend error', {
      admin: toAdmin.error,
      user: toUser.error,
    });
    return NextResponse.json(
      {
        ok: false as const,
        error: 'Failed to send email. Please try again in a few minutes.',
      },
      { status: 502 },
    );
  }

  recordSlidingWindowEvent(rateKeys, CONTACT_RATE_LIMIT_WINDOW_MS);

  return NextResponse.json({ ok: true as const });
}
