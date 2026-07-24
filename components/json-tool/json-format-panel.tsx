'use client';

import { CornerDownRight, Download } from 'lucide-react';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import type { JsonAnalyticsHandlers } from '@/components/json-tool/json-tool-content';
import { JsonFormatToolbar } from '@/components/json-tool/json-format-toolbar';
import { JsonStatsBar } from '@/components/json-tool/json-stats-bar';
import { JsonToolCopyButton } from '@/components/json-tool/json-tool-copy-button';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import type { CopyState } from '@/components/generate-random/shared/generator-types';
import { downloadBlob } from '@/lib/base64-tool/download-blob';
import { formatJsonValue, type JsonIndent } from '@/lib/json-tool/format';
import type { JsonParseResult } from '@/lib/json-tool/parse';
import { computeJsonStats } from '@/lib/json-tool/stats';
import { cn } from '@/lib/utils';

type JsonFormatPanelProps = {
  rawInput: string;
  parsed: JsonParseResult;
  analytics: JsonAnalyticsHandlers;
  onInputChange: (value: string) => void;
  onLoadSample: () => void;
  onReset: () => void;
  className?: string;
};

const COPY_FEEDBACK_MS = 1500;

export function JsonFormatPanel({
  rawInput,
  parsed,
  analytics,
  onInputChange,
  onLoadSample,
  onReset,
  className,
}: JsonFormatPanelProps) {
  const [indent, setIndent] = useState<JsonIndent>('2');
  const [sortKeys, setSortKeys] = useState(false);
  const [copyState, setCopyState] = useState<CopyState>('idle');

  const hasTrackedRef = useRef(false);
  const copyTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const stats = useMemo(
    () => (parsed.ok ? computeJsonStats(parsed.value, rawInput) : null),
    [parsed, rawInput],
  );

  const formatted = useMemo(
    () => (parsed.ok ? formatJsonValue(parsed.value, indent, sortKeys) : ''),
    [parsed, indent, sortKeys],
  );

  useEffect(() => {
    if (parsed.ok && rawInput.trim() !== '' && stats) {
      analytics.onResult({
        valid: true,
        keys: stats.keyCount,
        depth: stats.maxDepth,
      });
    }
  }, [parsed, rawInput, stats, analytics]);

  const handleInputChange = useCallback(
    (value: string) => {
      if (!hasTrackedRef.current && value.trim() !== '') {
        hasTrackedRef.current = true;
        analytics.onUse({ panel: 'format' });
      }
      onInputChange(value);
    },
    [analytics, onInputChange],
  );

  const handleGoToError = useCallback(() => {
    if (parsed.ok) return;
    const textarea = textareaRef.current;
    if (!textarea) return;
    textarea.focus();
    textarea.setSelectionRange(parsed.error.index, parsed.error.index + 1);
  }, [parsed]);

  const handleCopy = useCallback(() => {
    if (!formatted) return;
    analytics.onCopy('formatted');
    if (copyTimerRef.current) clearTimeout(copyTimerRef.current);
    try {
      navigator.clipboard.writeText(formatted);
      setCopyState('copied');
    } catch {
      setCopyState('failed');
    }
    copyTimerRef.current = setTimeout(() => setCopyState('idle'), COPY_FEEDBACK_MS);
  }, [formatted, analytics]);

  const handleDownload = useCallback(() => {
    if (!formatted) return;
    const blob = new Blob([formatted], { type: 'application/json' });
    downloadBlob(blob, 'formatted.json');
    analytics.onDownload('json');
  }, [formatted, analytics]);

  return (
    <div className={cn('flex flex-col gap-5', className)}>
      <JsonFormatToolbar
        indent={indent}
        onIndentChange={setIndent}
        sortKeys={sortKeys}
        onSortKeysChange={setSortKeys}
        onLoadSample={onLoadSample}
        onReset={onReset}
      />

      <div className={cn('grid gap-5 md:grid-cols-2')}>
        <div className={cn('rounded-xl border border-border bg-card p-4')}>
          <div className={cn('mb-4 flex items-center justify-between')}>
            <Label htmlFor='json-input' className={cn('text-sm font-medium')}>
              JSON input
            </Label>
            {parsed.ok && rawInput.trim() !== '' && (
              <span
                className={cn(
                  'rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-semibold text-emerald-800',
                  'dark:bg-emerald-950 dark:text-emerald-300',
                )}>
                Valid JSON
              </span>
            )}
            {!parsed.ok && rawInput.trim() !== '' && (
              <span
                className={cn(
                  'rounded-full bg-destructive/10 px-2.5 py-0.5 text-xs font-semibold text-destructive',
                )}>
                Invalid JSON
              </span>
            )}
          </div>
          <Textarea
            id='json-input'
            ref={textareaRef}
            value={rawInput}
            onChange={e => handleInputChange(e.target.value)}
            placeholder='Paste or type JSON here…'
            spellCheck={false}
            aria-invalid={!parsed.ok && rawInput.trim() !== ''}
            aria-describedby={!parsed.ok ? 'json-parse-error' : undefined}
            className={cn('h-86 field-sizing-fixed resize-none overflow-y-auto font-mono text-sm')}
          />
          {!parsed.ok && rawInput.trim() !== '' && (
            <div
              id='json-parse-error'
              role='alert'
              className={cn(
                'mt-2 flex flex-wrap items-center justify-between gap-2 rounded-lg bg-destructive/5 px-3 py-2',
              )}>
              <p className={cn('text-xs text-destructive')}>
                Line {parsed.error.line}, column {parsed.error.column}: {parsed.error.message}
              </p>
              <Button
                type='button'
                variant='outline'
                size='sm'
                onClick={handleGoToError}
                className={cn('h-6 gap-1 px-2 text-xs')}>
                <CornerDownRight className={cn('size-3')} aria-hidden />
                Go to error
              </Button>
            </div>
          )}
        </div>

        <div className={cn('rounded-xl border border-border bg-card p-4')}>
          <div className={cn('mb-2 flex items-center justify-between')}>
            <Label className={cn('text-sm font-medium')}>Formatted output</Label>
            <div className={cn('flex items-center gap-1.5')}>
              <JsonToolCopyButton
                label='Copy'
                state={copyState}
                onClick={handleCopy}
                disabled={!formatted}
              />
              <Button
                type='button'
                variant='outline'
                size='sm'
                onClick={handleDownload}
                disabled={!formatted}>
                <Download className={cn('size-3.5')} aria-hidden />
              </Button>
            </div>
          </div>
          <pre
            className={cn(
              'h-86 overflow-auto whitespace-pre-wrap break-all rounded-md border border-transparent font-mono text-sm leading-relaxed text-foreground',
              !formatted && 'text-muted-foreground',
            )}>
            {formatted || 'Formatted JSON will appear here once your input is valid.'}
          </pre>
        </div>
      </div>

      {stats && <JsonStatsBar stats={stats} />}
    </div>
  );
}
