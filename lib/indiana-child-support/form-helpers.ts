import { CHILD_TIME_PRESETS } from '@/lib/indiana-child-support/form-defaults';
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

export function roundShare(n: number): number {
  return Math.round(n * 100) / 100;
}

export function nearestPreset(value: number): number {
  if (!Number.isFinite(value)) return 50;
  return CHILD_TIME_PRESETS.reduce((best, p) =>
    Math.abs(p - value) < Math.abs(best - value) ? p : best,
  );
}

export function sortedSharesForSelect(current: number): number[] {
  if (!Number.isFinite(current)) {
    return [...CHILD_TIME_PRESETS];
  }
  const rounded = roundShare(current);
  const inList = CHILD_TIME_PRESETS.some(p => Math.abs(p - rounded) < 0.000_01);
  const merged = inList
    ? [...CHILD_TIME_PRESETS]
    : [...CHILD_TIME_PRESETS, rounded].sort((a, b) => a - b);
  return merged;
}
