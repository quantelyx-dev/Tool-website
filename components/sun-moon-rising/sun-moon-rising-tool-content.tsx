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
            Your{' '}
            <span className='font-medium text-foreground'>Sun sign</span>{' '}
            shapes your core identity and drive.{' '}
            Your{' '}
            <span className='font-medium text-foreground'>Moon sign</span>{' '}
            governs your emotions and inner world. Your{' '}
            <span className='font-medium text-foreground'>Rising sign</span>{' '}
            (Ascendant) defines the first impression you make — and is unique
            to the exact minute and place you were born. Together, these three
            placements form your astrological{' '}
            <span className='font-medium text-foreground'>Big Three</span>.
            Enter your birth date, time, and city below to discover all three
            instantly.
          </p>
        </motion.div>
      </motion.section>

      <SunMoonRisingCalculatorForm className={cn('mt-12 sm:mt-14 lg:mt-16')} />
    </div>
  );
}
