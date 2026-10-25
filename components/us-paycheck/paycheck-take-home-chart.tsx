'use client';

import { motion, useReducedMotion } from 'framer-motion';

import { formatCurrencyAmount } from '@/lib/daily-compound-interest/format-currency';
import type { ChartSegment, ChartSegmentId } from '@/lib/us-paycheck/breakdown';
import { cn } from '@/lib/utils';

const SEGMENT_STYLES: Record<ChartSegmentId, { stroke: string; dot: string }> = {
  net: { stroke: 'stroke-teal-500', dot: 'bg-teal-500' },
  federal: { stroke: 'stroke-indigo-500', dot: 'bg-indigo-500' },
  fica: { stroke: 'stroke-amber-500', dot: 'bg-amber-500' },
  state: { stroke: 'stroke-violet-500', dot: 'bg-violet-500' },
  deductions: { stroke: 'stroke-slate-400', dot: 'bg-slate-400' },
};

const RADIUS = 56;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;
const GAP = 2;

type PaycheckTakeHomeChartProps = {
  segments: readonly ChartSegment[];
  className?: string;
};

export function PaycheckTakeHomeChart({
  segments,
  className,
}: PaycheckTakeHomeChartProps) {
  const reducedMotion = useReducedMotion();
  const total = segments.reduce((sum, segment) => sum + segment.amount, 0);
  const net = segments.find(segment => segment.id === 'net');
  const netShare = total > 0 && net ? Math.round((net.amount / total) * 100) : 0;

  const arcs = segments.map((segment, index) => {
    const precedingAmount = segments
      .slice(0, index)
      .reduce((sum, previous) => sum + previous.amount, 0);
    const length = (segment.amount / total) * CIRCUMFERENCE;
    return {
      segment,
      index,
      offset: (precedingAmount / total) * CIRCUMFERENCE,
      visible: Math.max(0, length - (segments.length > 1 ? GAP : 0)),
    };
  });

  return (
    <div
      className={cn(
        'flex flex-col items-center gap-6 sm:flex-row sm:items-center sm:gap-8',
        className,
      )}>
      <div className='relative size-40 shrink-0'>
        <svg
          viewBox='0 0 140 140'
          className='size-full -rotate-90'
          role='img'
          aria-label={`Take-home pay is ${netShare}% of gross pay`}>
          <circle
            cx='70'
            cy='70'
            r={RADIUS}
            fill='none'
            strokeWidth='16'
            className='stroke-muted'
          />
          {arcs.map(({ segment, visible, offset: start, index }) => (
            <motion.circle
              key={segment.id}
              cx='70'
              cy='70'
              r={RADIUS}
              fill='none'
              strokeWidth='16'
              className={SEGMENT_STYLES[segment.id].stroke}
              strokeDashoffset={-start}
              initial={{ strokeDasharray: `0 ${CIRCUMFERENCE}` }}
              animate={{
                strokeDasharray: `${visible} ${CIRCUMFERENCE - visible}`,
              }}
              transition={
                reducedMotion
                  ? { duration: 0 }
                  : { duration: 0.8, delay: 0.1 + index * 0.08, ease: 'easeOut' }
              }
            />
          ))}
        </svg>
        <div
          aria-hidden
          className='absolute inset-0 flex flex-col items-center justify-center'>
          <span className='text-2xl font-semibold tabular-nums text-foreground'>
            {netShare}%
          </span>
          <span className='text-xs text-muted-foreground'>kept</span>
        </div>
      </div>

      <ul className='w-full min-w-0 flex-1 space-y-2.5'>
        {segments.map(segment => (
          <li
            key={segment.id}
            className='flex items-center justify-between gap-3 text-sm'>
            <span className='flex min-w-0 items-center gap-2 leading-tight'>
              <span
                aria-hidden
                className={cn('size-2.5 shrink-0 rounded-full', SEGMENT_STYLES[segment.id].dot)}
              />
              <span className='text-muted-foreground'>{segment.label}</span>
            </span>
            <span className='shrink-0 font-medium tabular-nums text-foreground'>
              {Math.round((segment.amount / total) * 100)}%
              <span className='sr-only'>
                , {formatCurrencyAmount('USD', segment.amount, 'en-US')} per year
              </span>
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
