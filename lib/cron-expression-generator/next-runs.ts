import { CronExpressionParser } from "cron-parser";
import { DateTime } from "luxon";

export type CronNextRun = {
  iso: string;
  formatted: string;
};

export function getNextCronRuns(
  expression: string,
  timezone: string,
  count = 5,
): CronNextRun[] {
  try {
    const parsed = CronExpressionParser.parse(expression, {
      tz: timezone,
      currentDate: new Date(),
    });

    return parsed.take(count).map((date) => {
      const jsDate = date.toDate();
      const luxonDate = DateTime.fromJSDate(jsDate, { zone: timezone });

      return {
        iso: luxonDate.toISO() ?? jsDate.toISOString(),
        formatted: luxonDate.toFormat("EEE, MMM d, yyyy 'at' h:mm:ss a ZZZZ"),
      };
    });
  } catch {
    return [];
  }
}
