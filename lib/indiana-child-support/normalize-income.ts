import type { IncomeInterval } from "@/lib/schemas/indiana-child-support-schema";

import { assertFiniteNonNegative, roundMoney } from "@/lib/indiana-child-support/money";

/**
 * Convert a periodic pay figure to an equivalent **weekly** amount using Indiana
 * worksheet conventions (52 weeks / year, 26 bi-weekly, 24 semi-monthly pay dates).
 */
export function normalizeIntervalPayToWeekly(
  amount: number,
  interval: IncomeInterval,
): number {
  assertFiniteNonNegative(amount, "amount");

  let weekly: number;
  switch (interval) {
    case "weekly":
      weekly = amount;
      break;
    case "bi-weekly":
      weekly = (amount * 26) / 52;
      break;
    case "semi-monthly":
      weekly = (amount * 24) / 52;
      break;
    case "monthly":
      weekly = (amount * 12) / 52;
      break;
    case "annual":
      weekly = amount / 52;
      break;
    default: {
      const _bad: never = interval;
      throw new Error(`Unknown income interval: ${_bad}`);
    }
  }

  return roundMoney(weekly);
}
