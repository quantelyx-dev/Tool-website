import type { TextToSpeechFormValues } from '@/lib/schemas/text-to-speech-schema';
import {
  TTS_DEFAULT_MODEL_ID,
  TTS_DEFAULT_VOICE_ID,
  TTS_SPEED,
  TTS_STABILITY,
} from '@/lib/text-to-speech/config';

export const TEXT_TO_SPEECH_FORM_DEFAULTS: TextToSpeechFormValues = {
  text: '',
  voiceId: TTS_DEFAULT_VOICE_ID,
  modelId: TTS_DEFAULT_MODEL_ID,
  speed: TTS_SPEED.default,
  stability: TTS_STABILITY.default,
};
