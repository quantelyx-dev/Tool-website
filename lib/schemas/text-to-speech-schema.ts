import { z } from 'zod';

import {
  isTtsModelId,
  isTtsVoiceId,
  TTS_MAX_CHARS,
  TTS_MIN_CHARS,
  TTS_SPEED,
  TTS_STABILITY,
} from '@/lib/text-to-speech/config';

export const textToSpeechFormSchema = z.object({
  text: z
    .string()
    .trim()
    .min(TTS_MIN_CHARS, {
      message: `Enter at least ${TTS_MIN_CHARS} characters of text.`,
    })
    .max(TTS_MAX_CHARS, {
      message: `Text must be at most ${TTS_MAX_CHARS} characters.`,
    }),
  voiceId: z.string().refine((value): boolean => isTtsVoiceId(value), { message: 'Choose a voice from the list.' }),
  modelId: z.string().refine((value): boolean => isTtsModelId(value), { message: 'Choose a quality option from the list.' }),
  speed: z
    .number()
    .min(TTS_SPEED.min, { message: `Speed must be at least ${TTS_SPEED.min}.` })
    .max(TTS_SPEED.max, { message: `Speed must be at most ${TTS_SPEED.max}.` }),
  stability: z
    .number()
    .min(TTS_STABILITY.min, { message: 'Stability must be between 0 and 1.' })
    .max(TTS_STABILITY.max, { message: 'Stability must be between 0 and 1.' }),
});

export type TextToSpeechFormValues = z.infer<typeof textToSpeechFormSchema>;
