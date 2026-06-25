"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";

import { CronExpressionForm } from "@/components/cron-expression-generator/cron-expression-form";
import { describeCronExpression } from "@/lib/cron-expression-generator/describe";
import {
  createDefaultCronFormState,
  CRON_FIELD_DEFINITIONS,
} from "@/lib/cron-expression-generator/field-options";
import {
  generateCronResult,
  type GeneratedCronResult,
} from "@/lib/cron-expression-generator/generate";
import { getNextCronRuns } from "@/lib/cron-expression-generator/next-runs";
import {
  fadeUpVariants,
  staggerContainerVariants,
} from "@/lib/motion-variants";
import {
  cronFormSchema,
  type CronFormState,
  validateCronFieldValue,
} from "@/lib/schemas/cron-expression-schema";
import { cn } from "@/lib/utils";
import type { CopyState } from "@/components/generate-random/shared/generator-types";
import { useAnalytics } from "@/hooks/use-analytics";

type CronExpressionGeneratorToolContentProps = {
  className?: string;
};

const COPY_FEEDBACK_MS = 1500;

function validateCustomFields(state: CronFormState): string | null {
  if (state.preset !== "custom") {
    return null;
  }

  const visibleFields = CRON_FIELD_DEFINITIONS.filter((field) => {
    if (field.sixFieldOnly && state.format !== "6-field") {
      return false;
    }

    return true;
  });

  for (const field of visibleFields) {
    const message = validateCronFieldValue(
      state[field.key],
      field.min,
      field.max,
    );

    if (message) {
      return `${field.label}: ${message}`;
    }
  }

  return null;
}

export function CronExpressionGeneratorToolContent({
  className,
}: CronExpressionGeneratorToolContentProps) {
  const reducedMotion = useReducedMotion();
  const { onUse, onResult, onCopy, onReset } = useAnalytics(
    "cron-expression-generator",
  );
  const panelRef = useRef<HTMLDivElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);
  const [formState, setFormState] = useState<CronFormState>(
    createDefaultCronFormState,
  );
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<GeneratedCronResult | null>(null);
  const [description, setDescription] = useState<string | null>(null);
  const [nextRuns, setNextRuns] = useState<{ iso: string; formatted: string }[]>(
    [],
  );
  const [formError, setFormError] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copyState, setCopyState] = useState<CopyState>("idle");
  const copyResetRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearCopyFeedbackTimer = useCallback(() => {
    if (copyResetRef.current !== null) {
      clearTimeout(copyResetRef.current);
      copyResetRef.current = null;
    }
  }, []);

  useEffect(() => {
    return clearCopyFeedbackTimer;
  }, [clearCopyFeedbackTimer]);

  const reset = useCallback(() => {
    onReset();
    setFormState(createDefaultCronFormState());
    setResult(null);
    setDescription(null);
    setNextRuns([]);
    setFormError(null);
    setError(null);
    clearCopyFeedbackTimer();
    setCopyState("idle");
    setLoading(false);

    requestAnimationFrame(() => {
      panelRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    });
  }, [clearCopyFeedbackTimer, onReset]);

  const handleGenerate = useCallback(async () => {
    onUse({ preset: formState.preset, format: formState.format });
    setFormError(null);
    setError(null);
    clearCopyFeedbackTimer();
    setCopyState("idle");

    const parsed = cronFormSchema.safeParse(formState);

    if (!parsed.success) {
      const issue = parsed.error.issues[0];
      setFormError(issue?.message ?? "Please complete all required fields.");
      return;
    }

    const customError = validateCustomFields(parsed.data);

    if (customError) {
      setFormError(customError);
      return;
    }

    setLoading(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 300));

      const generated = generateCronResult(parsed.data);
      const readable = describeCronExpression(generated.expression);
      const runs = getNextCronRuns(
        generated.expression,
        parsed.data.timezone,
      );

      setResult(generated);
      setDescription(readable);
      setNextRuns(runs);
      onResult({ preset: parsed.data.preset, format: parsed.data.format });

      requestAnimationFrame(() => {
        resultsRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      });
    } catch (err: unknown) {
      setError(
        err instanceof Error
          ? err.message
          : "Failed to generate cron expression.",
      );
    } finally {
      setLoading(false);
    }
  }, [formState, clearCopyFeedbackTimer, onUse, onResult]);

  const handleCopyExpression = useCallback(() => {
    if (!result) {
      return;
    }

    onCopy("expression");
    clearCopyFeedbackTimer();

    try {
      navigator.clipboard.writeText(result.expression);
      setCopyState("copied");
    } catch {
      setCopyState("failed");
    }

    copyResetRef.current = setTimeout(() => {
      setCopyState("idle");
      copyResetRef.current = null;
    }, COPY_FEEDBACK_MS);
  }, [result, clearCopyFeedbackTimer, onCopy]);

  return (
    <div className={cn("flex flex-col", className)}>
      <motion.section
        className={cn("flex flex-col")}
        initial="hidden"
        animate="visible"
        variants={staggerContainerVariants(reducedMotion, 0.1)}
      >
        <motion.header
          className={cn(
            "relative mx-auto max-w-3xl px-3 pt-2 text-center sm:px-4 sm:pt-4",
          )}
          variants={fadeUpVariants(reducedMotion)}
        >
          <div
            aria-hidden
            className={cn(
              "pointer-events-none absolute inset-0 -z-10 mx-auto max-w-xl overflow-hidden rounded-3xl",
              "bg-[radial-gradient(ellipse_72%_56%_at_50%_-30%,rgba(139,92,246,0.16),transparent)]",
              "dark:bg-[radial-gradient(ellipse_72%_56%_at_50%_-30%,rgba(167,139,250,0.15),transparent)]",
            )}
          />
          <p
            className={cn(
              "mb-3 text-xs font-semibold uppercase tracking-[0.2em]",
              "text-violet-700 dark:text-violet-400 sm:text-sm",
            )}
          >
            Developer utilities
          </p>
          <h1
            className={cn(
              "font-heading text-balance text-3xl font-semibold tracking-tight text-foreground",
              "sm:text-4xl lg:text-[2.25rem]",
            )}
          >
            Cron expression generator
          </h1>
          <p
            className={cn(
              "mx-auto mt-5 max-w-2xl px-1 text-pretty text-base leading-relaxed text-muted-foreground",
              "sm:mt-6 sm:px-0 sm:text-lg",
            )}
          >
            Build cron schedules visually with presets or custom fields. Get a
            ready-to-use expression, a plain-English summary, and the next five
            run times in your timezone.
          </p>
        </motion.header>

        <CronExpressionForm
          reducedMotion={reducedMotion}
          panelRef={panelRef}
          resultsRef={resultsRef}
          formState={formState}
          loading={loading}
          result={result}
          description={description}
          nextRuns={nextRuns}
          formError={formError}
          error={error}
          copyState={copyState}
          onFormStateChange={setFormState}
          onGenerate={handleGenerate}
          onReset={reset}
          onCopyExpression={handleCopyExpression}
        />
      </motion.section>
    </div>
  );
}
