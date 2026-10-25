'use client';

import { useEffect } from 'react';
import {
  animate,
  motion,
  useMotionValue,
  useReducedMotion,
  useTransform,
} from 'framer-motion';

import { formatCurrencyAmount } from '@/lib/daily-compound-interest/format-currency';
import { cn } from '@/lib/utils';

type AnimatedAmountProps = {
  value: number;
  className?: string;
};

const format = (amount: number) => formatCurrencyAmount('USD', amount, 'en-US');

/** Counts up to `value`; screen readers get the final figure only. */
export function AnimatedAmount({ value, className }: AnimatedAmountProps) {
  const reducedMotion = useReducedMotion();
  const motionValue = useMotionValue(reducedMotion ? value : 0);
  const text = useTransform(motionValue, format);

  useEffect(() => {
    if (reducedMotion) {
      motionValue.set(value);
      return;
    }
    const controls = animate(motionValue, value, {
      duration: 0.9,
      ease: [0.22, 1, 0.36, 1],
    });
    return () => controls.stop();
  }, [value, reducedMotion, motionValue]);

  return (
    <>
      <motion.span aria-hidden className={cn('tabular-nums', className)}>
        {text}
      </motion.span>
      <span className='sr-only'>{format(value)}</span>
    </>
  );
}
