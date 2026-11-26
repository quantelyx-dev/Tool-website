/** Figures from the Indiana Child Support Rules and Guidelines (updated May 14, 2024). */

/** Guideline 3(C)(1): share of weekly gross income deducted for 1 to 8 subsequent children. */
export const SUBSEQUENT_CHILD_FACTORS = [
  0, 0.065, 0.097, 0.122, 0.137, 0.146, 0.155, 0.164, 0.173,
] as const;

/** Above the top of the schedule, support is this share of combined weekly adjusted income. */
export const OVER_SCHEDULE_PERCENTAGES: Record<number, number> = {
  1: 0.081,
  2: 0.114,
  3: 0.131,
  4: 0.147,
  5: 0.162,
  6: 0.176,
  7: 0.19,
  8: 0.204,
};

export const SCHEDULE_MAX_INCOME = 9_200;
/** Below this combined income the Guidelines set support case by case (Guideline 2). */
export const SCHEDULE_MIN_INCOME = 100;

export const MAX_CHILDREN = 8;
/** The parenting time table ends at equal time (181 to 183 overnights). */
export const MAX_PAYOR_OVERNIGHTS = 183;
export const EQUAL_TIME_MIN_OVERNIGHTS = 181;

export const INDIANA_SOURCES = [
  {
    label: 'Indiana Child Support Rules and Guidelines (Indiana Judicial Branch)',
    href: 'https://rules.incourts.gov/pdf/PDF%20-%20Child%20Support/child-support.pdf',
  },
  {
    label: 'Guideline Schedules for Weekly Support Payments',
    href: 'https://www.in.gov/courts/files/schedule.pdf',
  },
  {
    label: 'Child Support Obligation Worksheet',
    href: 'https://www.in.gov/judiciary/files/csow.pdf',
  },
] as const;
