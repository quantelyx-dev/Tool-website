'use client';

import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { Loader2, RefreshCw, UserPlus, Users } from 'lucide-react';
import { useCallback, useEffect, useRef, useState } from 'react';

import {
  GenerateRandomUsernamesResultCard,
  type RandomUsernamesCopyState,
} from '@/components/generate-random-usernames/generate-random-usernames-result-card';
import {
  USERNAME_DEFAULT_LIMIT,
  UsernameLimitSelect,
} from '@/components/generate-random-usernames/username-limit-select';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import type {
  GenerateRandomUsernamesErrorBody,
  GenerateRandomUsernamesSuccessBody,
} from '@/lib/generate-random-usernames/api-response';
import {
  fadeUpVariants,
  staggerContainerVariants,
} from '@/lib/motion-variants';
import {
  calculatorLoadingMotionProps,
  calculatorSwapMotionProps,
} from '@/lib/sun-moon-rising/calculator-motion';
import { cn } from '@/lib/utils';

const COPY_FEEDBACK_MS = 2000;

type GenerateRandomUsernamesToolContentProps = {
  className?: string;
};

export function GenerateRandomUsernamesToolContent({
  className,
}: GenerateRandomUsernamesToolContentProps) {
  const reducedMotion = useReducedMotion();
  const panelRef = useRef<HTMLDivElement>(null);
  const [limit, setLimit] = useState<string>(USERNAME_DEFAULT_LIMIT);
  const [usernames, setUsernames] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [copyState, setCopyState] = useState<RandomUsernamesCopyState>('idle');
  const copyResetRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearCopyFeedbackTimer = useCallback(() => {
    if (copyResetRef.current !== null) {
      clearTimeout(copyResetRef.current);
      copyResetRef.current = null;
    }
  }, []);

  useEffect(() => {
    return clearCopyFeedbackTimer;
  }, [clearCopyFeedbackTimer]);

  const reset = useCallback(() => {
    clearCopyFeedbackTimer();
    setCopyState('idle');
    setUsernames([]);
    setError(null);
    setLimit(USERNAME_DEFAULT_LIMIT);
    setLoading(false);
    requestAnimationFrame(() => {
      panelRef.current?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    });
  }, [clearCopyFeedbackTimer]);

  const generate = useCallback(async () => {
    const n = Number.parseInt(limit, 10);
    clearCopyFeedbackTimer();
    setCopyState('idle');
    setError(null);
    setLoading(true);
    setUsernames([]);

    try {
      const res = await fetch(
        `/api/generate-random-usernames?limit=${encodeURIComponent(String(n))}`,
        { method: 'GET', cache: 'no-store' },
      );
      const body: unknown = await res.json().catch(() => null);

      if (!res.ok || !body || typeof body !== 'object') {
        const msg =
          body &&
          typeof body === 'object' &&
          'error' in body &&
          typeof (body as GenerateRandomUsernamesErrorBody).error === 'string'
            ? (body as GenerateRandomUsernamesErrorBody).error
            : `Request failed (${res.status}).`;
        setError(msg);
        return;
      }

      const data = body as
        | GenerateRandomUsernamesSuccessBody
        | GenerateRandomUsernamesErrorBody;
      if (
        !('ok' in data) ||
        data.ok !== true ||
        !Array.isArray(data.usernames)
      ) {
        const msg =
          typeof (data as GenerateRandomUsernamesErrorBody).error === 'string'
            ? (data as GenerateRandomUsernamesErrorBody).error
            : 'Unexpected response from the server.';
        setError(msg);
        return;
      }

      setUsernames(data.usernames);
    } catch {
      setError('Something went wrong. Check your connection and try again.');
    } finally {
      setLoading(false);
    }
  }, [limit, clearCopyFeedbackTimer]);

  const copyCommaSeparated = useCallback(async () => {
    if (usernames.length === 0) return;
    clearCopyFeedbackTimer();
    const text = usernames.join(', ');
    try {
      await navigator.clipboard.writeText(text);
      setCopyState('copied');
      copyResetRef.current = setTimeout(() => {
        setCopyState('idle');
        copyResetRef.current = null;
      }, COPY_FEEDBACK_MS);
    } catch {
      setCopyState('failed');
      copyResetRef.current = setTimeout(() => {
        setCopyState('idle');
        copyResetRef.current = null;
      }, COPY_FEEDBACK_MS);
    }
  }, [usernames, clearCopyFeedbackTimer]);

  return (
    <div className={cn('flex flex-col', className)}>
      <motion.section
        className='flex flex-col'
        initial='hidden'
        animate='visible'
        variants={staggerContainerVariants(reducedMotion, 0.1)}>
        <motion.header
          className='relative mx-auto max-w-3xl px-3 pt-2 text-center sm:px-4 sm:pt-4'
          variants={fadeUpVariants(reducedMotion)}>
          <div
            aria-hidden
            className={cn(
              'pointer-events-none absolute inset-0 -z-10 mx-auto max-w-xl overflow-hidden rounded-3xl',
              'bg-[radial-gradient(ellipse_72%_56%_at_50%_-30%,rgba(234,179,8,0.16),transparent)]',
              'dark:bg-[radial-gradient(ellipse_72%_56%_at_50%_-30%,rgba(250,204,21,0.14),transparent)]',
            )}
          />
          <p
            className={cn(
              'mb-3 text-xs font-semibold uppercase tracking-[0.2em]',
              'text-amber-700 dark:text-amber-400 sm:text-sm',
            )}>
            Data utilities
          </p>
          <h1
            className={cn(
              'font-heading text-balance text-3xl font-semibold tracking-tight text-foreground',
              'sm:text-4xl lg:text-[2.25rem]',
            )}>
            Random username generator
          </h1>
          <p
            className={cn(
              'mx-auto mt-5 max-w-2xl px-1 text-pretty text-base leading-relaxed text-muted-foreground',
              'sm:mt-6 sm:px-0 sm:text-lg',
            )}>
            Produce{' '}
            <span className='font-medium text-foreground'>
              unique-style handles
            </span>{' '}
            for mock users, staging data, and UI tests. Results are sourced from
            randomuser.me and cached briefly on the server so repeated runs stay
            responsive until the pool expires.
          </p>
        </motion.header>

        <motion.div
          ref={panelRef}
          className='mt-10 min-w-0 w-full sm:mt-12 lg:mt-14'
          variants={fadeUpVariants(reducedMotion)}>
          <div className='mx-auto max-w-3xl space-y-8 sm:space-y-10'>
            <Card className='py-0 shadow-xs ring-1 ring-foreground/10'>
              <CardHeader className='space-y-2 border-b border-border/80 px-4 py-3 [.border-b]:pb-3'>
                <div className='flex items-start gap-3.5 sm:items-center'>
                  <span
                    className={cn(
                      'mt-0.5 inline-flex size-10 shrink-0 items-center justify-center rounded-xl',
                      'bg-primary/10 text-primary ring-1 ring-primary/15',
                    )}>
                    <Users className='size-5' aria-hidden />
                  </span>
                  <div className='min-w-0 space-y-1 text-left'>
                    <CardTitle className='text-base font-semibold leading-snug'>
                      Batch size
                    </CardTitle>
                    <CardDescription className='text-sm leading-relaxed'>
                      Pick how many usernames you need (max 1,000 per request).
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className='space-y-6 px-4 pb-6 pt-0'>
                <div className='flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between sm:gap-8'>
                  <UsernameLimitSelect
                    value={limit}
                    onValueChange={setLimit}
                    disabled={loading}
                  />
                  <div className='flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:justify-end'>
                    <Button
                      type='button'
                      onClick={generate}
                      disabled={loading}
                      className='inline-flex w-full gap-2 sm:w-auto sm:min-w-36'
                      size='lg'>
                      {loading ? (
                        <>
                          <Loader2
                            className='size-4 shrink-0 animate-spin'
                            aria-hidden
                          />
                          Generating…
                        </>
                      ) : (
                        <>
                          <UserPlus className='size-4 shrink-0' aria-hidden />
                          Generate
                        </>
                      )}
                    </Button>
                    <Button
                      type='button'
                      variant='outline'
                      onClick={reset}
                      disabled={loading}
                      className='inline-flex w-full gap-2 sm:w-auto sm:min-w-36'
                      size='lg'>
                      <RefreshCw className='size-4 shrink-0' aria-hidden />
                      Reset
                    </Button>
                  </div>
                </div>

                {error ? (
                  <p
                    className='rounded-lg border border-destructive/25 bg-destructive/5 px-4 py-3 text-sm leading-relaxed text-destructive'
                    role='alert'>
                    {error}
                  </p>
                ) : null}
              </CardContent>
            </Card>

            <div className='relative min-h-32 sm:min-h-30'>
              <AnimatePresence mode='wait'>
                {loading ? (
                  <motion.div
                    key='loading'
                    {...calculatorLoadingMotionProps(reducedMotion)}
                    className={cn(
                      calculatorLoadingMotionProps(reducedMotion).className,
                      'mx-auto flex w-full max-w-xl flex-col items-center justify-center rounded-2xl border border-dashed border-border bg-muted/25 px-6 py-12 sm:px-10 sm:py-14',
                    )}>
                    <Loader2
                      className='size-10 shrink-0 animate-spin text-primary'
                      aria-hidden
                    />
                    <p className='mt-4 text-center text-sm font-medium text-foreground'>
                      Fetching usernames…
                    </p>
                    <p className='mt-2 max-w-sm text-center text-xs leading-relaxed text-muted-foreground'>
                      First load after idle cache can take a few seconds.
                    </p>
                  </motion.div>
                ) : null}

                {!loading && usernames.length > 0 ? (
                  <motion.div
                    key='results'
                    {...calculatorSwapMotionProps(reducedMotion)}
                    className={cn(
                      calculatorSwapMotionProps(reducedMotion).className,
                      'mx-auto w-full max-w-none',
                    )}>
                    <GenerateRandomUsernamesResultCard
                      usernames={usernames}
                      copyState={copyState}
                      onCopy={copyCommaSeparated}
                    />
                  </motion.div>
                ) : null}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      </motion.section>
    </div>
  );
}
