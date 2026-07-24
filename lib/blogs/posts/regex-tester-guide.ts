import { callout, h2, h3, ol, p, toolCta, ul } from "@/lib/blogs/post-helpers";
import type { BlogPost } from "@/lib/blogs/types";
import { regexTesterFaqs } from "@/lib/tool-faqs";

export const regexTesterPost: BlogPost = {
  slug: "regex-tester-guide",
  title: "Regex Tester Guide: Test, Debug, and Master Regular Expressions",
  excerpt:
    "Learn how to test regular expressions effectively — from syntax basics and flag options to common patterns and debugging techniques, with real-time feedback in your browser.",
  keywords: [
    "regex tester",
    "regular expression guide",
    "regex syntax",
    "regex flags",
    "test regex online",
    "regex capture groups",
    "common regex patterns",
  ],
  toolLink: "/tools/regex-tester",
  toolName: "Regex tester",
  publishedAt: "2026-07-15",
  updatedAt: "2026-07-15",
  readTimeMinutes: 11,
  relatedSlugs: [
    "cron-expression-generator-guide",
    "uuid-v7-generator-guide",
    "json-formatter-validator-guide",
  ],
  sections: [
    p(
      "Regular expressions are one of the most powerful tools in a developer's toolkit — and one of the most frustrating to debug from memory. A single misplaced quantifier, a forgotten flag, or a greedy match swallowing too much text can take minutes to track down without immediate visual feedback.",
    ),
    p(
      "A regex tester removes the guesswork. You enter your pattern, paste a sample string, and see exactly which parts match — highlighted in context, broken down by match index, and separated into capture groups. This guide covers everything you need to use a regex tester effectively: syntax fundamentals, flag behavior, common patterns, and debugging strategies.",
    ),
    h2("What is a regular expression?"),
    p(
      "A regular expression (regex) is a sequence of characters that defines a search pattern. Regex engines scan input text and return the positions and contents of substrings that match the pattern. They are built into virtually every programming language and many text editors, command-line tools, and database query languages.",
    ),
    p(
      "Example: the pattern `\\b\\d{4}\\b` matches any standalone four-digit number. The `\\b` assertions mark word boundaries, `\\d` matches a digit character, and `{4}` is a quantifier meaning exactly four times. Without a tester, verifying this against sample data means running a script or writing a test case — a regex tester gives you the result instantly.",
    ),
    h3("When to use a regex tester"),
    ul([
      "Validating input patterns — email addresses, phone numbers, postal codes, URLs",
      "Extracting structured data from logs, CSV exports, or scraped HTML",
      "Building search-and-replace rules in editors like VS Code or Vim",
      "Debugging an existing pattern that matches too much or too little",
      "Learning regex syntax interactively without switching to a REPL",
    ]),
    toolCta(),
    h2("Regex syntax quick reference"),
    p(
      "Every regex pattern is composed of literals, metacharacters, and quantifiers. Understanding these building blocks lets you read and write patterns confidently.",
    ),
    h3("Character classes"),
    ul([
      "\\d — any digit (0–9)",
      "\\w — any word character (letters, digits, underscore)",
      "\\s — any whitespace (space, tab, newline)",
      "\\D, \\W, \\S — uppercase versions negate: non-digit, non-word, non-whitespace",
      "[abc] — any single character from the set a, b, or c",
      "[^abc] — any character NOT in the set",
      "[a-z] — any lowercase letter (range notation)",
      ". — any character except newline (use the s flag to include newlines)",
    ]),
    h3("Anchors and boundaries"),
    ul([
      "^ — start of string (or start of line with the m flag)",
      "$ — end of string (or end of line with the m flag)",
      "\\b — word boundary — position between \\w and \\W",
      "\\B — non-word boundary",
    ]),
    h3("Quantifiers"),
    ul([
      "* — zero or more (greedy)",
      "+ — one or more (greedy)",
      "? — zero or one (makes the preceding element optional)",
      "{n} — exactly n times",
      "{n,} — n or more times",
      "{n,m} — between n and m times (inclusive)",
      "*?, +?, ?? — lazy variants: match as few characters as possible",
    ]),
    h3("Groups and alternation"),
    ul([
      "(abc) — capture group: matches abc and stores the result",
      "(?:abc) — non-capturing group: groups without storing",
      "(?<name>abc) — named capture group: access by name as well as index",
      "a|b — alternation: matches a or b",
      "(?=abc) — positive lookahead: must be followed by abc",
      "(?!abc) — negative lookahead: must not be followed by abc",
      "(?<=abc) — positive lookbehind: must be preceded by abc",
      "(?<!abc) — negative lookbehind: must not be preceded by abc",
    ]),
    callout(
      "Greedy vs lazy quantifiers trip up most developers. `.*` in `.*(\\d+)` greedily consumes as many characters as possible, leaving the fewest digits for the group. Switching to `.*?(\\d+)` makes the wildcard lazy and lets the group capture earlier. Use your tester to observe the difference on the same input.",
    ),
    h2("Regex flags explained"),
    p(
      "Flags modify how the engine interprets the pattern. Most regex testers display flags after the closing slash of the pattern — `/pattern/flags`. Toggling the wrong flag is a common source of bugs.",
    ),
    ol([
      "g (global) — find every match in the input, not just the first. Without g, exec() and match() stop at the first occurrence.",
      "i (case insensitive) — treat uppercase and lowercase letters as equivalent. `/hello/i` matches 'Hello', 'HELLO', and 'hello'.",
      "m (multiline) — change the meaning of ^ and $. Without m, they match the start and end of the entire string. With m, they match the start and end of each line.",
      "s (dotAll) — make the dot . match newline characters too. Useful when your input spans multiple lines and you want to match across them.",
      "u (Unicode) — enable full Unicode support. Required for patterns that use Unicode property escapes like \\p{Letter} or surrogate pairs for emoji.",
      "y (sticky) — match only at the position indicated by lastIndex. Unlike g, the engine does not search forward — it either matches at the exact position or fails.",
    ]),
    callout(
      "The g and y flags both advance lastIndex after each match, but y only matches at lastIndex while g searches forward. Combining both flags on the same pattern applies sticky semantics. Most use cases need g, i, or m — reach for s, u, and y only when the specific behavior is required.",
    ),
    h2("Common regex patterns"),
    p(
      "These patterns cover the most frequent validation and extraction tasks. Paste the test string into the tester and toggle the g flag to see all matches at once.",
    ),
    h3("Email address"),
    p(
      "Pattern: `[a-zA-Z0-9._%+\\-]+@[a-zA-Z0-9.\\-]+\\.[a-zA-Z]{2,}` — matches typical email formats. Real email validation is complex; this pattern covers the common case and rejects obvious non-emails. Use the i flag to handle uppercase domains.",
    ),
    h3("URL"),
    p(
      "Pattern: `https?:\\/\\/[^\\s/$.?#].[^\\s]*` — matches http and https URLs with the s optional (the `?` after `s`). The character class `[^\\s]` stops matching at any whitespace, which works well for extracting URLs from prose text.",
    ),
    h3("Phone number (US)"),
    p(
      "Pattern: `(?:\\+1[-.\\s]?)?(?:\\(\\d{3}\\)|\\d{3})[-.\\s]?\\d{3}[-.\\s]?\\d{4}` — matches common US formats including (555) 123-4567, 555-123-4567, and +1 555 123 4567. The outer group with `?:` is non-capturing, and the optional country code `+1` uses `?` to make it optional.",
    ),
    h3("ISO date (YYYY-MM-DD)"),
    p(
      "Pattern: `(\\d{4})-(0[1-9]|1[0-2])-(0[1-9]|[12]\\d|3[01])` — three capture groups for year, month, and day. The month group restricts values to 01–12 and the day group restricts to 01–31. Enable the g flag to extract all dates from a log file.",
    ),
    h3("IPv4 address"),
    p(
      "Pattern: `\\b(?:(?:25[0-5]|2[0-4]\\d|[01]?\\d\\d?)\\.){3}(?:25[0-5]|2[0-4]\\d|[01]?\\d\\d?)\\b` — matches valid IPv4 octets (0–255). The repeating group with `{3}` handles the first three octets followed by a dot, and the final group handles the last octet without a trailing dot.",
    ),
    toolCta(),
    h2("Testing and debugging strategies"),
    p(
      "A regex tester is most useful when you approach debugging systematically rather than adjusting random parts of the pattern and hoping for a match.",
    ),
    h3("Start simple, then add complexity"),
    p(
      "Begin with a literal substring you expect to match, confirm it works, then gradually replace parts with metacharacters. If the literal `2024-07` matches but `\\d{4}-\\d{2}` does not, the issue is in your metacharacter syntax — not the overall structure.",
    ),
    h3("Use the global flag to audit coverage"),
    p(
      "Enable g and paste a real sample from your data — a log file excerpt, a batch of emails, a CSV row. The match count and highlighted results immediately reveal whether your pattern is too broad (matching unintended strings) or too narrow (missing valid inputs).",
    ),
    h3("Inspect capture groups for extraction bugs"),
    p(
      "If you are extracting a substring with a capture group and the group column in the match details shows `undefined`, the group did not participate in the match. This usually means the group is inside an alternation arm that was not taken, or a quantifier made the group optional and it matched zero times.",
    ),
    h3("Watch for greedy overreach"),
    p(
      "If a pattern like `<.*>` matches an entire line of HTML instead of a single tag, the `.*` is greedily consuming everything up to the last `>` on the line. Switch to `<.*?>` (lazy) or use a negated character class `<[^>]*>` to stop at the first closing angle bracket.",
    ),
    h3("Test edge cases explicitly"),
    p(
      "Add edge case strings to your test input separated by newlines with the m flag enabled — an empty string, a string with only special characters, a very long input, and the boundary values for numeric patterns. Regex bugs most often appear at boundaries, not in typical cases.",
    ),
    h2("Free regex tester"),
    p(
      "Use our tool to enter a pattern, toggle any combination of flags, and see highlighted matches with capture groups and index positions updated as you type — no install, no sign-up, everything runs in your browser.",
    ),
  ],
  faqs: regexTesterFaqs,
};
