/** Growth curve SVG for compound PDF export (@react-pdf/renderer). */

import React from 'react';

import {
  Defs,
  Line,
  LinearGradient,
  Polygon,
  Polyline,
  Rect,
  Stop,
  Svg,
  Text,
} from '@react-pdf/renderer';

import {
  CHART_MONTH_DAYS,
  type MonthlySeriesPoint,
} from '@/lib/daily-compound-interest/compute';
import { formatCompactCurrency } from '@/lib/daily-compound-interest/format-currency';

const GRADIENT_ID = 'compoundPdfBalanceGrad';

function formatElapsedMonthsTick(value: number): string {
  if (Math.abs(value) < 0.001) return '0';
  if (Math.abs(value - Math.round(value)) < 0.02) return `${Math.round(value)}`;
  return value.toFixed(1);
}

export type PdfGrowthCurveChartProps = {
  currency: string;
  monthlySeries: MonthlySeriesPoint[];
};

/** Mirrors {@link DailyCompoundGrowthChart}: balance area + dashed cumulative deposits vs elapsed months. */
export function PdfGrowthCurveChart({
  currency,
  monthlySeries,
}: PdfGrowthCurveChartProps) {
  if (monthlySeries.length < 2) {
    return (
      <Text style={{ fontSize: 10, color: '#64748b', marginTop: 8 }}>
        Add more time to the horizon to plot a multi-point growth curve (needs at
        least two monthly checkpoints).
      </Text>
    );
  }

  const W = 467;
  const H = 228;
  const padL = 58;
  const padR = 10;
  const padT = 12;
  const padB = 34;

  const plotW = W - padL - padR;
  const plotH = H - padT - padB;

  const monthsMin = Math.min(...monthlySeries.map((p) => p.elapsedMonths));
  const monthsMax = Math.max(...monthlySeries.map((p) => p.elapsedMonths));
  const spanM = Math.max(monthsMax - monthsMin, 1e-9);

  const maxVal = Math.max(
    ...monthlySeries.map((p) => Math.max(p.balance, p.cumulativeDeposits)),
    1,
  );
  const yTop = maxVal * 1.06;

  const sx = (m: number) => padL + ((m - monthsMin) / spanM) * plotW;
  const sy = (v: number) => padT + (1 - v / yTop) * plotH;

  const balancePts = monthlySeries.map((p) => ({
    x: sx(p.elapsedMonths),
    y: sy(p.balance),
  }));
  const depositPts = monthlySeries.map((p) => ({
    x: sx(p.elapsedMonths),
    y: sy(p.cumulativeDeposits),
  }));

  const polygonPoints = [
    `${balancePts[0]!.x},${padT + plotH}`,
    ...balancePts.map((pt) => `${pt.x},${pt.y}`),
    `${balancePts[balancePts.length - 1]!.x},${padT + plotH}`,
  ].join(' ');

  const balanceLinePoints = balancePts.map((pt) => `${pt.x},${pt.y}`).join(' ');
  const depositLinePoints = depositPts.map((pt) => `${pt.x},${pt.y}`).join(' ');

  const gridYs = [0, 0.25, 0.5, 0.75, 1].map((t) => padT + t * plotH);
  const xTicks = 5;
  const xTickVals = Array.from({ length: xTicks }, (_, i) =>
    monthsMin + (spanM * i) / (xTicks - 1 || 1),
  );

  return (
    <Svg width={W} height={H} viewBox={`0 0 ${W} ${H}`}>
      <Defs>
        <LinearGradient id={GRADIENT_ID} x1='0' y1='0' x2='0' y2='1'>
          <Stop offset='0%' stopColor='#10b981' stopOpacity={0.28} />
          <Stop offset='100%' stopColor='#10b981' stopOpacity={0} />
        </LinearGradient>
      </Defs>

      <Rect
        x={padL}
        y={padT}
        width={plotW}
        height={plotH}
        fill='#fafafa'
        stroke='#e2e8f0'
        strokeWidth={0.5}
      />

      {gridYs.map((gy, i) => (
        <Line
          key={`h-${i}`}
          x1={padL}
          x2={padL + plotW}
          y1={gy}
          y2={gy}
          stroke='#ebebeb'
          strokeWidth={0.6}
        />
      ))}

      <Polygon points={polygonPoints} fill={`url(#${GRADIENT_ID})`} stroke='none' />

      <Polyline
        points={depositLinePoints}
        fill='none'
        stroke='#64748b'
        strokeWidth={1.8}
        strokeDasharray='5 5'
      />

      <Polyline
        points={balanceLinePoints}
        fill='none'
        stroke='#059669'
        strokeWidth={2}
      />

      <Line
        x1={padL}
        x2={padL}
        y1={padT}
        y2={padT + plotH}
        stroke='#cbd5e1'
        strokeWidth={1}
      />
      <Line
        x1={padL}
        x2={padL + plotW}
        y1={padT + plotH}
        y2={padT + plotH}
        stroke='#cbd5e1'
        strokeWidth={1}
      />

      {[0, 0.25, 0.5, 0.75, 1].map((t, i) => {
        const val = yTop * (1 - t);
        return (
          <Text
            key={`yt-${i}`}
            x={padL - 5}
            y={padT + t * plotH + 3}
            textAnchor='end'
            style={{
              fontSize: 7,
              fill: '#64748b',
              fontFamily: 'Helvetica',
            }}>
            {formatCompactCurrency(currency, val)}
          </Text>
        );
      })}

      {xTickVals.map((xv, i) => (
        <Text
          key={`xt-${i}`}
          x={sx(xv)}
          y={padT + plotH + 14}
          textAnchor='middle'
          style={{
            fontSize: 7,
            fill: '#64748b',
            fontFamily: 'Helvetica',
          }}>
          {formatElapsedMonthsTick(xv)}
        </Text>
      ))}

      <Text
        x={padL + plotW / 2}
        y={H - 6}
        textAnchor='middle'
        style={{
          fontSize: 7,
          fill: '#64748b',
          fontFamily: 'Helvetica',
        }}>
        {`Elapsed months (~${CHART_MONTH_DAYS} simulated days per step)`}
      </Text>
    </Svg>
  );
}
