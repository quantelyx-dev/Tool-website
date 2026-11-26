'use client';

import { ChildSupportCreditBreakdown } from '@/components/indiana-child-support/child-support-credit-breakdown';
import { ChildSupportWorksheetTable } from '@/components/indiana-child-support/child-support-worksheet-table';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import type { IndianaChildSupportComputationResult } from '@/lib/indiana-child-support/compute-child-support';
import { PARENT_LABELS } from '@/lib/indiana-child-support/form-helpers';
import { weeklySupportToMonthlyApproximate } from '@/lib/indiana-child-support/form-to-calculation';
import { formatUsd, roundMoney } from '@/lib/indiana-child-support/money';
import type { ChildSupportFormValues } from '@/lib/schemas/indiana-child-support-schema';
import { cn } from '@/lib/utils';

type ChildSupportResultsPanelProps = {
  result: IndianaChildSupportComputationResult;
  formData: ChildSupportFormValues;
  className?: string;
};

export function ChildSupportResultsPanel({
  result,
  formData,
  className,
}: ChildSupportResultsPanelProps) {
  if (result.status === 'case-by-case') {
    return (
      <Card
        className={cn('w-full border-amber-500/40', className)}
        role='status'
        data-slot='child-support-results'>
        <CardHeader>
          <CardTitle className='text-lg'>No schedule amount</CardTitle>
        </CardHeader>
        <CardContent className='text-sm leading-relaxed text-muted-foreground'>
          Combined weekly adjusted income is{' '}
          {formatUsd(result.combinedWeeklyAdjustedIncome)}. Below $100 a week the
          Indiana Guidelines have the court set support case by case, so there is
          no guideline figure to show.
        </CardContent>
      </Card>
    );
  }

  const recipient =
    result.transferFrom === 'parentOne' ? 'parentTwo' : 'parentOne';
  const reversed = result.transferFrom !== result.payor;
  const weekly = result.weeklyTransfer;
  const payorInput = formData[result.payor];

  return (
    <Card
      className={cn('w-full overflow-hidden border-border/80 shadow-xs', className)}
      data-slot='child-support-results'>
      <CardHeader className='space-y-2 border-b border-border/60 bg-muted/20 pb-4'>
        <CardTitle className='text-lg font-semibold tracking-tight'>
          Line 8: recommended weekly obligation
        </CardTitle>
        <p className='text-2xl font-bold tabular-nums text-foreground' role='status'>
          {formatUsd(weekly)} per week
        </p>
        <p className='text-sm font-medium text-foreground'>
          {PARENT_LABELS[result.transferFrom]} pays {PARENT_LABELS[recipient]}
        </p>
        <p className='text-sm text-muted-foreground'>
          About {formatUsd(weeklySupportToMonthlyApproximate(weekly))} a month or{' '}
          {formatUsd(roundMoney(weekly * 52))} a year. Indiana orders are stated
          weekly, and a court may round to the nearest dollar.
        </p>
        {reversed ? (
          <p className='text-sm text-amber-700 dark:text-amber-400'>
            The paying parent&apos;s adjustments are larger than their share, so
            the calculation reverses direction. A court reviews this and may
            deviate.
          </p>
        ) : null}
      </CardHeader>
      <CardContent className='space-y-6 pt-4'>
        <ChildSupportWorksheetTable result={result} />
        <ChildSupportCreditBreakdown
          result={result}
          childCareCredit={payorInput.childCare}
          healthCredit={payorInput.healthInsurance}
        />
      </CardContent>
    </Card>
  );
}
