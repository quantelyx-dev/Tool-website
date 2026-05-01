'use client';

import { motion, useReducedMotion } from 'framer-motion';

import { SunMoonRisingCalculatorForm } from '@/components/sun-moon-rising/sun-moon-rising-calculator-form';
import {
  fadeUpVariants,
  staggerContainerVariants,
} from '@/lib/motion-variants';
import { cn } from '@/lib/utils';

type SunMoonRisingToolContentProps = {
  className?: string;
};

export function SunMoonRisingToolContent({
  className,
}: SunMoonRisingToolContentProps) {
  const reducedMotion = useReducedMotion();

  return (
    <div className={cn('flex flex-col', className)}>
      <motion.section
        className={cn('relative')}
        initial='hidden'
        animate='visible'
        variants={staggerContainerVariants(reducedMotion)}>
        <div
          aria-hidden
          className={cn(
            'pointer-events-none absolute inset-0 -z-10 overflow-hidden rounded-3xl',
            'bg-[radial-gradient(ellipse_78%_58%_at_50%_-28%,rgba(79,70,229,0.14),transparent)]',
            'dark:bg-[radial-gradient(ellipse_78%_58%_at_50%_-28%,rgba(129,140,248,0.14),transparent)]',
          )}
        />
        <motion.div
          className={cn('mx-auto max-w-3xl px-1 pt-4 text-center sm:px-4')}
          variants={fadeUpVariants(reducedMotion)}>
          <p
            className={cn(
              'mb-3 text-xs font-semibold uppercase tracking-[0.22em]',
              'text-indigo-600 dark:text-indigo-400 sm:text-sm',
            )}>
            Birth chart
          </p>
          <h1
            className={cn(
              'font-heading text-balance text-3xl font-semibold tracking-tight text-foreground',
              'sm:text-4xl lg:text-[2.35rem]',
            )}>
            Sun, Moon & Rising calculator
          </h1>
          <p
            className={cn(
              'mx-auto mt-5 max-w-2xl text-pretty text-base leading-relaxed text-muted-foreground',
              'sm:text-lg',
            )}>
            Enter your birth name, date, civil time (24-hour), and city. We
            geocode with OpenStreetMap, resolve timezone with{' '}
            <span className='font-medium text-foreground'>tz-lookup</span>, then
            compute tropical positions with{' '}
            <span className='font-medium text-foreground'>Luxon</span> and{' '}
            <span className='font-medium text-foreground'>astronomia</span>.
            Results animate in after a short calculation step.
          </p>
        </motion.div>
      </motion.section>

      <SunMoonRisingCalculatorForm className={cn('mt-12 sm:mt-14 lg:mt-16')} />
    </div>
  );
}
