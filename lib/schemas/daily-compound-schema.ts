import { z } from 'zod';

import { CONTRIBUTION_FREQUENCY_VALUES } from '@/lib/daily-compound-interest/contribution-frequency';
import { parseNonNegativeMoneyString } from '@/lib/daily-compound-interest/form-parsing';
import { SUPPORTED_FIAT_CODES_TUPLE } from '@/lib/daily-compound-interest/supported-fiats';

/** Display / UX bounds (solver may clamp further internally later) */
export const DAILY_COMPOUND_LIMITS = {
  maxAnnualRatePercentExclusive: 1000,
  minAnnualRatePercentExclusive: 0,
  minPrincipalExclusive: 0,
  maxPrincipalInclusive: Number.MAX_SAFE_INTEGER,
  maxContributionInclusive: Number.MAX_SAFE_INTEGER,
  /** Whole years portion of horizon */
  maxYearsInclusive: 100,
  /** 0–11 calendar months layered on top of years */
  maxMonthsInclusive: 11,
  /** Residual calendar days layered on months/years */
  maxExtraDaysInclusive: 366,
  /** Sanity cap on summed horizon (~120y) once converted to approximate days elsewhere */
  minTotalHorizonApproxDaysInclusive: 1,
} as const;

const NON_NEG_INT_REGEX = /^\d+$/;

function parsePositivePercent(raw: string): number | null {
  const n = parseNonNegativeMoneyString(raw);
  if (n === null || n <= DAILY_COMPOUND_LIMITS.minAnnualRatePercentExclusive)
    return null;
  if (n >= DAILY_COMPOUND_LIMITS.maxAnnualRatePercentExclusive) return null;
  return n;
}

const nonNegativeIntString = (fieldLabel: string, maxInclusive: number) =>
  z
    .string()
    .trim()
    .regex(NON_NEG_INT_REGEX, {
      message: `${fieldLabel} must be a whole number (0–${maxInclusive}).`,
    })
    .refine(
      (s) => {
        const n = Number(s);
        return Number.isInteger(n) && n >= 0 && n <= maxInclusive;
      },
      { message: `${fieldLabel} must be between 0 and ${maxInclusive}.` },
    );

export const dailyCompoundCalculatorFormSchema = z
  .object({
    principal: z.string().trim().superRefine((val, ctx) => {
      if (!val.length) {
        ctx.addIssue({
          code: 'custom',
          message: 'Enter a starting principal.',
        });
        return;
      }
      const amount = parseNonNegativeMoneyString(val);
      if (amount === null) {
        ctx.addIssue({
          code: 'custom',
          message:
            'Use digits only, optional decimals. Thousands separators such as commas are allowed.',
        });
        return;
      }
      if (amount <= DAILY_COMPOUND_LIMITS.minPrincipalExclusive) {
        ctx.addIssue({
          code: 'custom',
          message: 'Principal must be greater than zero.',
        });
        return;
      }
      if (amount > DAILY_COMPOUND_LIMITS.maxPrincipalInclusive) {
        ctx.addIssue({
          code: 'custom',
          message: `Principal cannot exceed ${DAILY_COMPOUND_LIMITS.maxPrincipalInclusive.toLocaleString()} (safe arithmetic limit).`,
        });
      }
    }),
    currency: z.enum(SUPPORTED_FIAT_CODES_TUPLE, {
      error: () => ({
        message: 'Choose one of the supported fiat currencies.',
      }),
    }),
    annualRatePercent: z.string().trim().superRefine((val, ctx) => {
      if (!val.length) {
        ctx.addIssue({
          code: 'custom',
          message: 'Enter an annual rate (percent per year).',
        });
        return;
      }
      const rate = parsePositivePercent(val);
      if (rate === null) {
        ctx.addIssue({
          code: 'custom',
          message: `Rate must be a number strictly between ${DAILY_COMPOUND_LIMITS.minAnnualRatePercentExclusive} and ${DAILY_COMPOUND_LIMITS.maxAnnualRatePercentExclusive}%.`,
        });
      }
    }),
    rateBasis: z.enum(['nominal', 'apy'], {
      error: () => ({ message: 'Choose nominal APR-style or APY-style rate.' }),
    }),
    timelineYears: nonNegativeIntString(
      'Years',
      DAILY_COMPOUND_LIMITS.maxYearsInclusive,
    ),
    timelineMonths: nonNegativeIntString(
      'Months',
      DAILY_COMPOUND_LIMITS.maxMonthsInclusive,
    ),
    timelineExtraDays: nonNegativeIntString(
      'Extra days',
      DAILY_COMPOUND_LIMITS.maxExtraDaysInclusive,
    ),
    contributionAmount: z.string().trim().superRefine((val, ctx) => {
      if (!val.length) return;
      const amount = parseNonNegativeMoneyString(val);
      if (amount === null) {
        ctx.addIssue({
          code: 'custom',
          message:
            'Contribution uses digits only, optional decimals (commas allowed).',
        });
        return;
      }
      if (amount < 0) {
        ctx.addIssue({
          code: 'custom',
          message: 'Contribution cannot be negative.',
        });
        return;
      }
      if (amount > DAILY_COMPOUND_LIMITS.maxContributionInclusive) {
        ctx.addIssue({
          code: 'custom',
          message: `Contribution per period cannot exceed ${DAILY_COMPOUND_LIMITS.maxContributionInclusive.toLocaleString()}.`,
        });
      }
    }),
    contributionFrequency: z.enum(CONTRIBUTION_FREQUENCY_VALUES),
    reinvestInterest: z.boolean(),
  })
  .superRefine((data, ctx) => {
    const y = Number(data.timelineYears);
    const m = Number(data.timelineMonths);
    const d = Number(data.timelineExtraDays);

    /** Lower bound approximate duration (months treated as ~30 days) for “needs a horizon” UX */
    const approxDaysLow = y * 365 + m * 30 + d;

    const allZeroTimeline = y === 0 && m === 0 && d === 0;
    const tooSmallHorizon =
      approxDaysLow < DAILY_COMPOUND_LIMITS.minTotalHorizonApproxDaysInclusive &&
      !allZeroTimeline;

    if (allZeroTimeline) {
      ctx.addIssue({
        code: 'custom',
        message:
          'Set at least part of the timeline (years, months, or extra days).',
        path: ['timelineYears'],
      });
      return;
    }

    if (!Number.isFinite(approxDaysLow) || tooSmallHorizon) {
      ctx.addIssue({
        code: 'custom',
        message: 'Increase the horizon to at least one day.',
        path: ['timelineExtraDays'],
      });
    }
  });

export type DailyCompoundFormValues = z.infer<
  typeof dailyCompoundCalculatorFormSchema
>;
