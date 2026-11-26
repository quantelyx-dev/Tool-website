import { calculatorToolContent } from '@/lib/tool-content/calculators';
import { dataToolContent } from '@/lib/tool-content/data';
import { developerToolContent } from '@/lib/tool-content/developer';
import type { ToolContent } from '@/lib/tool-content/types';

const ALL_TOOL_CONTENT: ToolContent[] = [
  ...calculatorToolContent,
  ...dataToolContent,
  ...developerToolContent,
];

export function getToolContent(link: string): ToolContent | undefined {
  return ALL_TOOL_CONTENT.find(content => content.link === link);
}
