'use client';

import { formatBytes } from '@/lib/base64-tool/format';
import type { JsonStats } from '@/lib/json-tool/stats';
import { cn } from '@/lib/utils';

type JsonStatsBarProps = {
  stats: JsonStats;
  className?: string;
};

export function JsonStatsBar({ stats, className }: JsonStatsBarProps) {
  return (
    <div
      className={cn(
        'flex flex-wrap items-center gap-x-5 gap-y-1.5 text-xs text-muted-foreground',
        className,
      )}>
      <span>{formatBytes(stats.sizeBytes)}</span>
      <span>{stats.keyCount.toLocaleString()} keys</span>
      <span>depth {stats.maxDepth}</span>
      <span>{stats.objectCount.toLocaleString()} objects</span>
      <span>{stats.arrayCount.toLocaleString()} arrays</span>
      <span>{stats.stringCount.toLocaleString()} strings</span>
      <span>{stats.numberCount.toLocaleString()} numbers</span>
      <span>{stats.booleanCount.toLocaleString()} booleans</span>
      <span>{stats.nullCount.toLocaleString()} nulls</span>
    </div>
  );
}
