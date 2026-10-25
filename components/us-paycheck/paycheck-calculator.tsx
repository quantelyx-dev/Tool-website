'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useReducedMotion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';

import { PaycheckDeductionsSection } from '@/components/us-paycheck/paycheck-deductions-section';
import { PaycheckEmptyState } from '@/components/us-paycheck/paycheck-empty-state';
import { PaycheckIncomeSection } from '@/components/us-paycheck/paycheck-income-section';
import { PaycheckResultsPanel } from '@/components/us-paycheck/paycheck-results-panel';
import { PaycheckWithholdingSection } from '@/components/us-paycheck/paycheck-withholding-section';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { useAnalytics } from '@/hooks/use-analytics';
import {
  paycheckFormSchema,
  type PaycheckFormValues,
} from '@/lib/schemas/us-paycheck-schema';
import { computePaycheck } from '@/lib/us-paycheck/compute-paycheck';
import { PAYCHECK_FORM_DEFAULTS } from '@/lib/us-paycheck/form-defaults';
import { toPaycheckInputs } from '@/lib/us-paycheck/form-to-paycheck';
import type { PaycheckRun } from '@/lib/us-paycheck/types';
import { cn } from '@/lib/utils';

const ENTER_ANIMATION =
  'animate-in fade-in slide-in-from-bottom-3 duration-500 fill-mode-both motion-reduce:animate-none';

export function PaycheckCalculator() {
  const reducedMotion = useReducedMotion();
  const { onUse, onResult, onCopy, onDownload, onReset } = useAnalytics(
    'us-paycheck-calculator',
  );
  const [run, setRun] = useState<PaycheckRun | null>(null);
  const resultsHeadingRef = useRef<HTMLHeadingElement>(null);
  const resultsRegionRef = useRef<HTMLDivElement>(null);

  const form = useForm<PaycheckFormValues>({
    resolver: zodResolver(paycheckFormSchema),
    defaultValues: PAYCHECK_FORM_DEFAULTS,
    mode: 'onBlur',
  });

  const runId = run?.runId;
  useEffect(() => {
    if (runId === undefined) return;
    resultsHeadingRef.current?.focus({ preventScroll: true });
    resultsRegionRef.current?.scrollIntoView({
      behavior: reducedMotion ? 'auto' : 'smooth',
      block: 'start',
    });
  }, [runId, reducedMotion]);

  function handleSubmit(values: PaycheckFormValues) {
    const context = {
      pay_type: values.payType,
      pay_frequency: values.payFrequency,
      filing_status: values.filingStatus,
      state: values.stateCode,
    };
    onUse(context);

    const { inputs, hoursPerYear } = toPaycheckInputs(values);
    const result = computePaycheck(inputs);
    setRun(previous => ({
      result,
      hoursPerYear,
      runId: (previous?.runId ?? 0) + 1,
    }));

    onResult({
      ...context,
      effective_tax_rate_pct: Math.round(result.effectiveTaxRate * 100),
    });
  }

  function handleReset() {
    form.reset(PAYCHECK_FORM_DEFAULTS);
    setRun(null);
    onReset();
  }

  const hasErrors = Object.keys(form.formState.errors).length > 0;

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        noValidate
        aria-label='US paycheck calculator'
        className='mx-auto grid max-w-6xl gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,27rem)] lg:items-start lg:gap-8'>
        <div className='flex min-w-0 flex-col gap-6'>
          <div className={ENTER_ANIMATION}>
            <PaycheckIncomeSection control={form.control} />
          </div>
          <div className={cn(ENTER_ANIMATION, 'delay-100')}>
            <PaycheckDeductionsSection control={form.control} />
          </div>
          <div className={cn(ENTER_ANIMATION, 'delay-200')}>
            <PaycheckWithholdingSection control={form.control} />
          </div>

          {hasErrors ? (
            <p role='alert' className='text-sm font-medium text-destructive'>
              Please fix the highlighted fields and calculate again.
            </p>
          ) : null}

          <div className='flex flex-wrap items-center gap-3'>
            <Button
              type='submit'
              size='lg'
              className='min-w-48 bg-teal-600 text-white shadow-md hover:bg-teal-700 dark:bg-teal-500 dark:text-zinc-950 dark:hover:bg-teal-400'>
              Calculate paycheck
            </Button>
            <Button type='button' variant='outline' size='lg' onClick={handleReset}>
              Reset
            </Button>
          </div>
        </div>

        <div
          ref={resultsRegionRef}
          className={cn(
            ENTER_ANIMATION,
            'delay-150 min-w-0 scroll-mt-20',
          )}>
          {run ? (
            <PaycheckResultsPanel
              run={run}
              headingRef={resultsHeadingRef}
              onCopy={onCopy}
              onDownload={onDownload}
            />
          ) : (
            <PaycheckEmptyState />
          )}
        </div>
      </form>
    </Form>
  );
}
