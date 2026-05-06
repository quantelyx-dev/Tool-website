'use client';

import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { Loader2, RefreshCw, UserRound, UserRoundPlus } from 'lucide-react';
import { useCallback, useEffect, useRef, useState } from 'react';

import {
  GenerateRandomNamesResultCard,
  type RandomNamesCopyState,
} from '@/components/generate-random-names/generate-random-names-result-card';
import {
  NAME_DEFAULT_LIMIT,
  NameLimitSelect,
} from '@/components/generate-random-names/name-limit-select';
import {
  NAME_TYPE_DEFAULT,
  NameTypeSelect,
} from '@/components/generate-random-names/name-type-select';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import type {
  GenerateRandomNamesErrorBody,
  GenerateRandomNamesSuccessBody,
  RandomNameType,
} from '@/lib/generate-random-names/api-response';
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

type GenerateRandomNamesToolContentProps = {
  className?: string;
};

export function GenerateRandomNamesToolContent({
  className,
}: GenerateRandomNamesToolContentProps) {
  const reducedMotion = useReducedMotion();
  const panelRef = useRef<HTMLDivElement>(null);
  const [limit, setLimit] = useState<string>(NAME_DEFAULT_LIMIT);
  const [nameType, setNameType] = useState<RandomNameType>(NAME_TYPE_DEFAULT);
  const [names, setNames] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [resultNameType, setResultNameType] =
    useState<RandomNameType>(NAME_TYPE_DEFAULT);
  const [copyState, setCopyState] = useState<RandomNamesCopyState>('idle');
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
    setNames([]);
    setError(null);
    setLimit(NAME_DEFAULT_LIMIT);
    setNameType(NAME_TYPE_DEFAULT);
    setResultNameType(NAME_TYPE_DEFAULT);
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
    setNames([]);

    try {
      const qs = new URLSearchParams({
        limit: String(n),
        type: nameType,
      });
      const res = await fetch(`/api/generate-random-names?${qs.toString()}`, {
        method: 'GET',
        cache: 'no-store',
      });
      const body: unknown = await res.json().catch(() => null);

      if (!res.ok || !body || typeof body !== 'object') {
        const msg =
          body &&
          typeof body === 'object' &&
          'error' in body &&
          typeof (body as GenerateRandomNamesErrorBody).error === 'string'
            ? (body as GenerateRandomNamesErrorBody).error
            : `Request failed (${res.status}).`;
        setError(msg);
        return;
      }

      const data = body as
        | GenerateRandomNamesSuccessBody
        | GenerateRandomNamesErrorBody;
      if (!('ok' in data) || data.ok !== true || !Array.isArray(data.names)) {
        const msg =
          typeof (data as GenerateRandomNamesErrorBody).error === 'string'
            ? (data as GenerateRandomNamesErrorBody).error
            : 'Unexpected response from the server.';
        setError(msg);
        return;
      }

      setNames(data.names);
      setResultNameType(data.nameType);
    } catch {
      setError('Something went wrong. Check your connection and try again.');
    } finally {
      setLoading(false);
    }
  }, [limit, nameType, clearCopyFeedbackTimer]);

  const copyCommaSeparated = useCallback(async () => {
    if (names.length === 0) return;
    clearCopyFeedbackTimer();
    const text = names.join(', ');
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
  }, [names, clearCopyFeedbackTimer]);

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
              'bg-[radial-gradient(ellipse_72%_56%_at_50%_-30%,rgba(244,63,94,0.12),transparent)]',
              'dark:bg-[radial-gradient(ellipse_72%_56%_at_50%_-30%,rgba(251,113,133,0.12),transparent)]',
            )}
          />
          <p
            className={cn(
              'mb-3 text-xs font-semibold uppercase tracking-[0.2em]',
              'text-rose-700 dark:text-rose-400 sm:text-sm',
            )}>
            Data utilities
          </p>
          <h1
            className={cn(
              'font-heading text-balance text-3xl font-semibold tracking-tight text-foreground',
              'sm:text-4xl lg:text-[2.25rem]',
            )}>
            Random name generator
          </h1>
          <p
            className={cn(
              'mx-auto mt-5 max-w-2xl px-1 text-pretty text-base leading-relaxed text-muted-foreground',
              'sm:mt-6 sm:px-0 sm:text-lg',
            )}>
            Produce{' '}
            <span className='font-medium text-foreground'>
              first names, last names, or full names
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
                      'bg-rose-500/10 text-rose-700 ring-1 ring-rose-500/15 dark:text-rose-300',
                    )}>
                    <UserRound className='size-5' aria-hidden />
                  </span>
                  <div className='min-w-0 space-y-1 text-left'>
                    <CardTitle className='text-base font-semibold leading-snug'>
                      Options
                    </CardTitle>
                    <CardDescription className='text-sm leading-relaxed'>
                      Choose name format and how many to return (max 1,000 per
                      request).
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className='space-y-6 px-4 pb-6 pt-0'>
                <div className='flex flex-col gap-6 xl:flex-row xl:items-end xl:justify-between xl:gap-8'>
                  <div className='flex min-w-0 flex-1 flex-col gap-4 sm:flex-row sm:gap-6'>
                    <NameTypeSelect
                      value={nameType}
                      onValueChange={setNameType}
                      disabled={loading}
                    />
                    <NameLimitSelect
                      value={limit}
                      onValueChange={setLimit}
                      disabled={loading}
                    />
                  </div>
                  <div className='flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:justify-end xl:shrink-0'>
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
                          <UserRoundPlus className='size-4 shrink-0' aria-hidden />
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
                      className='size-10 shrink-0 animate-spin text-rose-600 dark:text-rose-400'
                      aria-hidden
                    />
                    <p className='mt-4 text-center text-sm font-medium text-foreground'>
                      Fetching names…
                    </p>
                    <p className='mt-2 max-w-sm text-center text-xs leading-relaxed text-muted-foreground'>
                      First load after idle cache can take a few seconds.
                    </p>
                  </motion.div>
                ) : null}

                {!loading && names.length > 0 ? (
                  <motion.div
                    key='results'
                    {...calculatorSwapMotionProps(reducedMotion)}
                    className={cn(
                      calculatorSwapMotionProps(reducedMotion).className,
                      'mx-auto w-full max-w-none',
                    )}>
                    <GenerateRandomNamesResultCard
                      names={names}
                      nameType={resultNameType}
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
