'use client';

import { motion, useReducedMotion } from 'framer-motion';

import { ChildSupportCalculatorForm } from '@/components/indiana-child-support/child-support-calculator-form';
import {
  fadeUpVariants,
  staggerContainerVariants,
} from '@/lib/motion-variants';
import { cn } from '@/lib/utils';

type ChildSupportToolContentProps = {
  className?: string;
};

export function ChildSupportToolContent({
  className,
}: ChildSupportToolContentProps) {
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
              'bg-[radial-gradient(ellipse_72%_56%_at_50%_-30%,rgba(59,130,246,0.12),transparent)]',
              'dark:bg-[radial-gradient(ellipse_72%_56%_at_50%_-30%,rgba(96,165,250,0.14),transparent)]',
            )}
          />
          <p
            className={cn(
              'mb-3 text-xs font-semibold uppercase tracking-[0.2em]',
              'text-blue-600 dark:text-blue-400 sm:text-sm',
            )}>
            Family law
          </p>
          <h1
            className={cn(
              'font-heading text-balance text-3xl font-semibold tracking-tight text-foreground',
              'sm:text-4xl lg:text-[2.25rem]',
            )}>
            Child support calculator
          </h1>
          <p
            className={cn(
              'mx-auto mt-5 max-w-2xl text-pretty text-base leading-relaxed text-muted-foreground',
              'sm:text-lg',
            )}>
            Enter income and parenting-time splits for each child. This phase
            collects inputs only—results and guideline logic will plug in next.
          </p>
        </motion.header>

        <motion.div
          className={cn('mt-12 min-w-0 w-full sm:mt-14 lg:mt-16')}
          variants={fadeUpVariants(reducedMotion)}>
          <ChildSupportCalculatorForm />
        </motion.div>
      </motion.section>
    </div>
  );
}
