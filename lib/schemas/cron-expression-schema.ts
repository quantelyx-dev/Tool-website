import { z } from "zod";

export const CRON_FORMAT_OPTIONS = ["5-field", "6-field"] as const;
export const CRON_PRESET_OPTIONS = [
  "every-minute",
  "hourly",
  "daily",
  "weekly",
  "monthly",
  "weekdays",
  "custom",
] as const;

export type CronFormat = (typeof CRON_FORMAT_OPTIONS)[number];
export type CronPreset = (typeof CRON_PRESET_OPTIONS)[number];

export type CronFieldValue =
  | { type: "every" }
  | { type: "interval"; step: number }
  | { type: "specific"; values: number[] }
  | { type: "range"; start: number; end: number };

export type CronFormState = {
  format: CronFormat;
  preset: CronPreset;
  timezone: string;
  hour: number;
  minute: number;
  dayOfWeek: number;
  dayOfMonth: number;
  second: CronFieldValue;
  minuteField: CronFieldValue;
  hourField: CronFieldValue;
  dayOfMonthField: CronFieldValue;
  monthField: CronFieldValue;
  dayOfWeekField: CronFieldValue;
};

export const EVERY_FIELD: CronFieldValue = { type: "every" };

const cronFieldValueSchema: z.ZodType<CronFieldValue> = z.discriminatedUnion(
  "type",
  [
    z.object({ type: z.literal("every") }),
    z
      .object({
        type: z.literal("interval"),
        step: z.number().int().min(1),
      })
      .superRefine((value, context) => {
        if (value.step < 1) {
          context.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Interval step must be at least 1.",
          });
        }
      }),
    z
      .object({
        type: z.literal("specific"),
        values: z.array(z.number().int()).min(1),
      })
      .superRefine((value, context) => {
        if (value.values.length === 0) {
          context.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Select at least one value.",
          });
        }
      }),
    z
      .object({
        type: z.literal("range"),
        start: z.number().int(),
        end: z.number().int(),
      })
      .superRefine((value, context) => {
        if (value.end < value.start) {
          context.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Range end must be greater than or equal to start.",
          });
        }
      }),
  ],
);

export const cronFormSchema = z.object({
  format: z.enum(CRON_FORMAT_OPTIONS),
  preset: z.enum(CRON_PRESET_OPTIONS),
  timezone: z.string().min(1, "Please select a timezone."),
  hour: z.number().int().min(0).max(23),
  minute: z.number().int().min(0).max(59),
  dayOfWeek: z.number().int().min(0).max(6),
  dayOfMonth: z.number().int().min(1).max(31),
  second: cronFieldValueSchema,
  minuteField: cronFieldValueSchema,
  hourField: cronFieldValueSchema,
  dayOfMonthField: cronFieldValueSchema,
  monthField: cronFieldValueSchema,
  dayOfWeekField: cronFieldValueSchema,
});

export function validateCronFieldValue(
  value: CronFieldValue,
  min: number,
  max: number,
): string | null {
  if (value.type === "every" || value.type === "interval") {
    if (value.type === "interval" && value.step < 1) {
      return "Interval step must be at least 1.";
    }
    return null;
  }

  if (value.type === "specific") {
    if (value.values.length === 0) {
      return "Select at least one value.";
    }

    for (const item of value.values) {
      if (item < min || item > max) {
        return `Values must be between ${min} and ${max}.`;
      }
    }

    return null;
  }

  if (value.start < min || value.end > max || value.end < value.start) {
    return `Range must be between ${min} and ${max}.`;
  }

  return null;
}
