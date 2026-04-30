import { ToolEntry, ToolGroup } from '@/lib/types';

export function filterToolGroups(
  groups: readonly ToolGroup[],
  categoryId: string,
  query: string,
): ToolGroup[] {
  const q = query.trim().toLowerCase();
  const matches = (tool: ToolEntry) =>
    !q ||
    tool.name.toLowerCase().includes(q) ||
    tool.description.toLowerCase().includes(q);

  return groups
    .filter(group => categoryId === 'all' || group.type === categoryId)
    .map(group => ({
      type: group.type,
      tools: group.tools.filter(matches),
    }))
    .filter(group => group.tools.length > 0);
}
