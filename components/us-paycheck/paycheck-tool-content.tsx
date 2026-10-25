import { PaycheckCalculator } from '@/components/us-paycheck/paycheck-calculator';
import { cn } from '@/lib/utils';

type PaycheckToolContentProps = {
  className?: string;
};

/** Server-rendered header so the LCP heading never waits on hydration. */
export function PaycheckToolContent({ className }: PaycheckToolContentProps) {
  return (
    <div className={cn('flex flex-col', className)}>
      <header
        className={cn(
          'relative mx-auto max-w-3xl px-1 pt-2 text-center sm:px-4 sm:pt-4',
        )}>
        <div
          aria-hidden
          className={cn(
            'pointer-events-none absolute inset-0 -z-10 mx-auto max-w-xl overflow-hidden rounded-3xl',
            'bg-[radial-gradient(ellipse_72%_56%_at_50%_-30%,rgba(20,184,166,0.14),transparent)]',
            'dark:bg-[radial-gradient(ellipse_72%_56%_at_50%_-30%,rgba(45,212,191,0.14),transparent)]',
          )}
        />
        <p
          className={cn(
            'mb-3 text-xs font-semibold uppercase tracking-[0.2em]',
            'text-teal-600 dark:text-teal-400 sm:text-sm',
          )}>
          Payroll &amp; taxes
        </p>
        <h1
          className={cn(
            'font-heading text-balance text-3xl font-semibold tracking-tight text-foreground',
            'sm:text-4xl lg:text-[2.25rem]',
          )}>
          US paycheck calculator
        </h1>
        <p
          className={cn(
            'mx-auto mt-5 max-w-2xl text-pretty text-base leading-relaxed text-muted-foreground',
            'sm:text-lg',
          )}>
          Turn gross pay into{' '}
          <span className='font-medium text-foreground'>take-home pay</span>.
          Estimate federal income tax, Social Security, Medicare, state tax, and
          your 401(k), health, and other deductions for 2026.
        </p>
      </header>

      <div className={cn('mt-12 min-w-0 w-full sm:mt-14')}>
        <PaycheckCalculator />
      </div>
    </div>
  );
}
