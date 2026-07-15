"use client";

import { cn } from "@/lib/utils";
import {
  FLAG_DESCRIPTIONS,
  REGEX_FLAGS,
  type RegexFlag,
  type RegexTesterFormState,
} from "@/lib/schemas/regex-tester-schema";

type RegexTesterFormProps = {
  formState: RegexTesterFormState;
  error: string | null;
  onFormStateChange: (state: RegexTesterFormState) => void;
  onClear: () => void;
};

export function RegexTesterForm({
  formState,
  error,
  onFormStateChange,
  onClear,
}: RegexTesterFormProps) {
  function handlePatternChange(value: string) {
    onFormStateChange({ ...formState, pattern: value });
  }

  function handleFlagToggle(flag: RegexFlag) {
    const hasFlag = formState.flags.includes(flag);
    const newFlags = hasFlag
      ? formState.flags.replace(flag, "")
      : formState.flags + flag;
    onFormStateChange({ ...formState, flags: newFlags });
  }

  function handleTestStringChange(value: string) {
    onFormStateChange({ ...formState, testString: value });
  }

  const hasContent = formState.pattern !== "" || formState.testString !== "";

  return (
    <div className={cn("mt-8 flex flex-col gap-5")}>
      {/* Pattern + Flags */}
      <div className={cn("rounded-xl border border-border bg-card p-5")}>
        <label
          htmlFor="regex-pattern"
          className={cn("mb-2 block text-sm font-medium text-foreground")}
        >
          Regular expression
        </label>

        <div
          className={cn(
            "flex items-center gap-1.5 rounded-lg border border-input bg-background px-3 py-2",
            "focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-1",
            error && "border-destructive focus-within:ring-destructive",
          )}
        >
          <span
            className={cn("select-none font-mono text-lg text-muted-foreground")}
            aria-hidden
          >
            /
          </span>
          <input
            id="regex-pattern"
            type="text"
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="off"
            spellCheck={false}
            value={formState.pattern}
            onChange={(e) => handlePatternChange(e.target.value)}
            placeholder="pattern"
            aria-describedby={error ? "regex-pattern-error" : undefined}
            aria-invalid={!!error}
            className={cn(
              "min-w-0 flex-1 bg-transparent font-mono text-sm text-foreground outline-none",
              "placeholder:text-muted-foreground/40",
            )}
          />
          <span
            className={cn("select-none font-mono text-lg text-muted-foreground")}
            aria-label={`flags: ${formState.flags || "none"}`}
          >
            /{formState.flags}
          </span>
        </div>

        {error && (
          <p
            id="regex-pattern-error"
            role="alert"
            className={cn("mt-2 text-xs text-destructive")}
          >
            {error}
          </p>
        )}

        {/* Flag toggles */}
        <div
          className={cn("mt-3 flex flex-wrap items-center gap-2")}
          role="group"
          aria-label="Regex flags"
        >
          <span className={cn("text-xs text-muted-foreground")}>Flags:</span>
          {REGEX_FLAGS.map((flag) => {
            const active = formState.flags.includes(flag);
            return (
              <button
                key={flag}
                type="button"
                onClick={() => handleFlagToggle(flag)}
                aria-pressed={active}
                title={FLAG_DESCRIPTIONS[flag]}
                className={cn(
                  "rounded-md px-2.5 py-0.5 font-mono text-xs font-medium transition-colors",
                  active
                    ? "bg-violet-600 text-white"
                    : "border border-border bg-muted text-muted-foreground hover:border-violet-400 hover:text-foreground",
                )}
              >
                {flag}
              </button>
            );
          })}
        </div>
      </div>

      {/* Test string */}
      <div className={cn("rounded-xl border border-border bg-card p-5")}>
        <label
          htmlFor="regex-test-string"
          className={cn("mb-2 block text-sm font-medium text-foreground")}
        >
          Test string
        </label>
        <textarea
          id="regex-test-string"
          value={formState.testString}
          onChange={(e) => handleTestStringChange(e.target.value)}
          placeholder="Enter text to test your regular expression against…"
          rows={6}
          className={cn(
            "w-full resize-y rounded-lg border border-input bg-background px-3 py-2",
            "font-mono text-sm text-foreground outline-none",
            "placeholder:text-muted-foreground/40",
            "focus:ring-2 focus:ring-ring focus:ring-offset-1",
          )}
        />
      </div>

      {/* Clear action */}
      {hasContent && (
        <div className={cn("flex justify-end")}>
          <button
            type="button"
            onClick={onClear}
            className={cn(
              "rounded-lg border border-border px-4 py-2 text-sm text-muted-foreground",
              "transition-colors hover:border-destructive/50 hover:text-destructive",
            )}
          >
            Clear
          </button>
        </div>
      )}
    </div>
  );
}
