'use client';

import { ChevronsDownUp, ChevronsUpDown, RefreshCw } from 'lucide-react';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { toast } from 'sonner';

import type { JsonAnalyticsHandlers } from '@/components/json-tool/json-tool-content';
import { JsonTreeNode } from '@/components/json-tool/json-tree-node';
import { Button } from '@/components/ui/button';
import type { JsonParseResult } from '@/lib/json-tool/parse';
import { collectContainerPaths } from '@/lib/json-tool/tree';
import { cn } from '@/lib/utils';

type JsonTreePanelProps = {
  parsed: JsonParseResult;
  hasInput: boolean;
  analytics: JsonAnalyticsHandlers;
  onReset: () => void;
  className?: string;
};

export function JsonTreePanel({
  parsed,
  hasInput,
  analytics,
  onReset,
  className,
}: JsonTreePanelProps) {
  const [collapsedPaths, setCollapsedPaths] = useState<Set<string>>(new Set());
  const hasTrackedRef = useRef(false);

  const containerPaths = useMemo(
    () => (parsed.ok ? collectContainerPaths(parsed.value) : []),
    [parsed],
  );

  useEffect(() => {
    if (parsed.ok && hasInput && !hasTrackedRef.current) {
      hasTrackedRef.current = true;
      analytics.onUse({ panel: 'tree' });
      analytics.onResult({ panel: 'tree', nodes: containerPaths.length });
    }
  }, [parsed, hasInput, containerPaths, analytics]);

  const handleToggle = useCallback((path: string) => {
    setCollapsedPaths(prev => {
      const next = new Set(prev);
      if (next.has(path)) next.delete(path);
      else next.add(path);
      return next;
    });
  }, []);

  const handleExpandAll = useCallback(() => setCollapsedPaths(new Set()), []);
  const handleCollapseAll = useCallback(
    () => setCollapsedPaths(new Set(containerPaths)),
    [containerPaths],
  );

  const handleCopyPath = useCallback(
    (path: string) => {
      analytics.onCopy('tree-path');
      navigator.clipboard.writeText(path);
      toast.success(`Path copied: ${path}`);
    },
    [analytics],
  );

  const handleCopyValue = useCallback(
    (value: unknown) => {
      analytics.onCopy('tree-value');
      navigator.clipboard.writeText(typeof value === 'string' ? value : JSON.stringify(value));
      toast.success('Value copied');
    },
    [analytics],
  );

  return (
    <div className={cn('flex flex-col gap-4', className)}>
      <div
        className={cn(
          'flex flex-wrap items-center gap-3 rounded-xl border border-border bg-card p-4',
        )}>
        <Button
          type='button'
          variant='outline'
          size='sm'
          onClick={handleExpandAll}
          disabled={!parsed.ok}
          className={cn('gap-1.5')}>
          <ChevronsUpDown className={cn('size-3.5')} aria-hidden />
          Expand all
        </Button>
        <Button
          type='button'
          variant='outline'
          size='sm'
          onClick={handleCollapseAll}
          disabled={!parsed.ok}
          className={cn('gap-1.5')}>
          <ChevronsDownUp className={cn('size-3.5')} aria-hidden />
          Collapse all
        </Button>
        <Button
          type='button'
          variant='outline'
          size='sm'
          onClick={onReset}
          className={cn('ml-auto gap-1.5')}>
          <RefreshCw className={cn('size-3.5')} aria-hidden />
          Reset
        </Button>
      </div>

      <div className={cn('h-96 overflow-auto rounded-xl border border-border bg-card p-4')}>
        {parsed.ok ? (
          <JsonTreeNode
            keyName={null}
            value={parsed.value}
            path='$'
            collapsedPaths={collapsedPaths}
            onToggle={handleToggle}
            onCopyPath={handleCopyPath}
            onCopyValue={handleCopyValue}
          />
        ) : (
          <p className={cn('py-8 text-center text-sm text-muted-foreground')}>
            {hasInput
              ? 'Fix the JSON errors in the Format & validate tab first.'
              : 'Paste JSON in the Format & validate tab to explore it here as a collapsible tree.'}
          </p>
        )}
      </div>
    </div>
  );
}
