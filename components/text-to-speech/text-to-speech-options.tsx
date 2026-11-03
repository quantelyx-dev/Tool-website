'use client';

import { ChevronDownIcon } from 'lucide-react';
import { useWatch, type Control } from 'react-hook-form';

import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Slider } from '@/components/ui/slider';
import type { TextToSpeechFormValues } from '@/lib/schemas/text-to-speech-schema';
import {
  TTS_MODELS,
  TTS_SPEED,
  TTS_STABILITY,
} from '@/lib/text-to-speech/config';
import { cn } from '@/lib/utils';

type TextToSpeechOptionsProps = {
  control: Control<TextToSpeechFormValues>;
  disabled?: boolean;
};

type ModelChoiceProps = {
  control: Control<TextToSpeechFormValues>;
  disabled?: boolean;
};

function ModelChoice({ control, disabled }: ModelChoiceProps) {
  return (
    <FormField
      control={control}
      name='modelId'
      render={({ field }) => (
        <FormItem className='sm:col-span-2'>
          <fieldset className='min-w-0 space-y-2'>
            <legend className='text-sm font-medium leading-none'>Quality</legend>
            <div className='grid gap-2 sm:grid-cols-3'>
              {TTS_MODELS.map(model => (
                <label
                  key={model.id}
                  className={cn(
                    'flex cursor-pointer flex-col rounded-xl border p-3 transition-colors hover:bg-muted/50',
                    'has-checked:border-violet-500 has-checked:bg-violet-500/5',
                    'has-focus-visible:ring-3 has-focus-visible:ring-ring/50',
                    disabled && 'cursor-not-allowed opacity-60',
                  )}>
                  <input
                    type='radio'
                    name={field.name}
                    value={model.id}
                    checked={field.value === model.id}
                    onChange={() => field.onChange(model.id)}
                    onBlur={field.onBlur}
                    disabled={disabled}
                    className='sr-only'
                  />
                  <span className='text-sm font-medium'>{model.name}</span>
                  <span className='text-xs text-muted-foreground'>{model.description}</span>
                </label>
              ))}
            </div>
          </fieldset>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

type OptionSliderProps = {
  control: Control<TextToSpeechFormValues>;
  name: 'speed' | 'stability';
  label: string;
  hint: string;
  range: { min: number; max: number; step: number };
  format: (value: number) => string;
  disabled?: boolean;
};

function OptionSlider({
  control,
  name,
  label,
  hint,
  range,
  format,
  disabled,
}: OptionSliderProps) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <div className='flex items-center justify-between gap-3'>
            <FormLabel>{label}</FormLabel>
            <span aria-hidden className='font-mono text-xs text-muted-foreground'>
              {format(field.value)}
            </span>
          </div>
          <FormControl>
            <Slider
              {...range}
              value={[field.value]}
              onValueChange={([next]) => field.onChange(next ?? range.min)}
              disabled={disabled}
              aria-label={`${label}, ${format(field.value)}`}
              aria-valuetext={format(field.value)}
              className='py-2'
            />
          </FormControl>
          <FormDescription>{hint}</FormDescription>
        </FormItem>
      )}
    />
  );
}

export function TextToSpeechOptions({ control, disabled }: TextToSpeechOptionsProps) {
  const [modelId, speed] = useWatch({ control, name: ['modelId', 'speed'] });
  const model = TTS_MODELS.find(option => option.id === modelId);

  return (
    <details className='group rounded-xl border'>
      <summary
        className={cn(
          'flex cursor-pointer list-none items-center justify-between gap-3 rounded-xl p-3 text-sm font-medium',
          'outline-none focus-visible:ring-3 focus-visible:ring-ring/50 [&::-webkit-details-marker]:hidden',
        )}>
        <span>Fine-tune delivery</span>
        <span className='flex items-center gap-2 text-xs font-normal text-muted-foreground'>
          {model?.name} · {speed.toFixed(2)}×
          <ChevronDownIcon
            aria-hidden
            className='size-4 transition-transform group-open:rotate-180'
          />
        </span>
      </summary>
      <div className='grid gap-5 border-t p-4 sm:grid-cols-2'>
        <ModelChoice control={control} disabled={disabled} />
        <OptionSlider
          control={control}
          name='speed'
          label='Speed'
          hint='Slower for clarity, faster for pace.'
          range={TTS_SPEED}
          format={value => `${value.toFixed(2)}×`}
          disabled={disabled}
        />
        <OptionSlider
          control={control}
          name='stability'
          label='Stability'
          hint='Lower is more expressive, higher is steadier.'
          range={TTS_STABILITY}
          format={value => `${Math.round(value * 100)}%`}
          disabled={disabled}
        />
      </div>
    </details>
  );
}
