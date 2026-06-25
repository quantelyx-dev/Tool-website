import { DateTime } from "luxon";

import type {
  CronFieldValue,
  CronFormat,
  CronFormState,
  CronPreset,
} from "@/lib/schemas/cron-expression-schema";
import { EVERY_FIELD } from "@/lib/schemas/cron-expression-schema";

export const CRON_PRESET_LABELS: Record<CronPreset, string> = {
  "every-minute": "Every minute",
  hourly: "Every hour",
  daily: "Daily",
  weekly: "Weekly",
  monthly: "Monthly",
  weekdays: "Weekdays (Mon-Fri)",
  custom: "Custom",
};

export const CRON_FORMAT_LABELS: Record<CronFormat, string> = {
  "5-field": "Standard (5 fields)",
  "6-field": "With seconds (6 fields)",
};

export const DAY_OF_WEEK_LABELS = [
  { value: 0, label: "Sunday" },
  { value: 1, label: "Monday" },
  { value: 2, label: "Tuesday" },
  { value: 3, label: "Wednesday" },
  { value: 4, label: "Thursday" },
  { value: 5, label: "Friday" },
  { value: 6, label: "Saturday" },
] as const;

export const COMMON_TIMEZONES = [
  "UTC",
  "America/New_York",
  "America/Chicago",
  "America/Denver",
  "America/Los_Angeles",
  "America/Toronto",
  "America/Sao_Paulo",
  "Europe/London",
  "Europe/Paris",
  "Europe/Berlin",
  "Asia/Dubai",
  "Asia/Kolkata",
  "Asia/Singapore",
  "Asia/Tokyo",
  "Australia/Sydney",
  "Pacific/Auckland",
] as const;

export const CRON_FIELD_DEFINITIONS = [
  {
    key: "second" as const,
    label: "Second",
    min: 0,
    max: 59,
    sixFieldOnly: true,
  },
  {
    key: "minuteField" as const,
    label: "Minute",
    min: 0,
    max: 59,
    sixFieldOnly: false,
  },
  {
    key: "hourField" as const,
    label: "Hour",
    min: 0,
    max: 23,
    sixFieldOnly: false,
  },
  {
    key: "dayOfMonthField" as const,
    label: "Day of month",
    min: 1,
    max: 31,
    sixFieldOnly: false,
  },
  {
    key: "monthField" as const,
    label: "Month",
    min: 1,
    max: 12,
    sixFieldOnly: false,
  },
  {
    key: "dayOfWeekField" as const,
    label: "Day of week",
    min: 0,
    max: 6,
    sixFieldOnly: false,
  },
] as const;

export function getDefaultTimezone(): string {
  const localZone = DateTime.local().zoneName;
  if (localZone && COMMON_TIMEZONES.includes(localZone as (typeof COMMON_TIMEZONES)[number])) {
    return localZone;
  }

  return localZone ?? "UTC";
}

export function createDefaultCronFormState(): CronFormState {
  return {
    format: "5-field",
    preset: "daily",
    timezone: getDefaultTimezone(),
    hour: 9,
    minute: 0,
    dayOfWeek: 1,
    dayOfMonth: 1,
    second: EVERY_FIELD,
    minuteField: EVERY_FIELD,
    hourField: EVERY_FIELD,
    dayOfMonthField: EVERY_FIELD,
    monthField: EVERY_FIELD,
    dayOfWeekField: EVERY_FIELD,
  };
}

export function specificField(value: number): CronFieldValue {
  return { type: "specific", values: [value] };
}

export function rangeField(start: number, end: number): CronFieldValue {
  return { type: "range", start, end };
}

export function presetUsesTime(preset: CronPreset): boolean {
  return (
    preset === "daily" ||
    preset === "weekly" ||
    preset === "monthly" ||
    preset === "weekdays"
  );
}

export function presetUsesDayOfWeek(preset: CronPreset): boolean {
  return preset === "weekly";
}

export function presetUsesDayOfMonth(preset: CronPreset): boolean {
  return preset === "monthly";
}
