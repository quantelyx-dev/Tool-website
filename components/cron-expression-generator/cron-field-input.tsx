"use client";

import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { CronFieldValue } from "@/lib/schemas/cron-expression-schema";
import { EVERY_FIELD } from "@/lib/schemas/cron-expression-schema";

type CronFieldInputProps = {
  id: string;
  label: string;
  min: number;
  max: number;
  value: CronFieldValue;
  disabled?: boolean;
  onChange: (value: CronFieldValue) => void;
  className?: string;
};

type FieldMode = CronFieldValue["type"];

const FIELD_MODE_LABELS: Record<FieldMode, string> = {
  every: "Every (*)",
  interval: "Every N (*/n)",
  specific: "Specific values",
  range: "Range",
};

function parseNumberList(raw: string): number[] {
  return raw
    .split(",")
    .map((part) => part.trim())
    .filter(Boolean)
    .map((part) => Number.parseInt(part, 10))
    .filter((num) => !Number.isNaN(num));
}

export function CronFieldInput({
  id,
  label,
  min,
  max,
  value,
  disabled = false,
  onChange,
  className,
}: CronFieldInputProps) {
  const mode = value.type;

  return (
    <div className={cn("space-y-2", className)}>
      <Label htmlFor={`${id}-mode`} className={cn("text-sm font-medium text-foreground")}>
        {label}
      </Label>

      <Select
        value={mode}
        onValueChange={(nextMode) => {
          if (nextMode === "every") {
            onChange(EVERY_FIELD);
            return;
          }

          if (nextMode === "interval") {
            onChange({ type: "interval", step: 1 });
            return;
          }

          if (nextMode === "specific") {
            onChange({ type: "specific", values: [min] });
            return;
          }

          onChange({ type: "range", start: min, end: max });
        }}
        disabled={disabled}
      >
        <SelectTrigger id={`${id}-mode`} className={cn("h-11 w-full sm:h-10")}>
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {(Object.keys(FIELD_MODE_LABELS) as FieldMode[]).map((fieldMode) => (
            <SelectItem key={fieldMode} value={fieldMode}>
              {FIELD_MODE_LABELS[fieldMode]}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {mode === "interval" ? (
        <div className={cn("space-y-1.5")}>
          <Label htmlFor={`${id}-step`} className={cn("text-xs text-muted-foreground")}>
            Step (every N)
          </Label>
          <Input
            id={`${id}-step`}
            type="number"
            min={1}
            max={max - min + 1}
            value={value.step}
            disabled={disabled}
            onChange={(event) => {
              const step = Number.parseInt(event.target.value, 10);
              onChange({
                type: "interval",
                step: Number.isNaN(step) ? 1 : Math.max(1, step),
              });
            }}
          />
        </div>
      ) : null}

      {mode === "specific" ? (
        <div className={cn("space-y-1.5")}>
          <Label htmlFor={`${id}-values`} className={cn("text-xs text-muted-foreground")}>
            Comma-separated values ({min}–{max})
          </Label>
          <Input
            id={`${id}-values`}
            type="text"
            inputMode="numeric"
            value={value.values.join(", ")}
            disabled={disabled}
            placeholder={`e.g. ${min}, ${min + 1}`}
            onChange={(event) => {
              onChange({
                type: "specific",
                values: parseNumberList(event.target.value),
              });
            }}
          />
        </div>
      ) : null}

      {mode === "range" ? (
        <div className={cn("grid grid-cols-2 gap-3")}>
          <div className={cn("space-y-1.5")}>
            <Label htmlFor={`${id}-start`} className={cn("text-xs text-muted-foreground")}>
              Start
            </Label>
            <Input
              id={`${id}-start`}
              type="number"
              min={min}
              max={max}
              value={value.start}
              disabled={disabled}
              onChange={(event) => {
                const start = Number.parseInt(event.target.value, 10);
                onChange({
                  type: "range",
                  start: Number.isNaN(start) ? min : start,
                  end: value.end,
                });
              }}
            />
          </div>
          <div className={cn("space-y-1.5")}>
            <Label htmlFor={`${id}-end`} className={cn("text-xs text-muted-foreground")}>
              End
            </Label>
            <Input
              id={`${id}-end`}
              type="number"
              min={min}
              max={max}
              value={value.end}
              disabled={disabled}
              onChange={(event) => {
                const end = Number.parseInt(event.target.value, 10);
                onChange({
                  type: "range",
                  start: value.start,
                  end: Number.isNaN(end) ? max : end,
                });
              }}
            />
          </div>
        </div>
      ) : null}
    </div>
  );
}
