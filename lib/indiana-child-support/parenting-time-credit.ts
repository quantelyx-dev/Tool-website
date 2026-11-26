import {
  assertFiniteNonNegative,
  roundMoney,
} from '@/lib/indiana-child-support/money';
import { lookupTablePt } from '@/lib/indiana-child-support/table-pt';

export type ParentingTimeCreditInput = {
  /** Weekly Basic Child Support Obligation (Worksheet Line 4). */
  basicChildSupportObligation: number;
  /** Annual overnights the paying parent exercises. */
  payorAnnualOvernights: number;
  /** Paying parent's share of combined weekly adjusted income, 0 to 1. */
  payorIncomeShareFraction: number;
};

/** Lines 1PT to 9PT of the Parenting Time Credit Worksheet. */
export type ParentingTimeCreditWorksheet = {
  overnights: number;
  totalFraction: number;
  duplicatedFraction: number;
  totalExpenses: number;
  duplicatedExpenses: number;
  payorShareOfDuplicated: number;
  credit: number;
};

export function computeParentingTimeCreditWorksheet({
  basicChildSupportObligation: bcso,
  payorAnnualOvernights,
  payorIncomeShareFraction,
}: ParentingTimeCreditInput): ParentingTimeCreditWorksheet {
  assertFiniteNonNegative(bcso, 'basicChildSupportObligation');
  if (
    !Number.isFinite(payorIncomeShareFraction) ||
    payorIncomeShareFraction < 0 ||
    payorIncomeShareFraction > 1
  ) {
    throw new RangeError('payorIncomeShareFraction must be between 0 and 1.');
  }

  const { total, duplicated } = lookupTablePt(payorAnnualOvernights);
  const totalExpenses = roundMoney(bcso * total);
  const duplicatedExpenses = roundMoney(bcso * duplicated);
  const payorShareOfDuplicated = roundMoney(
    payorIncomeShareFraction * duplicatedExpenses,
  );

  return {
    overnights: payorAnnualOvernights,
    totalFraction: total,
    duplicatedFraction: duplicated,
    totalExpenses,
    duplicatedExpenses,
    payorShareOfDuplicated,
    credit: roundMoney(totalExpenses - payorShareOfDuplicated),
  };
}

/**
 * Guideline 6, children with different overnights: work out the credit once for each
 * different overnight number (as if all children had it), then average those amounts.
 */
export function computeCombinedParentingTimeCredit(
  basicChildSupportObligation: number,
  payorAnnualOvernightsPerChild: readonly number[],
  payorIncomeShareFraction: number,
): { credit: number; worksheets: ParentingTimeCreditWorksheet[] } {
  if (payorAnnualOvernightsPerChild.length === 0) {
    throw new RangeError('payorAnnualOvernightsPerChild must not be empty.');
  }

  const worksheets = [...new Set(payorAnnualOvernightsPerChild)].map(overnights =>
    computeParentingTimeCreditWorksheet({
      basicChildSupportObligation,
      payorAnnualOvernights: overnights,
      payorIncomeShareFraction,
    }),
  );
  const sum = worksheets.reduce((total, sheet) => total + sheet.credit, 0);

  return { credit: roundMoney(sum / worksheets.length), worksheets };
}
