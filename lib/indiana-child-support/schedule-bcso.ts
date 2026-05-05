import type { GuidelineScheduleRow } from "@/lib/indiana-child-support/types";

import { assertFiniteNonNegative, roundMoney } from "@/lib/indiana-child-support/money";

function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

function scheduleKey(childCount: number): string {
  const n = Math.trunc(childCount);
  if (n < 1) {
    throw new RangeError("childCount must be at least 1 for schedule lookup.");
  }
  return String(Math.min(8, n));
}

/**
 * Linear interpolation of BCSO between bracket rows (combined income is stepped every $10
 * in `schedule.json`). Extrapolates using the slope of the last two rows when combined income
 * exceeds the table maximum.
 */
export function lookupBasicChildSupportObligation(
  combinedWeeklyAdjustedIncome: number,
  childCount: number,
  schedule: readonly GuidelineScheduleRow[],
): number {
  assertFiniteNonNegative(
    combinedWeeklyAdjustedIncome,
    "combinedWeeklyAdjustedIncome",
  );

  if (schedule.length === 0) {
    throw new Error("schedule must contain at least one row.");
  }

  const key = scheduleKey(childCount);
  const rows = [...schedule].sort((x, y) => x.income - y.income);
  const first = rows[0]!;
  const last = rows[rows.length - 1]!;

  if (combinedWeeklyAdjustedIncome <= first.income) {
    return roundMoney(first.values[key] ?? 0);
  }

  if (combinedWeeklyAdjustedIncome > last.income) {
    if (rows.length < 2) {
      return roundMoney(last.values[key] ?? 0);
    }
    const prev = rows[rows.length - 2]!;
    const vLast = last.values[key] ?? 0;
    const vPrev = prev.values[key] ?? 0;
    const slope = (vLast - vPrev) / (last.income - prev.income);
    const extrapolated =
      vLast + slope * (combinedWeeklyAdjustedIncome - last.income);
    return roundMoney(Math.max(0, extrapolated));
  }

  if (combinedWeeklyAdjustedIncome === last.income) {
    return roundMoney(last.values[key] ?? 0);
  }

  let i = 0;
  while (i < rows.length - 1 && combinedWeeklyAdjustedIncome > rows[i + 1]!.income) {
    i++;
  }

  const low = rows[i]!;
  const high = rows[i + 1]!;
  const t =
    (combinedWeeklyAdjustedIncome - low.income) / (high.income - low.income);
  const vLow = low.values[key] ?? 0;
  const vHigh = high.values[key] ?? 0;

  return roundMoney(lerp(vLow, vHigh, t));
}
