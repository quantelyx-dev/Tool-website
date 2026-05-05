import { computeIndianaChildSupport } from "@/lib/indiana-child-support/compute-child-support";
import { roundMoney } from "@/lib/indiana-child-support/money";
import { normalizeIntervalPayToWeekly } from "@/lib/indiana-child-support/normalize-income";
import type {
  GuidelineScheduleRow,
  IndianaParentId,
} from "@/lib/indiana-child-support/types";
import type { ChildSupportFormValues } from "@/lib/schemas/indiana-child-support-schema";

/** Approximate annual overnights from guideline parenting-time percentage of the year. */
export function parentingPercentToAnnualOvernights(percent: number): number {
  if (!Number.isFinite(percent)) return 0;
  const n = Math.round((percent / 100) * 365);
  return Math.max(0, Math.min(365, n));
}

/**
 * Under sole/primary custody assumptions, the parent with the **lower** average parenting-time
 * share is treated as the weekly payor (analogous to the noncustodial parent). At ~50/50, Indiana
 * typically requires a court designation; this uses `parentTwo` as a neutral default so the
 * worksheet still runs — treat as illustrative only in equal-time cases.
 */
export function inferWeeklySupportPayor(
  children: ChildSupportFormValues["children"],
): IndianaParentId {
  if (children.length === 0) {
    throw new RangeError("At least one child is required.");
  }

  const avgOne =
    children.reduce((s, row) => s + row.parentOneTime, 0) / children.length;
  const avgTwo =
    children.reduce((s, row) => s + row.parentTwoTime, 0) / children.length;

  if (Math.abs(avgOne - avgTwo) < 0.01) {
    return "parentTwo";
  }

  return avgOne < avgTwo ? "parentOne" : "parentTwo";
}

export function payorAnnualOvernightsPerChildFromForm(
  children: ChildSupportFormValues["children"],
  weeklySupportPayor: IndianaParentId,
): number[] {
  return children.map((row) =>
    parentingPercentToAnnualOvernights(
      weeklySupportPayor === "parentOne" ? row.parentOneTime : row.parentTwoTime,
    ),
  );
}

export type IndianaNormalizedFormInput = {
  parentOneWeeklyAdjustedIncome: number;
  parentTwoWeeklyAdjustedIncome: number;
  numberOfChildren: number;
  payorAnnualOvernightsPerChild: number[];
  weeklySupportPayor: IndianaParentId;
};

export function transformFormData(
  formData: ChildSupportFormValues,
): IndianaNormalizedFormInput {
  const weeklySupportPayor = inferWeeklySupportPayor(formData.children);

  return {
    parentOneWeeklyAdjustedIncome: normalizeIntervalPayToWeekly(
      formData.parentOneNetIncome,
      formData.parentOneIncomeInterval,
    ),
    parentTwoWeeklyAdjustedIncome: normalizeIntervalPayToWeekly(
      formData.parentTwoNetIncome,
      formData.parentTwoIncomeInterval,
    ),
    numberOfChildren: formData.children.length,
    payorAnnualOvernightsPerChild: payorAnnualOvernightsPerChildFromForm(
      formData.children,
      weeklySupportPayor,
    ),
    weeklySupportPayor,
  };
}

/** Weekly obligation × 52 ÷ 12 (common worksheet monthly equivalent). */
export function weeklySupportToMonthlyApproximate(weekly: number): number {
  return roundMoney((weekly * 52) / 12);
}

export function calculateChildSupport(
  normalized: IndianaNormalizedFormInput,
  schedule: readonly GuidelineScheduleRow[],
) {
  return computeIndianaChildSupport({
    parentOneWeeklyAdjustedIncome: normalized.parentOneWeeklyAdjustedIncome,
    parentTwoWeeklyAdjustedIncome: normalized.parentTwoWeeklyAdjustedIncome,
    numberOfChildren: Math.min(8, Math.max(1, normalized.numberOfChildren)),
    payorAnnualOvernightsPerChild: normalized.payorAnnualOvernightsPerChild,
    weeklySupportPayor: normalized.weeklySupportPayor,
    schedule,
  });
}
