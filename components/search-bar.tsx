'use client';

import { useEffect } from 'react';
import { Info, Search } from 'lucide-react';

import { Input } from '@/components/ui/input';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { useToolsStore } from '@/lib/stores/tools-store';
import { cn } from '@/lib/utils';
import { trackSearch } from '@/lib/analytics';

const SEARCH_DEBOUNCE_MS = 320;

export function SearchBar({ className }: { className?: string }) {
  const searchInput = useToolsStore((s) => s.searchInput);
  const setSearchInput = useToolsStore((s) => s.setSearchInput);
  const setDebouncedSearch = useToolsStore((s) => s.setDebouncedSearch);

  useEffect(() => {
    const handle = window.setTimeout(() => {
      setDebouncedSearch(searchInput);
      if (searchInput.trim().length >= 2) {
        trackSearch(searchInput.trim());
      }
    }, SEARCH_DEBOUNCE_MS);
    return () => window.clearTimeout(handle);
  }, [searchInput, setDebouncedSearch]);

  return (
    <TooltipProvider delayDuration={200}>
      <div className={cn('mx-auto max-w-xl relative group', className)}>
        <div className='absolute inset-y-0 left-4 flex items-center pointer-events-none'>
          <Search className='size-5 text-zinc-400 group-focus-within:text-indigo-600 transition-colors dark:group-focus-within:text-indigo-400' />
        </div>
        <Input
          type='search'
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          placeholder='Find a tool'
          autoComplete='off'
          aria-label='Search tools'
          className='h-14 pl-12 pr-12 rounded-2xl border-zinc-200 bg-white shadow-xl focus-visible:ring-indigo-500 dark:border-zinc-800 dark:bg-zinc-900 text-lg'
        />
        <div className='absolute inset-y-0 right-3 flex items-center'>
          <Tooltip>
            <TooltipTrigger asChild>
              <button
                type='button'
                className='rounded-full p-1.5 text-zinc-400 hover:bg-zinc-100 hover:text-indigo-600 dark:hover:bg-zinc-800 dark:hover:text-indigo-400 outline-none focus-visible:ring-2 focus-visible:ring-indigo-500'
                aria-label='Search tips'>
                <Info className='size-4' />
              </button>
            </TooltipTrigger>
            <TooltipContent side='top' sideOffset={6}>
              Search matches tool names and descriptions. Filters update after you
              pause typing.
            </TooltipContent>
          </Tooltip>
        </div>
      </div>
    </TooltipProvider>
  );
}
