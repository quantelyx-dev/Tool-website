import {
  MAX_CHILDREN,
  SCHEDULE_MIN_INCOME,
  SUBSEQUENT_CHILD_FACTORS,
} from "@/lib/indiana-child-support/guideline-constants";
import { assertFiniteNonNegative, roundMoney } from "@/lib/indiana-child-support/money";
import {
  computeCombinedParentingTimeCredit,
  type ParentingTimeCreditWorksheet,
} from "@/lib/indiana-child-support/parenting-time-credit";
import { lookupBasicChildSupportObligation } from "@/lib/indiana-child-support/schedule-bcso";
import type {
  GuidelineScheduleRow,
  IndianaParentId,
} from "@/lib/indiana-child-support/types";

/** One parent's weekly figures. */
export type IndianaParentInput = {
  /** Line 1. */
  weeklyGrossIncome: number;
  /** Children born or adopted after the children in this order (Line 1A). */
  subsequentChildren: number;
  /** Line 1B. */
  priorBornOrderedSupport: number;
  /** Line 1C. */
  priorBornSupportWithoutOrder: number;
  /** Line 1D. */
  maintenancePaid: number;
  /** Work-related child care this parent pays (Line 4A). */
  childCare: number;
  /** Children's portion of health premiums this parent pays (Line 4B). */
  healthInsurance: number;
};

export type IndianaChildSupportComputationInput = {
  parents: Record<IndianaParentId, IndianaParentInput>;
  /** The parent who pays support and receives the parenting time credit. */
  payor: IndianaParentId;
  /** Annual overnights with the paying parent, one entry per child (1 to 8 children). */
  payorAnnualOvernightsPerChild: readonly number[];
  schedule: readonly GuidelineScheduleRow[];
};

export type IndianaParentWorksheet = {
  weeklyGrossIncome: number;
  subsequentChildAdjustment: number;
  weeklyAdjustedIncome: number;
  /** Line 2, as a fraction rounded to a hundredth of a percent. */
  incomeShare: number;
  /** Line 6. */
  obligation: number;
};

export type IndianaWorksheet = {
  parents: Record<IndianaParentId, IndianaParentWorksheet>;
  /** Line 3. */
  combinedWeeklyAdjustedIncome: number;
  /** Line 4. */
  basicObligation: number;
  childCare: number;
  healthInsurance: number;
  /** Line 5. */
  totalObligation: number;
  /** Line 7D. */
  parentingTimeCredit: number;
  parentingTimeWorksheets: ParentingTimeCreditWorksheet[];
  /** Line 8. Negative means the order runs from the other parent to the payor. */
  recommendedObligation: number;
  payor: IndianaParentId;
  /** Who actually pays after Line 8, and how much per week. */
  weeklyTransfer: number;
  transferFrom: IndianaParentId;
};

export type IndianaChildSupportComputationResult =
  | ({ status: "calculated" } & IndianaWorksheet)
  /** Combined income under $100 a week has no schedule amount. */
  | { status: "case-by-case"; combinedWeeklyAdjustedIncome: number };

export function otherParent(id: IndianaParentId): IndianaParentId {
  return id === "parentOne" ? "parentTwo" : "parentOne";
}

function adjustedIncome(parent: IndianaParentInput) {
  Object.entries(parent).forEach(([name, value]) =>
    assertFiniteNonNegative(value, name),
  );
  const factor =
    SUBSEQUENT_CHILD_FACTORS[
      Math.min(MAX_CHILDREN, Math.trunc(parent.subsequentChildren))
    ] ?? 0;
  const subsequentChildAdjustment = roundMoney(parent.weeklyGrossIncome * factor);
  const weeklyAdjustedIncome = roundMoney(
    Math.max(
      0,
      parent.weeklyGrossIncome -
        subsequentChildAdjustment -
        parent.priorBornOrderedSupport -
        parent.priorBornSupportWithoutOrder -
        parent.maintenancePaid,
    ),
  );
  return {
    weeklyGrossIncome: parent.weeklyGrossIncome,
    subsequentChildAdjustment,
    weeklyAdjustedIncome,
  };
}

/** The Child Support Obligation Worksheet (no post-secondary or split custody lines). */
export function computeIndianaChildSupport({
  parents,
  payor,
  payorAnnualOvernightsPerChild,
  schedule,
}: IndianaChildSupportComputationInput): IndianaChildSupportComputationResult {
  const one = adjustedIncome(parents.parentOne);
  const two = adjustedIncome(parents.parentTwo);
  const combined = roundMoney(one.weeklyAdjustedIncome + two.weeklyAdjustedIncome);

  if (combined < SCHEDULE_MIN_INCOME) {
    return { status: "case-by-case", combinedWeeklyAdjustedIncome: combined };
  }

  const parentOneShare =
    Math.round((one.weeklyAdjustedIncome / combined) * 10_000) / 10_000;
  const shares: Record<IndianaParentId, number> = {
    parentOne: parentOneShare,
    parentTwo: Math.round((1 - parentOneShare) * 10_000) / 10_000,
  };

  const basicObligation = lookupBasicChildSupportObligation(
    combined,
    payorAnnualOvernightsPerChild.length,
    schedule,
  );
  const childCare = roundMoney(parents.parentOne.childCare + parents.parentTwo.childCare);
  const healthInsurance = roundMoney(
    parents.parentOne.healthInsurance + parents.parentTwo.healthInsurance,
  );
  const totalObligation = roundMoney(basicObligation + childCare + healthInsurance);

  const worksheetParents: Record<IndianaParentId, IndianaParentWorksheet> = {
    parentOne: {
      ...one,
      incomeShare: shares.parentOne,
      obligation: roundMoney(shares.parentOne * totalObligation),
    },
    parentTwo: {
      ...two,
      incomeShare: shares.parentTwo,
      obligation: roundMoney(shares.parentTwo * totalObligation),
    },
  };

  const { credit, worksheets } = computeCombinedParentingTimeCredit(
    basicObligation,
    payorAnnualOvernightsPerChild,
    shares[payor],
  );
  const recommendedObligation = roundMoney(
    worksheetParents[payor].obligation -
      parents[payor].childCare -
      parents[payor].healthInsurance -
      credit,
  );

  return {
    status: "calculated",
    parents: worksheetParents,
    combinedWeeklyAdjustedIncome: combined,
    basicObligation,
    childCare,
    healthInsurance,
    totalObligation,
    parentingTimeCredit: credit,
    parentingTimeWorksheets: worksheets,
    recommendedObligation,
    payor,
    weeklyTransfer: Math.abs(recommendedObligation),
    transferFrom: recommendedObligation < 0 ? otherParent(payor) : payor,
  };
}
