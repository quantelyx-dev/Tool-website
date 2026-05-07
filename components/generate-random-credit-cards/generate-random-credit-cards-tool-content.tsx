'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import type {
  GeneratedFakeCreditCard,
  SupportedCardIssuer,
} from '@/lib/generate-random-credit-cards/generate';
import {
  generateFakeCreditCard,
  generateFakeCreditCards,
} from '@/lib/generate-random-credit-cards/generate';
import {
  fadeUpVariants,
  staggerContainerVariants,
} from '@/lib/motion-variants';
import { cn } from '@/lib/utils';
import {
  creditCardformSchema,
  ISSUER_OPTIONS,
} from '@/lib/schemas/credit-cards-schema';
import { RandomCreditCardForm } from './random-credit-card-form';
import { exportCreditCardsToCsv } from '@/lib/generate-random-credit-cards/export-csv';

type GenerateRandomCreditCardsToolContentProps = {
  className?: string;
};

type GenerationMode = 'single' | 'bulk';
type BulkCount = '10' | '50' | '100' | '200';

const bulkCountValues: BulkCount[] = ['10', '50', '100', '200'];
const COPY_FEEDBACK_MS = 1500;

export function GenerateRandomCreditCardsToolContent({
  className,
}: GenerateRandomCreditCardsToolContentProps) {
  const reducedMotion = useReducedMotion();
  const panelRef = useRef<HTMLDivElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);
  const [issuer, setIssuer] = useState<SupportedCardIssuer>('Visa');
  const [mode, setMode] = useState<GenerationMode>('single');
  const [bulkCount, setBulkCount] = useState<BulkCount>('10');
  const [loading, setLoading] = useState(false);
  const [cards, setCards] = useState<GeneratedFakeCreditCard[]>([]);
  const [formError, setFormError] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copyState, setCopyState] = useState<'idle' | 'copied' | 'failed'>(
    'idle',
  );
  const copyResetRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const resultKey = useMemo(() => {
    if (cards.length === 0) {
      return 'empty';
    }
    return `${mode}-${cards[0]?.number ?? 'none'}-${cards.length}`;
  }, [cards, mode]);

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
    setIssuer('Visa');
    setMode('single');
    setBulkCount('10');
    setCards([]);
    setFormError(null);
    setError(null);
    clearCopyFeedbackTimer();
    setCopyState('idle');
    setLoading(false);
    requestAnimationFrame(() => {
      panelRef.current?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    });
  }, [clearCopyFeedbackTimer]);

  const handleGenerate = useCallback(async () => {
    setFormError(null);
    setError(null);
    clearCopyFeedbackTimer();
    setCopyState('idle');

    const parsed = creditCardformSchema.safeParse({ issuer });
    if (!parsed.success) {
      const issue = parsed.error.issues[0];
      setFormError(issue?.message ?? 'Please select a valid issuer.');
      return;
    }

    setLoading(true);
    setCards([]);

    try {
      await new Promise(resolve => setTimeout(resolve, 350));

      if (mode === 'single') {
        const generated = generateFakeCreditCard(parsed.data.issuer);
        setCards([generated]);
      } else {
        const count = Number.parseInt(bulkCount, 10);
        const generated = generateFakeCreditCards(count, parsed.data.issuer);
        setCards(generated);
      }

      requestAnimationFrame(() => {
        resultsRef.current?.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
      });
    } catch (err: unknown) {
      setError(
        err instanceof Error ? err.message : 'Failed to generate credit cards.',
      );
    } finally {
      setLoading(false);
    }
  }, [issuer, mode, bulkCount, clearCopyFeedbackTimer]);

  const handleCopySingleJson = useCallback(() => {
    if (cards.length !== 1) {
      return;
    }
    clearCopyFeedbackTimer();
    const text = JSON.stringify(cards[0], null, 2);
    try {
      navigator.clipboard.writeText(text);
      setCopyState('copied');
    } catch {
      setCopyState('failed');
    }
    copyResetRef.current = setTimeout(() => {
      setCopyState('idle');
      copyResetRef.current = null;
    }, COPY_FEEDBACK_MS);
  }, [cards, clearCopyFeedbackTimer]);

  const handleExportCsv = useCallback(() => {
    if (cards.length === 0) {
      return;
    }
    exportCreditCardsToCsv(cards);
  }, [cards]);

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
              'bg-[radial-gradient(ellipse_72%_56%_at_50%_-30%,rgba(59,130,246,0.16),transparent)]',
              'dark:bg-[radial-gradient(ellipse_72%_56%_at_50%_-30%,rgba(96,165,250,0.15),transparent)]',
            )}
          />
          <p
            className={cn(
              'mb-3 text-xs font-semibold uppercase tracking-[0.2em]',
              'text-blue-700 dark:text-blue-400 sm:text-sm',
            )}>
            Data utilities
          </p>
          <h1
            className={cn(
              'font-heading text-balance text-3xl font-semibold tracking-tight text-foreground',
              'sm:text-4xl lg:text-[2.25rem]',
            )}>
            Random credit card generator
          </h1>
          <p
            className={cn(
              'mx-auto mt-5 max-w-2xl px-1 text-pretty text-base leading-relaxed text-muted-foreground',
              'sm:mt-6 sm:px-0 sm:text-lg',
            )}>
            Generate fake card details by issuer in single or bulk mode.
          </p>
        </motion.header>

        <RandomCreditCardForm
          reducedMotion={reducedMotion}
          panelRef={panelRef}
          resultsRef={resultsRef}
          issuer={issuer}
          mode={mode}
          bulkCount={bulkCount}
          loading={loading}
          cards={cards}
          formError={formError}
          error={error}
          copyState={copyState}
          resultKey={resultKey}
          issuerOptions={ISSUER_OPTIONS}
          bulkCountValues={bulkCountValues}
          onIssuerChange={value => {
            setIssuer(value);
            setFormError(null);
          }}
          onModeChange={setMode}
          onBulkCountChange={setBulkCount}
          onGenerate={handleGenerate}
          onReset={reset}
          onCopySingleJson={handleCopySingleJson}
          onExportCsv={handleExportCsv}
        />
      </motion.section>
    </div>
  );
}
