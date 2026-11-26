import {
  MAX_CHILDREN,
  OVER_SCHEDULE_PERCENTAGES,
  SCHEDULE_MAX_INCOME,
} from "@/lib/indiana-child-support/guideline-constants";
import { assertFiniteNonNegative, roundMoney } from "@/lib/indiana-child-support/money";
import type { GuidelineScheduleRow } from "@/lib/indiana-child-support/types";

function scheduleChildCount(childCount: number): number {
  const n = Math.trunc(childCount);
  if (n < 1) {
    throw new RangeError("childCount must be at least 1 for schedule lookup.");
  }
  return Math.min(MAX_CHILDREN, n);
}

/**
 * Worksheet Line 4. Guideline 3(D): an income between two schedule amounts uses the
 * nearest one (halfway rounds up). Above $9,200 the schedule gives a percentage of
 * combined weekly adjusted income instead.
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

  const children = scheduleChildCount(childCount);

  if (combinedWeeklyAdjustedIncome > SCHEDULE_MAX_INCOME) {
    return roundMoney(
      combinedWeeklyAdjustedIncome * OVER_SCHEDULE_PERCENTAGES[children]!,
    );
  }

  const nearest = schedule.reduce((best, row) => {
    const distance = Math.abs(row.income - combinedWeeklyAdjustedIncome);
    const bestDistance = Math.abs(best.income - combinedWeeklyAdjustedIncome);
    const closer =
      distance < bestDistance ||
      (distance === bestDistance && row.income > best.income);
    return closer ? row : best;
  });

  return nearest.values[String(children)] ?? 0;
}
