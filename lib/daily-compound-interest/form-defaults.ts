import type { ContributionFrequency } from '@/lib/daily-compound-interest/contribution-frequency';

import type { DailyCompoundFormValues } from '@/lib/schemas/daily-compound-schema';

/**
 * Matches {@link DailyCompoundFormValues} for react-hook-form defaults and resets.
 */
export const DAILY_COMPOUND_EMPTY_VALUES: DailyCompoundFormValues = {
  principal: '',
  currency: 'USD',
  annualRatePercent: '',
  rateBasis: 'nominal',
  timelineYears: '0',
  timelineMonths: '0',
  timelineExtraDays: '0',
  contributionAmount: '',
  contributionFrequency: 'monthly' satisfies ContributionFrequency,
  reinvestInterest: true,
};

export const dailyCompoundCalculatorFormDefaults = DAILY_COMPOUND_EMPTY_VALUES;
