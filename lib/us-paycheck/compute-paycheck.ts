import {
  applyBrackets,
  FEDERAL_BRACKETS,
  FEDERAL_STANDARD_DEDUCTION,
  FULL_TIME_HOURS_PER_YEAR,
  OVERTIME_MULTIPLIER,
  PAYROLL_TAX,
  RETIREMENT_LIMITS,
  TAX_CREDIT_PER_CHILD,
  TAX_CREDIT_PER_OTHER_DEPENDENT,
  WEEKS_PER_YEAR,
  type FilingStatus,
} from '@/lib/us-paycheck/federal-tax-data';
import { roundMoney } from '@/lib/indiana-child-support/money';
import {
  getStateRule,
  statusIndex,
  type StateTaxRule,
} from '@/lib/us-paycheck/state-tax-data';

export type PayType = 'salary' | 'hourly';

export type GrossPayInputs = {
  payType: PayType;
  annualSalary: number;
  hourlyRate: number;
  hoursPerWeek: number;
  overtimeHoursPerWeek: number;
};

export type PaycheckInputs = {
  annualGross: number;
  periodsPerYear: number;
  stateCode: string;
  filingStatus: FilingStatus;
  qualifyingChildren: number;
  otherDependents: number;
  /** W-4 step 4(a), annual. */
  otherIncome: number;
  /** W-4 step 4(b), annual. */
  otherDeductions: number;
  /** W-4 step 4(c), per paycheck. */
  extraWithholding: number;
  traditional401kPercent: number;
  roth401kPercent: number;
  age50Plus: boolean;
  /** Per paycheck. */
  healthInsurance: number;
  hsaFsa: number;
  otherPreTax: number;
  otherPostTax: number;
  otherTaxRatePercent: number;
};

export type PaycheckAmounts = {
  gross: number;
  traditional401k: number;
  healthInsurance: number;
  hsaFsa: number;
  otherPreTax: number;
  federalIncomeTax: number;
  socialSecurity: number;
  medicare: number;
  additionalMedicare: number;
  stateIncomeTax: number;
  otherStateLocal: number;
  roth401k: number;
  otherPostTax: number;
  net: number;
};

export type PaycheckResult = {
  /** Unrounded annual figures; scale with `scaleAmounts` for display. */
  annual: PaycheckAmounts;
  periodsPerYear: number;
  effectiveTaxRate: number;
  marginalFederalRate: number;
  retirementCapped: boolean;
  state: StateTaxRule;
};

export function annualGrossFromPay(pay: GrossPayInputs): number {
  if (pay.payType === 'salary') {
    return pay.annualSalary;
  }
  const regular = pay.hourlyRate * pay.hoursPerWeek;
  const overtime = pay.hourlyRate * OVERTIME_MULTIPLIER * pay.overtimeHoursPerWeek;
  return (regular + overtime) * WEEKS_PER_YEAR;
}

export function hoursPerYear(pay: GrossPayInputs): number {
  if (pay.payType === 'salary') {
    return FULL_TIME_HOURS_PER_YEAR;
  }
  return (pay.hoursPerWeek + pay.overtimeHoursPerWeek) * WEEKS_PER_YEAR;
}

function computeStateIncomeTax(
  rule: StateTaxRule,
  filingStatus: FilingStatus,
  stateWages: number,
): number {
  if (!rule.brackets) return 0;

  const index = statusIndex(filingStatus);
  const brackets = index === 1 ? rule.brackets.married : rule.brackets.single;

  let exemption = rule.personalExemption?.[index] ?? 0;
  if (rule.exemptionPhaseOutStart) {
    const excess = Math.max(0, stateWages - rule.exemptionPhaseOutStart[index]);
    exemption = Math.max(0, exemption - excess);
  }

  const deductions = (rule.standardDeduction?.[index] ?? 0) + exemption;
  const { tax } = applyBrackets(Math.max(0, stateWages - deductions), brackets);

  let credit = rule.credit?.[index] ?? 0;
  if (rule.creditPhaseOut) {
    const excess = Math.max(0, stateWages - rule.creditPhaseOut.start[index]);
    credit = Math.max(0, credit - excess * rule.creditPhaseOut.rate);
  }

  return Math.max(0, tax - credit);
}

export function computePaycheck(input: PaycheckInputs): PaycheckResult {
  const periods = input.periodsPerYear;
  const gross = input.annualGross;
  const state = getStateRule(input.stateCode);

  const deferralLimit = input.age50Plus
    ? RETIREMENT_LIMITS.employee401kCatchUp
    : RETIREMENT_LIMITS.employee401k;
  const traditionalWanted = (gross * input.traditional401kPercent) / 100;
  const rothWanted = (gross * input.roth401kPercent) / 100;
  const traditional401k = Math.min(traditionalWanted, deferralLimit);
  const roth401k = Math.min(rothWanted, deferralLimit - traditional401k);
  const retirementCapped =
    traditional401k < traditionalWanted || roth401k < rothWanted;

  const healthInsurance = input.healthInsurance * periods;
  const hsaFsa = input.hsaFsa * periods;
  const otherPreTax = input.otherPreTax * periods;
  const section125 = healthInsurance + hsaFsa + otherPreTax;

  // Section 125 deductions escape FICA; 401(k) deferrals do not.
  const ficaWages = Math.max(0, gross - section125);
  const socialSecurity =
    Math.min(ficaWages, PAYROLL_TAX.socialSecurityWageBase) *
    PAYROLL_TAX.socialSecurityRate;
  const medicare = ficaWages * PAYROLL_TAX.medicareRate;
  const additionalMedicare =
    Math.max(0, ficaWages - PAYROLL_TAX.additionalMedicareThreshold) *
    PAYROLL_TAX.additionalMedicareRate;

  const federalWages =
    gross -
    traditional401k -
    section125 +
    input.otherIncome -
    input.otherDeductions;
  const federalTaxable = Math.max(
    0,
    federalWages - FEDERAL_STANDARD_DEDUCTION[input.filingStatus],
  );
  const { tax: bracketTax, marginalRate } = applyBrackets(
    federalTaxable,
    FEDERAL_BRACKETS[input.filingStatus],
  );
  const credits =
    input.qualifyingChildren * TAX_CREDIT_PER_CHILD +
    input.otherDependents * TAX_CREDIT_PER_OTHER_DEPENDENT;
  const federalIncomeTax =
    Math.max(0, bracketTax - credits) + input.extraWithholding * periods;

  const stateWages =
    gross - section125 - (state.taxes401k ? 0 : traditional401k);
  const stateIncomeTax = computeStateIncomeTax(
    state,
    input.filingStatus,
    Math.max(0, stateWages),
  );
  const otherStateLocal = (gross * input.otherTaxRatePercent) / 100;
  const otherPostTax = input.otherPostTax * periods;

  const taxes =
    federalIncomeTax +
    socialSecurity +
    medicare +
    additionalMedicare +
    stateIncomeTax +
    otherStateLocal;

  const annual: PaycheckAmounts = {
    gross,
    traditional401k,
    healthInsurance,
    hsaFsa,
    otherPreTax,
    federalIncomeTax,
    socialSecurity,
    medicare,
    additionalMedicare,
    stateIncomeTax,
    otherStateLocal,
    roth401k,
    otherPostTax,
    net: 0,
  };
  annual.net =
    gross -
    traditional401k -
    section125 -
    taxes -
    roth401k -
    otherPostTax;

  return {
    annual,
    periodsPerYear: periods,
    effectiveTaxRate: gross > 0 ? taxes / gross : 0,
    marginalFederalRate: marginalRate,
    retirementCapped,
    state,
  };
}

/** Divide annual figures into a display period; rounded lines always sum to net. */
export function scaleAmounts(
  annual: PaycheckAmounts,
  divisor: number,
): PaycheckAmounts {
  const scaled = {} as PaycheckAmounts;
  (Object.keys(annual) as (keyof PaycheckAmounts)[]).forEach(key => {
    scaled[key] = roundMoney(annual[key] / divisor);
  });
  scaled.net = roundMoney(
    scaled.gross - totalDeductions(scaled) - totalTaxes(scaled),
  );
  return scaled;
}

export function totalTaxes(a: PaycheckAmounts): number {
  return (
    a.federalIncomeTax +
    a.socialSecurity +
    a.medicare +
    a.additionalMedicare +
    a.stateIncomeTax +
    a.otherStateLocal
  );
}

export function totalDeductions(a: PaycheckAmounts): number {
  return (
    a.traditional401k +
    a.healthInsurance +
    a.hsaFsa +
    a.otherPreTax +
    a.roth401k +
    a.otherPostTax
  );
}
