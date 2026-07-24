'use client';

import { RefreshCw } from 'lucide-react';
import { useCallback, useMemo, useRef, useState } from 'react';

import { Base64CopyButton } from '@/components/base64-tool/base64-copy-button';
import type { Base64AnalyticsHandlers } from '@/components/base64-tool/base64-tool-content';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import type { CopyState } from '@/components/generate-random/shared/generator-types';
import {
  decodeBase64ToText,
  encodeTextToBase64,
} from '@/lib/base64-tool/base64';
import { cn } from '@/lib/utils';

type Base64TextPanelProps = {
  analytics: Base64AnalyticsHandlers;
  className?: string;
};

const COPY_FEEDBACK_MS = 1500;

export function Base64TextPanel({ analytics, className }: Base64TextPanelProps) {
  const [plainText, setPlainText] = useState('');
  const [encodedText, setEncodedText] = useState('');
  const [urlSafe, setUrlSafe] = useState(false);
  const [padding, setPadding] = useState(true);
  const [decodeError, setDecodeError] = useState<string | null>(null);
  const [plainCopyState, setPlainCopyState] = useState<CopyState>('idle');
  const [encodedCopyState, setEncodedCopyState] = useState<CopyState>('idle');

  const hasTrackedUseRef = useRef(false);
  const copyTimersRef = useRef<Record<'plain' | 'encoded', ReturnType<typeof setTimeout> | null>>({
    plain: null,
    encoded: null,
  });

  const trackUseOnce = useCallback(() => {
    if (!hasTrackedUseRef.current) {
      hasTrackedUseRef.current = true;
      analytics.onUse({ panel: 'text' });
    }
  }, [analytics]);

  const handlePlainChange = useCallback(
    (value: string) => {
      trackUseOnce();
      setPlainText(value);
      setDecodeError(null);
      setEncodedText(encodeTextToBase64(value, { urlSafe, padding }));
    },
    [trackUseOnce, urlSafe, padding],
  );

  const handleEncodedChange = useCallback(
    (value: string) => {
      trackUseOnce();
      setEncodedText(value);
      const result = decodeBase64ToText(value);
      if (result.ok) {
        setPlainText(result.text);
        setDecodeError(null);
      } else {
        setDecodeError(value.trim() === '' ? null : result.error);
      }
    },
    [trackUseOnce],
  );

  const handleOptionsChange = useCallback(
    (nextUrlSafe: boolean, nextPadding: boolean) => {
      setUrlSafe(nextUrlSafe);
      setPadding(nextPadding);
      setEncodedText(
        encodeTextToBase64(plainText, {
          urlSafe: nextUrlSafe,
          padding: nextPadding,
        }),
      );
    },
    [plainText],
  );

  const handleReset = useCallback(() => {
    analytics.onReset();
    hasTrackedUseRef.current = false;
    setPlainText('');
    setEncodedText('');
    setDecodeError(null);
    setUrlSafe(false);
    setPadding(true);
  }, [analytics]);

  const handleCopy = useCallback(
    (side: 'plain' | 'encoded') => {
      const value = side === 'plain' ? plainText : encodedText;
      if (!value) return;

      analytics.onCopy(side);
      const timer = copyTimersRef.current[side];
      if (timer !== null) clearTimeout(timer);

      const setState = side === 'plain' ? setPlainCopyState : setEncodedCopyState;

      try {
        navigator.clipboard.writeText(value);
        setState('copied');
      } catch {
        setState('failed');
      }

      copyTimersRef.current[side] = setTimeout(() => {
        setState('idle');
        copyTimersRef.current[side] = null;
      }, COPY_FEEDBACK_MS);
    },
    [plainText, encodedText, analytics],
  );

  const stats = useMemo(() => {
    const plainBytes = new TextEncoder().encode(plainText).length;
    const encodedChars = encodedText.length;
    const overhead =
      plainBytes > 0
        ? Math.round(((encodedChars - plainBytes) / plainBytes) * 100)
        : 0;
    return { plainBytes, encodedChars, overhead };
  }, [plainText, encodedText]);

  return (
    <div className={cn('flex flex-col gap-5', className)}>
      <div
        className={cn(
          'flex flex-wrap items-center gap-x-6 gap-y-3 rounded-xl border border-border bg-card p-4',
        )}>
        <div className={cn('flex items-center gap-2.5')}>
          <Switch
            id='url-safe-toggle'
            checked={urlSafe}
            onCheckedChange={checked => handleOptionsChange(checked, padding)}
          />
          <Label htmlFor='url-safe-toggle' className={cn('text-sm')}>
            URL-safe (<code className={cn('text-xs')}>-_</code> instead of{' '}
            <code className={cn('text-xs')}>+/</code>)
          </Label>
        </div>
        <div className={cn('flex items-center gap-2.5')}>
          <Switch
            id='padding-toggle'
            checked={padding}
            onCheckedChange={checked => handleOptionsChange(urlSafe, checked)}
          />
          <Label htmlFor='padding-toggle' className={cn('text-sm')}>
            Padding (<code className={cn('text-xs')}>=</code>)
          </Label>
        </div>
        <Button
          type='button'
          variant='outline'
          size='sm'
          onClick={handleReset}
          className={cn('ml-auto gap-1.5')}>
          <RefreshCw className={cn('size-3.5')} aria-hidden />
          Reset
        </Button>
      </div>

      <div className={cn('grid gap-5 md:grid-cols-2')}>
        <div className={cn('rounded-xl border border-border bg-card p-4')}>
          <div className={cn('mb-2 flex items-center justify-between')}>
            <Label htmlFor='base64-plain' className={cn('text-sm font-medium')}>
              Plain text
            </Label>
            <Base64CopyButton
              label='Copy'
              state={plainCopyState}
              onClick={() => handleCopy('plain')}
              disabled={!plainText}
            />
          </div>
          <Textarea
            id='base64-plain'
            value={plainText}
            onChange={e => handlePlainChange(e.target.value)}
            placeholder='Type or paste text to encode…'
            rows={8}
            className={cn('font-mono text-sm')}
          />
        </div>

        <div className={cn('rounded-xl border border-border bg-card p-4')}>
          <div className={cn('mb-2 flex items-center justify-between')}>
            <Label htmlFor='base64-encoded' className={cn('text-sm font-medium')}>
              Base64
            </Label>
            <Base64CopyButton
              label='Copy'
              state={encodedCopyState}
              onClick={() => handleCopy('encoded')}
              disabled={!encodedText}
            />
          </div>
          <Textarea
            id='base64-encoded'
            value={encodedText}
            onChange={e => handleEncodedChange(e.target.value)}
            placeholder='Or paste Base64 here to decode…'
            rows={8}
            aria-invalid={!!decodeError}
            aria-describedby={decodeError ? 'base64-decode-error' : undefined}
            className={cn('font-mono text-sm')}
          />
          {decodeError && (
            <p
              id='base64-decode-error'
              role='alert'
              className={cn('mt-2 text-xs text-destructive')}>
              {decodeError}
            </p>
          )}
        </div>
      </div>

      <p className={cn('text-center text-xs text-muted-foreground')}>
        {stats.plainBytes.toLocaleString()} bytes of text → {stats.encodedChars.toLocaleString()}{' '}
        Base64 characters
        {stats.plainBytes > 0 ? ` (+${stats.overhead}% overhead)` : ''}
      </p>
    </div>
  );
}
