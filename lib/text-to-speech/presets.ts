import {
  TTS_MAX_CHARS,
  TTS_MIN_CHARS,
  type TtsModelId,
  type TtsVoiceId,
} from '@/lib/text-to-speech/config';

export type TtsPreset = {
  id: string;
  label: string;
  description: string;
  voiceId: TtsVoiceId;
  modelId: TtsModelId;
  speed: number;
  stability: number;
  /** Starter script, used when the text box is empty. Must satisfy the length limits. */
  template: string;
};

export const TTS_PRESETS: readonly TtsPreset[] = [
  {
    id: 'storytime',
    label: 'Storytime',
    description: 'Fast, gripping narration for story videos',
    voiceId: 'nPczCjzI2devNBz1zQrb',
    modelId: 'eleven_multilingual_v2',
    speed: 1.1,
    stability: 0.35,
    template:
      "So this actually happened to me last week, and I still can't believe it. I walked into my favorite coffee shop, ordered the usual, and the barista slid a note across the counter with my drink. I opened it, and what it said made me stop right in the middle of the room. Stay with me, because it gets wild.",
  },
  {
    id: 'promo',
    label: 'Hook & promo',
    description: 'Punchy opener for ads and product clips',
    voiceId: 'TxGEqnHWrfWFTfGW9XjX',
    modelId: 'eleven_turbo_v2_5',
    speed: 1.1,
    stability: 0.4,
    template:
      'Stop scrolling, because this is the one thing that finally fixed my mornings. It takes less than two minutes, it costs almost nothing, and it works every single time. Here is exactly how it works, and why thousands of people are already switching. Watch until the end, you will want to save this for later.',
  },
  {
    id: 'explainer',
    label: 'Calm explainer',
    description: 'Clear, steady voice for how-to content',
    voiceId: '21m00Tcm4TlvDq8ikWAM',
    modelId: 'eleven_multilingual_v2',
    speed: 1,
    stability: 0.6,
    template:
      'Here is a simple way to think about it. Imagine your money as a garden. Every small deposit is a seed, and time is the sunlight. You do not need to do anything dramatic. You just need to show up regularly, stay patient, and let the growth compound quietly in the background over the years.',
  },
  {
    id: 'facts',
    label: 'Facts & news',
    description: 'Authoritative delivery for "did you know" clips',
    voiceId: 'onwK4e9ZLuTAKqWW03F9',
    modelId: 'eleven_turbo_v2_5',
    speed: 1.05,
    stability: 0.7,
    template:
      'Did you know that honey never spoils? Archaeologists have found pots of honey in ancient Egyptian tombs that are over three thousand years old, and it was still perfectly edible. The secret is its low moisture and natural acidity, which make it almost impossible for bacteria to survive. Pretty sweet, right?',
  },
  {
    id: 'trailer',
    label: 'Dramatic trailer',
    description: 'Slow, cinematic voice for intros and teasers',
    voiceId: 'VR6AewLTigWG4xSOukaG',
    modelId: 'eleven_multilingual_v2',
    speed: 0.95,
    stability: 0.3,
    template:
      'In a world where every second counts, one decision changes everything. They said it could not be done. They said no one would listen. But when the lights go out and the silence falls, a single voice rises, and nothing will ever be the same. This is the story you have been waiting for.',
  },
];

for (const preset of TTS_PRESETS) {
  if (preset.template.length < TTS_MIN_CHARS || preset.template.length > TTS_MAX_CHARS) {
    throw new Error(`TTS preset "${preset.id}" template must be ${TTS_MIN_CHARS}-${TTS_MAX_CHARS} characters`);
  }
}

type PresetSettings = { voiceId: string; modelId: string; speed: number; stability: number };

/** The preset whose settings exactly match `settings`, if any. */
export function findMatchingPreset(settings: PresetSettings): TtsPreset | undefined {
  return TTS_PRESETS.find(
    preset =>
      preset.voiceId === settings.voiceId &&
      preset.modelId === settings.modelId &&
      preset.speed === settings.speed &&
      preset.stability === settings.stability,
  );
}
