import { z } from "zod";

export const REGEX_FLAGS = ["g", "i", "m", "s", "u", "y"] as const;
export type RegexFlag = (typeof REGEX_FLAGS)[number];

export const FLAG_DESCRIPTIONS: Record<RegexFlag, string> = {
  g: "Global — find all matches",
  i: "Case insensitive",
  m: "Multiline — ^ and $ match line boundaries",
  s: "Dot all — dot matches newlines",
  u: "Unicode mode",
  y: "Sticky — match from lastIndex only",
};

export const regexTesterSchema = z.object({
  pattern: z.string(),
  flags: z.string(),
  testString: z.string(),
});

export type RegexTesterFormState = z.infer<typeof regexTesterSchema>;

export function createDefaultRegexFormState(): RegexTesterFormState {
  return { pattern: "", flags: "g", testString: "" };
}
