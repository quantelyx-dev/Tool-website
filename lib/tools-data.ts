import type { ToolEntry, ToolGroup } from "@/lib/types";

export const TOOL_GROUPS = [
  {
    type: "calculator",
    tools: [
      {
        name: "Sun Moon and Rising Sign calculator",
        description:
          "Discover your Sun, Moon, and Rising signs based on your birth details.",
        link: "/tools/sun-moon-rising-calculator",
        updatedAt: "2026-11-26",
      },
      {
        name: "Daily compound interest calculator",
        description:
          "Project balances with daily compounding, currencies, contributions, reinvestment, and exports.",
        link: "/tools/daily-compound-interest-calculator",
        updatedAt: "2026-11-26",
      },
      {
        name: "Indiana child support calculator",
        description:
          "Estimate weekly Indiana child support with the guideline schedule, income shares, and the parenting time credit.",
        link: "/tools/indiana-child-support-calculator",
        updatedAt: "2026-11-26",
      },
      {
        name: "US paycheck calculator",
        description:
          "Estimate 2026 take-home pay after federal tax, FICA, state tax, 401(k), and deductions for salary or hourly pay in any state.",
        link: "/tools/us-paycheck-calculator",
        updatedAt: "2026-11-26",
      },
    ],
  },
  {
    type: "data",
    tools: [
      {
        name: "Random username generator",
        description:
          "Pull batches of plausible usernames from a cached pool backed by randomuser.me, with quick copy for spreadsheets and fixtures.",
        link: "/tools/generate-random-usernames",
        updatedAt: "2026-11-26",
      },
      {
        name: "Random email generator",
        description:
          "Generate test email addresses on reserved example domains, with quick copy for spreadsheets and fixtures.",
        link: "/tools/generate-random-emails",
        updatedAt: "2026-11-26",
      },
      {
        name: "Random name generator",
        description:
          "Pull first names, last names, or full names from the cached identity pool, with format selection and quick copy for spreadsheets and fixtures.",
        link: "/tools/generate-random-names",
        updatedAt: "2026-11-26",
      },
      {
        name: "Random phone number generator",
        description:
          "Generate test phone numbers from ranges reserved for fiction in the US, Canada, the UK, and Australia.",
        link: "/tools/generate-random-phone-numbers",
        updatedAt: "2026-11-26",
      },
      // {
      //   name: 'Random credit card generator',
      //   description:
      //     'Generate plausible credit card numbers per selected issuer, with quick copy for spreadsheets and fixtures.',
      //   link: '/tools/generate-random-credit-cards',
      // },
      // {
      //   name: "Random SSN generator",
      //   description:
      //     "Generate structurally valid fake U.S. Social Security Numbers in single or bulk mode for fixtures and demos.",
      //   link: "/tools/generate-random-ssn",
      // },
      {
        name: "Random address generator",
        description:
          "Generate random test addresses in single or bulk mode, with quick copy for one result and CSV export for batches.",
        link: "/tools/generate-random-addresses",
        updatedAt: "2026-11-26",
      },
      {
        name: "Random UUIDv7 generator",
        description:
          "Generate sortable UUIDv7 identifiers in single or bulk mode for fixtures, imports, and test data.",
        link: "/tools/generate-random-uuids",
        updatedAt: "2026-11-26",
      },
      {
        name: "Random password generator",
        description:
          "Generate random passwords with configurable length and character sets, with zxcvbn-based strength estimates.",
        link: "/tools/generate-random-passwords",
        updatedAt: "2026-11-26",
      },
      {
        name: "Random IP address generator",
        description:
          "Generate test IPv4 or IPv6 addresses from reserved documentation ranges, one at a time or as a CSV batch.",
        link: "/tools/generate-random-ip-addresses",
        updatedAt: "2026-11-26",
      },
    ],
  },
  {
    type: "audio",
    tools: [
      {
        name: "Text to speech generator",
        description:
          "Convert text to natural AI speech with your choice of voice, speed, and quality, then play it online and download an MP3.",
        link: "/tools/text-to-speech-generator",
        updatedAt: "2026-11-26",
      },
    ],
  },
  {
    type: "developer",
    tools: [
      {
        name: "Cron expression generator",
        description:
          "Build cron schedules visually with presets or custom fields. Get human-readable explanations and next run times.",
        link: "/tools/cron-expression-generator",
        updatedAt: "2026-11-26",
      },
      {
        name: "Regex tester",
        description:
          "Test and debug regular expressions in real time — enter a pattern, pick flags, and see highlighted matches and capture groups instantly.",
        link: "/tools/regex-tester",
        updatedAt: "2026-11-26",
      },
      {
        name: "Base64 encoder & decoder",
        description:
          "Encode and decode Base64 live as you type, convert files and images to data URIs with preview, and decode JWTs — all client-side.",
        link: "/tools/base64-encoder-decoder",
        updatedAt: "2026-11-26",
      },
      {
        name: "JSON formatter & validator",
        description:
          "Format and validate JSON with exact line/column error locations, explore it as a collapsible tree, or generate TypeScript interfaces instantly.",
        link: "/tools/json-formatter-validator",
        updatedAt: "2026-11-26",
      },
    ],
  },
] as const satisfies readonly ToolGroup[];

export function findToolByLink(link: string): ToolEntry | undefined {
  return TOOL_GROUPS.flatMap<ToolEntry>((group) => [...group.tools]).find(
    (tool) => tool.link === link,
  );
}

export type ToolCategoryType = (typeof TOOL_GROUPS)[number]["type"];

export function formatCategoryLabel(type: string): string {
  return type
    .split(/[-_]/)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}
