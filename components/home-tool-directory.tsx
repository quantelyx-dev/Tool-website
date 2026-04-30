'use client';

import Link from 'next/link';
import { useMemo } from 'react';
import { Box } from 'lucide-react';

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { filterToolGroups } from '@/lib/filter-tools';
import { TOOL_CATEGORY_IDS, useToolsStore } from '@/lib/stores/tools-store';
import { formatCategoryLabel } from '@/lib/tools-data';
import { cn } from '@/lib/utils';

function ToolCardLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  const className =
    'block h-full rounded-xl outline-none transition-shadow focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 focus-visible:ring-offset-background dark:focus-visible:ring-offset-background';

  if (href.startsWith('http')) {
    return (
      <Link
        href={href}
        target='_blank'
        rel='noopener noreferrer'
        className={className}>
        {children}
      </Link>
    );
  }

  return (
    <Link href={href} className={className}>
      {children}
    </Link>
  );
}

export function HomeToolDirectory() {
  const toolGroups = useToolsStore(s => s.toolGroups);
  const categoryId = useToolsStore(s => s.categoryId);
  const debouncedSearch = useToolsStore(s => s.debouncedSearch);
  const setCategoryId = useToolsStore(s => s.setCategoryId);

  const filtered = useMemo(
    () => filterToolGroups(toolGroups, categoryId, debouncedSearch),
    [toolGroups, categoryId, debouncedSearch],
  );

  return (
    <section className='pb-24'>
      <div className='container mx-auto px-4 sm:px-6 max-w-6xl'>
        <div className='flex flex-wrap justify-center gap-2 sm:gap-2.5 mb-10'>
          {TOOL_CATEGORY_IDS.map(id => {
            const active = categoryId === id;
            const label = id === 'all' ? 'All' : formatCategoryLabel(id);
            return (
              <button
                key={id}
                type='button'
                onClick={() => setCategoryId(id)}
                className={cn(
                  'rounded-full px-4 py-2 text-sm font-medium transition-colors border',
                  active
                    ? 'border-transparent bg-indigo-100 text-indigo-900 dark:bg-indigo-950 dark:text-indigo-100'
                    : 'border-zinc-200 bg-white text-zinc-800 hover:border-indigo-200 hover:bg-indigo-50/80 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 dark:hover:border-indigo-900 dark:hover:bg-indigo-950/40',
                )}>
                {label}
              </button>
            );
          })}
        </div>

        {filtered.length === 0 ? (
          <p className='text-center text-muted-foreground py-16 rounded-2xl border border-dashed border-zinc-200 dark:border-zinc-800'>
            No tools match your filters. Try another category or clear your
            search.
          </p>
        ) : (
          <div className='space-y-12'>
            {filtered.map(group => (
              <fieldset
                key={group.type}
                className='rounded-2xl border border-zinc-200 bg-zinc-50/40 px-4 py-8 sm:px-8 dark:border-zinc-800 dark:bg-zinc-900/30'>
                <legend className='mx-auto px-3 text-center text-sm font-semibold capitalize tracking-wide text-indigo-900 dark:text-indigo-100'>
                  {formatCategoryLabel(group.type)}
                </legend>
                <div className='mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3'>
                  {group.tools.map(tool => (
                    <ToolCardLink
                      href={tool.link}
                      key={`${group.type}-${tool.name}`}>
                      <Card
                        size='sm'
                        className='h-full gap-0 shadow-sm hover:shadow-md hover:ring-indigo-500/15 transition-[box-shadow,ring-color]'>
                        <CardHeader className='gap-3'>
                          <div className='flex items-start gap-3'>
                            <span className='mt-0.5 inline-flex size-9 shrink-0 items-center justify-center rounded-lg bg-indigo-600 text-white dark:bg-indigo-500'>
                              <Box className='size-4' aria-hidden />
                            </span>
                            <div className='min-w-0 space-y-1'>
                              <CardTitle className='text-base font-semibold text-indigo-950 dark:text-indigo-50'>
                                {tool.name}
                              </CardTitle>
                              <CardDescription className='text-sm leading-relaxed text-zinc-600 dark:text-zinc-400'>
                                {tool.description}
                              </CardDescription>
                            </div>
                          </div>
                        </CardHeader>
                      </Card>
                    </ToolCardLink>
                  ))}
                </div>
              </fieldset>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
