'use client';

import { motion, useReducedMotion } from 'framer-motion';

import { DailyCompoundCalculatorForm } from '@/components/daily-compound-interest/daily-compound-calculator-form';
import {
  fadeUpVariants,
  staggerContainerVariants,
} from '@/lib/motion-variants';
import { cn } from '@/lib/utils';

type DailyCompoundToolContentProps = {
  className?: string;
};

export function DailyCompoundToolContent({
  className,
}: DailyCompoundToolContentProps) {
  const reducedMotion = useReducedMotion();

  return (
    <div className={cn('flex flex-col', className)}>
      <motion.section
        className={cn('flex flex-col')}
        initial='hidden'
        animate='visible'
        variants={staggerContainerVariants(reducedMotion, 0.1)}>
        <motion.header
          className={cn(
            'relative mx-auto max-w-3xl px-1 pt-2 text-center sm:px-4 sm:pt-4',
          )}
          variants={fadeUpVariants(reducedMotion)}>
          <div
            aria-hidden
            className={cn(
              'pointer-events-none absolute inset-0 -z-10 mx-auto max-w-xl overflow-hidden rounded-3xl',
              'bg-[radial-gradient(ellipse_72%_56%_at_50%_-30%,rgba(16,185,129,0.12),transparent)]',
              'dark:bg-[radial-gradient(ellipse_72%_56%_at_50%_-30%,rgba(52,211,153,0.12),transparent)]',
            )}
          />
          <p
            className={cn(
              'mb-3 text-xs font-semibold uppercase tracking-[0.2em]',
              'text-emerald-600 dark:text-emerald-400 sm:text-sm',
            )}>
            Compound growth
          </p>
          <h1
            className={cn(
              'font-heading text-balance text-3xl font-semibold tracking-tight text-foreground',
              'sm:text-4xl lg:text-[2.25rem]',
            )}>
            Daily compound interest calculator
          </h1>
          <p
            className={cn(
              'mx-auto mt-5 max-w-2xl text-pretty text-base leading-relaxed text-muted-foreground',
              'sm:text-lg',
            )}>
            Build{' '}
            <span className='font-medium text-foreground'>
              multi-currency
            </span>{' '}
            projections using{' '}
            <span className='font-medium text-foreground'>daily compounding</span>
            , optional recurring contributions, and reinvestment semantics.
            Charts and exports arrive in a later pass — run a calculation below
            to see totals side-by-side as you iterate assumptions.
          </p>
        </motion.header>

        <motion.div
          className={cn(
            'mt-12 min-w-0 w-full sm:mt-14 lg:mt-16',
          )}
          variants={fadeUpVariants(reducedMotion)}>
          <DailyCompoundCalculatorForm />
        </motion.div>
      </motion.section>
    </div>
  );
}
