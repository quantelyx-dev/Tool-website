'use client';

import { motion, useReducedMotion } from 'framer-motion';
import type { ReactNode } from 'react';

import { cardItemVariants } from '@/lib/motion-variants';
import { cn } from '@/lib/utils';

export type ChartSignRowProps = {
  icon: ReactNode;
  label: string;
  hint: string;
  primary: ReactNode;
  className?: string;
};

export function ChartSignRow({
  icon,
  label,
  hint,
  primary,
  className,
}: ChartSignRowProps) {
  const reducedMotion = useReducedMotion();

  return (
    <motion.li
      variants={cardItemVariants(reducedMotion)}
      className={cn(
        'rounded-xl border border-border bg-card px-4 py-3 shadow-xs',
        className,
      )}>
      <div className='flex items-start gap-3'>
        <span className='mt-0.5 inline-flex size-10 shrink-0 items-center justify-center rounded-lg bg-indigo-600 text-white dark:bg-indigo-500'>
          {icon}
        </span>
        <div className='min-w-0 flex-1 space-y-1'>
          <div className='flex flex-wrap items-start justify-between gap-2'>
            <p className='font-medium leading-none'>{label}</p>
            <div className='text-right text-sm'>
              <p className='font-semibold text-foreground tabular-nums'>
                {primary}
              </p>
            </div>
          </div>
          <p className='text-xs text-muted-foreground'>{hint}</p>
        </div>
      </div>
    </motion.li>
  );
}
