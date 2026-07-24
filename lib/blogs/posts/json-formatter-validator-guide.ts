import { callout, h2, h3, ol, p, toolCta, ul } from "@/lib/blogs/post-helpers";
import type { BlogPost } from "@/lib/blogs/types";
import { jsonToolFaqs } from "@/lib/tool-faqs";

export const jsonToolPost: BlogPost = {
  slug: "json-formatter-validator-guide",
  title: "JSON Formatter & Validator: Fix Errors Fast, Explore Trees, Generate TypeScript",
  excerpt:
    "Why generic 'Unexpected token' errors waste your time, how to read a precise line/column JSON error, and how to go from a raw API response to TypeScript interfaces in seconds.",
  keywords: [
    "json formatter",
    "json validator online",
    "fix invalid json",
    "json syntax error line number",
    "json to typescript interface",
    "json tree viewer",
  ],
  toolLink: "/tools/json-formatter-validator",
  toolName: "JSON formatter & validator",
  publishedAt: "2026-07-24",
  updatedAt: "2026-07-24",
  readTimeMinutes: 9,
  relatedSlugs: [
    "base64-encoder-decoder-guide",
    "regex-tester-guide",
    "cron-expression-generator-guide",
  ],
  sections: [
    p(
      "Almost every developer has hit a wall staring at 'Unexpected token } in JSON at position 47' with no idea which line that actually is. JSON.parse() errors are notoriously unhelpful — the exact wording changes between Chrome, Firefox, Safari, and Node.js, and some of them don't even give you a position at all. This guide covers how to actually debug broken JSON quickly, when to reach for a tree view instead of raw text, and how to skip writing TypeScript types by hand.",
    ),
    h2("Why JSON error messages are so inconsistent"),
    p(
      "JSON.parse() is implemented separately by every JavaScript engine — V8 (Chrome, Node, Edge), SpiderMonkey (Firefox), and JavaScriptCore (Safari) — and none of them are required to format their error messages the same way. One engine might tell you 'Unexpected token } in JSON at position 47 (line 3 column 2)', another might just say 'Unexpected token' with no location, and a third might describe the problem in completely different terms for the exact same broken input.",
    ),
    p(
      "That inconsistency is why this tool doesn't rely on your browser's native parser error at all. It runs its own JSON grammar checker — a small parser that walks your input character by character, following the JSON spec exactly — purely to pinpoint the first place your document breaks the grammar. That means you always get the same precise line, column, and plain-English explanation, no matter which browser you opened the tool in.",
    ),
    toolCta(),
    h2("Reading a JSON error like a developer, not guessing"),
    p(
      "The four syntax mistakes that account for the overwhelming majority of 'invalid JSON' reports are all easy to spot once you know what to look for:",
    ),
    ul([
      "Trailing commas — {\"a\": 1,} is valid in JavaScript object literals but not in JSON. Remove the comma before the closing } or ].",
      "Single quotes — JSON strings and keys must use double quotes. 'name' and {'a': 1} are both invalid; JavaScript object literal syntax is not JSON.",
      "Unquoted keys — {name: \"Ada\"} needs to be {\"name\": \"Ada\"}. Every key must be a double-quoted string, no exceptions.",
      "Missing commas between properties or array items — a newline is not a separator; JSON needs an explicit , between every entry.",
    ]),
    p(
      "Paste the broken JSON into the Format & validate tab and the error banner tells you exactly which line and column to look at, with a 'Go to error' button that jumps your cursor straight to the offending character — no more counting braces by eye.",
    ),
    h2("Format, minify, and sort — without changing meaning"),
    p(
      "Once your JSON is valid, the same tab lets you re-indent it (2 spaces, 4 spaces, tabs, or fully minified for shipping over the wire) and optionally sort object keys alphabetically. Neither operation changes what the JSON means: the JSON spec doesn't define an order for object keys, so a parser reads {\"a\":1,\"b\":2} and {\"b\":2,\"a\":1} identically. Sorting is purely a readability aid — it makes it much easier to diff two JSON documents that came from different sources or different runs of the same API.",
    ),
    h2("When to use the tree view instead of raw text"),
    p(
      "Deeply nested API responses — five or six levels of objects and arrays — are hard to scan as flat, indented text, especially once a document runs past a few hundred lines. The Tree view tab turns the same JSON into a collapsible, color-coded tree: click any object or array to fold it away, use Expand all / Collapse all to jump between a full overview and a birds-eye summary, and hover any leaf value to copy either the value itself or its exact JSONPath (like $.data.users[3].email) — handy when you need to reference that field in code, a JQ query, or a bug report.",
    ),
    toolCta(),
    h2("Turning a JSON response into TypeScript interfaces"),
    p(
      "Hand-writing a TypeScript interface to match an API response is tedious and error-prone — it's easy to typo a field name or miss that a value can be null. The JSON → TypeScript tab infers interfaces directly from your actual data: nested objects become named, reusable interfaces (an array of same-shaped objects generates one interface, not a duplicate per item), arrays with mixed element types become a proper union, and any property name that isn't a valid TypeScript identifier gets automatically quoted.",
    ),
    h3("A quick example"),
    p(
      "Paste a JSON object like { \"id\": 1, \"name\": \"Ada\", \"tags\": [\"admin\"] } and the tool generates a matching interface Root { id: number; name: string; tags: string[]; } instantly — set a custom root type name (e.g. User instead of Root) before copying it into your codebase.",
    ),
    ol([
      "Paste or drop your JSON (an API response, a config file, a fixture) into the Format & validate tab",
      "Confirm it shows 'Valid JSON' — fix any error the line/column message points to first",
      "Switch to JSON → TypeScript and set a root type name that matches your use case",
      "Copy the generated interfaces directly into a .ts file, or download it",
    ]),
    callout(
      "Type inference is based only on the sample you provide — if a field is sometimes a string and sometimes missing across different API responses, generate from the most representative sample and adjust optionality by hand afterward.",
    ),
    h2("Free JSON formatter, tree explorer, and TypeScript generator"),
    p(
      "This tool covers the three things developers actually do with JSON day to day — fix and beautify it, explore it visually when it's too deep to read as text, and turn it into types for a typed codebase — all from a single paste, entirely in your browser. Nothing you enter is ever uploaded anywhere, which makes it safe to use with real API payloads, internal configs, or data containing sensitive fields.",
    ),
  ],
  faqs: jsonToolFaqs,
};
