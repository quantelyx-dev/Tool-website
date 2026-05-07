'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import {
  generateUuidV7,
  generateUuidV7Bulk,
  type GeneratedUuid,
} from '@/lib/generate-random-uuids/generate';
import { exportUuidV7ToCsv } from '@/lib/generate-random-uuids/export-csv';
import {
  fadeUpVariants,
  staggerContainerVariants,
} from '@/lib/motion-variants';
import {
  uuidFormSchema,
  UUID_BULK_COUNT_OPTIONS,
} from '@/lib/schemas/uuid-schema';
import { cn } from '@/lib/utils';
import { RandomUuidForm } from './random-uuid-form';

type GenerateRandomUuidsToolContentProps = {
  className?: string;
};

type GenerationMode = 'single' | 'bulk';
type BulkCount = (typeof UUID_BULK_COUNT_OPTIONS)[number];

const COPY_FEEDBACK_MS = 1500;

export function GenerateRandomUuidsToolContent({
  className,
}: GenerateRandomUuidsToolContentProps) {
  const reducedMotion = useReducedMotion();
  const panelRef = useRef<HTMLDivElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);
  const [mode, setMode] = useState<GenerationMode>('single');
  const [bulkCount, setBulkCount] = useState<BulkCount>('10');
  const [loading, setLoading] = useState(false);
  const [values, setValues] = useState<GeneratedUuid[]>([]);
  const [formError, setFormError] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copyState, setCopyState] = useState<'idle' | 'copied' | 'failed'>(
    'idle',
  );
  const copyResetRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const resultKey = useMemo(() => {
    if (values.length === 0) {
      return 'empty';
    }

    return `${mode}-${values[0]?.uuid ?? 'none'}-${values.length}`;
  }, [values, mode]);

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
    setMode('single');
    setBulkCount('10');
    setValues([]);
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

    const parsed = uuidFormSchema.safeParse({
      mode,
      bulkCount: mode === 'bulk' ? bulkCount : undefined,
    });

    if (!parsed.success) {
      const issue = parsed.error.issues[0];
      setFormError(issue?.message ?? 'Please complete all required fields.');
      return;
    }

    setLoading(true);
    setValues([]);

    try {
      await new Promise(resolve => setTimeout(resolve, 300));

      if (parsed.data.mode === 'single') {
        setValues([generateUuidV7()]);
      } else {
        const count = Number.parseInt(parsed.data.bulkCount ?? '10', 10);
        setValues(generateUuidV7Bulk(count));
      }

      requestAnimationFrame(() => {
        resultsRef.current?.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
      });
    } catch (err: unknown) {
      setError(
        err instanceof Error ? err.message : 'Failed to generate UUIDs.',
      );
    } finally {
      setLoading(false);
    }
  }, [mode, bulkCount, clearCopyFeedbackTimer]);

  const handleCopySingleJson = useCallback(() => {
    if (values.length !== 1) {
      return;
    }

    clearCopyFeedbackTimer();

    try {
      const text = JSON.stringify(values[0].uuid, null, 2);
      navigator.clipboard.writeText(text);
      setCopyState('copied');
    } catch {
      setCopyState('failed');
    }

    copyResetRef.current = setTimeout(() => {
      setCopyState('idle');
      copyResetRef.current = null;
    }, COPY_FEEDBACK_MS);
  }, [values, clearCopyFeedbackTimer]);

  const handleExportCsv = useCallback(() => {
    if (values.length === 0) {
      return;
    }

    exportUuidV7ToCsv(values);
  }, [values]);

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
              'bg-[radial-gradient(ellipse_72%_56%_at_50%_-30%,rgba(14,165,233,0.16),transparent)]',
              'dark:bg-[radial-gradient(ellipse_72%_56%_at_50%_-30%,rgba(56,189,248,0.15),transparent)]',
            )}
          />
          <p
            className={cn(
              'mb-3 text-xs font-semibold uppercase tracking-[0.2em]',
              'text-sky-700 dark:text-sky-400 sm:text-sm',
            )}>
            Data utilities
          </p>
          <h1
            className={cn(
              'font-heading text-balance text-3xl font-semibold tracking-tight text-foreground',
              'sm:text-4xl lg:text-[2.25rem]',
            )}>
            Random UUIDv7 generator
          </h1>
          <p
            className={cn(
              'mx-auto mt-5 max-w-2xl px-1 text-pretty text-base leading-relaxed text-muted-foreground',
              'sm:mt-6 sm:px-0 sm:text-lg',
            )}>
            Generate RFC-compatible UUIDv7 identifiers in single or bulk mode
            for fixtures and demos.
          </p>
        </motion.header>

        <RandomUuidForm
          reducedMotion={reducedMotion}
          panelRef={panelRef}
          resultsRef={resultsRef}
          mode={mode}
          bulkCount={bulkCount}
          loading={loading}
          values={values}
          formError={formError}
          error={error}
          copyState={copyState}
          resultKey={resultKey}
          bulkCountValues={[...UUID_BULK_COUNT_OPTIONS]}
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
