export const PAY_FREQUENCY_OPTIONS = [
  { value: 'weekly', label: 'Weekly', periodsPerYear: 52 },
  { value: 'biweekly', label: 'Every two weeks', periodsPerYear: 26 },
  { value: 'semimonthly', label: 'Twice a month', periodsPerYear: 24 },
  { value: 'monthly', label: 'Monthly', periodsPerYear: 12 },
] as const;

export type PayFrequency = (typeof PAY_FREQUENCY_OPTIONS)[number]['value'];

export const PAY_FREQUENCY_VALUES = PAY_FREQUENCY_OPTIONS.map(
  option => option.value,
) as [PayFrequency, ...PayFrequency[]];

export function getPeriodsPerYear(frequency: PayFrequency): number {
  const option = PAY_FREQUENCY_OPTIONS.find(o => o.value === frequency);
  if (!option) {
    throw new RangeError(`Unknown pay frequency: ${frequency}`);
  }
  return option.periodsPerYear;
}
