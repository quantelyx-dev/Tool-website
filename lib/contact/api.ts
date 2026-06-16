import { postJson } from '@/lib/http';
import type { ContactFormValues } from '@/lib/schemas/contact-schema';

export type ContactApiSuccess = { ok: true };

export type ContactApiFailureBody = {
  ok: false;
  error: string;
  /** Present when status is 429 (daily submission cap). */
  code?: 'rate_limit';
  retryAfterSeconds?: number;
  fieldErrors?: Record<string, string[] | undefined>;
};

export type SubmitContactFormOptions = {
  signal?: AbortSignal;
};

/** POST `/api/contact`. Throws `ApiError` from `@/lib/http` when the response is not OK. */
export function submitContactForm(
  values: ContactFormValues,
  options?: SubmitContactFormOptions,
) {
  return postJson<ContactApiSuccess>('/api/contact', values, {
    signal: options?.signal,
  });
}
