import {
  computeIndianaChildSupport,
  type IndianaParentInput,
} from "@/lib/indiana-child-support/compute-child-support";
import { roundMoney } from "@/lib/indiana-child-support/money";
import { normalizeIntervalPayToWeekly } from "@/lib/indiana-child-support/normalize-income";
import type { GuidelineScheduleRow } from "@/lib/indiana-child-support/types";
import type {
  ChildSupportFormValues,
  ChildSupportParentValues,
} from "@/lib/schemas/indiana-child-support-schema";

/** Only gross income is entered per interval; the other amounts are already weekly. */
function toParentInput({
  incomeInterval,
  grossIncome,
  ...weeklyAmounts
}: ChildSupportParentValues): IndianaParentInput {
  return {
    ...weeklyAmounts,
    weeklyGrossIncome: normalizeIntervalPayToWeekly(grossIncome, incomeInterval),
  };
}

export function calculateChildSupport(
  values: ChildSupportFormValues,
  schedule: readonly GuidelineScheduleRow[],
) {
  return computeIndianaChildSupport({
    parents: {
      parentOne: toParentInput(values.parentOne),
      parentTwo: toParentInput(values.parentTwo),
    },
    payor: values.payor,
    payorAnnualOvernightsPerChild: values.children.map(
      (child) => child.payorOvernights,
    ),
    schedule,
  });
}

/** Weekly amount × 52 ÷ 12. Indiana orders themselves are stated weekly. */
export function weeklySupportToMonthlyApproximate(weekly: number): number {
  return roundMoney((weekly * 52) / 12);
}
