import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  formatCompactNumber,
  formatCurrencyAmount,
} from '@/lib/daily-compound-interest/format-currency';
import type { DailyCompoundCalculationSuccess } from '@/lib/daily-compound-interest/api';
import type { DailyCompoundFormValues } from '@/lib/schemas/daily-compound-schema';
import { cn } from '@/lib/utils';
import { Loader2Icon } from 'lucide-react';

type DailyCompoundResultsCardProps = {
  className?: string;
  isSubmitting?: boolean;
  currency?: DailyCompoundFormValues['currency'];
  projection: DailyCompoundCalculationSuccess['projection'] | null;
};

/**
 * Projection / totals aside. Growth chart renders below the form after a successful run.
 */
export function DailyCompoundResultsCard({
  className,
  isSubmitting = false,
  currency,
  projection,
}: DailyCompoundResultsCardProps) {
  const showLoading = isSubmitting;
  const hasResult = projection !== null && currency !== undefined;

  return (
    <Card
      className={cn(
        'shadow-md ring-1 ring-emerald-500/10 dark:ring-emerald-400/15',
        className,
      )}>
      <CardHeader className='border-b border-border/80 pb-4'>
        <CardTitle className='text-lg'>Projection</CardTitle>
        <CardDescription>
          Final balance, deposits, interest, and horizon length after your last
          run.
        </CardDescription>
      </CardHeader>
      <CardContent className='pt-6'>
        {showLoading ? (
          <div
            role='status'
            className={cn(
              'flex min-h-[200px] flex-col items-center justify-center gap-3 rounded-xl border border-border/80 bg-muted/20 px-4 py-10 text-center',
            )}>
            <Loader2Icon className='size-8 animate-spin text-emerald-600 dark:text-emerald-400' />
            <span className='text-sm font-medium text-muted-foreground'>
              Running daily simulation…
            </span>
          </div>
        ) : hasResult ? (
          <dl className='space-y-5'>
            <div className='flex items-baseline justify-between gap-3'>
              <dt className='text-sm font-medium text-muted-foreground'>
                Estimated final balance
              </dt>
              <dd className='text-lg font-semibold tracking-tight text-foreground tabular-nums'>
                {formatCurrencyAmount(currency, projection.finalBalance)}
              </dd>
            </div>
            <div className='flex items-baseline justify-between gap-3'>
              <dt className='text-sm font-medium text-muted-foreground'>
                Total deposited
              </dt>
              <dd className='text-base font-medium tabular-nums text-foreground'>
                {formatCurrencyAmount(currency, projection.totalDeposits)}
              </dd>
            </div>
            <div className='flex items-baseline justify-between gap-3'>
              <dt className='text-sm font-medium text-muted-foreground'>
                Interest earned
              </dt>
              <dd className='text-base font-medium tabular-nums text-emerald-700 dark:text-emerald-400'>
                {formatCurrencyAmount(currency, projection.interestEarned)}
              </dd>
            </div>
            <div className='rounded-lg border border-border/80 bg-muted/30 px-3 py-2'>
              <p className='text-xs text-muted-foreground'>
                Horizon (approx.)
              </p>
              <p className='text-sm font-medium tabular-nums text-foreground'>
                {formatCompactNumber(projection.simulationDays)} days
              </p>
            </div>
          </dl>
        ) : (
          <div
            role='region'
            aria-label='Calculation results'
            className={cn(
              'flex min-h-[200px] flex-col items-center justify-center gap-3 rounded-xl border border-dashed border-muted-foreground/25 bg-muted/20 px-4 py-10 text-center',
            )}>
            <span className='text-sm font-medium text-muted-foreground'>
              No run yet
            </span>
            <p className='max-w-[16rem] text-xs text-muted-foreground'>
              Enter your assumptions and tap Calculate — totals appear here.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
