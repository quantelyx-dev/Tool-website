"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Loader2, Mail, MailPlus, RefreshCw } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

import {
  EMAIL_DEFAULT_LIMIT,
  EmailLimitSelect,
} from "@/components/generate-random-emails/email-limit-select";
import {
  GenerateRandomEmailsResultCard,
  type RandomEmailsCopyState,
} from "@/components/generate-random-emails/generate-random-emails-result-card";
import { GenerateRandomEmailsHeader } from "@/components/generate-random-emails/generate-random-emails-header";
import { GenerateRandomEmailsLoading } from "@/components/generate-random-emails/generate-random-emails-loading";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  fadeUpVariants,
  staggerContainerVariants,
} from "@/lib/motion-variants";
import { calculatorSwapMotionProps } from "@/lib/sun-moon-rising/calculator-motion";
import { cn } from "@/lib/utils";
import { useAnalytics } from "@/hooks/use-analytics";
import { useRandomEmails } from "@/hooks/use-random-emails";

const COPY_FEEDBACK_MS = 2000;

type GenerateRandomEmailsToolContentProps = {
  className?: string;
};

export function GenerateRandomEmailsToolContent({
  className,
}: GenerateRandomEmailsToolContentProps) {
  const reducedMotion = useReducedMotion();
  const { onUse, onResult, onCopy, onReset } = useAnalytics("random-emails");
  const panelRef = useRef<HTMLDivElement>(null);
  const [limit, setLimit] = useState<string>(EMAIL_DEFAULT_LIMIT);
  const { emails, error, loading, fetchEmails, clearEmails } = useRandomEmails();
  const [copyState, setCopyState] = useState<RandomEmailsCopyState>("idle");
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
    clearCopyFeedbackTimer();
    setCopyState("idle");
    clearEmails();
    setLimit(EMAIL_DEFAULT_LIMIT);
    requestAnimationFrame(() => {
      panelRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    });
  }, [clearCopyFeedbackTimer, clearEmails, onReset]);

  const generate = useCallback(async () => {
    const n = Number.parseInt(limit, 10);
    onUse({ count: n });
    clearCopyFeedbackTimer();
    setCopyState("idle");
    const generated = await fetchEmails(n);
    if (generated) onResult({ count: generated.length });
  }, [limit, clearCopyFeedbackTimer, fetchEmails, onUse, onResult]);

  const copyCommaSeparated = useCallback(async () => {
    if (emails.length === 0) return;
    onCopy("comma-separated");
    clearCopyFeedbackTimer();
    const text = emails.join(", ");
    try {
      await navigator.clipboard.writeText(text);
      setCopyState("copied");
      copyResetRef.current = setTimeout(() => {
        setCopyState("idle");
        copyResetRef.current = null;
      }, COPY_FEEDBACK_MS);
    } catch {
      setCopyState("failed");
      copyResetRef.current = setTimeout(() => {
        setCopyState("idle");
        copyResetRef.current = null;
      }, COPY_FEEDBACK_MS);
    }
  }, [emails, clearCopyFeedbackTimer, onCopy]);

  return (
    <div className={cn("flex flex-col", className)}>
      <motion.section
        className="flex flex-col"
        initial="hidden"
        animate="visible"
        variants={staggerContainerVariants(reducedMotion, 0.1)}
      >
        <GenerateRandomEmailsHeader reducedMotion={reducedMotion} />

        <motion.div
          ref={panelRef}
          className="mt-10 min-w-0 w-full sm:mt-12 lg:mt-14"
          variants={fadeUpVariants(reducedMotion)}
        >
          <div className="mx-auto max-w-3xl space-y-8 sm:space-y-10">
            <Card className="py-0 shadow-xs ring-1 ring-foreground/10">
              <CardHeader className="space-y-2 border-b border-border/80 px-4 py-3 [.border-b]:pb-3">
                <div className="flex items-start gap-3.5 sm:items-center">
                  <span
                    className={cn(
                      "mt-0.5 inline-flex size-10 shrink-0 items-center justify-center rounded-xl",
                      "bg-primary/10 text-primary ring-1 ring-primary/15",
                    )}
                  >
                    <Mail className="size-5" aria-hidden />
                  </span>
                  <div className="min-w-0 space-y-1 text-left">
                    <CardTitle className="text-base font-semibold leading-snug">
                      Batch size
                    </CardTitle>
                    <CardDescription className="text-sm leading-relaxed">
                      Pick how many emails you need (max 1,000 per request).
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6 px-4 pb-6 pt-0">
                <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between sm:gap-8">
                  <EmailLimitSelect
                    value={limit}
                    onValueChange={setLimit}
                    disabled={loading}
                  />
                  <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:justify-end">
                    <Button
                      type="button"
                      onClick={generate}
                      disabled={loading}
                      className="inline-flex w-full gap-2 sm:w-auto sm:min-w-36"
                      size="lg"
                    >
                      {loading ? (
                        <>
                          <Loader2
                            className="size-4 shrink-0 animate-spin"
                            aria-hidden
                          />
                          Generating…
                        </>
                      ) : (
                        <>
                          <MailPlus className="size-4 shrink-0" aria-hidden />
                          Generate
                        </>
                      )}
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={reset}
                      disabled={loading}
                      className="inline-flex w-full gap-2 sm:w-auto sm:min-w-36"
                      size="lg"
                    >
                      <RefreshCw className="size-4 shrink-0" aria-hidden />
                      Reset
                    </Button>
                  </div>
                </div>

                {error ? (
                  <p
                    className="rounded-lg border border-destructive/25 bg-destructive/5 px-4 py-3 text-sm leading-relaxed text-destructive"
                    role="alert"
                  >
                    {error}
                  </p>
                ) : null}
              </CardContent>
            </Card>

            <div className="relative min-h-32 sm:min-h-30">
              <AnimatePresence mode="wait">
                {loading ? (
                  <GenerateRandomEmailsLoading key="loading" reducedMotion={reducedMotion} />
                ) : null}

                {!loading && emails.length > 0 ? (
                  <motion.div
                    key="results"
                    {...calculatorSwapMotionProps(reducedMotion)}
                    className={cn(
                      calculatorSwapMotionProps(reducedMotion).className,
                      "mx-auto w-full max-w-none",
                    )}
                  >
                    <GenerateRandomEmailsResultCard
                      emails={emails}
                      copyState={copyState}
                      onCopy={copyCommaSeparated}
                    />
                  </motion.div>
                ) : null}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      </motion.section>
    </div>
  );
}
