export {
  computeIndianaChildSupport,
  type IndianaChildSupportComputationInput,
  type IndianaChildSupportComputationResult,
} from "@/lib/indiana-child-support/compute-child-support";

export { normalizeIntervalPayToWeekly } from "@/lib/indiana-child-support/normalize-income";

export {
  lookupBasicChildSupportObligation,
} from "@/lib/indiana-child-support/schedule-bcso";

export {
  computeParentingTimeCreditWeekly,
  computeAverageParentingTimeCreditWeekly,
  type ParentingTimeCreditInput,
} from "@/lib/indiana-child-support/parenting-time-credit";

export { lookupTablePt, TABLE_PT, type TablePtRow } from "@/lib/indiana-child-support/table-pt";

export { roundMoney } from "@/lib/indiana-child-support/money";

export type {
  GuidelineScheduleRow,
  IndianaParentId,
} from "@/lib/indiana-child-support/types";

export {
  calculateChildSupport,
  inferWeeklySupportPayor,
  parentingPercentToAnnualOvernights,
  payorAnnualOvernightsPerChildFromForm,
  transformFormData,
  weeklySupportToMonthlyApproximate,
  type IndianaNormalizedFormInput,
} from "@/lib/indiana-child-support/form-to-calculation";
