'use client';

import { RotateCcwIcon } from 'lucide-react';

import { ChartResultSummary } from '@/components/sun-moon-rising/chart-result-summary';
import { ChartSignRowsList } from '@/components/sun-moon-rising/chart-sign-rows-list';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import type { SunMoonRisingChartSuccess } from '@/lib/sun-moon-rising/api';
import type { SunMoonRisingFormValues } from '@/lib/schemas/sun-moon-rising-schema';

type ChartResultsCardProps = {
  snapshot: SunMoonRisingFormValues;
  chart: SunMoonRisingChartSuccess;
  reducedMotion: boolean | null;
  onReset: () => void;
};

export function ChartResultsCard({
  snapshot,
  chart,
  reducedMotion,
  onReset,
}: ChartResultsCardProps) {
  return (
    <Card className='shadow-md ring-1 ring-indigo-500/10 dark:ring-indigo-400/15'>
      <CardHeader className='space-y-4 border-b border-border/80 pb-6'>
        <div className='flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between sm:gap-4'>
          <div className='space-y-1'>
            <CardTitle id='your-chart-heading' className='text-xl'>
              Your chart
            </CardTitle>
            <CardDescription>
              Sun, Moon, and Rising appear here once astronomical calculations
              are connected.
            </CardDescription>
          </div>
          <Button
            type='button'
            variant='outline'
            size='sm'
            className='shrink-0 border-zinc-200 dark:border-zinc-700'
            onClick={onReset}>
            <RotateCcwIcon className='size-4' />
            Start over
          </Button>
        </div>
      </CardHeader>
      <CardContent className='space-y-6 pt-6'>
        <ChartResultSummary snapshot={snapshot} reducedMotion={reducedMotion} />
        <ChartSignRowsList chart={chart} reducedMotion={reducedMotion} />
      </CardContent>
    </Card>
  );
}
