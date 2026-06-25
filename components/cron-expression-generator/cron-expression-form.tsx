"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Clock3, Loader2, RefreshCw, WandSparkles } from "lucide-react";

import {
  COMMON_TIMEZONES,
  CRON_FIELD_DEFINITIONS,
  CRON_FORMAT_LABELS,
  CRON_PRESET_LABELS,
  DAY_OF_WEEK_LABELS,
  presetUsesDayOfMonth,
  presetUsesDayOfWeek,
  presetUsesTime,
} from "@/lib/cron-expression-generator/field-options";
import type { GeneratedCronResult } from "@/lib/cron-expression-generator/generate";
import { fadeUpVariants } from "@/lib/motion-variants";
import {
  CRON_FORMAT_OPTIONS,
  CRON_PRESET_OPTIONS,
  type CronFormState,
} from "@/lib/schemas/cron-expression-schema";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { CopyState } from "@/components/generate-random/shared/generator-types";
import { CronFieldInput } from "./cron-field-input";
import { CronExpressionResultCard } from "./cron-expression-result-card";

type CronExpressionFormProps = {
  reducedMotion: boolean | null;
  panelRef: React.RefObject<HTMLDivElement | null>;
  resultsRef: React.RefObject<HTMLDivElement | null>;
  formState: CronFormState;
  loading: boolean;
  result: GeneratedCronResult | null;
  description: string | null;
  nextRuns: { iso: string; formatted: string }[];
  formError: string | null;
  error: string | null;
  copyState: CopyState;
  onFormStateChange: (value: CronFormState) => void;
  onGenerate: () => void;
  onReset: () => void;
  onCopyExpression: () => void;
  className?: string;
};

export function CronExpressionForm({
  reducedMotion,
  panelRef,
  resultsRef,
  formState,
  loading,
  result,
  description,
  nextRuns,
  formError,
  error,
  copyState,
  onFormStateChange,
  onGenerate,
  onReset,
  onCopyExpression,
  className,
}: CronExpressionFormProps) {
  const updateFormState = (patch: Partial<CronFormState>) => {
    onFormStateChange({ ...formState, ...patch });
  };

  const showCustomFields = formState.preset === "custom";
  const visibleFieldDefinitions = CRON_FIELD_DEFINITIONS.filter((field) => {
    if (field.sixFieldOnly && formState.format !== "6-field") {
      return false;
    }

    return true;
  });

  return (
    <motion.div
      ref={panelRef}
      className={cn("mt-10 min-w-0 w-full sm:mt-12 lg:mt-14", className)}
      variants={fadeUpVariants(reducedMotion)}
    >
      <div className={cn("mx-auto max-w-3xl space-y-8 sm:space-y-10")}>
        <Card className={cn("py-0 shadow-xs ring-1 ring-foreground/10")}>
          <CardHeader
            className={cn(
              "space-y-2 border-b border-border/80 px-4 py-3 [.border-b]:pb-3",
            )}
          >
            <div className={cn("flex items-start gap-3.5 sm:items-center")}>
              <span
                className={cn(
                  "mt-0.5 inline-flex size-10 shrink-0 items-center justify-center rounded-xl",
                  "bg-violet-500/10 text-violet-700 ring-1 ring-violet-500/15 dark:text-violet-300",
                )}
              >
                <Clock3 className={cn("size-5")} aria-hidden />
              </span>
              <div className={cn("min-w-0 space-y-1 text-left")}>
                <CardTitle className={cn("text-base font-semibold leading-snug")}>
                  Cron schedule builder
                </CardTitle>
                <CardDescription className={cn("text-sm leading-relaxed")}>
                  Choose a preset or build a custom schedule, then generate your
                  cron expression.
                </CardDescription>
              </div>
            </div>
          </CardHeader>

          <CardContent className={cn("space-y-6 px-4 pb-6 pt-4")}>
            <div className={cn("grid gap-4 sm:grid-cols-2")}>
              <div className={cn("space-y-2")}>
                <Label className={cn("text-sm font-medium text-foreground")}>
                  Cron format
                </Label>
                <Select
                  value={formState.format}
                  onValueChange={(value) =>
                    updateFormState({
                      format: value as CronFormState["format"],
                    })
                  }
                  disabled={loading}
                >
                  <SelectTrigger className={cn("h-11 w-full sm:h-10")}>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {CRON_FORMAT_OPTIONS.map((option) => (
                      <SelectItem key={option} value={option}>
                        {CRON_FORMAT_LABELS[option]}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className={cn("space-y-2")}>
                <Label className={cn("text-sm font-medium text-foreground")}>
                  Preset
                </Label>
                <Select
                  value={formState.preset}
                  onValueChange={(value) =>
                    updateFormState({
                      preset: value as CronFormState["preset"],
                    })
                  }
                  disabled={loading}
                >
                  <SelectTrigger className={cn("h-11 w-full sm:h-10")}>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {CRON_PRESET_OPTIONS.map((option) => (
                      <SelectItem key={option} value={option}>
                        {CRON_PRESET_LABELS[option]}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {presetUsesTime(formState.preset) ? (
              <div className={cn("grid gap-4 sm:grid-cols-2")}>
                <div className={cn("space-y-2")}>
                  <Label htmlFor="cron-hour" className={cn("text-sm font-medium")}>
                    Hour (0–23)
                  </Label>
                  <Input
                    id="cron-hour"
                    type="number"
                    min={0}
                    max={23}
                    value={formState.hour}
                    disabled={loading}
                    onChange={(event) => {
                      const hour = Number.parseInt(event.target.value, 10);
                      updateFormState({
                        hour: Number.isNaN(hour) ? 0 : Math.min(23, Math.max(0, hour)),
                      });
                    }}
                  />
                </div>
                <div className={cn("space-y-2")}>
                  <Label htmlFor="cron-minute" className={cn("text-sm font-medium")}>
                    Minute (0–59)
                  </Label>
                  <Input
                    id="cron-minute"
                    type="number"
                    min={0}
                    max={59}
                    value={formState.minute}
                    disabled={loading}
                    onChange={(event) => {
                      const minute = Number.parseInt(event.target.value, 10);
                      updateFormState({
                        minute: Number.isNaN(minute)
                          ? 0
                          : Math.min(59, Math.max(0, minute)),
                      });
                    }}
                  />
                </div>
              </div>
            ) : null}

            {presetUsesDayOfWeek(formState.preset) ? (
              <div className={cn("space-y-2")}>
                <Label className={cn("text-sm font-medium text-foreground")}>
                  Day of week
                </Label>
                <Select
                  value={String(formState.dayOfWeek)}
                  onValueChange={(value) =>
                    updateFormState({ dayOfWeek: Number.parseInt(value, 10) })
                  }
                  disabled={loading}
                >
                  <SelectTrigger className={cn("h-11 w-full sm:h-10")}>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {DAY_OF_WEEK_LABELS.map((day) => (
                      <SelectItem key={day.value} value={String(day.value)}>
                        {day.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            ) : null}

            {presetUsesDayOfMonth(formState.preset) ? (
              <div className={cn("space-y-2")}>
                <Label htmlFor="cron-dom" className={cn("text-sm font-medium")}>
                  Day of month (1–31)
                </Label>
                <Input
                  id="cron-dom"
                  type="number"
                  min={1}
                  max={31}
                  value={formState.dayOfMonth}
                  disabled={loading}
                  onChange={(event) => {
                    const dayOfMonth = Number.parseInt(event.target.value, 10);
                    updateFormState({
                      dayOfMonth: Number.isNaN(dayOfMonth)
                        ? 1
                        : Math.min(31, Math.max(1, dayOfMonth)),
                    });
                  }}
                />
              </div>
            ) : null}

            <div className={cn("space-y-2")}>
              <Label className={cn("text-sm font-medium text-foreground")}>
                Timezone for next runs
              </Label>
              <Select
                value={formState.timezone}
                onValueChange={(value) => updateFormState({ timezone: value })}
                disabled={loading}
              >
                <SelectTrigger className={cn("h-11 w-full sm:h-10")}>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {COMMON_TIMEZONES.includes(
                    formState.timezone as (typeof COMMON_TIMEZONES)[number],
                  ) ? null : (
                    <SelectItem value={formState.timezone}>
                      {formState.timezone} (local)
                    </SelectItem>
                  )}
                  {COMMON_TIMEZONES.map((zone) => (
                    <SelectItem key={zone} value={zone}>
                      {zone}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {showCustomFields ? (
              <div className={cn("grid gap-4 sm:grid-cols-2")}>
                {visibleFieldDefinitions.map((field) => (
                  <CronFieldInput
                    key={field.key}
                    id={field.key}
                    label={field.label}
                    min={field.min}
                    max={field.max}
                    value={formState[field.key]}
                    disabled={loading}
                    onChange={(value) => updateFormState({ [field.key]: value })}
                  />
                ))}
              </div>
            ) : null}

            {formError ? (
              <p className={cn("text-sm text-destructive")} role="alert">
                {formError}
              </p>
            ) : null}

            <div
              className={cn(
                "flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:justify-end",
              )}
            >
              <Button
                type="button"
                onClick={onGenerate}
                disabled={loading}
                className={cn("inline-flex w-full gap-2 sm:w-auto sm:min-w-36")}
                size="lg"
              >
                {loading ? (
                  <>
                    <Loader2 className={cn("size-4 shrink-0 animate-spin")} aria-hidden />
                    Generating...
                  </>
                ) : (
                  <>
                    <WandSparkles className={cn("size-4 shrink-0")} aria-hidden />
                    Generate
                  </>
                )}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={onReset}
                disabled={loading}
                className={cn("inline-flex w-full gap-2 sm:w-auto sm:min-w-36")}
                size="lg"
              >
                <RefreshCw className={cn("size-4 shrink-0")} aria-hidden />
                Reset
              </Button>
            </div>

            {error ? (
              <p
                className={cn(
                  "rounded-lg border border-destructive/25 bg-destructive/5 px-4 py-3 text-sm leading-relaxed text-destructive",
                )}
                role="alert"
              >
                {error}
              </p>
            ) : null}
          </CardContent>
        </Card>

        <motion.div
          ref={resultsRef}
          variants={fadeUpVariants(reducedMotion)}
          className={cn("mx-auto max-w-3xl")}
        >
          <AnimatePresence initial={false}>
            {result ? (
              <CronExpressionResultCard
                result={result}
                description={description}
                nextRuns={nextRuns}
                timezone={formState.timezone}
                reducedMotion={reducedMotion}
                onCopyExpression={onCopyExpression}
                copyState={copyState}
              />
            ) : null}
          </AnimatePresence>
        </motion.div>
      </div>
    </motion.div>
  );
}
