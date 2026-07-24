'use client';

import { Download, RefreshCw } from 'lucide-react';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import { JsonCodeBlock } from '@/components/json-tool/json-code-block';
import type { JsonAnalyticsHandlers } from '@/components/json-tool/json-tool-content';
import { JsonToolCopyButton } from '@/components/json-tool/json-tool-copy-button';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import type { CopyState } from '@/components/generate-random/shared/generator-types';
import { downloadBlob } from '@/lib/base64-tool/download-blob';
import { jsonToTypeScript } from '@/lib/json-tool/to-typescript';
import type { JsonParseResult } from '@/lib/json-tool/parse';
import { cn } from '@/lib/utils';

type JsonTypescriptPanelProps = {
  parsed: JsonParseResult;
  hasInput: boolean;
  analytics: JsonAnalyticsHandlers;
  onReset: () => void;
  className?: string;
};

const COPY_FEEDBACK_MS = 1500;

export function JsonTypescriptPanel({
  parsed,
  hasInput,
  analytics,
  onReset,
  className,
}: JsonTypescriptPanelProps) {
  const [rootName, setRootName] = useState('Root');
  const [copyState, setCopyState] = useState<CopyState>('idle');

  const hasTrackedRef = useRef(false);
  const copyTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const generated = useMemo(
    () => (parsed.ok ? jsonToTypeScript(parsed.value, rootName.trim() || 'Root') : ''),
    [parsed, rootName],
  );

  useEffect(() => {
    if (parsed.ok && hasInput && !hasTrackedRef.current) {
      hasTrackedRef.current = true;
      analytics.onUse({ panel: 'typescript' });
      analytics.onResult({ panel: 'typescript' });
    }
  }, [parsed, hasInput, analytics]);

  const handleCopy = useCallback(() => {
    if (!generated) return;
    analytics.onCopy('typescript');
    if (copyTimerRef.current) clearTimeout(copyTimerRef.current);
    try {
      navigator.clipboard.writeText(generated);
      setCopyState('copied');
    } catch {
      setCopyState('failed');
    }
    copyTimerRef.current = setTimeout(() => setCopyState('idle'), COPY_FEEDBACK_MS);
  }, [generated, analytics]);

  const handleDownload = useCallback(() => {
    if (!generated) return;
    const blob = new Blob([generated], { type: 'text/plain' });
    downloadBlob(blob, `${rootName.trim() || 'types'}.ts`);
    analytics.onDownload('typescript');
  }, [generated, rootName, analytics]);

  return (
    <div className={cn('flex flex-col gap-4', className)}>
      <div
        className={cn(
          'flex flex-wrap items-center gap-4 rounded-xl border border-border bg-card p-4',
        )}>
        <div className={cn('flex items-center gap-2.5')}>
          <Label htmlFor='ts-root-name' className={cn('text-sm')}>
            Root type name
          </Label>
          <Input
            id='ts-root-name'
            value={rootName}
            onChange={e => setRootName(e.target.value)}
            placeholder='Root'
            className={cn('h-8 w-36 font-mono text-sm')}
          />
        </div>
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

      <div className={cn('rounded-xl border border-border bg-card p-4')}>
        <div className={cn('mb-2 flex items-center justify-between')}>
          <Label className={cn('text-sm font-medium')}>Generated TypeScript</Label>
          <div className={cn('flex items-center gap-1.5')}>
            <JsonToolCopyButton
              label='Copy'
              state={copyState}
              onClick={handleCopy}
              disabled={!generated}
            />
            <Button
              type='button'
              variant='outline'
              size='sm'
              onClick={handleDownload}
              disabled={!generated}>
              <Download className={cn('size-3.5')} aria-hidden />
            </Button>
          </div>
        </div>
        <JsonCodeBlock
          code={generated}
          placeholder={
            hasInput
              ? 'Fix the JSON errors in the Format & validate tab first.'
              : 'Paste JSON in the Format & validate tab to generate TypeScript interfaces here.'
          }
          className='h-86 overflow-auto'
        />
      </div>
    </div>
  );
}
