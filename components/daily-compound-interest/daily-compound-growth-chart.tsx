'use client';

import { useId, useMemo } from 'react';
import {
  Area,
  CartesianGrid,
  ComposedChart,
  Legend,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  CHART_MONTH_DAYS,
  type MonthlySeriesPoint,
} from '@/lib/daily-compound-interest/compute';
import {
  formatCompactCurrency,
  formatCurrencyAmount,
} from '@/lib/daily-compound-interest/format-currency';
import type { DailyCompoundFormValues } from '@/lib/schemas/daily-compound-schema';
import { cn } from '@/lib/utils';

type ChartRow = MonthlySeriesPoint;

function formatXMonthTick(value: unknown): string {
  if (typeof value !== 'number') return String(value ?? '');
  if (Math.abs(value) < 0.001) return '0';
  if (Math.abs(value - Math.round(value)) < 0.02) return `${Math.round(value)}`;
  return value.toFixed(1);
}

export type DailyCompoundGrowthChartProps = {
  className?: string;
  currency: DailyCompoundFormValues['currency'];
  monthlySeries: MonthlySeriesPoint[];
  simulationDays: number;
};

/** Fintech-style area + line curve; series is ~30 simulated days between samples plus horizon end (same solver as totals). */
export function DailyCompoundGrowthChart({
  className,
  currency,
  monthlySeries,
  simulationDays,
}: DailyCompoundGrowthChartProps) {
  const gradientId = useId().replace(/:/g, '');
  const data = useMemo(() => [...monthlySeries], [monthlySeries]);

  if (monthlySeries.length < 2) {
    return (
      <Card
        className={cn(
          'shadow-md ring-1 ring-emerald-500/10 dark:ring-emerald-400/15',
          className,
        )}>
        <CardHeader className='border-b border-border/80 pb-4'>
          <CardTitle className='text-lg'>Growth curve</CardTitle>
        <CardDescription>
          Monthly checkpoints along the simulated horizon ({CHART_MONTH_DAYS}{' '}
          simulated days per step; same engine as your projection totals).
        </CardDescription>
        </CardHeader>
        <CardContent className='pt-6'>
          <p className='text-sm text-muted-foreground'>
            Add more time to the horizon to see a multi-point growth chart.
          </p>
        </CardContent>
      </Card>
    );
  }

  const maxY = Math.max(
    ...data.map((d) => Math.max(d.balance, d.cumulativeDeposits)),
  );

  return (
    <Card
      className={cn(
        'shadow-md ring-1 ring-emerald-500/10 dark:ring-emerald-400/15',
        className,
      )}>
      <CardHeader className='border-b border-border/80 pb-4'>
        <CardTitle className='text-lg'>Growth curve</CardTitle>
        <CardDescription>
          End-of-month snapshots (~{CHART_MONTH_DAYS}-day steps) over{' '}
          {simulationDays.toLocaleString()} simulated days. Balance includes
          growth; contributions are what you put in (principal + scheduled
          deposits).
        </CardDescription>
      </CardHeader>
      <CardContent className='pt-6'>
        <div
          className={cn(
            'h-[280px] w-full text-muted-foreground sm:h-[320px]',
          )}>
          <ResponsiveContainer width='100%' height='100%'>
            <ComposedChart
              data={data}
              margin={{ top: 8, right: 8, left: 0, bottom: 36 }}>
              <defs>
                <linearGradient
                  id={gradientId}
                  x1='0'
                  y1='0'
                  x2='0'
                  y2='1'>
                  <stop
                    offset='0%'
                    stopColor='#10b981'
                    stopOpacity={0.22}
                  />
                  <stop
                    offset='100%'
                    stopColor='#10b981'
                    stopOpacity={0}
                  />
                </linearGradient>
              </defs>
              <CartesianGrid
                strokeDasharray='4 8'
                className='stroke-border/70 dark:stroke-border/50'
                vertical={false}
              />
              <XAxis
                dataKey='elapsedMonths'
                type='number'
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                domain={['dataMin', 'dataMax']}
                tickFormatter={(v) => formatXMonthTick(v)}
                tick={{ fontSize: 11 }}
                label={{
                  value: `Elapsed months (~${CHART_MONTH_DAYS} simulated days)`,
                  position: 'insideBottom',
                  offset: -12,
                  style: {
                    fill: 'var(--muted-foreground)',
                    fontSize: 11,
                  },
                }}
              />
              <YAxis
                tickLine={false}
                axisLine={false}
                tickMargin={6}
                width={56}
                tickFormatter={(v) =>
                  typeof v === 'number'
                    ? formatCompactCurrency(currency, v)
                    : String(v)
                }
                domain={[0, Math.max(maxY * 1.06, maxY)]}
                tick={{ fontSize: 11 }}
              />
              <Tooltip
                wrapperClassName='!outline-none'
                content={
                  <ChartTooltip currency={currency} />
                }
              />
              <Legend
                wrapperStyle={{
                  paddingTop: 24,
                  fontSize: 12,
                }}
                formatter={(value) =>
                  value === 'balance'
                    ? 'Total balance'
                    : value === 'cumulativeDeposits'
                      ? 'Cumulative contributions'
                      : value
                }
              />
              <Area
                type='monotone'
                dataKey='balance'
                name='balance'
                stroke='#059669'
                strokeWidth={2}
                fill={`url(#${gradientId})`}
                activeDot={{ r: 4, strokeWidth: 0 }}
                isAnimationActive={false}
              />
              <Line
                type='monotone'
                dataKey='cumulativeDeposits'
                name='cumulativeDeposits'
                stroke='var(--muted-foreground)'
                strokeWidth={2}
                strokeDasharray='5 6'
                dot={{ r: 2, strokeWidth: 0, fill: 'var(--muted-foreground)' }}
                activeDot={{ r: 4 }}
                isAnimationActive={false}
              />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}

function ChartTooltip({
  active,
  payload,
  currency,
}: {
  active?: boolean;
  payload?: readonly { payload: ChartRow }[];
  currency: DailyCompoundFormValues['currency'];
}) {
  if (!active || !payload?.[0]?.payload) return null;

  const row = payload[0].payload;
  const dayLabel =
    row.simulatedDay === 0 ? 'Day 0' : `Day ${row.simulatedDay.toLocaleString()}`;

  return (
    <div
      className={cn(
        'rounded-xl border border-border/80 bg-card/95 px-3 py-2.5 text-sm shadow-xl ring-1 ring-foreground/[0.04] backdrop-blur-sm',
      )}>
      <p className='font-semibold text-foreground'>{dayLabel}</p>
      <p className='text-xs text-muted-foreground'>
        ≈ Month {row.elapsedMonths.toFixed(2)} marker
      </p>
      <dl className='mt-2 space-y-1 text-xs'>
        <div className='flex justify-between gap-6'>
          <dt className='text-muted-foreground'>Balance</dt>
          <dd className='font-medium tabular-nums text-emerald-700 dark:text-emerald-400'>
            {formatCurrencyAmount(currency, row.balance)}
          </dd>
        </div>
        <div className='flex justify-between gap-6'>
          <dt className='text-muted-foreground'>Contributions</dt>
          <dd className='font-medium tabular-nums text-foreground'>
            {formatCurrencyAmount(currency, row.cumulativeDeposits)}
          </dd>
        </div>
      </dl>
    </div>
  );
}
