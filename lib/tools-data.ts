import { ToolGroup } from "@/lib/types";

export const TOOL_GROUPS = [
  {
    type: "calculator",
    tools: [
      {
        name: "Sun Moon and Rising Sign calculator",
        description:
          "Discover your Sun, Moon, and Rising signs based on your birth details.",
        link: "/tools/sun-moon-rising-calculator",
      },
      {
        name: "Daily compound interest calculator",
        description:
          "Project balances with daily compounding, currencies, contributions, reinvestment, and exports.",
        link: "/tools/daily-compound-interest-calculator",
      },
      {
        name: "Indiana Child support calculator",
        description:
          "Capture parental incomes and parenting-time shares per child; worksheet math arrives in a later phase.",
        link: "/tools/indiana-child-support-calculator",
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
      },
      {
        name: "Random email generator",
        description:
          "Pull batches of plausible email addresses from the same cached identity pool as usernames, with quick copy for spreadsheets and fixtures.",
        link: "/tools/generate-random-emails",
      },
      {
        name: "Random name generator",
        description:
          "Pull first names, last names, or full names from the cached identity pool, with format selection and quick copy for spreadsheets and fixtures.",
        link: "/tools/generate-random-names",
      },
      {
        name: "Random phone number generator",
        description:
          "Generate plausible phone numbers per selected country using libphonenumber formatting; fictional ranges where reserved (e.g. NANP 555-01XX, UK drama band).",
        link: "/tools/generate-random-phone-numbers",
      },
      // {
      //   name: 'Random credit card generator',
      //   description:
      //     'Generate plausible credit card numbers per selected issuer, with quick copy for spreadsheets and fixtures.',
      //   link: '/tools/generate-random-credit-cards',
      // },
      {
        name: "Random SSN generator",
        description:
          "Generate structurally valid fake U.S. Social Security Numbers in single or bulk mode for fixtures and demos.",
        link: "/tools/generate-random-ssn",
      },
      {
        name: "Address Generator - Generate Fictional Addresses",
        description:
          "Generate fictional mailing addresses in single or bulk mode, with quick copy for one result and CSV export for batches.",
        link: "/tools/generate-random-addresses",
      },
      {
        name: "Random UUIDv7 generator",
        description:
          "Generate sortable UUIDv7 identifiers in single or bulk mode for fixtures, imports, and test data.",
        link: "/tools/generate-random-uuids",
      },
      {
        name: "Random password generator",
        description:
          "Generate random passwords with configurable length and character sets, with zxcvbn-based strength estimates.",
        link: "/tools/generate-random-passwords",
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
      },
      {
        name: "Regex tester",
        description:
          "Test and debug regular expressions in real time — enter a pattern, pick flags, and see highlighted matches and capture groups instantly.",
        link: "/tools/regex-tester",
      },
    ],
  },
] as const satisfies readonly ToolGroup[];

export type ToolCategoryType = (typeof TOOL_GROUPS)[number]["type"];

export function formatCategoryLabel(type: string): string {
  return type
    .split(/[-_]/)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}
