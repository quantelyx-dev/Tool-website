"use client";

import { Loader2, Phone, RefreshCw, WandSparkles } from "lucide-react";
import type { CountryCode } from "libphonenumber-js";

import { PhoneCountrySelect } from "@/components/generate-random-phone-numbers/phone-country-select";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";

type PhoneGeneratorControlsProps = {
  country: CountryCode;
  loading: boolean;
  onCountryChange: (value: CountryCode) => void;
  onGenerate: () => void;
  onReset: () => void;
};

export function PhoneGeneratorControls({
  country,
  loading,
  onCountryChange,
  onGenerate,
  onReset,
}: PhoneGeneratorControlsProps) {
  return (
            <Card className={cn("py-0 shadow-xs ring-1 ring-foreground/10")}>
              <CardHeader
                className={cn(
                  "space-y-2 border-b border-border/80 px-4 py-3 [.border-b]:pb-3",
                )}
              >
                <div className={cn("flex items-start gap-3.5 sm:items-center")}>
                  <span
                    className={cn(
                      "mt-0.5 inline-flex size-10 shrink-0 items-center justify-center rounded-xl",
                      "bg-emerald-500/10 text-emerald-700 ring-1 ring-emerald-500/15 dark:text-emerald-300",
                    )}
                  >
                    <Phone className={cn("size-5")} aria-hidden />
                  </span>
                  <div className={cn("min-w-0 space-y-1 text-left")}>
                    <CardTitle
                      className={cn("text-base font-semibold leading-snug")}
                    >
                      Phone number generator
                    </CardTitle>
                    <CardDescription className={cn("text-sm leading-relaxed")}>
                      Choose a country to generate one reserved number.
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className={cn("space-y-6 px-4 pb-6 pt-0")}>
                <div
                  className={cn(
                    "flex flex-col gap-6 xl:flex-row xl:items-end xl:justify-between xl:gap-8",
                  )}
                >
                  <div
                    className={cn(
                      "flex min-w-0 flex-1 flex-col gap-4 sm:gap-6",
                    )}
                  >
                    <PhoneCountrySelect
                      value={country}
                      onValueChange={onCountryChange}
                      disabled={loading}
                    />
                  </div>
                  <div
                    className={cn(
                      "flex flex-col gap-3 sm:flex-row sm:flex-wrap xl:shrink-0",
                    )}
                  >
                    <Button
                      type="button"
                      onClick={onGenerate}
                      disabled={loading}
                      className={cn(
                        "inline-flex w-full gap-2 sm:w-auto sm:min-w-36",
                      )}
                      size="lg"
                    >
                      {loading ? (
                        <>
                          <Loader2
                            className={cn("size-4 shrink-0 animate-spin")}
                            aria-hidden
                          />
                          Generating...
                        </>
                      ) : (
                        <>
                          <WandSparkles
                            className={cn("size-4 shrink-0")}
                            aria-hidden
                          />
                          Generate
                        </>
                      )}
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={onReset}
                      disabled={loading}
                      className={cn(
                        "inline-flex w-full gap-2 sm:w-auto sm:min-w-36",
                      )}
                      size="lg"
                    >
                      <RefreshCw
                        className={cn("size-4 shrink-0")}
                        aria-hidden
                      />
                      Reset
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
  );
}
