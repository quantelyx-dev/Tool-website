"use client";

import { motion } from "framer-motion";

import { fadeUpVariants } from "@/lib/motion-variants";
import { cn } from "@/lib/utils";

export function GenerateRandomEmailsHeader({
  reducedMotion,
}: {
  reducedMotion: boolean | null;
}) {
  return (
        <motion.header
          className="relative mx-auto max-w-3xl px-3 pt-2 text-center sm:px-4 sm:pt-4"
          variants={fadeUpVariants(reducedMotion)}
        >
          <div
            aria-hidden
            className={cn(
              "pointer-events-none absolute inset-0 -z-10 mx-auto max-w-xl overflow-hidden rounded-3xl",
              "bg-[radial-gradient(ellipse_72%_56%_at_50%_-30%,rgba(20,184,166,0.14),transparent)]",
              "dark:bg-[radial-gradient(ellipse_72%_56%_at_50%_-30%,rgba(45,212,191,0.13),transparent)]",
            )}
          />
          <p
            className={cn(
              "mb-3 text-xs font-semibold uppercase tracking-[0.2em]",
              "text-teal-700 dark:text-teal-400 sm:text-sm",
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
            Random test email generator
          </h1>
          <p
            className={cn(
              "mx-auto mt-5 max-w-2xl px-1 text-pretty text-base leading-relaxed text-muted-foreground",
              "sm:mt-6 sm:px-0 sm:text-lg",
            )}
          >
            Produce{" "}
            <span className="font-medium text-foreground">
              test addresses on example domains
            </span>{" "}
            for mock users, staging data, and UI tests. Results are sourced from
            randomuser.me and cached briefly on the server so repeated runs stay
            responsive until the pool expires.
          </p>
        </motion.header>
  );
}
