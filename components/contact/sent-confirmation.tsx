"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

type SentConfirmationProps = {
  reducedMotion: boolean | null;
  onReset: () => void;
};

export function SentConfirmation({
  reducedMotion,
  onReset,
}: SentConfirmationProps) {
  return (
    <motion.div
      className={cn("flex flex-col gap-6")}
      initial={reducedMotion ? false : { opacity: 0, scale: 0.98 }}
      animate={reducedMotion ? {} : { opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
    >
      <div
        className={cn(
          "rounded-xl border border-indigo-500/20 bg-linear-to-br",
          "from-indigo-500/[0.07] to-transparent px-5 py-6 dark:from-indigo-500/12",
        )}
      >
        <p className={cn("font-heading text-lg font-semibold text-foreground")}>
          Thanks — your message is on its way.
        </p>
        <p className={cn("mt-2 text-sm leading-relaxed text-muted-foreground")}>
          We aim to respond within a few business days. Check the inbox of the
          email you provided for a copy of your message.
        </p>
      </div>
      <Button type="button" variant="outline" onClick={onReset}>
        Send another message
      </Button>
    </motion.div>
  );
}
