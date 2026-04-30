import { ToolGroup } from '@/lib/types';

export const TOOL_GROUPS = [
  {
    type: 'calculator',
    tools: [
      {
        name: 'Sun Moon and Rising Sign calculator',
        description:
          'Discover your Sun, Moon, and Rising signs based on your birth details.',
        link: '/tools/sun-moon-rising-calculator',
      },
    ],
  },
] as const satisfies readonly ToolGroup[];

export type ToolCategoryType = (typeof TOOL_GROUPS)[number]['type'];

export function formatCategoryLabel(type: string): string {
  return type
    .split(/[-_]/)
    .map(part => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ');
}
