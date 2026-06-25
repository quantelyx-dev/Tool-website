"use client";

import { motion } from "framer-motion";
import { CalendarClock, Check, Clock3, Copy, X } from "lucide-react";

import type { GeneratedCronResult } from "@/lib/cron-expression-generator/generate";
import { revealedPanelVariants } from "@/lib/motion-variants";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { CopyState } from "@/components/generate-random/shared/generator-types";

type CronExpressionResultCardProps = {
  result: GeneratedCronResult;
  description: string | null;
  nextRuns: { iso: string; formatted: string }[];
  timezone: string;
  reducedMotion: boolean | null;
  onCopyExpression: () => void;
  copyState: CopyState;
  className?: string;
};

function copyLabel(copyState: CopyState): string {
  if (copyState === "copied") {
    return "Copied";
  }

  if (copyState === "failed") {
    return "Copy failed";
  }

  return "Copy expression";
}

function CopyIcon({ state }: { state: CopyState }) {
  if (state === "copied") {
    return <Check className={cn("mr-2 size-4")} aria-hidden />;
  }

  if (state === "failed") {
    return <X className={cn("mr-2 size-4")} aria-hidden />;
  }

  return <Copy className={cn("mr-2 size-4")} aria-hidden />;
}

export function CronExpressionResultCard({
  result,
  description,
  nextRuns,
  timezone,
  reducedMotion,
  onCopyExpression,
  copyState,
  className,
}: CronExpressionResultCardProps) {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={revealedPanelVariants(reducedMotion)}
      className={cn("mx-auto max-w-3xl", className)}
    >
      <Card className={cn("mt-2 py-0 shadow-xs ring-1 ring-foreground/10")}>
        <CardHeader
          className={cn(
            "space-y-2 border-b border-border/80 px-4 py-3 [.border-b]:pb-3",
          )}
        >
          <div className={cn("flex items-start gap-3.5 sm:items-center")}>
            <span
              className={cn(
                "mt-0.5 inline-flex size-10 shrink-0 items-center justify-center rounded-xl",
                "bg-primary/10 text-primary ring-1 ring-primary/15",
              )}
            >
              <Clock3 className={cn("size-5")} aria-hidden />
            </span>
            <div className={cn("min-w-0 space-y-1 text-left")}>
              <CardTitle className={cn("text-base font-semibold leading-snug")}>
                Generated cron expression
              </CardTitle>
              <CardDescription className={cn("text-sm leading-relaxed")}>
                Copy the expression or review the schedule summary below.
              </CardDescription>
            </div>
          </div>
        </CardHeader>

        <CardContent className={cn("space-y-5 px-4 pb-6 pt-4")}>
          <div className={cn("space-y-2")}>
            <p className={cn("text-xs font-semibold uppercase tracking-wide text-muted-foreground")}>
              Cron expression
            </p>
            <pre
              className={cn(
                "overflow-x-auto rounded-lg border border-border/70 bg-muted/40 px-4 py-3",
                "font-mono text-sm leading-relaxed text-foreground",
              )}
            >
              {result.expression}
            </pre>
          </div>

          {description ? (
            <div className={cn("space-y-2")}>
              <p className={cn("text-xs font-semibold uppercase tracking-wide text-muted-foreground")}>
                Human-readable
              </p>
              <p className={cn("text-sm leading-relaxed text-foreground")}>{description}</p>
            </div>
          ) : null}

          <div className={cn("space-y-3")}>
            <div className={cn("flex items-center gap-2")}>
              <CalendarClock className={cn("size-4 text-muted-foreground")} aria-hidden />
              <p className={cn("text-xs font-semibold uppercase tracking-wide text-muted-foreground")}>
                Next 5 runs ({timezone})
              </p>
            </div>

            {nextRuns.length > 0 ? (
              <ol className={cn("space-y-2 text-sm leading-relaxed text-foreground")}>
                {nextRuns.map((run) => (
                  <li
                    key={run.iso}
                    className={cn(
                      "rounded-lg border border-border/60 bg-background px-3 py-2",
                    )}
                  >
                    <time dateTime={run.iso}>{run.formatted}</time>
                  </li>
                ))}
              </ol>
            ) : (
              <p className={cn("text-sm text-muted-foreground")}>
                Unable to calculate next run times for this expression.
              </p>
            )}
          </div>

          <div className={cn("flex justify-end")}>
            <Button
              type="button"
              variant="outline"
              onClick={onCopyExpression}
              aria-live="polite"
              className={cn(
                copyState === "copied" &&
                  "border-emerald-500/40 bg-emerald-500/10 text-emerald-800 hover:bg-emerald-500/15 dark:border-emerald-400/35 dark:bg-emerald-500/15 dark:text-emerald-100 dark:hover:bg-emerald-500/20",
                copyState === "failed" &&
                  "border-destructive/40 bg-destructive/5 text-destructive hover:bg-destructive/10",
              )}
            >
              <motion.span
                key={copyState}
                initial={{ opacity: 0, y: 3, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -3, scale: 0.97 }}
                className={cn("inline-flex items-center")}
              >
                <CopyIcon state={copyState} />
                {copyLabel(copyState)}
              </motion.span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
