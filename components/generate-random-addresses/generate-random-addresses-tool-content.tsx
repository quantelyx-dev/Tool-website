"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";

import {
  generateFictionalAddress,
  generateFictionalAddresses,
  type GeneratedAddress,
} from "@/lib/generate-random-addresses/generate";
import { exportAddressesToCsv } from "@/lib/generate-random-addresses/export-csv";
import {
  fadeUpVariants,
  staggerContainerVariants,
} from "@/lib/motion-variants";
import {
  addressFormSchema,
  ADDRESS_BULK_COUNT_OPTIONS,
} from "@/lib/schemas/address-schema";
import { cn } from "@/lib/utils";
import type {
  CopyState,
  GenerationMode,
  StandardBulkCount,
} from "@/components/generate-random/shared/generator-types";
import { useAnalytics } from "@/hooks/use-analytics";
import { RandomAddressForm } from "./random-address-form";

type GenerateRandomAddressesToolContentProps = {
  className?: string;
};

const COPY_FEEDBACK_MS = 1500;

export function GenerateRandomAddressesToolContent({
  className,
}: GenerateRandomAddressesToolContentProps) {
  const reducedMotion = useReducedMotion();
  const { onUse, onResult, onCopy, onDownload, onReset } =
    useAnalytics("random-addresses");
  const panelRef = useRef<HTMLDivElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);
  const [mode, setMode] = useState<GenerationMode>("single");
  const [bulkCount, setBulkCount] = useState<StandardBulkCount>("10");
  const [loading, setLoading] = useState(false);
  const [values, setValues] = useState<GeneratedAddress[]>([]);
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
    setMode("single");
    setBulkCount("10");
    setValues([]);
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
    onUse({ mode });
    setFormError(null);
    setError(null);
    clearCopyFeedbackTimer();
    setCopyState("idle");

    const parsed = addressFormSchema.safeParse({
      mode,
      bulkCount: mode === "bulk" ? bulkCount : undefined,
    });

    if (!parsed.success) {
      const issue = parsed.error.issues[0];
      setFormError(issue?.message ?? "Please complete all required fields.");
      return;
    }

    setLoading(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 300));

      if (parsed.data.mode === "single") {
        setValues([generateFictionalAddress()]);
      } else {
        const count = Number.parseInt(parsed.data.bulkCount ?? "10", 10);
        setValues(generateFictionalAddresses(count));
      }
      onResult({
        mode,
        count:
          parsed.data.mode === "single"
            ? 1
            : Number.parseInt(parsed.data.bulkCount ?? "10", 10),
      });

      requestAnimationFrame(() => {
        resultsRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      });
    } catch (err: unknown) {
      setError(
        err instanceof Error ? err.message : "Failed to generate addresses.",
      );
    } finally {
      setLoading(false);
    }
  }, [mode, bulkCount, clearCopyFeedbackTimer, onUse, onResult]);

  const handleCopySingleJson = useCallback(() => {
    if (values.length !== 1) {
      return;
    }

    onCopy("json");
    clearCopyFeedbackTimer();

    try {
      const text = JSON.stringify(values[0], null, 2);
      navigator.clipboard.writeText(text);
      setCopyState("copied");
    } catch {
      setCopyState("failed");
    }

    copyResetRef.current = setTimeout(() => {
      setCopyState("idle");
      copyResetRef.current = null;
    }, COPY_FEEDBACK_MS);
  }, [values, clearCopyFeedbackTimer, onCopy]);

  const handleExportCsv = useCallback(() => {
    if (values.length === 0) {
      return;
    }

    onDownload("csv");
    exportAddressesToCsv(values);
  }, [values, onDownload]);

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
              "bg-[radial-gradient(ellipse_72%_56%_at_50%_-30%,rgba(59,130,246,0.16),transparent)]",
              "dark:bg-[radial-gradient(ellipse_72%_56%_at_50%_-30%,rgba(96,165,250,0.15),transparent)]",
            )}
          />
          <p
            className={cn(
              "mb-3 text-xs font-semibold uppercase tracking-[0.2em]",
              "text-blue-700 dark:text-blue-400 sm:text-sm",
            )}
          >
            Data utilities
          </p>
          <h1
            className={cn(
              "font-heading text-balance text-3xl font-semibold tracking-tight text-foreground",
              "sm:text-4xl lg:text-[2.25rem]",
            )}
          >
            Address Generator - Generate Fictional Addresses
          </h1>
          <p
            className={cn(
              "mx-auto mt-5 max-w-2xl px-1 text-pretty text-base leading-relaxed text-muted-foreground",
              "sm:mt-6 sm:px-0 sm:text-lg",
            )}
          >
            Create realistic-looking fictional mailing addresses in single or
            bulk mode for test data, fixtures, and demos.
          </p>
        </motion.header>

        <RandomAddressForm
          reducedMotion={reducedMotion}
          panelRef={panelRef}
          resultsRef={resultsRef}
          mode={mode}
          bulkCount={bulkCount}
          loading={loading}
          values={values}
          formError={formError}
          error={error}
          copyState={copyState}
          bulkCountValues={[...ADDRESS_BULK_COUNT_OPTIONS]}
          onModeChange={setMode}
          onBulkCountChange={setBulkCount}
          onGenerate={handleGenerate}
          onReset={reset}
          onCopySingleJson={handleCopySingleJson}
          onExportCsv={handleExportCsv}
        />
      </motion.section>
    </div>
  );
}
