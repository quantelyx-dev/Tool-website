'use client';

import { motion } from 'framer-motion';

import { formatBirthSummaryLine } from '@/lib/datetime';
import type { SunMoonRisingFormValues } from '@/lib/schemas/sun-moon-rising-schema';

type ChartResultSummaryProps = {
  snapshot: SunMoonRisingFormValues;
  reducedMotion: boolean | null;
};

export function ChartResultSummary({
  snapshot,
  reducedMotion,
}: ChartResultSummaryProps) {
  return (
    <motion.div
      className='rounded-xl border border-indigo-100 bg-indigo-50/80 px-4 py-3 text-sm dark:border-indigo-900/60 dark:bg-indigo-950/40'
      initial={reducedMotion ? false : { opacity: 0, y: 8 }}
      animate={reducedMotion ? undefined : { opacity: 1, y: 0 }}
      transition={{
        delay: reducedMotion ? 0 : 0.12,
        duration: 0.35,
        ease: [0.22, 1, 0.36, 1],
      }}>
      <p className='font-semibold text-indigo-950 dark:text-indigo-50'>
        {snapshot.name.trim()}
      </p>
      <p className='mt-1 text-muted-foreground'>
        {formatBirthSummaryLine(
          snapshot.dateOfBirth,
          snapshot.timeOfBirth,
          snapshot.birthCity,
        )}
      </p>
    </motion.div>
  );
}
