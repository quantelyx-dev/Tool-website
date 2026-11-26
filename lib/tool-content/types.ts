/** Server-rendered explainer shown below a tool. Keep each entry between 300 and 600 words. */
export type ToolContent = {
  /** Tool route; matches the entry in `TOOL_GROUPS`. */
  link: string;
  /** Which notice the page shows: money and legal estimates, or fictional test data. */
  disclaimer?: 'estimate' | 'test-data';
  about: string[];
  steps: string[];
  howItWorks: string[];
  howItWorksList?: string[];
  example: string[];
  limitations: string[];
  /** Two or three other tool routes. */
  related: string[];
  sources?: readonly { label: string; href: string }[];
};
