'use client';

import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { Loader2, Phone, RefreshCw, WandSparkles } from 'lucide-react';
import type { CountryCode } from 'libphonenumber-js';
import { useCallback, useEffect, useRef, useState } from 'react';

import {
  PHONE_COUNTRY_DEFAULT,
  PhoneCountrySelect,
} from '@/components/generate-random-phone-numbers/phone-country-select';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  fadeUpVariants,
  staggerContainerVariants,
} from '@/lib/motion-variants';
import { cn } from '@/lib/utils';
import { generateRandomPhoneNumber } from '@/lib/generate-random-phone-numbers/generate';
import {
  type CopyField,
  GeneratedPhoneResultCard,
} from './generate-random-phone-result';

type GenerateRandomPhoneNumbersToolContentProps = {
  className?: string;
};

export function GenerateRandomPhoneNumbersToolContent({
  className,
}: GenerateRandomPhoneNumbersToolContentProps) {
  const reducedMotion = useReducedMotion();
  const panelRef = useRef<HTMLDivElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);
  const copyResetTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(
    null,
  );
  const [country, setCountry] = useState<CountryCode>(PHONE_COUNTRY_DEFAULT);
  const [loading, setLoading] = useState(false);
  const [generated, setGenerated] = useState<ReturnType<
    typeof generateRandomPhoneNumber
  > | null>(null);
  const [copiedField, setCopiedField] = useState<CopyField | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    return () => {
      if (copyResetTimeoutRef.current) {
        clearTimeout(copyResetTimeoutRef.current);
      }
    };
  }, []);

  const reset = useCallback(() => {
    setCountry(PHONE_COUNTRY_DEFAULT);
    setLoading(false);
    setGenerated(null);
    setCopiedField(null);
    setError(null);
    requestAnimationFrame(() => {
      panelRef.current?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    });
  }, []);

  const generatePlaceholder = useCallback(async () => {
    setLoading(true);
    setGenerated(null);
    setCopiedField(null);
    setError(null);

    try {
      const result = generateRandomPhoneNumber(country);
      await new Promise(resolve => setTimeout(resolve, 420));
      setGenerated(result);
      setLoading(false);

      requestAnimationFrame(() => {
        resultsRef.current?.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
      });
    } catch (err: unknown) {
      console.error('Phone generation error:', err);
      setError(
        err instanceof Error ? err.message : 'Failed to generate phone number',
      );
      setLoading(false);
    }
  }, [country]);

  const handleCopy = useCallback((field: CopyField, value: string) => {
    try {
      navigator.clipboard.writeText(value);
      setCopiedField(field);
      if (copyResetTimeoutRef.current) {
        clearTimeout(copyResetTimeoutRef.current);
      }
      copyResetTimeoutRef.current = setTimeout(() => {
        setCopiedField(null);
      }, 1400);
    } catch {
      // ignore
    }
  }, []);

  return (
    <div className={cn('flex flex-col', className)}>
      <motion.section
        className={cn('flex flex-col')}
        initial='hidden'
        animate='visible'
        variants={staggerContainerVariants(reducedMotion, 0.1)}>
        <motion.header
          className={cn(
            'relative mx-auto max-w-3xl px-3 pt-2 text-center sm:px-4 sm:pt-4',
          )}
          variants={fadeUpVariants(reducedMotion)}>
          <div
            aria-hidden
            className={cn(
              'pointer-events-none absolute inset-0 -z-10 mx-auto max-w-xl overflow-hidden rounded-3xl',
              'bg-[radial-gradient(ellipse_72%_56%_at_50%_-30%,rgba(34,197,94,0.12),transparent)]',
              'dark:bg-[radial-gradient(ellipse_72%_56%_at_50%_-30%,rgba(74,222,128,0.12),transparent)]',
            )}
          />
          <p
            className={cn(
              'mb-3 text-xs font-semibold uppercase tracking-[0.2em]',
              'text-emerald-700 dark:text-emerald-400 sm:text-sm',
            )}>
            Data utilities
          </p>
          <h1
            className={cn(
              'font-heading text-balance text-3xl font-semibold tracking-tight text-foreground',
              'sm:text-4xl lg:text-[2.25rem]',
            )}>
            Random phone number generator
          </h1>
          <p
            className={cn(
              'mx-auto mt-5 max-w-2xl px-1 text-pretty text-base leading-relaxed text-muted-foreground',
              'sm:mt-6 sm:px-0 sm:text-lg',
            )}>
            Select a country first, then generate random phone numbers formatted
            for that region. This first phase sets up the UI and controls before
            generation logic is connected.
          </p>
        </motion.header>

        <motion.div
          ref={panelRef}
          className={cn('mt-10 min-w-0 w-full sm:mt-12 lg:mt-14')}
          variants={fadeUpVariants(reducedMotion)}>
          <div className={cn('mx-auto max-w-3xl space-y-8 sm:space-y-10')}>
            <Card className={cn('py-0 shadow-xs ring-1 ring-foreground/10')}>
              <CardHeader
                className={cn(
                  'space-y-2 border-b border-border/80 px-4 py-3 [.border-b]:pb-3',
                )}>
                <div className={cn('flex items-start gap-3.5 sm:items-center')}>
                  <span
                    className={cn(
                      'mt-0.5 inline-flex size-10 shrink-0 items-center justify-center rounded-xl',
                      'bg-emerald-500/10 text-emerald-700 ring-1 ring-emerald-500/15 dark:text-emerald-300',
                    )}>
                    <Phone className={cn('size-5')} aria-hidden />
                  </span>
                  <div className={cn('min-w-0 space-y-1 text-left')}>
                    <CardTitle
                      className={cn('text-base font-semibold leading-snug')}>
                      Phone number generator
                    </CardTitle>
                    <CardDescription className={cn('text-sm leading-relaxed')}>
                      Choose the target country. Number count and formats will
                      be added in the next step.
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className={cn('space-y-6 px-4 pb-6 pt-0')}>
                <div
                  className={cn(
                    'flex flex-col gap-6 xl:flex-row xl:items-end xl:justify-between xl:gap-8',
                  )}>
                  <div
                    className={cn(
                      'flex min-w-0 flex-1 flex-col gap-4 sm:gap-6',
                    )}>
                    <PhoneCountrySelect
                      value={country}
                      onValueChange={setCountry}
                      disabled={loading}
                    />
                  </div>
                  <div
                    className={cn(
                      'flex flex-col gap-3 sm:flex-row sm:flex-wrap xl:shrink-0',
                    )}>
                    <Button
                      type='button'
                      onClick={generatePlaceholder}
                      disabled={loading}
                      className={cn(
                        'inline-flex w-full gap-2 sm:w-auto sm:min-w-36',
                      )}
                      size='lg'>
                      {loading ? (
                        <>
                          <Loader2
                            className={cn('size-4 shrink-0 animate-spin')}
                            aria-hidden
                          />
                          Generating...
                        </>
                      ) : (
                        <>
                          <WandSparkles
                            className={cn('size-4 shrink-0')}
                            aria-hidden
                          />
                          Generate
                        </>
                      )}
                    </Button>
                    <Button
                      type='button'
                      variant='outline'
                      onClick={reset}
                      disabled={loading}
                      className={cn(
                        'inline-flex w-full gap-2 sm:w-auto sm:min-w-36',
                      )}
                      size='lg'>
                      <RefreshCw
                        className={cn('size-4 shrink-0')}
                        aria-hidden
                      />
                      Reset
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
            {/* Results / Preview */}
            <motion.div
              ref={resultsRef}
              variants={fadeUpVariants(reducedMotion)}
              className={cn('mx-auto max-w-3xl')}>
              <AnimatePresence initial={false}>
                {generated ? (
                  <GeneratedPhoneResultCard
                    key={generated.e164}
                    generated={generated}
                    reducedMotion={reducedMotion}
                    copiedField={copiedField}
                    onCopy={handleCopy}
                  />
                ) : null}
              </AnimatePresence>
              {error ? (
                <p className={cn('mt-3 text-sm text-destructive')}>{error}</p>
              ) : null}
            </motion.div>
          </div>
        </motion.div>
      </motion.section>
    </div>
  );
}
