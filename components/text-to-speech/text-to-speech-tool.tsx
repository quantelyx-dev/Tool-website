'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useReducedMotion } from 'framer-motion';
import { MicIcon } from 'lucide-react';
import { useEffect, useRef, useState, type KeyboardEvent } from 'react';
import { useForm } from 'react-hook-form';

import { TextToSpeechOptions } from '@/components/text-to-speech/text-to-speech-options';
import { TextToSpeechPresets } from '@/components/text-to-speech/text-to-speech-presets';
import { TextToSpeechResult } from '@/components/text-to-speech/text-to-speech-result';
import { TextToSpeechTextField } from '@/components/text-to-speech/text-to-speech-text-field';
import { TextToSpeechVoicePicker } from '@/components/text-to-speech/text-to-speech-voice-picker';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Form } from '@/components/ui/form';
import { useAnalytics } from '@/hooks/use-analytics';
import { useTextToSpeech } from '@/hooks/use-text-to-speech';
import {
  textToSpeechFormSchema,
  type TextToSpeechFormValues,
} from '@/lib/schemas/text-to-speech-schema';
import { TTS_MIN_CHARS } from '@/lib/text-to-speech/config';
import { buildAudioFileName } from '@/lib/text-to-speech/file-name';
import { TEXT_TO_SPEECH_FORM_DEFAULTS } from '@/lib/text-to-speech/form-defaults';
import {
  loadTextToSpeechPreferences,
  saveTextToSpeechPreferences,
} from '@/lib/text-to-speech/preferences';
import { findMatchingPreset, type TtsPreset } from '@/lib/text-to-speech/presets';
import { cn } from '@/lib/utils';

const ENTER_ANIMATION =
  'animate-in fade-in slide-in-from-bottom-3 duration-500 fill-mode-both motion-reduce:animate-none';

export function TextToSpeechTool() {
  const reducedMotion = useReducedMotion();
  const { onUse, onResult, onDownload, onReset } = useAnalytics('text-to-speech');
  const { state, generate, reset } = useTextToSpeech();
  const [fileName, setFileName] = useState('voiceover.mp3');
  const resultRegionRef = useRef<HTMLDivElement>(null);
  const resultHeadingRef = useRef<HTMLHeadingElement>(null);

  const form = useForm<TextToSpeechFormValues>({
    resolver: zodResolver(textToSpeechFormSchema),
    defaultValues: TEXT_TO_SPEECH_FORM_DEFAULTS,
    mode: 'onBlur',
  });

  const busy = state.phase === 'submitting' || state.phase === 'processing';
  const finished = state.phase === 'ready' || state.phase === 'error';

  // Restore the visitor's last voice settings once mounted (storage is browser-only).
  useEffect(() => {
    const saved = loadTextToSpeechPreferences();
    if (saved) form.reset({ ...form.getValues(), ...saved });
  }, [form]);

  useEffect(() => {
    if (!finished) return;
    resultHeadingRef.current?.focus({ preventScroll: true });
  }, [finished]);

  useEffect(() => {
    if (state.phase === 'idle') return;
    resultRegionRef.current?.scrollIntoView({
      behavior: reducedMotion ? 'auto' : 'smooth',
      block: 'nearest',
    });
  }, [state.phase, reducedMotion]);

  async function handleSubmit(values: TextToSpeechFormValues) {
    const context = {
      voice_id: values.voiceId,
      model_id: values.modelId,
      preset: findMatchingPreset(values)?.id ?? 'custom',
      characters: values.text.length,
    };
    onUse(context);
    setFileName(buildAudioFileName(values.text));

    const outcome = await generate(values);
    if (outcome?.ok) {
      saveTextToSpeechPreferences(values);
      onResult(context);
    }
  }

  function handleApplyPreset(preset: TtsPreset) {
    const options = { shouldDirty: true, shouldValidate: true } as const;
    form.setValue('voiceId', preset.voiceId, options);
    form.setValue('modelId', preset.modelId, options);
    form.setValue('speed', preset.speed, options);
    form.setValue('stability', preset.stability, options);
    if (form.getValues('text').trim() === '') {
      form.setValue('text', preset.template, options);
    }
  }

  function handleKeyDown(event: KeyboardEvent<HTMLFormElement>) {
    if (event.key === 'Enter' && (event.metaKey || event.ctrlKey) && !busy) {
      event.preventDefault();
      void form.handleSubmit(handleSubmit)();
    }
  }

  function handleReset() {
    reset();
    form.reset({ ...TEXT_TO_SPEECH_FORM_DEFAULTS, ...loadTextToSpeechPreferences() });
    onReset();
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        onKeyDown={handleKeyDown}
        noValidate
        aria-label='Text to speech generator'
        className='mx-auto flex max-w-4xl flex-col gap-6'>
        <div className={ENTER_ANIMATION}>
          <Card className='border-border/80 shadow-xs'>
            <CardHeader>
              <CardTitle className='flex items-center gap-2 text-base font-semibold'>
                <MicIcon aria-hidden className='size-4 text-violet-600 dark:text-violet-400' />
                Script &amp; voice
              </CardTitle>
              <CardDescription>
                Start from a style or paste your own script (at least {TTS_MIN_CHARS} characters),
                pick a voice, then generate.
              </CardDescription>
            </CardHeader>
            <CardContent className='space-y-6'>
              <TextToSpeechPresets
                control={form.control}
                disabled={busy}
                onApply={handleApplyPreset}
              />
              <TextToSpeechTextField control={form.control} disabled={busy} />
              <TextToSpeechVoicePicker control={form.control} disabled={busy} />
              <TextToSpeechOptions control={form.control} disabled={busy} />
              <div className='flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between'>
                <p className='text-xs text-muted-foreground'>
                  Your text is sent to our AI voice provider to create the audio. It is not stored
                  on this site. Press Ctrl/⌘ + Enter to generate.
                </p>
                <Button type='submit' disabled={busy} className='sm:min-w-40'>
                  {busy ? 'Generating…' : 'Generate speech'}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <div ref={resultRegionRef} className={cn(state.phase !== 'idle' && ENTER_ANIMATION)}>
          <TextToSpeechResult
            ref={resultHeadingRef}
            state={state}
            fileName={fileName}
            onDownload={() => onDownload('mp3')}
            onReset={handleReset}
          />
        </div>
      </form>
    </Form>
  );
}
