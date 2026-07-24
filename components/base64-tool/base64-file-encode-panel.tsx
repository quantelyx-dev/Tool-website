'use client';

import { FileUp, RefreshCw, UploadCloud } from 'lucide-react';
import { useCallback, useRef, useState } from 'react';

import { Base64CopyButton } from '@/components/base64-tool/base64-copy-button';
import type { Base64AnalyticsHandlers } from '@/components/base64-tool/base64-tool-content';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import type { CopyState } from '@/components/generate-random/shared/generator-types';
import { bytesToBase64 } from '@/lib/base64-tool/base64';
import { buildDataUri } from '@/lib/base64-tool/data-uri';
import { formatBytes } from '@/lib/base64-tool/format';
import { cn } from '@/lib/utils';

type Base64FileEncodePanelProps = {
  analytics: Base64AnalyticsHandlers;
};

const MAX_FILE_BYTES = 5 * 1024 * 1024;
const COPY_FEEDBACK_MS = 1500;

type EncodedFile = {
  name: string;
  mime: string;
  size: number;
  bytes: Uint8Array;
};

export function Base64FileEncodePanel({ analytics }: Base64FileEncodePanelProps) {
  const [file, setFile] = useState<EncodedFile | null>(null);
  const [urlSafe, setUrlSafe] = useState(false);
  const [padding, setPadding] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [base64CopyState, setBase64CopyState] = useState<CopyState>('idle');
  const [uriCopyState, setUriCopyState] = useState<CopyState>('idle');
  const inputRef = useRef<HTMLInputElement>(null);
  const copyTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const processFile = useCallback(
    (selected: File) => {
      setError(null);

      if (selected.size > MAX_FILE_BYTES) {
        setError(
          `${selected.name} is ${formatBytes(selected.size)} — this tool supports files up to ${formatBytes(MAX_FILE_BYTES)}.`,
        );
        return;
      }

      const reader = new FileReader();
      reader.onload = () => {
        const buffer = reader.result as ArrayBuffer;
        setFile({
          name: selected.name,
          mime: selected.type || 'application/octet-stream',
          size: selected.size,
          bytes: new Uint8Array(buffer),
        });
        analytics.onUse({ panel: 'file-encode' });
        analytics.onResult({ panel: 'file-encode', bytes: selected.size });
      };
      reader.onerror = () => setError('Could not read that file.');
      reader.readAsArrayBuffer(selected);
    },
    [analytics],
  );

  const handleReset = useCallback(() => {
    analytics.onReset();
    setFile(null);
    setError(null);
    setUrlSafe(false);
    setPadding(true);
  }, [analytics]);

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const selected = e.target.files?.[0];
      if (selected) processFile(selected);
      e.target.value = '';
    },
    [processFile],
  );

  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      setIsDragging(false);
      const dropped = e.dataTransfer.files?.[0];
      if (dropped) processFile(dropped);
    },
    [processFile],
  );

  const standardBase64 = file ? bytesToBase64(file.bytes, { urlSafe: false, padding: true }) : '';
  const outputBase64 = file ? bytesToBase64(file.bytes, { urlSafe, padding }) : '';
  const dataUri = file ? buildDataUri(file.mime, standardBase64) : '';
  const isImage = file?.mime.startsWith('image/') ?? false;

  const handleCopy = useCallback(
    (kind: 'base64' | 'uri') => {
      const value = kind === 'base64' ? outputBase64 : dataUri;
      if (!value) return;

      analytics.onCopy(kind === 'base64' ? 'file-base64' : 'file-data-uri');
      if (copyTimerRef.current) clearTimeout(copyTimerRef.current);

      const setState = kind === 'base64' ? setBase64CopyState : setUriCopyState;
      try {
        navigator.clipboard.writeText(value);
        setState('copied');
      } catch {
        setState('failed');
      }
      copyTimerRef.current = setTimeout(() => setState('idle'), COPY_FEEDBACK_MS);
    },
    [outputBase64, dataUri, analytics],
  );

  return (
    <div className={cn('flex flex-col gap-5')}>
      <div className={cn('flex justify-end')}>
        <Button
          type='button'
          variant='outline'
          size='sm'
          onClick={handleReset}
          className={cn('gap-1.5')}>
          <RefreshCw className={cn('size-3.5')} aria-hidden />
          Reset
        </Button>
      </div>

      <div
        role='button'
        tabIndex={0}
        onClick={() => inputRef.current?.click()}
        onKeyDown={e => (e.key === 'Enter' || e.key === ' ') && inputRef.current?.click()}
        onDragOver={e => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        aria-label='Choose or drop a file to encode as Base64'
        className={cn(
          'flex cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed p-8 text-center transition-colors',
          isDragging
            ? 'border-violet-500 bg-violet-500/5'
            : 'border-border bg-card hover:border-violet-400/60',
        )}>
        <UploadCloud className={cn('size-8 text-muted-foreground')} aria-hidden />
        <p className={cn('text-sm font-medium text-foreground')}>
          Drop a file here, or click to choose
        </p>
        <p className={cn('text-xs text-muted-foreground')}>
          Up to {formatBytes(MAX_FILE_BYTES)} — processed entirely in your browser
        </p>
        <input
          ref={inputRef}
          type='file'
          onChange={handleInputChange}
          className={cn('sr-only')}
          aria-hidden
        />
      </div>

      {error && (
        <p role='alert' className={cn('text-sm text-destructive')}>
          {error}
        </p>
      )}

      {file && (
        <div className={cn('flex flex-col gap-4 rounded-xl border border-border bg-card p-4')}>
          <div className={cn('flex flex-wrap items-center justify-between gap-3')}>
            <div className={cn('flex items-center gap-2 text-sm')}>
              <FileUp className={cn('size-4 text-muted-foreground')} aria-hidden />
              <span className={cn('font-medium text-foreground')}>{file.name}</span>
              <span className={cn('text-muted-foreground')}>
                {file.mime} · {formatBytes(file.size)}
              </span>
            </div>
          </div>

          {isImage && (
            // eslint-disable-next-line @next/next/no-img-element -- client-generated data: URI, next/image can't optimize it
            <img
              src={dataUri}
              alt={`Preview of ${file.name}`}
              className={cn('max-h-64 w-auto rounded-lg border border-border object-contain')}
            />
          )}

          <div className={cn('flex flex-wrap items-center gap-x-6 gap-y-2')}>
            <div className={cn('flex items-center gap-2')}>
              <Switch id='file-url-safe' checked={urlSafe} onCheckedChange={setUrlSafe} />
              <Label htmlFor='file-url-safe' className={cn('text-sm')}>URL-safe</Label>
            </div>
            <div className={cn('flex items-center gap-2')}>
              <Switch id='file-padding' checked={padding} onCheckedChange={setPadding} />
              <Label htmlFor='file-padding' className={cn('text-sm')}>Padding</Label>
            </div>
          </div>

          <div>
            <div className={cn('mb-1.5 flex items-center justify-between')}>
              <Label className={cn('text-sm font-medium')}>Data URI</Label>
              <Base64CopyButton
                label='Copy'
                state={uriCopyState}
                onClick={() => handleCopy('uri')}
                disabled={!dataUri}
              />
            </div>
            <Textarea readOnly value={dataUri} rows={3} className={cn('font-mono text-xs')} />
          </div>

          <div>
            <div className={cn('mb-1.5 flex items-center justify-between')}>
              <Label className={cn('text-sm font-medium')}>Base64 only</Label>
              <Base64CopyButton
                label='Copy'
                state={base64CopyState}
                onClick={() => handleCopy('base64')}
                disabled={!outputBase64}
              />
            </div>
            <Textarea readOnly value={outputBase64} rows={3} className={cn('font-mono text-xs')} />
          </div>
        </div>
      )}
    </div>
  );
}
