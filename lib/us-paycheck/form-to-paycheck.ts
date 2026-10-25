import { parseAmount, type PaycheckFormValues } from '@/lib/schemas/us-paycheck-schema';
import {
  annualGrossFromPay,
  hoursPerYear,
  type GrossPayInputs,
  type PaycheckInputs,
} from '@/lib/us-paycheck/compute-paycheck';
import { getPeriodsPerYear } from '@/lib/us-paycheck/pay-frequency';

export function toGrossPayInputs(values: PaycheckFormValues): GrossPayInputs {
  return {
    payType: values.payType,
    annualSalary: parseAmount(values.annualSalary),
    hourlyRate: parseAmount(values.hourlyRate),
    hoursPerWeek: parseAmount(values.hoursPerWeek),
    overtimeHoursPerWeek: parseAmount(values.overtimeHoursPerWeek),
  };
}

export function toPaycheckInputs(values: PaycheckFormValues): {
  inputs: PaycheckInputs;
  hoursPerYear: number;
} {
  const pay = toGrossPayInputs(values);
  return {
    hoursPerYear: hoursPerYear(pay),
    inputs: {
      annualGross: annualGrossFromPay(pay),
      periodsPerYear: getPeriodsPerYear(values.payFrequency),
      stateCode: values.stateCode,
      filingStatus: values.filingStatus,
      qualifyingChildren: parseAmount(values.qualifyingChildren),
      otherDependents: parseAmount(values.otherDependents),
      otherIncome: parseAmount(values.otherIncome),
      otherDeductions: parseAmount(values.otherDeductions),
      extraWithholding: parseAmount(values.extraWithholding),
      traditional401kPercent: parseAmount(values.traditional401kPercent),
      roth401kPercent: parseAmount(values.roth401kPercent),
      age50Plus: values.age50Plus,
      healthInsurance: parseAmount(values.healthInsurance),
      hsaFsa: parseAmount(values.hsaFsa),
      otherPreTax: parseAmount(values.otherPreTax),
      otherPostTax: parseAmount(values.otherPostTax),
      otherTaxRatePercent: parseAmount(values.otherTaxRatePercent),
    },
  };
}
