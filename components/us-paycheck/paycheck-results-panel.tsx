'use client';

import { useMemo, useState, type Ref } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

import { AnimatedAmount } from '@/components/us-paycheck/animated-amount';
import { PaycheckBreakdownTable } from '@/components/us-paycheck/paycheck-breakdown-table';
import { PaycheckResultsActions } from '@/components/us-paycheck/paycheck-results-actions';
import { PaycheckTakeHomeChart } from '@/components/us-paycheck/paycheck-take-home-chart';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { formatCurrencyAmount } from '@/lib/daily-compound-interest/format-currency';
import { revealedPanelVariants } from '@/lib/motion-variants';
import { getChartSegments, getViewOptions } from '@/lib/us-paycheck/breakdown';
import { scaleAmounts } from '@/lib/us-paycheck/compute-paycheck';
import { FEDERAL_TAX_YEAR } from '@/lib/us-paycheck/federal-tax-data';
import type { PaycheckRun } from '@/lib/us-paycheck/types';
import { cn } from '@/lib/utils';

type PaycheckResultsPanelProps = {
  run: PaycheckRun;
  headingRef: Ref<HTMLHeadingElement>;
  onCopy: (item?: string) => void;
  onDownload: (format?: string) => void;
  className?: string;
};

export function PaycheckResultsPanel({
  run,
  headingRef,
  onCopy,
  onDownload,
  className,
}: PaycheckResultsPanelProps) {
  const reducedMotion = useReducedMotion();
  const { result, hoursPerYear } = run;
  const views = useMemo(() => getViewOptions(result.periodsPerYear), [result.periodsPerYear]);
  const [viewId, setViewId] = useState(views[0].id);
  const view = views.find(option => option.id === viewId) ?? views[0];

  const amounts = useMemo(
    () => scaleAmounts(result.annual, view.divisor),
    [result.annual, view.divisor],
  );
  const segments = useMemo(() => getChartSegments(result.annual), [result.annual]);
  const hourlyTakeHome = hoursPerYear > 0 ? result.annual.net / hoursPerYear : 0;
  const withheld = amounts.gross - amounts.net;

  return (
    <motion.div
      key={run.runId}
      className={cn('w-full', className)}
      variants={revealedPanelVariants(reducedMotion)}
      initial='hidden'
      animate='visible'>
      <Card className='gap-5 shadow-md ring-1 ring-teal-500/15 dark:ring-teal-400/20'>
        <CardContent className='space-y-6'>
          <div className='space-y-4'>
            <Tabs value={view.id} onValueChange={setViewId}>
              <TabsList aria-label='Pay period' className='w-full sm:w-96'>
                {views.map(option => (
                  <TabsTrigger
                    key={option.id}
                    value={option.id}
                    aria-controls={undefined}>
                    {option.label}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>

            <div>
              <h2
                ref={headingRef}
                tabIndex={-1}
                className='text-sm font-medium text-muted-foreground outline-none'>
                Estimated take-home pay
              </h2>
              <p
                className='mt-1 text-4xl font-semibold tracking-tight text-teal-700 sm:text-5xl dark:text-teal-300'
                aria-live='polite'>
                <AnimatedAmount value={amounts.net} />
              </p>
              <p className='mt-1.5 text-sm text-muted-foreground'>
                {formatCurrencyAmount('USD', withheld, 'en-US')} withheld from{' '}
                {formatCurrencyAmount('USD', amounts.gross, 'en-US')} gross ·{' '}
                {FEDERAL_TAX_YEAR} rules
              </p>
            </div>

            <dl className='grid grid-cols-3 gap-2 text-center sm:gap-3'>
              <Stat label='Effective tax rate' value={`${(result.effectiveTaxRate * 100).toFixed(1)}%`} />
              <Stat label='Federal bracket' value={`${Math.round(result.marginalFederalRate * 100)}%`} />
              <Stat label='Take-home / hour' value={formatCurrencyAmount('USD', hourlyTakeHome, 'en-US')} />
            </dl>
          </div>

          <PaycheckTakeHomeChart segments={segments} />

          <PaycheckBreakdownTable
            amounts={amounts}
            periodLabel={view.label}
            stateName={result.state.name}
          />

          <PaycheckResultNotes run={run} />
          <PaycheckResultsActions result={result} onCopy={onCopy} onDownload={onDownload} />
        </CardContent>
      </Card>
    </motion.div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className='rounded-lg border border-border/70 bg-muted/30 px-2 py-2.5'>
      <dt className='text-[0.7rem] leading-tight text-muted-foreground'>{label}</dt>
      <dd className='mt-1 text-base font-semibold tabular-nums text-foreground'>{value}</dd>
    </div>
  );
}

function PaycheckResultNotes({ run }: { run: PaycheckRun }) {
  const { result } = run;
  const notes: string[] = [];

  if (!result.state.brackets) {
    notes.push(`${result.state.name} does not tax wages at the state level.`);
  }
  if (result.state.localTaxesMayApply) {
    notes.push('City, county, or school-district income taxes may also apply. Add them under "Other state / local payroll tax".');
  }
  if (result.retirementCapped) {
    notes.push('401(k) contributions were capped at the 2026 IRS employee deferral limit.');
  }
  notes.push('Estimates use 2026 federal withholding rules. Your employer’s payroll system may differ slightly.');

  return (
    <ul className='space-y-1.5 text-xs leading-relaxed text-muted-foreground'>
      {notes.map(note => (
        <li key={note}>{note}</li>
      ))}
    </ul>
  );
}
