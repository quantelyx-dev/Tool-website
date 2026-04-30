import { create } from 'zustand';

import { TOOL_GROUPS, type ToolCategoryType } from '@/lib/tools-data';
import { ToolGroup } from '@/lib/types';

export type ToolsCategoryId = 'all' | ToolCategoryType;

type ToolsState = {
  toolGroups: readonly ToolGroup[];
  categoryId: ToolsCategoryId;
  searchInput: string;
  debouncedSearch: string;
  setCategoryId: (id: ToolsCategoryId) => void;
  setSearchInput: (value: string) => void;
  setDebouncedSearch: (value: string) => void;
};

export const useToolsStore = create<ToolsState>(set => ({
  toolGroups: TOOL_GROUPS,
  categoryId: 'all',
  searchInput: '',
  debouncedSearch: '',
  setCategoryId: categoryId => set({ categoryId }),
  setSearchInput: searchInput => set({ searchInput }),
  setDebouncedSearch: debouncedSearch => set({ debouncedSearch }),
}));

export const TOOL_CATEGORY_IDS: ToolsCategoryId[] = [
  'all',
  ...TOOL_GROUPS.map(g => g.type),
];
