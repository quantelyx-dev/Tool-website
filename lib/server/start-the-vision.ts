import type { TextToSpeechFormValues } from '@/lib/schemas/text-to-speech-schema';
import { TTS_TASK_ID_PATTERN } from '@/lib/text-to-speech/config';

/** `STV_API_BASE_URL` lets tests point at a mock provider; production uses the real API. */
const API_BASE = process.env.STV_API_BASE_URL?.trim().replace(/\/$/, '') || 'https://api.startthevision.com';
const REQUEST_TIMEOUT_MS = 15_000;

/** Hosts the provider serves generated audio from; anything else is refused. */
const AUDIO_HOST_SUFFIXES = ['.r2.dev', '.startthevision.com'] as const;

export type SpeechJobFailure =
  | 'not_configured'
  | 'out_of_credits'
  | 'rejected'
  | 'unavailable';

export type SubmitSpeechJobResult =
  | { ok: true; taskId: string }
  | { ok: false; reason: SpeechJobFailure };

export type SpeechJobStatus =
  | { ok: true; status: 'processing' }
  | { ok: true; status: 'failed' }
  | { ok: true; status: 'completed'; audioUrl: string }
  | { ok: false; reason: SpeechJobFailure };

function readApiToken(): string | null {
  const token = process.env.STV_API_TOKEN?.trim();
  return token ? token : null;
}

export function isStartTheVisionConfigured(): boolean {
  return readApiToken() !== null;
}

function isAllowedAudioUrl(raw: string): boolean {
  try {
    const url = new URL(raw);
    return (
      url.protocol === 'https:' &&
      AUDIO_HOST_SUFFIXES.some(suffix => url.hostname.endsWith(suffix))
    );
  } catch {
    return false;
  }
}

function failureForStatus(status: number): SpeechJobFailure {
  if (status === 402) return 'out_of_credits';
  if (status === 401 || status === 403) return 'not_configured';
  if (status >= 400 && status < 500) return 'rejected';
  return 'unavailable';
}

async function callApi(
  path: string,
  token: string,
  init?: { body?: URLSearchParams },
): Promise<Response> {
  return fetch(`${API_BASE}${path}`, {
    method: init?.body ? 'POST' : 'GET',
    headers: { Authorization: `Bearer ${token}`, Accept: 'application/json' },
    body: init?.body,
    cache: 'no-store',
    signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
  });
}

/** Queues an ElevenLabs text-to-speech job. Credits are charged by the provider on acceptance. */
export async function submitSpeechJob(
  values: TextToSpeechFormValues,
): Promise<SubmitSpeechJobResult> {
  const token = readApiToken();
  if (!token) return { ok: false, reason: 'not_configured' };

  const body = new URLSearchParams({
    text: values.text,
    voice_id: values.voiceId,
    model_id: values.modelId,
    speed: String(values.speed),
    stability: String(values.stability),
    language_tag: 'en',
  });

  try {
    const res = await callApi('/api/elevenlabs/generate', token, { body });
    if (!res.ok) {
      console.error('[start-the-vision] submit failed', res.status);
      return { ok: false, reason: failureForStatus(res.status) };
    }

    const payload = (await res.json()) as { success?: boolean; task_id?: unknown };
    const taskId = typeof payload.task_id === 'string' ? payload.task_id : '';
    if (!payload.success || !TTS_TASK_ID_PATTERN.test(taskId)) {
      return { ok: false, reason: 'unavailable' };
    }

    return { ok: true, taskId };
  } catch (error) {
    console.error('[start-the-vision] submit error', error);
    return { ok: false, reason: 'unavailable' };
  }
}

/** Looks up a queued job. `taskId` must already match {@link TTS_TASK_ID_PATTERN}. */
export async function getSpeechJob(taskId: string): Promise<SpeechJobStatus> {
  const token = readApiToken();
  if (!token) return { ok: false, reason: 'not_configured' };

  try {
    const res = await callApi(
      `/api/elevenlabs/status/${encodeURIComponent(taskId)}`,
      token,
    );
    if (!res.ok) {
      return { ok: false, reason: failureForStatus(res.status) };
    }

    const payload = (await res.json()) as { status?: unknown; audio_url?: unknown };
    if (payload.status === 'failed' || payload.status === 'error') {
      return { ok: true, status: 'failed' };
    }

    if (payload.status === 'completed') {
      const audioUrl = typeof payload.audio_url === 'string' ? payload.audio_url : '';
      if (!isAllowedAudioUrl(audioUrl)) return { ok: true, status: 'failed' };
      return { ok: true, status: 'completed', audioUrl };
    }

    return { ok: true, status: 'processing' };
  } catch (error) {
    console.error('[start-the-vision] status error', error);
    return { ok: false, reason: 'unavailable' };
  }
}
