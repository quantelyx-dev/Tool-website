'use client';

import { PauseIcon, PlayIcon } from 'lucide-react';
import { useState } from 'react';
import type { Control } from 'react-hook-form';

import { FormField, FormItem, FormMessage } from '@/components/ui/form';
import { useVoicePreview } from '@/hooks/use-voice-preview';
import type { TextToSpeechFormValues } from '@/lib/schemas/text-to-speech-schema';
import {
  TTS_VOICES,
  ttsVoiceSampleUrl,
  type TtsVoiceGender,
} from '@/lib/text-to-speech/config';
import { cn } from '@/lib/utils';

type VoiceFilter = 'all' | TtsVoiceGender;

const FILTERS: readonly { value: VoiceFilter; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'female', label: 'Female' },
  { value: 'male', label: 'Male' },
];

const AVATAR_STYLES: Record<TtsVoiceGender, string> = {
  female: 'bg-fuchsia-500/15 text-fuchsia-700 dark:text-fuchsia-300',
  male: 'bg-sky-500/15 text-sky-700 dark:text-sky-300',
};

type TextToSpeechVoicePickerProps = {
  control: Control<TextToSpeechFormValues>;
  disabled?: boolean;
};

export function TextToSpeechVoicePicker({ control, disabled }: TextToSpeechVoicePickerProps) {
  const [filter, setFilter] = useState<VoiceFilter>('all');
  const { playingId, toggle } = useVoicePreview();

  return (
    <FormField
      control={control}
      name='voiceId'
      render={({ field }) => {
        const voices = TTS_VOICES.filter(
          voice => filter === 'all' || voice.gender === filter || voice.id === field.value,
        );

        return (
          <FormItem>
            <fieldset className='min-w-0 space-y-3'>
              <div className='flex flex-wrap items-center justify-between gap-2'>
                <legend className='text-sm font-medium leading-none'>Voice</legend>
                <div className='flex gap-1' role='group' aria-label='Filter voices'>
                  {FILTERS.map(option => (
                    <button
                      key={option.value}
                      type='button'
                      aria-pressed={filter === option.value}
                      onClick={() => setFilter(option.value)}
                      className={cn(
                        'rounded-full border px-3 py-1 text-xs font-medium outline-none transition-colors',
                        'focus-visible:ring-3 focus-visible:ring-ring/50',
                        filter === option.value
                          ? 'border-violet-500/60 bg-violet-500/10 text-violet-700 dark:text-violet-300'
                          : 'text-muted-foreground hover:text-foreground',
                      )}>
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className='grid gap-2 sm:grid-cols-2 lg:grid-cols-3'>
                {voices.map(voice => {
                  const playing = playingId === voice.id;
                  return (
                    <div key={voice.id} className='relative'>
                      <label
                        className={cn(
                          'flex cursor-pointer items-center gap-3 rounded-xl border p-3 pr-14 transition-colors',
                          'hover:bg-muted/50 has-checked:border-violet-500 has-checked:bg-violet-500/5',
                          'has-focus-visible:ring-3 has-focus-visible:ring-ring/50',
                          disabled && 'cursor-not-allowed opacity-60',
                        )}>
                        <input
                          type='radio'
                          name={field.name}
                          value={voice.id}
                          checked={field.value === voice.id}
                          onChange={() => field.onChange(voice.id)}
                          onBlur={field.onBlur}
                          disabled={disabled}
                          className='sr-only'
                        />
                        <span
                          aria-hidden
                          className={cn(
                            'flex size-9 shrink-0 items-center justify-center rounded-full text-sm font-semibold',
                            AVATAR_STYLES[voice.gender],
                          )}>
                          {voice.name[0]}
                        </span>
                        <span className='min-w-0'>
                          <span className='block text-sm font-medium'>{voice.name}</span>
                          <span className='block truncate text-xs text-muted-foreground'>
                            {voice.description}
                          </span>
                        </span>
                      </label>
                      <button
                        type='button'
                        onClick={() => toggle(voice.id, ttsVoiceSampleUrl(voice.id))}
                        aria-label={`${playing ? 'Stop' : 'Play'} ${voice.name} preview`}
                        aria-pressed={playing}
                        className={cn(
                          'absolute right-2.5 top-1/2 flex size-8 -translate-y-1/2 items-center justify-center rounded-full',
                          'border bg-background text-foreground outline-none transition-colors hover:bg-muted',
                          'focus-visible:ring-3 focus-visible:ring-ring/50',
                          playing && 'border-violet-500 text-violet-600 dark:text-violet-300',
                        )}>
                        {playing ? (
                          <PauseIcon aria-hidden className='size-3.5' />
                        ) : (
                          <PlayIcon aria-hidden className='size-3.5' />
                        )}
                      </button>
                    </div>
                  );
                })}
              </div>
            </fieldset>
            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
}
