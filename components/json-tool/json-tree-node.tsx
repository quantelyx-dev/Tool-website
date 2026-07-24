'use client';

import { ChevronDown, ChevronRight, Copy } from 'lucide-react';

import { formatPrimitive, getJsonNodeType, isContainer } from '@/lib/json-tool/tree';
import { cn } from '@/lib/utils';

const TYPE_CLASSES: Record<string, string> = {
  string: 'text-emerald-700 dark:text-emerald-400',
  number: 'text-blue-700 dark:text-blue-400',
  boolean: 'text-amber-700 dark:text-amber-400',
  null: 'text-muted-foreground italic',
};

type JsonTreeNodeProps = {
  keyName: string | null;
  value: unknown;
  path: string;
  collapsedPaths: Set<string>;
  onToggle: (path: string) => void;
  onCopyPath: (path: string) => void;
  onCopyValue: (value: unknown) => void;
};

export function JsonTreeNode({
  keyName,
  value,
  path,
  collapsedPaths,
  onToggle,
  onCopyPath,
  onCopyValue,
}: JsonTreeNodeProps) {
  const type = getJsonNodeType(value);
  const container = isContainer(value);
  const collapsed = container && collapsedPaths.has(path);
  const entries = container
    ? Array.isArray(value)
      ? value.map((item, index) => [String(index), item] as const)
      : Object.entries(value)
    : [];
  const summary = Array.isArray(value)
    ? `Array(${value.length})`
    : `Object(${entries.length})`;

  return (
    <div className={cn('font-mono text-sm')}>
      <div
        className={cn(
          'group flex min-w-0 items-center gap-1 rounded px-1 py-1 hover:bg-muted/50',
        )}>
        {container ? (
          <button
            type='button'
            onClick={() => onToggle(path)}
            aria-label={collapsed ? `Expand ${keyName ?? 'root'}` : `Collapse ${keyName ?? 'root'}`}
            aria-expanded={!collapsed}
            className={cn('flex size-4 shrink-0 items-center justify-center text-muted-foreground')}>
            {collapsed ? <ChevronRight className={cn('size-3.5')} /> : <ChevronDown className={cn('size-3.5')} />}
          </button>
        ) : (
          <span className={cn('inline-block size-4 shrink-0')} />
        )}

        {keyName !== null && (
          <span className={cn('shrink-0 text-violet-700 dark:text-violet-400')}>{keyName}:</span>
        )}

        {container ? (
          <button
            type='button'
            onClick={() => onToggle(path)}
            className={cn('shrink-0 text-muted-foreground')}>
            {summary}
          </button>
        ) : (
          <span className={cn('truncate', TYPE_CLASSES[type])}>{formatPrimitive(value)}</span>
        )}

        <span
          className={cn(
            'ml-1.5 flex shrink-0 items-center gap-0.5 opacity-0 transition-opacity group-hover:opacity-100',
          )}>
          <button
            type='button'
            onClick={() => onCopyPath(path)}
            title='Copy path'
            aria-label='Copy path'
            className={cn(
              'flex size-6 items-center justify-center rounded text-muted-foreground hover:bg-muted hover:text-foreground',
            )}>
            <Copy className={cn('size-3.5')} aria-hidden />
          </button>
          {!container && (
            <button
              type='button'
              onClick={() => onCopyValue(value)}
              title='Copy value'
              aria-label='Copy value'
              className={cn(
                'flex items-center justify-center rounded px-1.5 text-xs text-muted-foreground hover:bg-muted hover:text-foreground',
              )}>
              value
            </button>
          )}
        </span>
      </div>

      {container && !collapsed && (
        <div className={cn('ml-4 border-l border-border/60 pl-3')}>
          {entries.length === 0 ? (
            <p className={cn('py-0.5 text-xs italic text-muted-foreground')}>empty</p>
          ) : (
            entries.map(([childKey, childValue]) => {
              const childPath = Array.isArray(value)
                ? `${path}[${childKey}]`
                : `${path}${/^[A-Za-z_$][A-Za-z0-9_$]*$/.test(childKey) ? `.${childKey}` : `[${JSON.stringify(childKey)}]`}`;
              return (
                <JsonTreeNode
                  key={childKey}
                  keyName={childKey}
                  value={childValue}
                  path={childPath}
                  collapsedPaths={collapsedPaths}
                  onToggle={onToggle}
                  onCopyPath={onCopyPath}
                  onCopyValue={onCopyValue}
                />
              );
            })
          )}
        </div>
      )}
    </div>
  );
}
