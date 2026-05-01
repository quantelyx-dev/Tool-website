import { postJson } from '@/lib/http';

import type { RequestToolFormValues } from '@/lib/schemas/request-tool-schema';

export type RequestToolApiSuccess = { ok: true };

export type RequestToolApiFailureBody = {
  ok: false;
  error: string;
  /** Present when status is 429 (daily submission cap). */
  code?: 'rate_limit';
  retryAfterSeconds?: number;
  fieldErrors?: Record<string, string[] | undefined>;
};

export type SubmitRequestToolFormOptions = {
  signal?: AbortSignal;
};

/** POST `/api/request-tool`. Throws `ApiError` from `@/lib/http` when the response is not OK. */
export function submitRequestToolForm(
  values: RequestToolFormValues,
  options?: SubmitRequestToolFormOptions,
) {
  return postJson<RequestToolApiSuccess>('/api/request-tool', values, {
    signal: options?.signal,
  });
}
