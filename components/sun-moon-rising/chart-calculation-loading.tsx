'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { SparklesIcon } from 'lucide-react';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  cardItemVariants,
  loadingShimmerVariants,
  staggerContainerVariants,
} from '@/lib/motion-variants';
import { cn } from '@/lib/utils';

type ChartCalculationLoadingProps = {
  /** Trimmed name from the form for a human touch while waiting. */
  previewName?: string;
  className?: string;
};

const ROW_KEYS = ['sun-row', 'moon-row', 'rising-row'] as const;

export function ChartCalculationLoading({
  previewName,
  className,
}: ChartCalculationLoadingProps) {
  const reducedMotion = useReducedMotion();
  const shimmer = loadingShimmerVariants(reducedMotion);
  const prefersReducedMotion = reducedMotion === true;

  return (
    <Card
      role='status'
      className={cn(
        'shadow-md ring-1 ring-indigo-500/15 dark:ring-indigo-400/20',
        className,
      )}>
      <CardHeader className='space-y-4 border-b border-border/80 pb-6'>
        <div className='flex items-start gap-3'>
          <motion.span
            className='mt-0.5 inline-flex size-11 shrink-0 items-center justify-center rounded-xl bg-indigo-600 text-white shadow-sm dark:bg-indigo-500'
            animate={prefersReducedMotion ? {} : { rotate: 360 }}
            transition={
              prefersReducedMotion
                ? undefined
                : { duration: 9, repeat: Infinity, ease: 'linear' }
            }>
            <SparklesIcon className='size-5' aria-hidden />
          </motion.span>
          <div className='min-w-0 flex-1 space-y-1'>
            <CardTitle className='text-xl'>Calculating your chart</CardTitle>
            <CardDescription className='text-pretty'>
              Resolving location, timezone, and tropical positions…
              {previewName ? (
                <>
                  {' '}
                  <span className='font-medium text-foreground'>
                    {previewName}
                  </span>
                </>
              ) : null}
            </CardDescription>
          </div>
        </div>
        <motion.div
          className='h-1 overflow-hidden rounded-full bg-muted'
          initial={false}
          animate={
            prefersReducedMotion
              ? { opacity: 1 }
              : { opacity: [0.55, 1, 0.55], scaleX: [0.92, 1, 0.92] }
          }
          transition={
            prefersReducedMotion
              ? undefined
              : {
                  duration: 2,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }
          }
          aria-hidden
        />
      </CardHeader>
      <CardContent className='pt-6'>
        <motion.ul
          className='space-y-3'
          variants={staggerContainerVariants(reducedMotion, 0.09)}
          initial='hidden'
          animate='visible'
          aria-busy='true'
          aria-live='polite'>
          {ROW_KEYS.map((key) => (
            <motion.li
              key={key}
              variants={cardItemVariants(reducedMotion)}
              className='rounded-xl border border-border bg-card px-4 py-3 shadow-xs'>
              <div className='flex items-start gap-3'>
                <motion.span
                  className='mt-0.5 inline-flex size-10 shrink-0 rounded-lg bg-muted'
                  variants={shimmer}
                  animate='pulse'
                  aria-hidden
                />
                <div className='min-w-0 flex-1 space-y-2'>
                  <motion.div
                    className='h-4 max-w-[10rem] rounded-md bg-muted'
                    variants={shimmer}
                    animate='pulse'
                    aria-hidden
                  />
                  <motion.div
                    className='h-3 max-w-[14rem] rounded-md bg-muted/80'
                    variants={shimmer}
                    animate='pulse'
                    aria-hidden
                  />
                </div>
              </div>
            </motion.li>
          ))}
        </motion.ul>
      </CardContent>
    </Card>
  );
}
