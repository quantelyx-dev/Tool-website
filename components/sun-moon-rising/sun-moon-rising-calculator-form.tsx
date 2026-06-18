"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { ApiError } from "@/lib/http";
import { BirthDetailsCard } from "@/components/sun-moon-rising/birth-details-card";
import { ChartCalculationLoading } from "@/components/sun-moon-rising/chart-calculation-loading";
import { ChartResultsCard } from "@/components/sun-moon-rising/chart-results-card";
import { todayIsoDate } from "@/lib/datetime";
import {
  calculatorLoadingMotionProps,
  calculatorSwapMotionProps,
} from "@/lib/sun-moon-rising/calculator-motion";
import {
  submitSunMoonRisingChart,
  type SunMoonRisingChartFailureBody,
  type SunMoonRisingChartSuccess,
} from "@/lib/sun-moon-rising/api";
import { SUN_MOON_RISING_EMPTY_VALUES } from "@/lib/sun-moon-rising/form-defaults";
import {
  sunMoonRisingFormSchema,
  type SunMoonRisingFormValues,
} from "@/lib/schemas/sun-moon-rising-schema";
import { cn } from "@/lib/utils";
import { useAnalytics } from "@/hooks/use-analytics";

type SunMoonRisingCalculatorFormProps = {
  className?: string;
};

type CalculatorPhase =
  | { step: "form" }
  | { step: "loading"; values: SunMoonRisingFormValues }
  | {
      step: "result";
      values: SunMoonRisingFormValues;
      chart: SunMoonRisingChartSuccess;
    };

const FORM_FIELD_KEYS = [
  "name",
  "dateOfBirth",
  "timeOfBirth",
  "birthCity",
] as const satisfies readonly (keyof SunMoonRisingFormValues)[];

export function SunMoonRisingCalculatorForm({
  className,
}: SunMoonRisingCalculatorFormProps) {
  const reducedMotion = useReducedMotion();
  const { onUse, onResult, onReset } = useAnalytics("sun-moon-rising");
  const formSectionRef = useRef<HTMLDivElement>(null);
  const abortRef = useRef<AbortController | null>(null);
  const [phase, setPhase] = useState<CalculatorPhase>({ step: "form" });

  const form = useForm<SunMoonRisingFormValues>({
    resolver: zodResolver(sunMoonRisingFormSchema),
    defaultValues: SUN_MOON_RISING_EMPTY_VALUES,
    mode: "onBlur",
  });

  useEffect(() => {
    return () => abortRef.current?.abort();
  }, []);

  const resetFlow = useCallback(() => {
    onReset();
    abortRef.current?.abort();
    setPhase({ step: "form" });
    form.reset(SUN_MOON_RISING_EMPTY_VALUES);
    requestAnimationFrame(() => {
      formSectionRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    });
  }, [form, onReset]);

  const handleCalculate = useCallback(
    async (values: SunMoonRisingFormValues) => {
      onUse({ birth_city: values.birthCity });
      abortRef.current?.abort();
      const controller = new AbortController();
      abortRef.current = controller;

      form.clearErrors();
      setPhase({ step: "loading", values });

      try {
        const chart = await submitSunMoonRisingChart(values, {
          signal: controller.signal,
        });
        setPhase({ step: "result", values, chart });
        onResult({
          sun: chart.sunSign,
          moon: chart.moonSign,
          rising: chart.risingSign,
        });
      } catch (err) {
        const aborted =
          (err instanceof DOMException || err instanceof Error) &&
          err.name === "AbortError";

        if (aborted) {
          return;
        }

        setPhase({ step: "form" });

        if (err instanceof ApiError) {
          const body = err.body as SunMoonRisingChartFailureBody | null;
          let mappedField = false;

          if (body?.fieldErrors) {
            for (const key of FORM_FIELD_KEYS) {
              const msgs = body.fieldErrors[key];

              if (msgs?.[0]) {
                form.setError(key, { message: msgs[0] });
                mappedField = true;
              }
            }
          }

          toast.error(body?.error ?? "Could not calculate your chart.", {
            description: mappedField
              ? "Please review the highlighted fields."
              : body?.detail,
          });

          return;
        }

        toast.error("Something went wrong", {
          description: "Try again in a moment.",
        });
      }
    },
    [form, onUse, onResult],
  );

  const swapMotion = calculatorSwapMotionProps(reducedMotion);
  const loadingMotion = calculatorLoadingMotionProps(reducedMotion);

  return (
    <div
      ref={formSectionRef}
      className={cn("flex w-full flex-col items-center", className)}
    >
      <AnimatePresence mode="wait">
        {phase.step === "form" ? (
          <motion.div key="birth-form" {...swapMotion}>
            <BirthDetailsCard
              form={form}
              todayIsoMax={todayIsoDate()}
              onSubmit={handleCalculate}
            />
          </motion.div>
        ) : phase.step === "loading" ? (
          <motion.div key="chart-loading" {...loadingMotion}>
            <ChartCalculationLoading
              previewName={
                phase.values.name.trim() ? phase.values.name.trim() : undefined
              }
            />
          </motion.div>
        ) : (
          <motion.div
            key="chart-panel"
            role="region"
            aria-labelledby="your-chart-heading"
            {...swapMotion}
          >
            <ChartResultsCard
              snapshot={phase.values}
              chart={phase.chart}
              reducedMotion={reducedMotion}
              onReset={resetFlow}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
