import type { ChildSupportFormValues } from '@/lib/schemas/indiana-child-support-schema';

export const CHILD_TIME_PRESETS = [
  0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 85, 90, 95,
  100,
] as const;

export function defaultChildRow(): ChildSupportFormValues['children'][number] {
  return {
    parentOneManual: false,
    parentOneTime: 50,
    parentTwoManual: false,
    parentTwoTime: 50,
  };
}

export const CHILD_SUPPORT_FORM_DEFAULTS: ChildSupportFormValues = {
  parentOneIncomeInterval: 'monthly',
  parentOneNetIncome: 5000,
  parentTwoIncomeInterval: 'monthly',
  parentTwoNetIncome: 5000,
  children: [defaultChildRow()],
};
