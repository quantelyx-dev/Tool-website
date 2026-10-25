export type FilingStatus = 'single' | 'married' | 'head';

/** `[lowerBound, rate]` — rate applies to income above `lowerBound` until the next entry. */
export type TaxBracket = readonly [number, number];

export const FILING_STATUS_OPTIONS: readonly {
  value: FilingStatus;
  label: string;
}[] = [
  { value: 'single', label: 'Single or married filing separately' },
  { value: 'married', label: 'Married filing jointly' },
  { value: 'head', label: 'Head of household' },
];

export const FEDERAL_TAX_YEAR = 2026;

export const FEDERAL_STANDARD_DEDUCTION: Record<FilingStatus, number> = {
  single: 16_100,
  married: 32_200,
  head: 24_150,
};

export const FEDERAL_BRACKETS: Record<FilingStatus, readonly TaxBracket[]> = {
  single: [
    [0, 0.1],
    [12_400, 0.12],
    [50_400, 0.22],
    [105_700, 0.24],
    [201_775, 0.32],
    [256_225, 0.35],
    [640_600, 0.37],
  ],
  married: [
    [0, 0.1],
    [24_800, 0.12],
    [100_800, 0.22],
    [211_400, 0.24],
    [403_550, 0.32],
    [512_450, 0.35],
    [768_700, 0.37],
  ],
  head: [
    [0, 0.1],
    [17_700, 0.12],
    [67_450, 0.22],
    [105_700, 0.24],
    [201_750, 0.32],
    [256_200, 0.35],
    [640_600, 0.37],
  ],
};

export const PAYROLL_TAX = {
  socialSecurityRate: 0.062,
  socialSecurityWageBase: 184_500,
  medicareRate: 0.0145,
  additionalMedicareRate: 0.009,
  additionalMedicareThreshold: 200_000,
} as const;

export const TAX_CREDIT_PER_CHILD = 2_200;
export const TAX_CREDIT_PER_OTHER_DEPENDENT = 500;

export const RETIREMENT_LIMITS = {
  employee401k: 24_500,
  employee401kCatchUp: 32_500,
} as const;

/** Standard hours used to express salaried pay as an hourly figure. */
export const FULL_TIME_HOURS_PER_YEAR = 2_080;
export const OVERTIME_MULTIPLIER = 1.5;
export const WEEKS_PER_YEAR = 52;

/** Progressive tax on `taxableIncome` and the rate of the bracket it tops out in. */
export function applyBrackets(
  taxableIncome: number,
  brackets: readonly TaxBracket[],
): { tax: number; marginalRate: number } {
  if (taxableIncome <= 0) {
    return { tax: 0, marginalRate: brackets[0]?.[1] ?? 0 };
  }

  let tax = 0;
  let marginalRate = brackets[0][1];

  for (let i = 0; i < brackets.length; i += 1) {
    const [lower, rate] = brackets[i];
    const upper = brackets[i + 1]?.[0] ?? Infinity;
    if (taxableIncome <= lower) break;
    tax += (Math.min(taxableIncome, upper) - lower) * rate;
    marginalRate = rate;
  }

  return { tax, marginalRate };
}
