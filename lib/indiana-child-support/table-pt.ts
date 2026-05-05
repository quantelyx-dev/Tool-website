import { assertFiniteNonNegative } from "@/lib/indiana-child-support/money";

/**
 * Parenting Time Table (Table PT) — annual overnight ranges and fractions of the
 * Basic Child Support Obligation. Source: Indiana Child Support Guideline 6 /
 * Parenting Time Credit commentary (verify against current rules.incourts.gov).
 */

export type TablePtRow = {
  from: number;
  to: number;
  /** Total parenting-time-related expenses as a fraction of BCSO */
  total: number;
  /** Duplicated expenses as a fraction of BCSO */
  duplicated: number;
};

export const TABLE_PT: readonly TablePtRow[] = [
  { from: 1, to: 51, total: 0.0, duplicated: 0.0 },
  { from: 52, to: 55, total: 0.063, duplicated: 0.011 },
  { from: 56, to: 60, total: 0.071, duplicated: 0.014 },
  { from: 61, to: 65, total: 0.081, duplicated: 0.02 },
  { from: 66, to: 70, total: 0.094, duplicated: 0.028 },
  { from: 71, to: 75, total: 0.109, duplicated: 0.038 },
  { from: 76, to: 80, total: 0.129, duplicated: 0.053 },
  { from: 81, to: 85, total: 0.152, duplicated: 0.071 },
  { from: 86, to: 90, total: 0.18, duplicated: 0.094 },
  { from: 91, to: 95, total: 0.213, duplicated: 0.123 },
  { from: 96, to: 100, total: 0.253, duplicated: 0.158 },
  { from: 101, to: 105, total: 0.297, duplicated: 0.197 },
  { from: 106, to: 110, total: 0.344, duplicated: 0.239 },
  { from: 111, to: 115, total: 0.392, duplicated: 0.283 },
  { from: 116, to: 120, total: 0.438, duplicated: 0.324 },
  { from: 121, to: 125, total: 0.481, duplicated: 0.362 },
  { from: 126, to: 130, total: 0.518, duplicated: 0.394 },
  { from: 131, to: 135, total: 0.549, duplicated: 0.421 },
  { from: 136, to: 140, total: 0.575, duplicated: 0.442 },
  { from: 141, to: 145, total: 0.597, duplicated: 0.459 },
  { from: 146, to: 150, total: 0.615, duplicated: 0.472 },
  { from: 151, to: 155, total: 0.629, duplicated: 0.481 },
  { from: 156, to: 160, total: 0.641, duplicated: 0.488 },
  { from: 161, to: 165, total: 0.651, duplicated: 0.493 },
  { from: 166, to: 170, total: 0.659, duplicated: 0.496 },
  { from: 171, to: 175, total: 0.667, duplicated: 0.499 },
  { from: 176, to: 180, total: 0.673, duplicated: 0.5 },
  { from: 181, to: 183, total: 0.682, duplicated: 0.505 },
] as const;

export function lookupTablePt(annualOvernights: number): TablePtRow {
  assertFiniteNonNegative(annualOvernights, "annualOvernights");

  const n = Math.floor(annualOvernights);
  for (const row of TABLE_PT) {
    if (n >= row.from && n <= row.to) {
      return row;
    }
  }

  // Above documented range (e.g. >183) — use equal-parenting row per commentary edge band.
  return TABLE_PT[TABLE_PT.length - 1]!;
}
