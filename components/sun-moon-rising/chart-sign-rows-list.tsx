'use client';

import { motion } from 'framer-motion';
import { MoonIcon, SparklesIcon, SunIcon } from 'lucide-react';

import { ChartSignRow } from '@/components/sun-moon-rising/chart-sign-row';
import type { SunMoonRisingChartSuccess } from '@/lib/sun-moon-rising/api';
import { staggerContainerVariants } from '@/lib/motion-variants';

type ChartSignRowsListProps = {
  chart: Pick<
    SunMoonRisingChartSuccess,
    'sunSign' | 'moonSign' | 'risingSign' | 'ephemeris'
  >;
  reducedMotion: boolean | null;
};

export function ChartSignRowsList({
  chart,
  reducedMotion,
}: ChartSignRowsListProps) {
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
        primary={chart.sunSign}
      />
      <ChartSignRow
        icon={<MoonIcon className='size-5' />}
        label='Moon sign'
        hint='Emotional terrain & instincts'
        primary={chart.moonSign}
      />
      <ChartSignRow
        icon={<SparklesIcon className='size-5' />}
        label='Rising sign'
        hint='Ascendant & first impressions'
        primary={chart.risingSign}
      />
    </motion.ul>
  );
}
