import { z } from 'zod';

import { parseNonNegativeMoneyString } from '@/lib/daily-compound-interest/form-parsing';
import { annualGrossFromPay } from '@/lib/us-paycheck/compute-paycheck';
import { getPeriodsPerYear, PAY_FREQUENCY_VALUES } from '@/lib/us-paycheck/pay-frequency';
import { STATE_CODES } from '@/lib/us-paycheck/state-tax-data';
import type { FilingStatus } from '@/lib/us-paycheck/federal-tax-data';

export const PAYCHECK_LIMITS = {
  maxAnnualSalary: 100_000_000,
  maxHourlyRate: 100_000,
  maxHoursPerWeek: 168,
  maxCount: 20,
  maxMoney: 100_000_000,
} as const;

const FILING_STATUS_VALUES = ['single', 'married', 'head'] as const satisfies readonly FilingStatus[];

/** Blank is allowed and means zero. */
function optionalNumber(label: string, max: number, integer = false) {
  return z
    .string()
    .trim()
    .superRefine((raw, ctx) => {
      if (!raw) return;
      const value = parseNonNegativeMoneyString(raw);
      if (value === null) {
        ctx.addIssue({ code: 'custom', message: `${label} must be a positive number.` });
        return;
      }
      if (integer && !Number.isInteger(value)) {
        ctx.addIssue({ code: 'custom', message: `${label} must be a whole number.` });
        return;
      }
      if (value > max) {
        ctx.addIssue({ code: 'custom', message: `${label} cannot exceed ${max.toLocaleString('en-US')}.` });
      }
    });
}

function requiredPositive(label: string, max: number) {
  return z
    .string()
    .trim()
    .superRefine((raw, ctx) => {
      const value = parseNonNegativeMoneyString(raw);
      if (value === null || value <= 0) {
        ctx.addIssue({ code: 'custom', message: `Enter ${label}.` });
        return;
      }
      if (value > max) {
        ctx.addIssue({ code: 'custom', message: `Maximum is ${max.toLocaleString('en-US')}.` });
      }
    });
}

export function parseAmount(raw: string): number {
  return parseNonNegativeMoneyString(raw) ?? 0;
}

export const paycheckFormSchema = z
  .object({
    payType: z.enum(['salary', 'hourly']),
    annualSalary: z.string().trim(),
    hourlyRate: z.string().trim(),
    hoursPerWeek: z.string().trim(),
    overtimeHoursPerWeek: optionalNumber('Overtime hours', PAYCHECK_LIMITS.maxHoursPerWeek),
    payFrequency: z.enum(PAY_FREQUENCY_VALUES),
    stateCode: z.enum(STATE_CODES, { message: 'Choose your state.' }),
    filingStatus: z.enum(FILING_STATUS_VALUES),
    qualifyingChildren: optionalNumber('Children', PAYCHECK_LIMITS.maxCount, true),
    otherDependents: optionalNumber('Dependents', PAYCHECK_LIMITS.maxCount, true),
    otherIncome: optionalNumber('Other income', PAYCHECK_LIMITS.maxMoney),
    otherDeductions: optionalNumber('Deductions', PAYCHECK_LIMITS.maxMoney),
    extraWithholding: optionalNumber('Extra withholding', PAYCHECK_LIMITS.maxMoney),
    traditional401kPercent: optionalNumber('401(k) contribution', 100),
    roth401kPercent: optionalNumber('Roth 401(k) contribution', 100),
    age50Plus: z.boolean(),
    healthInsurance: optionalNumber('Health insurance', PAYCHECK_LIMITS.maxMoney),
    hsaFsa: optionalNumber('HSA / FSA', PAYCHECK_LIMITS.maxMoney),
    otherPreTax: optionalNumber('Pre-tax deductions', PAYCHECK_LIMITS.maxMoney),
    otherPostTax: optionalNumber('Post-tax deductions', PAYCHECK_LIMITS.maxMoney),
    otherTaxRatePercent: optionalNumber('Tax rate', 25),
  })
  .superRefine((values, ctx) => {
    if (values.payType === 'salary') {
      const issues = requiredPositive('your annual salary', PAYCHECK_LIMITS.maxAnnualSalary);
      const result = issues.safeParse(values.annualSalary);
      if (!result.success) {
        ctx.addIssue({ code: 'custom', path: ['annualSalary'], message: result.error.issues[0].message });
      }
    } else {
      const rate = requiredPositive('your hourly rate', PAYCHECK_LIMITS.maxHourlyRate).safeParse(values.hourlyRate);
      if (!rate.success) {
        ctx.addIssue({ code: 'custom', path: ['hourlyRate'], message: rate.error.issues[0].message });
      }
      const hours = requiredPositive('hours per week', PAYCHECK_LIMITS.maxHoursPerWeek).safeParse(values.hoursPerWeek);
      if (!hours.success) {
        ctx.addIssue({ code: 'custom', path: ['hoursPerWeek'], message: hours.error.issues[0].message });
      } else if (parseAmount(values.hoursPerWeek) + parseAmount(values.overtimeHoursPerWeek) > PAYCHECK_LIMITS.maxHoursPerWeek) {
        ctx.addIssue({ code: 'custom', path: ['overtimeHoursPerWeek'], message: 'Total weekly hours cannot exceed 168.' });
      }
    }

    if (parseAmount(values.traditional401kPercent) + parseAmount(values.roth401kPercent) > 100) {
      ctx.addIssue({ code: 'custom', path: ['roth401kPercent'], message: 'Combined 401(k) contributions cannot exceed 100%.' });
    }

    const annualGross = annualGrossFromPay({
      payType: values.payType,
      annualSalary: parseAmount(values.annualSalary),
      hourlyRate: parseAmount(values.hourlyRate),
      hoursPerWeek: parseAmount(values.hoursPerWeek),
      overtimeHoursPerWeek: parseAmount(values.overtimeHoursPerWeek),
    });
    const grossPerPaycheck = annualGross / getPeriodsPerYear(values.payFrequency);
    const flatDeductions =
      parseAmount(values.healthInsurance) +
      parseAmount(values.hsaFsa) +
      parseAmount(values.otherPreTax) +
      parseAmount(values.otherPostTax);
    if (grossPerPaycheck > 0 && flatDeductions >= grossPerPaycheck) {
      ctx.addIssue({ code: 'custom', path: ['otherPostTax'], message: 'Deductions per paycheck must be less than gross pay.' });
    }
  });

export type PaycheckFormValues = z.infer<typeof paycheckFormSchema>;
