'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { useCallback, useEffect, useRef, useState } from 'react';

import {
  generateRandomIp,
  generateRandomIpBulk,
  type GeneratedIp,
  type IpVersion,
} from '@/lib/generate-random-ip-addresses/generate';
import { exportRandomIpsToCsv } from '@/lib/generate-random-ip-addresses/export-csv';
import {
  fadeUpVariants,
  staggerContainerVariants,
} from '@/lib/motion-variants';
import {
  ipGeneratorFormSchema,
  IP_BULK_COUNT_OPTIONS,
} from '@/lib/schemas/ip-generator-schema';
import { cn } from '@/lib/utils';
import type {
  CopyState,
  GenerationMode,
  StandardBulkCount,
} from '@/components/generate-random/shared/generator-types';
import { useAnalytics } from '@/hooks/use-analytics';
import { RandomIpAddressForm } from './random-ip-address-form';

type GenerateRandomIpAddressesToolContentProps = {
  className?: string;
};

const COPY_FEEDBACK_MS = 1500;

export function GenerateRandomIpAddressesToolContent({
  className,
}: GenerateRandomIpAddressesToolContentProps) {
  const reducedMotion = useReducedMotion();
  const { onUse, onResult, onCopy, onDownload, onReset } =
    useAnalytics('random-ip-addresses');
  const panelRef = useRef<HTMLDivElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);
  const [version, setVersion] = useState<IpVersion>('v4');
  const [mode, setMode] = useState<GenerationMode>('single');
  const [bulkCount, setBulkCount] = useState<StandardBulkCount>('10');
  const [loading, setLoading] = useState(false);
  const [values, setValues] = useState<GeneratedIp[]>([]);
  const [formError, setFormError] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copyState, setCopyState] = useState<CopyState>('idle');
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
    onReset();
    setVersion('v4');
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
  }, [clearCopyFeedbackTimer, onReset]);

  const handleGenerate = useCallback(async () => {
    onUse({ mode, version });
    setFormError(null);
    setError(null);
    clearCopyFeedbackTimer();
    setCopyState('idle');

    const parsed = ipGeneratorFormSchema.safeParse({
      version,
      mode,
      bulkCount: mode === 'bulk' ? bulkCount : undefined,
    });

    if (!parsed.success) {
      const issue = parsed.error.issues[0];
      setFormError(issue?.message ?? 'Please complete all required fields.');
      return;
    }

    setLoading(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 300));

      if (parsed.data.mode === 'single') {
        setValues([generateRandomIp(parsed.data.version)]);
      } else {
        const count = Number.parseInt(parsed.data.bulkCount ?? '10', 10);
        setValues(generateRandomIpBulk(count, parsed.data.version));
      }
      onResult({
        mode,
        version,
        count:
          parsed.data.mode === 'single'
            ? 1
            : Number.parseInt(parsed.data.bulkCount ?? '10', 10),
      });

      requestAnimationFrame(() => {
        resultsRef.current?.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
      });
    } catch (err: unknown) {
      setError(
        err instanceof Error ? err.message : 'Failed to generate IP addresses.',
      );
    } finally {
      setLoading(false);
    }
  }, [mode, version, bulkCount, clearCopyFeedbackTimer, onUse, onResult]);

  const handleCopySingleValue = useCallback(() => {
    if (values.length !== 1) {
      return;
    }

    onCopy('text');
    clearCopyFeedbackTimer();

    try {
      navigator.clipboard.writeText(values[0].ip);
      setCopyState('copied');
    } catch {
      setCopyState('failed');
    }

    copyResetRef.current = setTimeout(() => {
      setCopyState('idle');
      copyResetRef.current = null;
    }, COPY_FEEDBACK_MS);
  }, [values, clearCopyFeedbackTimer, onCopy]);

  const handleExportCsv = useCallback(() => {
    if (values.length === 0) {
      return;
    }

    onDownload('csv');
    exportRandomIpsToCsv(values);
  }, [values, onDownload]);

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
            Random IP address generator
          </h1>
          <p
            className={cn(
              'mx-auto mt-5 max-w-2xl px-1 text-pretty text-base leading-relaxed text-muted-foreground',
              'sm:mt-6 sm:px-0 sm:text-lg',
            )}>
            Generate fictional IPv4 or IPv6 addresses in single or bulk mode
            for fixtures and demos.
          </p>
        </motion.header>

        <RandomIpAddressForm
          reducedMotion={reducedMotion}
          panelRef={panelRef}
          resultsRef={resultsRef}
          version={version}
          mode={mode}
          bulkCount={bulkCount}
          loading={loading}
          values={values}
          formError={formError}
          error={error}
          copyState={copyState}
          bulkCountValues={[...IP_BULK_COUNT_OPTIONS]}
          onVersionChange={setVersion}
          onModeChange={setMode}
          onBulkCountChange={setBulkCount}
          onGenerate={handleGenerate}
          onReset={reset}
          onCopySingleValue={handleCopySingleValue}
          onExportCsv={handleExportCsv}
        />
      </motion.section>
    </div>
  );
}
