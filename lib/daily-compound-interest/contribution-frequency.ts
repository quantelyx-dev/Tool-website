/** How often recurring contributions are deposited */
export const CONTRIBUTION_FREQUENCY_VALUES = [
  'daily',
  'weekly',
  'biweekly',
  'monthly',
  'quarterly',
] as const;

export type ContributionFrequency =
  (typeof CONTRIBUTION_FREQUENCY_VALUES)[number];

export const CONTRIBUTION_FREQUENCY_LABELS: Record<ContributionFrequency, string> =
  {
    daily: 'Daily',
    weekly: 'Weekly',
    biweekly: 'Bi-weekly',
    monthly: 'Monthly',
    quarterly: 'Quarterly',
  };
