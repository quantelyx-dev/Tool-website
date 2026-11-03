import {
  isTtsModelId,
  isTtsVoiceId,
  TTS_SPEED,
  TTS_STABILITY,
} from '@/lib/text-to-speech/config';
import type { TextToSpeechFormValues } from '@/lib/schemas/text-to-speech-schema';

const STORAGE_KEY = 'tools:text-to-speech:preferences';

export type TextToSpeechPreferences = Omit<TextToSpeechFormValues, 'text'>;

function inRange(value: unknown, range: { min: number; max: number }): value is number {
  return typeof value === 'number' && value >= range.min && value <= range.max;
}

/** Last-used voice settings, or null when storage is unavailable or the saved value is invalid. */
export function loadTextToSpeechPreferences(): TextToSpeechPreferences | null {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const saved = JSON.parse(raw) as Record<string, unknown>;

    if (
      typeof saved.voiceId === 'string' &&
      isTtsVoiceId(saved.voiceId) &&
      typeof saved.modelId === 'string' &&
      isTtsModelId(saved.modelId) &&
      inRange(saved.speed, TTS_SPEED) &&
      inRange(saved.stability, TTS_STABILITY)
    ) {
      return {
        voiceId: saved.voiceId,
        modelId: saved.modelId,
        speed: saved.speed,
        stability: saved.stability,
      };
    }
  } catch {
    // Storage blocked or corrupted — fall back to defaults.
  }
  return null;
}

export function saveTextToSpeechPreferences(values: TextToSpeechFormValues): void {
  try {
    const { voiceId, modelId, speed, stability } = values;
    window.localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ voiceId, modelId, speed, stability }),
    );
  } catch {
    // Storage full or blocked — preferences just won't persist.
  }
}
