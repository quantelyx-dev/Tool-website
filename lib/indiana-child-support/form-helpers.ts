import type { IndianaParentId } from '@/lib/indiana-child-support/types';
import type { IncomeInterval } from '@/lib/schemas/indiana-child-support-schema';

export function formatIncomeIntervalLabel(value: IncomeInterval): string {
  switch (value) {
    case 'weekly':
      return 'Weekly';
    case 'bi-weekly':
      return 'Bi-weekly';
    case 'semi-monthly':
      return 'Semi-monthly';
    case 'monthly':
      return 'Monthly';
    case 'annual':
      return 'Annual';
    default:
      return value;
  }
}

export const PARENT_LABELS: Record<IndianaParentId, string> = {
  parentOne: 'Parent One',
  parentTwo: 'Parent Two',
};
