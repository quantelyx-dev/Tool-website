import type { PaycheckResult } from '@/lib/us-paycheck/compute-paycheck';

export type PaycheckRun = {
  result: PaycheckResult;
  /** Hours worked per year, used for the hourly take-home figure. */
  hoursPerYear: number;
  /** Increments on every calculation so panels can replay their animation. */
  runId: number;
};
