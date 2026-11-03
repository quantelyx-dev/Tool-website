import { getJson, postJson } from '@/lib/http';
import type { TextToSpeechFormValues } from '@/lib/schemas/text-to-speech-schema';

export type TextToSpeechJobStatus = 'processing' | 'completed' | 'failed';

export type SubmitTextToSpeechSuccess = { ok: true; taskId: string };

export type TextToSpeechStatusSuccess = { ok: true; status: TextToSpeechJobStatus };

/** Shape returned on non-2xx (parsed JSON when present). */
export type TextToSpeechFailureBody = {
  ok?: false;
  error?: string;
  code?: string;
  retryAfterSeconds?: number;
  fieldErrors?: Record<string, string[] | undefined>;
};

type RequestOptions = { signal?: AbortSignal };

/** POST `/api/text-to-speech`. Throws `ApiError` from `@/lib/http` when the response is not OK. */
export function submitTextToSpeech(
  values: TextToSpeechFormValues,
  options?: RequestOptions,
): Promise<SubmitTextToSpeechSuccess> {
  return postJson<SubmitTextToSpeechSuccess>('/api/text-to-speech', values, {
    signal: options?.signal,
  });
}

/** GET `/api/text-to-speech/:taskId`. */
export function fetchTextToSpeechStatus(
  taskId: string,
  options?: RequestOptions,
): Promise<TextToSpeechStatusSuccess> {
  return getJson<TextToSpeechStatusSuccess>(
    `/api/text-to-speech/${encodeURIComponent(taskId)}`,
    { signal: options?.signal, cache: 'no-store' },
  );
}

/** Same-origin URL that streams the finished MP3 (playable and downloadable). */
export function textToSpeechAudioUrl(taskId: string): string {
  return `/api/text-to-speech/${encodeURIComponent(taskId)}/audio`;
}
