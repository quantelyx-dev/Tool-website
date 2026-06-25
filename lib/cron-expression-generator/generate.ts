import type {
  CronFieldValue,
  CronFormState,
  CronPreset,
} from "@/lib/schemas/cron-expression-schema";
import {
  rangeField,
  specificField,
} from "@/lib/cron-expression-generator/field-options";
import { EVERY_FIELD } from "@/lib/schemas/cron-expression-schema";

type ResolvedCronFields = {
  second?: CronFieldValue;
  minute: CronFieldValue;
  hour: CronFieldValue;
  dayOfMonth: CronFieldValue;
  month: CronFieldValue;
  dayOfWeek: CronFieldValue;
};

export function fieldValueToCronString(value: CronFieldValue): string {
  switch (value.type) {
    case "every":
      return "*";
    case "interval":
      return `*/${value.step}`;
    case "specific":
      return [...value.values].sort((a, b) => a - b).join(",");
    case "range":
      return `${value.start}-${value.end}`;
  }
}

function resolvePresetFields(state: CronFormState): ResolvedCronFields {
  const { preset, hour, minute, dayOfWeek, dayOfMonth, format } = state;
  const second =
    format === "6-field" ? specificField(0) : undefined;

  switch (preset as CronPreset) {
    case "every-minute":
      return {
        second: format === "6-field" ? EVERY_FIELD : undefined,
        minute: EVERY_FIELD,
        hour: EVERY_FIELD,
        dayOfMonth: EVERY_FIELD,
        month: EVERY_FIELD,
        dayOfWeek: EVERY_FIELD,
      };
    case "hourly":
      return {
        second,
        minute: specificField(0),
        hour: EVERY_FIELD,
        dayOfMonth: EVERY_FIELD,
        month: EVERY_FIELD,
        dayOfWeek: EVERY_FIELD,
      };
    case "daily":
      return {
        second,
        minute: specificField(minute),
        hour: specificField(hour),
        dayOfMonth: EVERY_FIELD,
        month: EVERY_FIELD,
        dayOfWeek: EVERY_FIELD,
      };
    case "weekly":
      return {
        second,
        minute: specificField(minute),
        hour: specificField(hour),
        dayOfMonth: EVERY_FIELD,
        month: EVERY_FIELD,
        dayOfWeek: specificField(dayOfWeek),
      };
    case "monthly":
      return {
        second,
        minute: specificField(minute),
        hour: specificField(hour),
        dayOfMonth: specificField(dayOfMonth),
        month: EVERY_FIELD,
        dayOfWeek: EVERY_FIELD,
      };
    case "weekdays":
      return {
        second,
        minute: specificField(minute),
        hour: specificField(hour),
        dayOfMonth: EVERY_FIELD,
        month: EVERY_FIELD,
        dayOfWeek: rangeField(1, 5),
      };
    case "custom":
      return {
        second: format === "6-field" ? state.second : undefined,
        minute: state.minuteField,
        hour: state.hourField,
        dayOfMonth: state.dayOfMonthField,
        month: state.monthField,
        dayOfWeek: state.dayOfWeekField,
      };
  }
}

export function generateCronExpression(state: CronFormState): string {
  const fields = resolvePresetFields(state);
  const parts: string[] = [];

  if (fields.second) {
    parts.push(fieldValueToCronString(fields.second));
  }

  parts.push(
    fieldValueToCronString(fields.minute),
    fieldValueToCronString(fields.hour),
    fieldValueToCronString(fields.dayOfMonth),
    fieldValueToCronString(fields.month),
    fieldValueToCronString(fields.dayOfWeek),
  );

  return parts.join(" ");
}

export type GeneratedCronResult = {
  expression: string;
  format: CronFormState["format"];
  preset: CronFormState["preset"];
};

export function generateCronResult(state: CronFormState): GeneratedCronResult {
  return {
    expression: generateCronExpression(state),
    format: state.format,
    preset: state.preset,
  };
}
