'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { toast } from 'sonner';

import { DailyCompoundCalculatorFields } from '@/components/daily-compound-interest/daily-compound-calculator-fields';
import { DailyCompoundExportCard } from '@/components/daily-compound-interest/daily-compound-export-card';
import { DailyCompoundGrowthChart } from '@/components/daily-compound-interest/daily-compound-growth-chart';
import { DailyCompoundResultsCard } from '@/components/daily-compound-interest/daily-compound-results-card';
import {
  submitDailyCompoundCalculation,
  type DailyCompoundCalculationFailureBody,
  type DailyCompoundSavedRun,
} from '@/lib/daily-compound-interest/api';
import { growthChartMotionProps } from '@/lib/daily-compound-interest/calculator-motion';
import { DAILY_COMPOUND_EMPTY_VALUES } from '@/lib/daily-compound-interest/form-defaults';
import {
  exchangeRateQuoteForTarget,
  useExchangeRatesSnippet,
} from '@/lib/daily-compound-interest/use-exchange-rates-snippet';
import { ApiError } from '@/lib/http';
import {
  dailyCompoundCalculatorFormSchema,
  type DailyCompoundFormValues,
} from '@/lib/schemas/daily-compound-schema';
import { cn } from '@/lib/utils';

type DailyCompoundCalculatorFormProps = {
  className?: string;
};

const FORM_FIELD_KEYS = [
  'principal',
  'currency',
  'annualRatePercent',
  'rateBasis',
  'timelineYears',
  'timelineMonths',
  'timelineExtraDays',
  'contributionAmount',
  'contributionFrequency',
  'reinvestInterest',
] as const satisfies readonly (keyof DailyCompoundFormValues)[];

const PRINCIPAL_FOCUS_AFTER_SCROLL_MS = 420;

export function DailyCompoundCalculatorForm({
  className,
}: DailyCompoundCalculatorFormProps) {
  const reducedMotion = useReducedMotion();
  const abortRef = useRef<AbortController | null>(null);
  const principalAnchorRef = useRef<HTMLDivElement>(null);
  const scrollPrincipalAfterGrowthExitRef = useRef(false);
  const scrollPrincipalTokenRef = useRef(0);

  const [savedRun, setSavedRun] = useState<DailyCompoundSavedRun | null>(null);

  const form = useForm<DailyCompoundFormValues>({
    resolver: zodResolver(dailyCompoundCalculatorFormSchema),
    defaultValues: DAILY_COMPOUND_EMPTY_VALUES,
    mode: 'onBlur',
  });

  const isSubmitting = form.formState.isSubmitting;

  const currency = useWatch({ control: form.control, name: 'currency' });
  const fxSnapshot = useExchangeRatesSnippet();
  const fxRow = useMemo(
    () => exchangeRateQuoteForTarget(fxSnapshot, currency),
    [currency, fxSnapshot],
  );

  useEffect(() => {
    return () => abortRef.current?.abort();
  }, []);

  const scrollPrincipalSmooth = useCallback(() => {
    const token = ++scrollPrincipalTokenRef.current;
    const anchor = principalAnchorRef.current;

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        if (scrollPrincipalTokenRef.current !== token) return;
        anchor?.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });

        window.setTimeout(() => {
          if (scrollPrincipalTokenRef.current !== token) return;
          const input = anchor?.querySelector<HTMLInputElement>(
            'input[inputmode="decimal"]',
          );
          input?.focus({ preventScroll: true });
        }, PRINCIPAL_FOCUS_AFTER_SCROLL_MS);
      });
    });
  }, []);

  const handleGrowthChartExitComplete = useCallback(() => {
    if (!scrollPrincipalAfterGrowthExitRef.current) return;
    scrollPrincipalAfterGrowthExitRef.current = false;
    scrollPrincipalSmooth();
  }, [scrollPrincipalSmooth]);

  const handleReset = useCallback(() => {
    abortRef.current?.abort();
    abortRef.current = null;

    const hadGrowthChart = savedRun !== null;
    scrollPrincipalAfterGrowthExitRef.current = hadGrowthChart;

    ++scrollPrincipalTokenRef.current;

    setSavedRun(null);
    form.reset(DAILY_COMPOUND_EMPTY_VALUES);
    form.clearErrors();

    if (!hadGrowthChart) {
      scrollPrincipalAfterGrowthExitRef.current = false;
      scrollPrincipalSmooth();
    }
  }, [form, savedRun, scrollPrincipalSmooth]);

  const handleCalculate = useCallback(
    async (values: DailyCompoundFormValues) => {
      abortRef.current?.abort();
      const controller = new AbortController();
      abortRef.current = controller;

      form.clearErrors();

      try {
        const result = await submitDailyCompoundCalculation(values, {
          signal: controller.signal,
        });
        setSavedRun({ inputs: values, result });
        toast.success('Projection ready', {
          description: `${result.projection.simulationDays.toLocaleString()} simulated days.`,
        });
      } catch (err) {
        const aborted =
          (err instanceof DOMException || err instanceof Error) &&
          err.name === 'AbortError';
        if (aborted) return;

        if (err instanceof ApiError) {
          const body = err.body as DailyCompoundCalculationFailureBody | null;
          let mappedField = false;

          if (body?.fieldErrors) {
            for (const key of FORM_FIELD_KEYS) {
              const msgs = body.fieldErrors[key];
              if (msgs?.[0]) {
                form.setError(key, { message: msgs[0] });
                mappedField = true;
              }
            }
          }

          toast.error(body?.error ?? 'Could not run projection.', {
            description: mappedField
              ? 'Please review the highlighted fields.'
              : undefined,
          });
          return;
        }

        toast.error('Something went wrong', {
          description: 'Try again in a moment.',
        });
      }
    },
    [form],
  );

  const growthMotion = growthChartMotionProps(reducedMotion);

  return (
    <div className={cn('flex w-full flex-col gap-8', className)}>
      <div className='flex w-full flex-col gap-8 lg:flex-row lg:items-start lg:gap-10'>
        <DailyCompoundCalculatorFields
          principalAnchorRef={principalAnchorRef}
          form={form}
          isSubmitting={isSubmitting}
          onSubmit={handleCalculate}
          onReset={handleReset}
          fxSnippet={fxRow}
        />

        <aside className='w-full shrink-0 space-y-6 lg:sticky lg:top-24 lg:max-w-[22rem]'>
          <DailyCompoundResultsCard
            isSubmitting={isSubmitting}
            currency={savedRun?.result.currency}
            projection={savedRun?.result.projection ?? null}
          />
          <DailyCompoundExportCard savedRun={savedRun} />
        </aside>
      </div>

      <AnimatePresence mode='wait' onExitComplete={handleGrowthChartExitComplete}>
        {savedRun ? (
          <motion.div key='daily-compound-growth-chart' {...growthMotion}>
            <DailyCompoundGrowthChart
              currency={savedRun.result.currency}
              monthlySeries={savedRun.result.monthlySeries}
              simulationDays={savedRun.result.projection.simulationDays}
            />
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
