'use client';

import { AlertCircleIcon, DownloadIcon, RotateCcwIcon } from 'lucide-react';
import { forwardRef } from 'react';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import type { TextToSpeechState } from '@/hooks/use-text-to-speech';
import { textToSpeechAudioUrl } from '@/lib/text-to-speech/api';
import { cn } from '@/lib/utils';

const WAVE_BARS = [0.45, 0.8, 0.55, 1, 0.65, 0.9, 0.5, 0.75, 0.4, 0.85, 0.6, 0.7];

type TextToSpeechResultProps = {
  state: TextToSpeechState;
  fileName: string;
  onDownload: () => void;
  onReset: () => void;
};

function Waveform() {
  return (
    <div aria-hidden className='flex h-10 items-center gap-1'>
      {WAVE_BARS.map((scale, index) => (
        <span
          key={index}
          style={{ height: `${scale * 100}%`, animationDelay: `${index * 90}ms` }}
          className='w-1 origin-center animate-pulse rounded-full bg-violet-500/70 motion-reduce:animate-none dark:bg-violet-400/70'
        />
      ))}
    </div>
  );
}

export const TextToSpeechResult = forwardRef<HTMLHeadingElement, TextToSpeechResultProps>(
  function TextToSpeechResult({ state, fileName, onDownload, onReset }, headingRef) {
    if (state.phase === 'idle') return null;

    if (state.phase === 'error') {
      return (
        <Card role='alert' className='border-destructive/40 bg-destructive/5'>
          <CardContent className='flex items-start gap-3'>
            <AlertCircleIcon aria-hidden className='mt-0.5 size-5 shrink-0 text-destructive' />
            <div>
              <h2 ref={headingRef} tabIndex={-1} className='text-sm font-semibold outline-none'>
                We couldn&apos;t create your audio
              </h2>
              <p className='mt-1 text-sm text-muted-foreground'>{state.message}</p>
            </div>
          </CardContent>
        </Card>
      );
    }

    if (state.phase === 'submitting' || state.phase === 'processing') {
      return (
        <Card role='status' aria-live='polite'>
          <CardContent className='flex flex-col items-center gap-4 py-4 text-center'>
            <Waveform />
            <div>
              <h2 className='text-sm font-semibold'>Creating your audio…</h2>
              <p className='mt-1 text-sm text-muted-foreground'>
                This usually takes a few seconds.
              </p>
            </div>
          </CardContent>
        </Card>
      );
    }

    const audioUrl = textToSpeechAudioUrl(state.taskId);

    return (
      <Card>
        <CardContent className='space-y-4'>
          <h2
            ref={headingRef}
            tabIndex={-1}
            className='text-base font-semibold outline-none'>
            Your audio is ready
          </h2>
          <audio
            key={state.taskId}
            controls
            preload='metadata'
            src={audioUrl}
            aria-label='Generated speech'
            className='w-full'
          />
          <div className={cn('flex flex-wrap gap-2')}>
            <Button asChild size='sm'>
              <a href={audioUrl} download={fileName} onClick={onDownload}>
                <DownloadIcon aria-hidden />
                Download MP3
              </a>
            </Button>
            <Button type='button' variant='outline' size='sm' onClick={onReset}>
              <RotateCcwIcon aria-hidden />
              Start over
            </Button>
          </div>
          <p className='text-xs text-muted-foreground'>
            Tip: import the MP3 into CapCut, Premiere, or any video editor as your voiceover
            track.
          </p>
        </CardContent>
      </Card>
    );
  },
);
