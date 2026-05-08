'use client';
import { motion, useReducedMotion } from 'framer-motion';
import { useCallback, useEffect, useRef, useState } from 'react';
import {
  generatePassword,
  generatePasswords,
  type GeneratedPassword,
} from '@/lib/generate-random-passwords/generate';
import { exportPasswordsToCsv } from '@/lib/generate-random-passwords/export-csv';
import {
  fadeUpVariants,
  staggerContainerVariants,
} from '@/lib/motion-variants';
import {
  passwordFormSchema,
  PASSWORD_BULK_COUNT_OPTIONS,
} from '@/lib/schemas/password-schema';
import { cn } from '@/lib/utils';
import { RandomPasswordForm } from './random-password-form';
type GenerateRandomPasswordsToolContentProps = {
  className?: string;
};
type GenerationMode = 'single' | 'bulk';
type BulkCount = (typeof PASSWORD_BULK_COUNT_OPTIONS)[number];
const COPY_FEEDBACK_MS = 1500;
export function GenerateRandomPasswordsToolContent({
  className,
}: GenerateRandomPasswordsToolContentProps) {
  const reducedMotion = useReducedMotion();
  const panelRef = useRef<HTMLDivElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);
  const [mode, setMode] = useState<GenerationMode>('single');
  const [bulkCount, setBulkCount] = useState<BulkCount>('10');
  const [length, setLength] = useState(16);
  const [includeUppercase, setIncludeUppercase] = useState(true);
  const [includeLowercase, setIncludeLowercase] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(true);
  const [loading, setLoading] = useState(false);
  const [values, setValues] = useState<GeneratedPassword[]>([]);
  const [formError, setFormError] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copyState, setCopyState] = useState<'idle' | 'copied' | 'failed'>('idle');
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
    setMode('single');
    setBulkCount('10');
    setLength(16);
    setIncludeUppercase(true);
    setIncludeLowercase(true);
    setIncludeNumbers(true);
    setIncludeSymbols(true);
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
    const parsed = passwordFormSchema.safeParse({
      mode,
      bulkCount: mode === 'bulk' ? bulkCount : undefined,
      length,
      includeUppercase,
      includeLowercase,
      includeNumbers,
      includeSymbols,
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
        setValues([
          generatePassword({
            length: parsed.data.length,
            includeUppercase: parsed.data.includeUppercase,
            includeLowercase: parsed.data.includeLowercase,
            includeNumbers: parsed.data.includeNumbers,
            includeSymbols: parsed.data.includeSymbols,
          }),
        ]);
      } else {
        const count = Number.parseInt(parsed.data.bulkCount ?? '10', 10);
        setValues(
          generatePasswords(count, {
            length: parsed.data.length,
            includeUppercase: parsed.data.includeUppercase,
            includeLowercase: parsed.data.includeLowercase,
            includeNumbers: parsed.data.includeNumbers,
            includeSymbols: parsed.data.includeSymbols,
          }),
        );
      }
      requestAnimationFrame(() => {
        resultsRef.current?.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
      });
    } catch (err: unknown) {
      setError(
        err instanceof Error ? err.message : 'Failed to generate passwords.',
      );
    } finally {
      setLoading(false);
    }
  }, [
    mode,
    bulkCount,
    length,
    includeUppercase,
    includeLowercase,
    includeNumbers,
    includeSymbols,
    clearCopyFeedbackTimer,
  ]);
  const handleCopySinglePassword = useCallback(() => {
    if (values.length !== 1) {
      return;
    }
    clearCopyFeedbackTimer();
    try {
      navigator.clipboard.writeText(values[0]?.password ?? '');
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
    exportPasswordsToCsv(values);
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
              'bg-[radial-gradient(ellipse_72%_56%_at_50%_-30%,rgba(217,119,6,0.16),transparent)]',
              'dark:bg-[radial-gradient(ellipse_72%_56%_at_50%_-30%,rgba(251,191,36,0.15),transparent)]',
            )}
          />
          <p
            className={cn(
              'mb-3 text-xs font-semibold uppercase tracking-[0.2em]',
              'text-amber-700 dark:text-amber-400 sm:text-sm',
            )}>
            Security utilities
          </p>
          <h1
            className={cn(
              'font-heading text-balance text-3xl font-semibold tracking-tight text-foreground',
              'sm:text-4xl lg:text-[2.25rem]',
            )}>
            Random password generator
          </h1>
          <p
            className={cn(
              'mx-auto mt-5 max-w-2xl px-1 text-pretty text-base leading-relaxed text-muted-foreground',
              'sm:mt-6 sm:px-0 sm:text-lg',
            )}>
            Generate random passwords with configurable length and character
            sets, then estimate strength with zxcvbn.
          </p>
        </motion.header>
        <RandomPasswordForm
          reducedMotion={reducedMotion}
          panelRef={panelRef}
          resultsRef={resultsRef}
          mode={mode}
          bulkCount={bulkCount}
          length={length}
          includeUppercase={includeUppercase}
          includeLowercase={includeLowercase}
          includeNumbers={includeNumbers}
          includeSymbols={includeSymbols}
          loading={loading}
          values={values}
          formError={formError}
          error={error}
          copyState={copyState}
          bulkCountValues={[...PASSWORD_BULK_COUNT_OPTIONS]}
          onModeChange={setMode}
          onBulkCountChange={setBulkCount}
          onLengthChange={setLength}
          onIncludeUppercaseChange={setIncludeUppercase}
          onIncludeLowercaseChange={setIncludeLowercase}
          onIncludeNumbersChange={setIncludeNumbers}
          onIncludeSymbolsChange={setIncludeSymbols}
          onGenerate={handleGenerate}
          onReset={reset}
          onCopySinglePassword={handleCopySinglePassword}
          onExportCsv={handleExportCsv}
        />
      </motion.section>
    </div>
  );
}
