import type {
  ChildSupportFormValues,
  ChildSupportParentValues,
} from '@/lib/schemas/indiana-child-support-schema';

/** About 98 overnights: alternate weekends plus holiday and summer time. */
const DEFAULT_PAYOR_OVERNIGHTS = 98;

export function defaultChildRow(): ChildSupportFormValues['children'][number] {
  return { payorOvernights: DEFAULT_PAYOR_OVERNIGHTS };
}

function defaultParent(grossIncome: number): ChildSupportParentValues {
  return {
    incomeInterval: 'weekly',
    grossIncome,
    subsequentChildren: 0,
    priorBornOrderedSupport: 0,
    priorBornSupportWithoutOrder: 0,
    maintenancePaid: 0,
    childCare: 0,
    healthInsurance: 0,
  };
}

export const CHILD_SUPPORT_FORM_DEFAULTS: ChildSupportFormValues = {
  parentOne: defaultParent(1_000),
  parentTwo: defaultParent(800),
  payor: 'parentOne',
  children: [defaultChildRow()],
};
