"use client";

import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";

import { calculatorLoadingMotionProps } from "@/lib/sun-moon-rising/calculator-motion";
import { cn } from "@/lib/utils";

export function GenerateRandomEmailsLoading({
  reducedMotion,
}: {
  reducedMotion: boolean | null;
}) {
  return (
                  <motion.div
                    {...calculatorLoadingMotionProps(reducedMotion)}
                    className={cn(
                      calculatorLoadingMotionProps(reducedMotion).className,
                      "mx-auto flex w-full max-w-xl flex-col items-center justify-center rounded-2xl border border-dashed border-border bg-muted/25 px-6 py-12 sm:px-10 sm:py-14",
                    )}
                  >
                    <Loader2
                      className="size-10 shrink-0 animate-spin text-primary"
                      aria-hidden
                    />
                    <p className="mt-4 text-center text-sm font-medium text-foreground">
                      Fetching emails…
                    </p>
                    <p className="mt-2 max-w-sm text-center text-xs leading-relaxed text-muted-foreground">
                      First load after idle cache can take a few seconds.
                    </p>
                  </motion.div>
  );
}
