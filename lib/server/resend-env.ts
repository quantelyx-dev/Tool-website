import { z } from 'zod';

const resendEnvSchema = z.object({
  RESEND_API_KEY: z.string().min(1, 'RESEND_API_KEY is required'),
  RESEND_FROM_EMAIL: z
    .string()
    .min(3, 'RESEND_FROM_EMAIL is required (e.g. Tools <onboarding@resend.dev>)'),
  RESEND_ADMIN_EMAIL: z
    .string()
    .email({ message: 'RESEND_ADMIN_EMAIL must be a valid email address' }),
});

export type ResendEnv = z.infer<typeof resendEnvSchema>;

/** Validates server-side env for Resend. Returns null when misconfigured (503). */
export function getResendEnv(): ResendEnv | null {
  const parsed = resendEnvSchema.safeParse(process.env);
  if (!parsed.success) {
    return null;
  }
  return parsed.data;
}
