'use client';

import { Check, Copy } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { cn } from '@/lib/utils';

export type RandomUsernamesCopyState = 'idle' | 'copied' | 'failed';

type GenerateRandomUsernamesResultCardProps = {
  usernames: string[];
  copyState: RandomUsernamesCopyState;
  onCopy: () => void;
  className?: string;
};

export function GenerateRandomUsernamesResultCard({
  usernames,
  copyState,
  onCopy,
  className,
}: GenerateRandomUsernamesResultCardProps) {
  const count = usernames.length;

  return (
    <Card
      className={cn(
        'overflow-hidden shadow-xs ring-1 ring-foreground/10',
        className,
      )}>
      <CardHeader className='flex flex-col gap-4 border-b border-border/80 px-4 pb-5 pt-6 sm:flex-row sm:items-start sm:justify-between sm:gap-6 sm:px-6'>
        <div className='min-w-0 space-y-1'>
          <CardTitle className='text-base font-semibold sm:text-lg'>
            {count} {count === 1 ? 'username' : 'usernames'}
          </CardTitle>
          <CardDescription className='text-sm leading-relaxed'>
            Copy as a comma-separated list for CSV, SQL, or spreadsheets.
          </CardDescription>
        </div>
        <Button
          type='button'
          variant='secondary'
          aria-live='polite'
          className={cn(
            'inline-flex h-11 w-full shrink-0 gap-2 self-stretch justify-center transition-colors sm:h-10 sm:w-auto sm:self-auto sm:min-w-50',
            copyState === 'copied' &&
              'border-emerald-500/40 bg-emerald-500/10 text-emerald-800 hover:bg-emerald-500/15 dark:border-emerald-400/35 dark:bg-emerald-500/15 dark:text-emerald-100 dark:hover:bg-emerald-500/20',
            copyState === 'failed' &&
              'border-destructive/40 bg-destructive/5 text-destructive hover:bg-destructive/10',
          )}
          onClick={onCopy}>
          {copyState === 'copied' ? (
            <>
              <Check
                className='size-4 text-emerald-600 dark:text-emerald-400'
                aria-hidden
              />
              Copied
            </>
          ) : copyState === 'failed' ? (
            <>
              <Copy className='size-4' aria-hidden />
              Couldn&apos;t copy
            </>
          ) : (
            <>
              <Copy className='size-4' aria-hidden />
              Copy all (comma-separated)
            </>
          )}
        </Button>
      </CardHeader>
      <CardContent className='px-4 pb-6 pt-5 sm:px-6 sm:pt-6'>
        <div
          className='max-h-[min(26rem,50svh)] overflow-y-auto rounded-xl border border-border/80 bg-muted/20 px-3 py-3 sm:max-h-[min(28rem,55vh)] sm:px-4 sm:py-4 dark:bg-muted/10'
          role='list'
          aria-label='Generated usernames'>
          <ul className='flex flex-wrap gap-2 sm:gap-2.5'>
            {usernames.map((name, i) => (
              <li key={`${i}-${name}`} role='listitem'>
                <span
                  className={cn(
                    'inline-flex max-w-full items-center rounded-md border border-border bg-background px-2.5 py-1.5 font-mono text-[0.8125rem] font-medium leading-none tracking-tight text-foreground shadow-xs sm:px-3 sm:text-xs',
                  )}>
                  {name}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}
