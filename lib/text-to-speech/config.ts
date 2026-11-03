/** Provider-enforced minimum (the API rejects shorter text). */
export const TTS_MIN_CHARS = 200;

/** Keeps a single free generation affordable; raise only if the credit budget allows. */
export const TTS_MAX_CHARS = 1_000;

export type TtsVoiceGender = 'female' | 'male';

/** Popular ElevenLabs voices, most-used first. Each has a pre-rendered clip in `public/voice-samples`. */
export const TTS_VOICES = [
  { id: 'nPczCjzI2devNBz1zQrb', name: 'Brian', gender: 'male', description: 'Deep, social-media narrator' },
  { id: '21m00Tcm4TlvDq8ikWAM', name: 'Rachel', gender: 'female', description: 'Calm, clear and friendly' },
  { id: 'pNInz6obpgDQGcFmaJgB', name: 'Adam', gender: 'male', description: 'Deep, confident narrator' },
  { id: 'EXAVITQu4vr4xnSDxMaL', name: 'Sarah', gender: 'female', description: 'Soft, warm, friendly' },
  { id: 'TxGEqnHWrfWFTfGW9XjX', name: 'Josh', gender: 'male', description: 'Young, conversational' },
  { id: 'XrExE9yKIg1WjnnlVkGX', name: 'Matilda', gender: 'female', description: 'Warm storyteller' },
  { id: 'JBFqnCBsd6RMkjVDRZzb', name: 'George', gender: 'male', description: 'British, warm storyteller' },
  { id: 'XB0fDUnXU5powFXDhCwa', name: 'Charlotte', gender: 'female', description: 'Smooth and expressive' },
  { id: 'onwK4e9ZLuTAKqWW03F9', name: 'Daniel', gender: 'male', description: 'British, news-style authority' },
  { id: 'Xb7hH8MSUJpSbSDYk0k2', name: 'Alice', gender: 'female', description: 'British, confident and clear' },
  { id: 'VR6AewLTigWG4xSOukaG', name: 'Arnold', gender: 'male', description: 'Crisp, punchy, dramatic' },
  { id: 'pFZP5JQG7iQjIQuC4Bku', name: 'Lily', gender: 'female', description: 'British, warm and gentle' },
] as const;

export const TTS_MODELS = [
  {
    id: 'eleven_multilingual_v2',
    name: 'Natural',
    description: 'Most expressive, best quality',
  },
  {
    id: 'eleven_turbo_v2_5',
    name: 'Balanced',
    description: 'Good quality, faster',
  },
  {
    id: 'eleven_flash_v2_5',
    name: 'Fast',
    description: 'Quickest turnaround',
  },
] as const;

export type TtsVoiceId = (typeof TTS_VOICES)[number]['id'];
export type TtsModelId = (typeof TTS_MODELS)[number]['id'];

export const TTS_DEFAULT_VOICE_ID: TtsVoiceId = TTS_VOICES[0].id;
export const TTS_DEFAULT_MODEL_ID: TtsModelId = TTS_MODELS[0].id;

export const TTS_SPEED = { min: 0.7, max: 1.2, step: 0.05, default: 1 } as const;
export const TTS_STABILITY = { min: 0, max: 1, step: 0.05, default: 0.5 } as const;

export function isTtsVoiceId(value: string): value is TtsVoiceId {
  return TTS_VOICES.some(voice => voice.id === value);
}

export function isTtsModelId(value: string): value is TtsModelId {
  return TTS_MODELS.some(model => model.id === value);
}

/** Short pre-rendered preview clip for a voice (served statically, loaded only on play). */
export function ttsVoiceSampleUrl(voiceId: TtsVoiceId): string {
  return `/voice-samples/${voiceId}.mp3`;
}

/** Task ids from the provider look like `usersapi_11labs_6aea1470b9c166.76477281`. */
export const TTS_TASK_ID_PATTERN = /^[A-Za-z0-9_.-]{8,100}$/;
