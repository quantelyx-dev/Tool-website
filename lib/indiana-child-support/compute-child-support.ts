import { assertFiniteNonNegative, roundMoney } from "@/lib/indiana-child-support/money";
import { computeAverageParentingTimeCreditWeekly } from "@/lib/indiana-child-support/parenting-time-credit";
import { lookupBasicChildSupportObligation } from "@/lib/indiana-child-support/schedule-bcso";
import type { GuidelineScheduleRow } from "@/lib/indiana-child-support/types";
import type { IndianaParentId } from "@/lib/indiana-child-support/types";

export type IndianaChildSupportComputationInput = {
  parentOneWeeklyAdjustedIncome: number;
  parentTwoWeeklyAdjustedIncome: number;
  /** Number of children included in the support calculation (1–8 for the guideline table). */
  numberOfChildren: number;
  /**
   * Annual overnights the **payor** (`weeklySupportPayor`) exercises with each child.
   * Use equal values when the schedule is the same; otherwise values are averaged per Guideline 6.
   */
  payorAnnualOvernightsPerChild: readonly number[];
  /**
   * Parent ordered to pay weekly child support (noncustodial / designated payor, including
   * shared-parenting arrangements where the court names the payor of controlled expenses).
   */
  weeklySupportPayor: IndianaParentId;
  /** Optional additions to Line 5 (child care, health insurance, etc.) — defaults to 0. */
  weeklyAdditionsToObligation?: number;
  schedule: readonly GuidelineScheduleRow[];
};

export type IndianaChildSupportComputationResult = {
  step1: {
    parentOneWeeklyIncome: number;
    parentTwoWeeklyIncome: number;
  };
  step2: { combinedWeeklyIncome: number };
  step3: {
    parentOneIncomeShare: number;
    parentTwoIncomeShare: number;
  };
  step4: { basicChildSupportObligation: number };
  step5: {
    totalWeeklyChildSupportObligation: number;
    parentingTimeCreditWeekly: number;
  };
  step6: {
    payorWeeklyPresupport: number;
    payorWeeklyAfterParentingTimeCredit: number;
    weeklyTransferFromPayorToRecipient: number;
    recipient: IndianaParentId;
  };
};

function incomeShareFractions(
  w1: number,
  w2: number,
): { parentOne: number; parentTwo: number } {
  const sum = w1 + w2;
  if (sum <= 0) {
    return { parentOne: 0.5, parentTwo: 0.5 };
  }
  return {
    parentOne: w1 / sum,
    parentTwo: w2 / sum,
  };
}

/**
 * Indiana guideline worksheet core (Phase 2 — no health-order / post-secondary extras).
 *
 * - Line 4 BCSO from schedule
 * - Line 5 = BCSO + additions (default 0)
 * - Line 6 proportion = income share × Line 5
 * - Line 7 parenting time credit reduces the payor's cash obligation
 */
export function computeIndianaChildSupport(
  input: IndianaChildSupportComputationInput,
): IndianaChildSupportComputationResult {
  const {
    parentOneWeeklyAdjustedIncome: w1,
    parentTwoWeeklyAdjustedIncome: w2,
    numberOfChildren,
    payorAnnualOvernightsPerChild,
    weeklySupportPayor,
    schedule,
  } = input;

  const additions = input.weeklyAdditionsToObligation ?? 0;
  assertFiniteNonNegative(additions, "weeklyAdditionsToObligation");

  const step1 = {
    parentOneWeeklyIncome: roundMoney(w1),
    parentTwoWeeklyIncome: roundMoney(w2),
  };

  const combined = roundMoney(step1.parentOneWeeklyIncome + step1.parentTwoWeeklyIncome);
  const step2 = { combinedWeeklyIncome: combined };

  const shares = incomeShareFractions(step1.parentOneWeeklyIncome, step1.parentTwoWeeklyIncome);
  const step3 = {
    parentOneIncomeShare: roundMoney(shares.parentOne),
    parentTwoIncomeShare: roundMoney(shares.parentTwo),
  };

  const bcso = lookupBasicChildSupportObligation(
    step2.combinedWeeklyIncome,
    numberOfChildren,
    schedule,
  );
  const step4 = { basicChildSupportObligation: bcso };

  const line5 = roundMoney(step4.basicChildSupportObligation + additions);
  const payorShare =
    weeklySupportPayor === "parentOne" ? shares.parentOne : shares.parentTwo;

  const ptc = computeAverageParentingTimeCreditWeekly(
    step4.basicChildSupportObligation,
    payorAnnualOvernightsPerChild,
    payorShare,
  );

  const step5 = {
    totalWeeklyChildSupportObligation: line5,
    parentingTimeCreditWeekly: ptc,
  };

  const payorPresupport = roundMoney(payorShare * line5);
  const payorAfterPtc = roundMoney(Math.max(0, payorPresupport - ptc));

  const recipient: IndianaParentId =
    weeklySupportPayor === "parentOne" ? "parentTwo" : "parentOne";

  return {
    step1,
    step2,
    step3,
    step4,
    step5,
    step6: {
      payorWeeklyPresupport: payorPresupport,
      payorWeeklyAfterParentingTimeCredit: payorAfterPtc,
      weeklyTransferFromPayorToRecipient: payorAfterPtc,
      recipient,
    },
  };
}
