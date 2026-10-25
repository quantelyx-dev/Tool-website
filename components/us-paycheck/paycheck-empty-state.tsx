import { CalculatorIcon } from 'lucide-react';

import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

type PaycheckEmptyStateProps = {
  className?: string;
};

export function PaycheckEmptyState({ className }: PaycheckEmptyStateProps) {
  return (
    <Card className={cn('border-dashed bg-muted/20 shadow-none ring-0 border', className)}>
      <CardContent className='flex min-h-72 flex-col items-center justify-center gap-3 text-center'>
        <span
          aria-hidden
          className='flex size-12 items-center justify-center rounded-full bg-teal-500/10 text-teal-600 dark:text-teal-400'>
          <CalculatorIcon className='size-6' />
        </span>
        <p className='text-sm font-medium text-foreground'>
          Your paycheck estimate appears here
        </p>
        <p className='max-w-64 text-xs leading-relaxed text-muted-foreground'>
          Enter your pay details and press Calculate to see take-home pay, taxes,
          and a full breakdown.
        </p>
      </CardContent>
    </Card>
  );
}
