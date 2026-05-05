import {
  assertFiniteNonNegative,
  roundMoney,
} from '@/lib/indiana-child-support/money';
import { lookupTablePt } from '@/lib/indiana-child-support/table-pt';

export type ParentingTimeCreditInput = {
  /** Weekly Basic Child Support Obligation (Worksheet Line 4). */
  basicChildSupportObligation: number;
  /** Annual overnights the payor exercises with the child (for this credit row). */
  payorAnnualOvernights: number;
  /**
   * Payor's share of combined weekly adjusted income as a **fraction** 0–1
   * (Worksheet Line 3 as decimal — same factor used on Parenting Time Credit worksheet Line 5PT).
   */
  payorIncomeShareFraction: number;
};

/**
 * Parenting Time Credit worksheet (condensed):
 * - 6PT = BCSO × Total (Table PT)
 * - 7PT = BCSO × Duplicated
 * - 8PT = PayorIncomeShare × 7PT
 * - PTC (9PT) = 6PT − 8PT
 */
export function computeParentingTimeCreditWeekly(
  input: ParentingTimeCreditInput,
): number {
  const {
    basicChildSupportObligation: bcso,
    payorAnnualOvernights,
    payorIncomeShareFraction,
  } = input;

  assertFiniteNonNegative(bcso, 'basicChildSupportObligation');
  if (
    !Number.isFinite(payorIncomeShareFraction) ||
    payorIncomeShareFraction < 0 ||
    payorIncomeShareFraction > 1
  ) {
    throw new RangeError('payorIncomeShareFraction must be between 0 and 1.');
  }

  const { total, duplicated } = lookupTablePt(payorAnnualOvernights);
  const line6Pt = bcso * total;
  const line7Pt = bcso * duplicated;
  const line8Pt = payorIncomeShareFraction * line7Pt;
  return roundMoney(line6Pt - line8Pt);
}

/** Guideline 6: average PTC when children have different overnight amounts with the payor. */
export function computeAverageParentingTimeCreditWeekly(
  basicChildSupportObligation: number,
  payorAnnualOvernightsPerChild: readonly number[],
  payorIncomeShareFraction: number,
): number {
  if (payorAnnualOvernightsPerChild.length === 0) {
    throw new RangeError('payorAnnualOvernightsPerChild must not be empty.');
  }

  const credits = payorAnnualOvernightsPerChild.map(o =>
    computeParentingTimeCreditWeekly({
      basicChildSupportObligation,
      payorAnnualOvernights: o,
      payorIncomeShareFraction,
    }),
  );

  const sum = credits.reduce((a, b) => a + b, 0);
  return roundMoney(sum / credits.length);
}
