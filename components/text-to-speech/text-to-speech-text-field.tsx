'use client';

import { useWatch, type Control } from 'react-hook-form';

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import type { TextToSpeechFormValues } from '@/lib/schemas/text-to-speech-schema';
import { TTS_MAX_CHARS, TTS_MIN_CHARS } from '@/lib/text-to-speech/config';
import { describeDuration } from '@/lib/text-to-speech/duration';
import { cn } from '@/lib/utils';

type TextToSpeechTextFieldProps = {
  control: Control<TextToSpeechFormValues>;
  disabled?: boolean;
};

export function TextToSpeechTextField({ control, disabled }: TextToSpeechTextFieldProps) {
  const speed = useWatch({ control, name: 'speed' });

  return (
    <FormField
      control={control}
      name='text'
      render={({ field }) => {
        const length = field.value.trim().length;
        const tooShort = length > 0 && length < TTS_MIN_CHARS;
        const tooLong = length > TTS_MAX_CHARS;

        return (
          <FormItem>
            <FormLabel>Your script</FormLabel>
            <FormControl>
              <Textarea
                {...field}
                disabled={disabled}
                rows={8}
                maxLength={TTS_MAX_CHARS * 2}
                placeholder='Paste or type the text you want to hear…'
                className='max-h-96 min-h-48 resize-y leading-relaxed'
              />
            </FormControl>
            <div className='flex flex-wrap items-start justify-between gap-x-3 gap-y-1 text-xs'>
              <FormMessage />
              {length >= TTS_MIN_CHARS ? (
                <p className='text-muted-foreground'>{describeDuration(length, speed)}</p>
              ) : null}
              <p
                className={cn(
                  'ml-auto shrink-0 tabular-nums text-muted-foreground',
                  (tooShort || tooLong) && 'text-amber-600 dark:text-amber-400',
                )}>
                {length.toLocaleString('en-US')} / {TTS_MAX_CHARS.toLocaleString('en-US')}{' '}
                characters
                <span className='sr-only'>
                  , minimum {TTS_MIN_CHARS}, maximum {TTS_MAX_CHARS.toLocaleString('en-US')}
                </span>
              </p>
            </div>
          </FormItem>
        );
      }}
    />
  );
}
