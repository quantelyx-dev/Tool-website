"use client";

import { Check, Copy } from "lucide-react";

import type { CopyState } from "@/components/generate-random/shared/generator-types";
import type { RegexMatch, RegexMatchResult } from "@/lib/regex-tester/match";
import { cn } from "@/lib/utils";

type RegexTesterResultProps = {
  result: RegexMatchResult | null;
  testString: string;
  copyState: CopyState;
  onCopy: () => void;
};

type TextSegment = {
  text: string;
  isMatch: boolean;
};

function buildSegments(input: string, matches: RegexMatch[]): TextSegment[] {
  const segments: TextSegment[] = [];
  let cursor = 0;

  for (const m of matches) {
    if (m.index > cursor) {
      segments.push({ text: input.slice(cursor, m.index), isMatch: false });
    }
    if (m.fullMatch.length > 0) {
      segments.push({ text: m.fullMatch, isMatch: true });
    }
    cursor = m.index + Math.max(m.fullMatch.length, 1);
  }

  if (cursor <= input.length) {
    const remaining = input.slice(cursor);
    if (remaining.length > 0) {
      segments.push({ text: remaining, isMatch: false });
    }
  }

  return segments;
}

export function RegexTesterResult({
  result,
  testString,
  copyState,
  onCopy,
}: RegexTesterResultProps) {
  if (!result || !testString) {
    return (
      <div
        className={cn(
          "mt-6 rounded-xl border border-dashed border-border bg-muted/30 px-6 py-10 text-center",
        )}
      >
        <p className={cn("text-sm text-muted-foreground")}>
          {!testString
            ? "Add a test string above to see matches."
            : "Enter a pattern to start matching."}
        </p>
      </div>
    );
  }

  const { matches, matchCount } = result;
  const hasMatches = matchCount > 0;
  const segments = hasMatches ? buildSegments(testString, matches) : null;
  const maxGroupCount = hasMatches
    ? Math.max(...matches.map((m) => m.groups.length))
    : 0;

  return (
    <div className={cn("mt-6 flex flex-col gap-4")}>
      {/* Match count + copy */}
      <div className={cn("flex items-center justify-between gap-3")}>
        <span
          className={cn(
            "rounded-full px-3 py-0.5 text-xs font-semibold",
            hasMatches
              ? "bg-violet-100 text-violet-700 dark:bg-violet-950 dark:text-violet-300"
              : "bg-muted text-muted-foreground",
          )}
        >
          {hasMatches
            ? `${matchCount} match${matchCount !== 1 ? "es" : ""} found`
            : "No matches"}
        </span>

        {hasMatches && (
          <button
            type="button"
            onClick={onCopy}
            aria-label="Copy all matches to clipboard"
            className={cn(
              "flex items-center gap-1.5 rounded-lg border border-border px-3 py-1.5 text-xs text-muted-foreground",
              "transition-colors hover:border-violet-400 hover:text-foreground",
            )}
          >
            {copyState === "copied" ? (
              <Check size={13} className={cn("text-emerald-500")} aria-hidden />
            ) : (
              <Copy size={13} aria-hidden />
            )}
            {copyState === "copied" ? "Copied!" : "Copy matches"}
          </button>
        )}
      </div>

      {/* Highlighted test string */}
      <div className={cn("rounded-xl border border-border bg-card p-4")}>
        <p
          className={cn(
            "mb-2 text-xs font-medium uppercase tracking-wide text-muted-foreground",
          )}
        >
          Highlighted matches
        </p>
        <pre
          aria-live="polite"
          aria-label="Test string with highlighted matches"
          className={cn(
            "whitespace-pre-wrap break-all font-mono text-sm leading-relaxed text-foreground",
          )}
        >
          {hasMatches && segments
            ? segments.map((seg, i) =>
                seg.isMatch ? (
                  <mark
                    key={i}
                    className={cn(
                      "rounded-sm bg-violet-200/80 text-violet-900",
                      "dark:bg-violet-800/60 dark:text-violet-100",
                    )}
                  >
                    {seg.text}
                  </mark>
                ) : (
                  <span key={i}>{seg.text}</span>
                ),
              )
            : testString}
        </pre>
      </div>

      {/* Match details table */}
      {hasMatches && (
        <div className={cn("overflow-hidden rounded-xl border border-border bg-card")}>
          <p
            className={cn(
              "border-b border-border px-4 py-2.5 text-xs font-medium uppercase tracking-wide text-muted-foreground",
            )}
          >
            Match details
          </p>
          <div className={cn("overflow-x-auto")}>
            <table className={cn("w-full text-sm")}>
              <thead>
                <tr className={cn("border-b border-border bg-muted/40")}>
                  <th
                    scope="col"
                    className={cn(
                      "px-4 py-2 text-left text-xs font-medium text-muted-foreground",
                    )}
                  >
                    #
                  </th>
                  <th
                    scope="col"
                    className={cn(
                      "px-4 py-2 text-left text-xs font-medium text-muted-foreground",
                    )}
                  >
                    Match
                  </th>
                  <th
                    scope="col"
                    className={cn(
                      "px-4 py-2 text-left text-xs font-medium text-muted-foreground",
                    )}
                  >
                    Index
                  </th>
                  {Array.from({ length: maxGroupCount }, (_, i) => (
                    <th
                      key={i}
                      scope="col"
                      className={cn(
                        "px-4 py-2 text-left text-xs font-medium text-muted-foreground",
                      )}
                    >
                      Group {i + 1}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {matches.map((m, i) => (
                  <tr
                    key={i}
                    className={cn(
                      "border-b border-border last:border-0 hover:bg-muted/20",
                    )}
                  >
                    <td
                      className={cn("px-4 py-2 text-xs text-muted-foreground")}
                    >
                      {i + 1}
                    </td>
                    <td className={cn("px-4 py-2 font-mono text-xs")}>
                      {m.fullMatch ? (
                        <span
                          className={cn(
                            "rounded-sm bg-violet-100 px-1 py-0.5 text-violet-800",
                            "dark:bg-violet-950 dark:text-violet-300",
                          )}
                        >
                          {m.fullMatch}
                        </span>
                      ) : (
                        <span className={cn("italic text-muted-foreground/50")}>
                          empty
                        </span>
                      )}
                    </td>
                    <td
                      className={cn(
                        "px-4 py-2 font-mono text-xs text-muted-foreground",
                      )}
                    >
                      {m.index}
                    </td>
                    {Array.from({ length: maxGroupCount }, (_, gi) => (
                      <td
                        key={gi}
                        className={cn(
                          "px-4 py-2 font-mono text-xs text-muted-foreground",
                        )}
                      >
                        {m.groups[gi] !== undefined ? (
                          <span
                            className={cn("rounded-sm bg-muted px-1 py-0.5")}
                          >
                            {m.groups[gi]}
                          </span>
                        ) : (
                          <span className={cn("italic opacity-40")}>—</span>
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
