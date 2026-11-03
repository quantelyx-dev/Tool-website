import { TextToSpeechTool } from '@/components/text-to-speech/text-to-speech-tool';
import { cn } from '@/lib/utils';

type TextToSpeechToolContentProps = {
  className?: string;
};

/** Server-rendered header so the LCP heading never waits on hydration. */
export function TextToSpeechToolContent({
  className,
}: TextToSpeechToolContentProps) {
  return (
    <div className={cn('flex flex-col', className)}>
      <header
        className={cn(
          'relative mx-auto max-w-3xl px-1 pt-2 text-center sm:px-4 sm:pt-4',
        )}>
        <div
          aria-hidden
          className={cn(
            'pointer-events-none absolute inset-0 -z-10 mx-auto max-w-xl overflow-hidden rounded-3xl',
            'bg-[radial-gradient(ellipse_72%_56%_at_50%_-30%,rgba(139,92,246,0.15),transparent)]',
            'dark:bg-[radial-gradient(ellipse_72%_56%_at_50%_-30%,rgba(167,139,250,0.15),transparent)]',
          )}
        />
        <p
          className={cn(
            'mb-3 text-xs font-semibold uppercase tracking-[0.2em]',
            'text-violet-600 dark:text-violet-400 sm:text-sm',
          )}>
          AI voice
        </p>
        <h1
          className={cn(
            'font-heading text-balance text-3xl font-semibold tracking-tight text-foreground',
            'sm:text-4xl lg:text-[2.25rem]',
          )}>
          Text to speech generator
        </h1>
        <p
          className={cn(
            'mx-auto mt-5 max-w-2xl text-pretty text-base leading-relaxed text-muted-foreground',
            'sm:text-lg',
          )}>
          Turn your script into{' '}
          <span className='font-medium text-foreground'>natural AI voiceovers</span>.
          Preview 12 popular voices, match the timing of TikToks, Reels, and Shorts, then
          download an MP3 for your videos, podcasts, and presentations.
        </p>
      </header>

      <div className={cn('mt-12 min-w-0 w-full sm:mt-14')}>
        <TextToSpeechTool />
      </div>
    </div>
  );
}
