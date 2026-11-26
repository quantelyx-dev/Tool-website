"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import type { CountryCode } from "libphonenumber-js";
import { useCallback, useEffect, useRef, useState } from "react";

import { PHONE_COUNTRY_DEFAULT } from "@/components/generate-random-phone-numbers/phone-country-select";
import { PhoneGeneratorControls } from "@/components/generate-random-phone-numbers/phone-generator-controls";
import { PhoneGeneratorHeader } from "@/components/generate-random-phone-numbers/phone-generator-header";
import {
  fadeUpVariants,
  staggerContainerVariants,
} from "@/lib/motion-variants";
import { cn } from "@/lib/utils";
import { generateRandomPhoneNumber } from "@/lib/generate-random-phone-numbers/generate";
import { useAnalytics } from "@/hooks/use-analytics";
import {
  type CopyField,
  GeneratedPhoneResultCard,
} from "./generate-random-phone-result";

type GenerateRandomPhoneNumbersToolContentProps = {
  className?: string;
};

export function GenerateRandomPhoneNumbersToolContent({
  className,
}: GenerateRandomPhoneNumbersToolContentProps) {
  const reducedMotion = useReducedMotion();
  const { onUse, onResult, onCopy, onReset } = useAnalytics(
    "random-phone-numbers",
  );
  const panelRef = useRef<HTMLDivElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);
  const copyResetTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(
    null,
  );
  const [country, setCountry] = useState<CountryCode>(PHONE_COUNTRY_DEFAULT);
  const [loading, setLoading] = useState(false);
  const [generated, setGenerated] = useState<ReturnType<
    typeof generateRandomPhoneNumber
  > | null>(null);
  const [copiedField, setCopiedField] = useState<CopyField | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    return () => {
      if (copyResetTimeoutRef.current) {
        clearTimeout(copyResetTimeoutRef.current);
      }
    };
  }, []);

  const reset = useCallback(() => {
    onReset();
    setCountry(PHONE_COUNTRY_DEFAULT);
    setLoading(false);
    setGenerated(null);
    setCopiedField(null);
    setError(null);
    requestAnimationFrame(() => {
      panelRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    });
  }, [onReset]);

  const generatePlaceholder = useCallback(async () => {
    onUse({ country: country as string });
    setLoading(true);
    setGenerated(null);
    setCopiedField(null);
    setError(null);

    try {
      const result = generateRandomPhoneNumber(country);
      await new Promise((resolve) => setTimeout(resolve, 420));
      setGenerated(result);
      onResult({ country: country as string });
      setLoading(false);

      requestAnimationFrame(() => {
        resultsRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      });
    } catch (err: unknown) {
      console.error("Phone generation error:", err);
      setError(
        err instanceof Error ? err.message : "Failed to generate phone number",
      );
      setLoading(false);
    }
  }, [country, onUse, onResult]);

  const handleCopy = useCallback(
    (field: CopyField, value: string) => {
      try {
        navigator.clipboard.writeText(value);
        onCopy(field);
        setCopiedField(field);
        if (copyResetTimeoutRef.current) {
          clearTimeout(copyResetTimeoutRef.current);
        }
        copyResetTimeoutRef.current = setTimeout(() => {
          setCopiedField(null);
        }, 1400);
      } catch {
        // ignore
      }
    },
    [onCopy],
  );

  return (
    <div className={cn("flex flex-col", className)}>
      <motion.section
        className={cn("flex flex-col")}
        initial="hidden"
        animate="visible"
        variants={staggerContainerVariants(reducedMotion, 0.1)}
      >
        <PhoneGeneratorHeader reducedMotion={reducedMotion} />

        <motion.div
          ref={panelRef}
          className={cn("mt-10 min-w-0 w-full sm:mt-12 lg:mt-14")}
          variants={fadeUpVariants(reducedMotion)}
        >
          <div className={cn("mx-auto max-w-3xl space-y-8 sm:space-y-10")}>
            <PhoneGeneratorControls
              country={country}
              loading={loading}
              onCountryChange={setCountry}
              onGenerate={generatePlaceholder}
              onReset={reset}
            />
            {/* Results / Preview */}
            <motion.div
              ref={resultsRef}
              variants={fadeUpVariants(reducedMotion)}
              className={cn("mx-auto max-w-3xl")}
            >
              <AnimatePresence initial={false}>
                {generated ? (
                  <GeneratedPhoneResultCard
                    key={generated.e164}
                    generated={generated}
                    reducedMotion={reducedMotion}
                    copiedField={copiedField}
                    onCopy={handleCopy}
                  />
                ) : null}
              </AnimatePresence>
              {error ? (
                <p className={cn("mt-3 text-sm text-destructive")}>{error}</p>
              ) : null}
            </motion.div>
          </div>
        </motion.div>
      </motion.section>
    </div>
  );
}
