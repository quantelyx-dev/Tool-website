'use client';

import { useWatch, type Control } from 'react-hook-form';

import type { TextToSpeechFormValues } from '@/lib/schemas/text-to-speech-schema';
import { findMatchingPreset, TTS_PRESETS, type TtsPreset } from '@/lib/text-to-speech/presets';
import { cn } from '@/lib/utils';

type TextToSpeechPresetsProps = {
  control: Control<TextToSpeechFormValues>;
  disabled?: boolean;
  onApply: (preset: TtsPreset) => void;
};

export function TextToSpeechPresets({ control, disabled, onApply }: TextToSpeechPresetsProps) {
  const [voiceId, modelId, speed, stability] = useWatch({
    control,
    name: ['voiceId', 'modelId', 'speed', 'stability'],
  });
  const active = findMatchingPreset({ voiceId, modelId, speed, stability });

  return (
    <section aria-labelledby='tts-presets-heading' className='space-y-2'>
      <h3 id='tts-presets-heading' className='text-sm font-medium leading-none'>
        Quick start
      </h3>
      <ul className='grid grid-cols-2 gap-2 lg:grid-cols-3'>
        {TTS_PRESETS.map(preset => {
          const selected = active?.id === preset.id;
          return (
            <li key={preset.id}>
              <button
                type='button'
                disabled={disabled}
                aria-pressed={selected}
                onClick={() => onApply(preset)}
                className={cn(
                  'h-full w-full rounded-xl border p-3 text-left outline-none transition-colors',
                  'hover:bg-muted/50 focus-visible:ring-3 focus-visible:ring-ring/50 disabled:opacity-60',
                  selected && 'border-violet-500 bg-violet-500/5',
                )}>
                <span className='block text-sm font-medium'>{preset.label}</span>
                <span className='block text-xs text-muted-foreground'>{preset.description}</span>
              </button>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
