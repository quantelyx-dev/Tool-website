'use client';

import { motion } from 'framer-motion';
import { MoonIcon, SparklesIcon, SunIcon } from 'lucide-react';

import {
  ChartSignRow,
  getChartSignRowStatus,
} from '@/components/sun-moon-rising/chart-sign-row';
import { staggerContainerVariants } from '@/lib/motion-variants';
import type { SunMoonRisingFormValues } from '@/lib/schemas/sun-moon-rising-schema';

type ChartSignRowsListProps = {
  snapshot: SunMoonRisingFormValues;
  reducedMotion: boolean | null;
};

export function ChartSignRowsList({
  snapshot,
  reducedMotion,
}: ChartSignRowsListProps) {
  const status = getChartSignRowStatus(snapshot);

  return (
    <motion.ul
      className='space-y-3'
      variants={staggerContainerVariants(reducedMotion, 0.08)}
      initial='hidden'
      animate='visible'>
      <ChartSignRow
        icon={<SunIcon className='size-5' />}
        label='Sun sign'
        hint='Core vitality & ego expression'
        status={status}
      />
      <ChartSignRow
        icon={<MoonIcon className='size-5' />}
        label='Moon sign'
        hint='Emotional terrain & instincts'
        status={status}
      />
      <ChartSignRow
        icon={<SparklesIcon className='size-5' />}
        label='Rising sign'
        hint='Ascendant & first impressions'
        status={status}
      />
    </motion.ul>
  );
}
