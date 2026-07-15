"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import type { CopyState } from "@/components/generate-random/shared/generator-types";
import { RegexTesterForm } from "@/components/regex-tester/regex-tester-form";
import { RegexTesterResult } from "@/components/regex-tester/regex-tester-result";
import { useAnalytics } from "@/hooks/use-analytics";
import {
  executeRegex,
  isRegexError,
  type RegexMatchResult,
} from "@/lib/regex-tester/match";
import {
  createDefaultRegexFormState,
  type RegexTesterFormState,
} from "@/lib/schemas/regex-tester-schema";
import { fadeUpVariants, staggerContainerVariants } from "@/lib/motion-variants";
import { cn } from "@/lib/utils";

type RegexTesterToolContentProps = {
  className?: string;
};

const COPY_FEEDBACK_MS = 1500;

export function RegexTesterToolContent({ className }: RegexTesterToolContentProps) {
  const reducedMotion = useReducedMotion();
  const { onUse, onResult, onCopy, onReset } = useAnalytics("regex-tester");

  const [formState, setFormState] = useState<RegexTesterFormState>(
    createDefaultRegexFormState,
  );
  const [copyState, setCopyState] = useState<CopyState>("idle");

  const copyResetRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const hasTrackedUseRef = useRef(false);

  const clearCopyTimer = useCallback(() => {
    if (copyResetRef.current !== null) {
      clearTimeout(copyResetRef.current);
      copyResetRef.current = null;
    }
  }, []);

  useEffect(() => () => clearCopyTimer(), [clearCopyTimer]);

  // Derive result and error directly — no effect needed for pure computation
  const { result, patternError } = useMemo<{
    result: RegexMatchResult | null;
    patternError: string | null;
  }>(() => {
    if (!formState.pattern) {
      return { result: null, patternError: null };
    }
    const outcome = executeRegex(formState.pattern, formState.flags, formState.testString);
    if (isRegexError(outcome)) {
      return { result: null, patternError: outcome.error };
    }
    return { result: outcome, patternError: null };
  }, [formState.pattern, formState.flags, formState.testString]);

  // Analytics side-effect only — no setState
  useEffect(() => {
    if (result && formState.testString && result.matchCount > 0) {
      onResult({ matchCount: result.matchCount });
    }
  }, [result, formState.testString, onResult]);

  const handleFormStateChange = useCallback(
    (next: RegexTesterFormState) => {
      if (next.pattern && !hasTrackedUseRef.current) {
        hasTrackedUseRef.current = true;
        onUse({});
      }
      setFormState(next);
      clearCopyTimer();
      setCopyState("idle");
    },
    [onUse, clearCopyTimer],
  );

  const handleClear = useCallback(() => {
    onReset();
    hasTrackedUseRef.current = false;
    setFormState(createDefaultRegexFormState());
    clearCopyTimer();
    setCopyState("idle");
  }, [onReset, clearCopyTimer]);

  const handleCopy = useCallback(() => {
    if (!result || result.matchCount === 0) return;

    onCopy("matches");
    clearCopyTimer();

    const text = result.matches.map((m) => m.fullMatch).join("\n");

    try {
      navigator.clipboard.writeText(text);
      setCopyState("copied");
    } catch {
      setCopyState("failed");
    }

    copyResetRef.current = setTimeout(() => {
      setCopyState("idle");
      copyResetRef.current = null;
    }, COPY_FEEDBACK_MS);
  }, [result, onCopy, clearCopyTimer]);

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
            Regex tester
          </h1>
          <p
            className={cn(
              "mx-auto mt-5 max-w-2xl px-1 text-pretty text-base leading-relaxed text-muted-foreground",
              "sm:mt-6 sm:px-0 sm:text-lg",
            )}
          >
            Test and debug regular expressions in real time. Enter a pattern,
            toggle flags, and see highlighted matches with capture groups and
            match positions instantly.
          </p>
        </motion.header>

        <motion.div className={cn("mt-2")} variants={fadeUpVariants(reducedMotion)}>
          <RegexTesterForm
            formState={formState}
            error={patternError}
            onFormStateChange={handleFormStateChange}
            onClear={handleClear}
          />
          <RegexTesterResult
            result={result}
            testString={formState.testString}
            copyState={copyState}
            onCopy={handleCopy}
          />
        </motion.div>
      </motion.section>
    </div>
  );
}
