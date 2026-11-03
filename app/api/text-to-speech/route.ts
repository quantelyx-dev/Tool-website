import { NextResponse } from 'next/server';
import { z } from 'zod';

import { textToSpeechFormSchema } from '@/lib/schemas/text-to-speech-schema';
import {
  isStartTheVisionConfigured,
  submitSpeechJob,
  type SpeechJobFailure,
} from '@/lib/server/start-the-vision';
import { assessBrowserRequest } from '@/lib/server/request-guard';
import {
  reserveTtsQuota,
  TTS_DEVICE_COOKIE,
  TTS_DEVICE_COOKIE_MAX_AGE_SECONDS,
  type TtsQuotaScope,
} from '@/lib/server/tts-quota';

export const runtime = 'nodejs';

const SUBMIT_FAILURE: Record<SpeechJobFailure, { status: number; error: string }> = {
  not_configured: {
    status: 503,
    error: 'Text to speech is not available right now. Please try again later.',
  },
  out_of_credits: {
    status: 503,
    error: 'Text to speech is temporarily unavailable. Please try again later.',
  },
  rejected: {
    status: 422,
    error: 'The speech service could not process that text. Try different text or settings.',
  },
  unavailable: {
    status: 502,
    error: 'The speech service did not respond. Please try again in a moment.',
  },
};

const QUOTA_MESSAGE: Record<TtsQuotaScope, string> = {
  cooldown: 'Please wait a few seconds before generating again.',
  ip: 'You have reached the free daily limit for text to speech. Come back tomorrow.',
  network: 'You have reached the free daily limit for text to speech. Come back tomorrow.',
  device: 'You have reached the free daily limit for text to speech. Come back tomorrow.',
  fingerprint: 'You have reached the free daily limit for text to speech. Come back tomorrow.',
  global: 'Text to speech has reached its free daily capacity. Please try again tomorrow.',
};

/** Remembers the visitor's device so switching IPs on the same browser is still counted. */
function withDeviceCookie(response: NextResponse, deviceId: string): NextResponse {
  response.cookies.set({
    name: TTS_DEVICE_COOKIE,
    value: deviceId,
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/api/text-to-speech',
    maxAge: TTS_DEVICE_COOKIE_MAX_AGE_SECONDS,
  });
  return response;
}

export async function POST(request: Request) {
  const guard = assessBrowserRequest(request);
  if (!guard.ok) {
    return NextResponse.json(
      {
        ok: false as const,
        code: 'blocked' as const,
        error: 'This request could not be verified. Please use the website in a regular browser.',
      },
      { status: 403 },
    );
  }

  let json: unknown;
  try {
    json = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false as const, error: 'Invalid JSON body' },
      { status: 400 },
    );
  }

  const parsed = textToSpeechFormSchema.safeParse(json);
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

  if (!isStartTheVisionConfigured()) {
    return NextResponse.json(
      { ok: false as const, ...SUBMIT_FAILURE.not_configured },
      { status: SUBMIT_FAILURE.not_configured.status },
    );
  }

  const quota = await reserveTtsQuota(request);
  if (!quota.ok) {
    return withDeviceCookie(
      NextResponse.json(
        {
          ok: false as const,
          code: 'rate_limit' as const,
          error: QUOTA_MESSAGE[quota.scope],
          retryAfterSeconds: quota.retryAfterSeconds,
        },
        {
          status: 429,
          headers: { 'Retry-After': String(quota.retryAfterSeconds) },
        },
      ),
      quota.deviceId,
    );
  }

  const job = await submitSpeechJob(parsed.data);
  if (!job.ok) {
    await quota.release();
    const failure = SUBMIT_FAILURE[job.reason];
    return withDeviceCookie(
      NextResponse.json({ ok: false as const, error: failure.error }, { status: failure.status }),
      quota.deviceId,
    );
  }

  return withDeviceCookie(
    NextResponse.json({ ok: true as const, taskId: job.taskId }),
    quota.deviceId,
  );
}
