import { postJson } from '@/lib/http';

import type { MonthlySeriesPoint } from '@/lib/daily-compound-interest/compute';
import type { DailyCompoundFormValues } from '@/lib/schemas/daily-compound-schema';

export type DailyCompoundCalculationSuccess = {
  ok: true;
  currency: DailyCompoundFormValues['currency'];
  projection: {
    finalBalance: number;
    totalDeposits: number;
    interestEarned: number;
    simulationDays: number;
  };
  /** Monthly (30-day) samples from the same engine as totals. */
  monthlySeries: MonthlySeriesPoint[];
};

/** Inputs + API result at the time of the last successful run (for exports). */
export type DailyCompoundSavedRun = {
  inputs: DailyCompoundFormValues;
  result: DailyCompoundCalculationSuccess;
};

export type DailyCompoundCalculationFailureBody = {
  ok: false;
  error: string;
  fieldErrors?: Record<string, string[] | undefined>;
};

export type SubmitDailyCompoundCalculationOptions = {
  signal?: AbortSignal;
};

export function submitDailyCompoundCalculation(
  values: DailyCompoundFormValues,
  options?: SubmitDailyCompoundCalculationOptions,
) {
  return postJson<DailyCompoundCalculationSuccess>(
    '/api/daily-compound',
    values,
    { signal: options?.signal },
  );
}
