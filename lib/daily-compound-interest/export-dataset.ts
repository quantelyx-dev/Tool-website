import { DateTime } from 'luxon';

import type { DailyCompoundSavedRun } from '@/lib/daily-compound-interest/api';
import { CONTRIBUTION_FREQUENCY_LABELS } from '@/lib/daily-compound-interest/contribution-frequency';

/** ISO-8601 instant (UTC) suitable for “Generated” metadata in exports. */
export function compoundExportGeneratedAtUtcIso(): string {
  const iso = DateTime.utc().toISO();
  return iso ?? '';
}

export const EXPORT_MONTHLY_COLUMNS = [
  'Simulated day',
  'Elapsed months',
  'Balance',
  'Cumulative deposits',
] as const;

const RATE_BASIS_LABELS = {
  nominal: 'Nominal annual (APR-style)',
  apy: 'Effective annual (APY)',
} as const;

/** Two-column pairs + blank separators (mirror XLSX “Summary” sheet). */
export function buildDailyCompoundSummaryAoA(
  saved: DailyCompoundSavedRun,
): (string | number)[][] {
  const { inputs, result } = saved;
  const { projection } = result;

  return [
    ['Daily compound interest — projection export'],
    ['Generated (UTC)', compoundExportGeneratedAtUtcIso()],
    [],
    ['Inputs'],
    ['Principal (as entered)', inputs.principal],
    ['Currency', inputs.currency],
    ['Annual rate % (as entered)', inputs.annualRatePercent],
    ['Rate basis', RATE_BASIS_LABELS[inputs.rateBasis]],
    ['Horizon — years', inputs.timelineYears],
    ['Horizon — months', inputs.timelineMonths],
    ['Horizon — extra days', inputs.timelineExtraDays],
    ['Contribution amount (as entered)', inputs.contributionAmount],
    [
      'Contribution frequency',
      CONTRIBUTION_FREQUENCY_LABELS[inputs.contributionFrequency],
    ],
    ['Reinvest interest daily', inputs.reinvestInterest ? 'Yes' : 'No'],
    [],
    ['Projection'],
    ['Simulation days', projection.simulationDays],
    ['Final balance', projection.finalBalance],
    ['Total deposits', projection.totalDeposits],
    ['Interest earned', projection.interestEarned],
  ];
}

/** Header labels + numeric rows for the monthly snapshots table (XLSX “Monthly samples”). */
export function buildDailyCompoundMonthlyTable(saved: DailyCompoundSavedRun): {
  headers: readonly string[];
  rows: number[][];
} {
  return {
    headers: EXPORT_MONTHLY_COLUMNS,
    rows: saved.result.monthlySeries.map((row) => [
      row.simulatedDay,
      row.elapsedMonths,
      row.balance,
      row.cumulativeDeposits,
    ]),
  };
}

export function safeCompoundExportFilenameSegment(raw: string): string {
  return raw.replace(/[^a-zA-Z0-9._-]+/g, '_').slice(0, 64);
}

/** Local-calendar `yyyyMMdd` for download filenames (same intent as legacy `Date` stamp). */
export function compoundExportDateStamp(now: DateTime = DateTime.now()): string {
  return now.toFormat('yyyyMMdd');
}
