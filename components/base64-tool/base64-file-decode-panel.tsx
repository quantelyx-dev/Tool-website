'use client';

import { Download, RefreshCw } from 'lucide-react';
import { useCallback, useMemo, useRef, useState } from 'react';

import type { Base64AnalyticsHandlers } from '@/components/base64-tool/base64-tool-content';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { base64ToBytes, bytesToBase64 } from '@/lib/base64-tool/base64';
import { buildDataUri, parseDataUri } from '@/lib/base64-tool/data-uri';
import { downloadBlob } from '@/lib/base64-tool/download-blob';
import { formatBytes } from '@/lib/base64-tool/format';
import { cn } from '@/lib/utils';

type Base64FileDecodePanelProps = {
  analytics: Base64AnalyticsHandlers;
};

const COMMON_MIME_TYPES = [
  'application/octet-stream',
  'image/png',
  'image/jpeg',
  'image/gif',
  'image/webp',
  'image/svg+xml',
  'image/x-icon',
  'application/pdf',
  'application/json',
  'application/zip',
  'text/plain',
  'text/html',
  'text/css',
  'text/csv',
  'audio/mpeg',
  'audio/wav',
  'audio/ogg',
  'video/mp4',
  'video/webm',
  'font/woff',
  'font/woff2',
] as const;

export function Base64FileDecodePanel({ analytics }: Base64FileDecodePanelProps) {
  const [input, setInput] = useState('');
  const [mime, setMime] = useState('application/octet-stream');
  const [filename, setFilename] = useState('decoded-file');
  const [mimeTouched, setMimeTouched] = useState(false);
  const hasTracked = useRef(false);

  const parsed = useMemo(() => parseDataUri(input), [input]);
  const rawBase64 = parsed?.base64 ?? input;
  const decodeResult = useMemo(() => base64ToBytes(rawBase64), [rawBase64]);

  const handleInputChange = useCallback(
    (value: string) => {
      if (!hasTracked.current) {
        hasTracked.current = true;
        analytics.onUse({ panel: 'file-decode' });
      }
      setInput(value);
      const nextParsed = parseDataUri(value);
      if (nextParsed && !mimeTouched) {
        setMime(nextParsed.mime);
      }
    },
    [analytics, hasTracked, mimeTouched],
  );

  const effectiveMime = mime || 'application/octet-stream';
  const isImage = effectiveMime.startsWith('image/');
  const previewUri =
    decodeResult.ok && isImage && rawBase64
      ? buildDataUri(effectiveMime, bytesToBase64(decodeResult.bytes, { urlSafe: false, padding: true }))
      : null;
  const mimeOptions = COMMON_MIME_TYPES.includes(
    effectiveMime as (typeof COMMON_MIME_TYPES)[number],
  )
    ? COMMON_MIME_TYPES
    : [effectiveMime, ...COMMON_MIME_TYPES];

  const handleDownload = useCallback(() => {
    if (!decodeResult.ok || decodeResult.bytes.length === 0) return;

    const blob = new Blob([decodeResult.bytes.slice()], { type: effectiveMime });
    downloadBlob(blob, filename.trim() || 'decoded-file');
    analytics.onDownload('file');
  }, [decodeResult, effectiveMime, filename, analytics]);

  const handleReset = useCallback(() => {
    analytics.onReset();
    setInput('');
    setMime('application/octet-stream');
    setFilename('decoded-file');
    setMimeTouched(false);
    hasTracked.current = false;
  }, [analytics]);

  return (
    <div className={cn('flex flex-col gap-4 rounded-xl border border-border bg-card p-4')}>
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

      <div>
        <Label htmlFor='file-decode-input' className={cn('mb-1.5 block text-sm font-medium')}>
          Base64 or data URI
        </Label>
        <Textarea
          id='file-decode-input'
          value={input}
          onChange={e => handleInputChange(e.target.value)}
          placeholder='Paste a Base64 string or a full data:… URI…'
          rows={6}
          aria-invalid={!decodeResult.ok}
          className={cn('font-mono text-xs')}
        />
        {!decodeResult.ok && input.trim() !== '' && (
          <p role='alert' className={cn('mt-2 text-xs text-destructive')}>
            {decodeResult.error}
          </p>
        )}
      </div>

      <div className={cn('grid gap-4 sm:grid-cols-2')}>
        <div>
          <Label htmlFor='file-decode-mime' className={cn('mb-1.5 block text-sm font-medium')}>
            MIME type
          </Label>
          <Select
            value={effectiveMime}
            onValueChange={value => {
              setMimeTouched(true);
              setMime(value);
            }}>
            <SelectTrigger id='file-decode-mime' className={cn('w-full font-mono text-xs')}>
              <SelectValue placeholder='Select MIME type' />
            </SelectTrigger>
            <SelectContent>
              {mimeOptions.map(option => (
                <SelectItem key={option} value={option} className={cn('font-mono text-xs')}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor='file-decode-filename' className={cn('mb-1.5 block text-sm font-medium')}>
            File name
          </Label>
          <Input
            id='file-decode-filename'
            value={filename}
            onChange={e => setFilename(e.target.value)}
            placeholder='decoded-file'
          />
        </div>
      </div>

      {previewUri && (
        // eslint-disable-next-line @next/next/no-img-element -- client-generated data: URI, next/image can't optimize it
        <img
          src={previewUri}
          alt='Decoded preview'
          className={cn('max-h-64 w-auto rounded-lg border border-border object-contain')}
        />
      )}

      <div className={cn('flex items-center justify-between')}>
        <p className={cn('text-xs text-muted-foreground')}>
          {decodeResult.ok ? `${formatBytes(decodeResult.bytes.length)} decoded` : 'Waiting for valid Base64…'}
        </p>
        <Button
          type='button'
          onClick={handleDownload}
          disabled={!decodeResult.ok || decodeResult.bytes.length === 0}
          size='sm'>
          <Download className={cn('mr-1.5 size-3.5')} aria-hidden />
          Download file
        </Button>
      </div>
    </div>
  );
}
