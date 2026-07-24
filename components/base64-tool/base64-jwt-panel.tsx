'use client';

import { RefreshCw } from 'lucide-react';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import { Base64CopyButton } from '@/components/base64-tool/base64-copy-button';
import type { Base64AnalyticsHandlers } from '@/components/base64-tool/base64-tool-content';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import type { CopyState } from '@/components/generate-random/shared/generator-types';
import { parseJwt, type JwtClaimStatus } from '@/lib/base64-tool/jwt';
import { cn } from '@/lib/utils';

type Base64JwtPanelProps = {
  analytics: Base64AnalyticsHandlers;
  className?: string;
};

const COPY_FEEDBACK_MS = 1500;

const STATUS_LABEL: Record<JwtClaimStatus, string> = {
  expired: 'Expired',
  'not-yet-valid': 'Not yet valid',
  valid: 'Valid (unverified)',
  unknown: 'No exp/nbf claim',
};

const STATUS_CLASSES: Record<JwtClaimStatus, string> = {
  expired: 'bg-destructive/10 text-destructive',
  'not-yet-valid': 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300',
  valid: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300',
  unknown: 'bg-muted text-muted-foreground',
};

function JsonBlock({
  title,
  value,
  copyState,
  onCopy,
}: {
  title: string;
  value: unknown;
  copyState: CopyState;
  onCopy: () => void;
}) {
  const text = JSON.stringify(value, null, 2);
  return (
    <div className={cn('rounded-xl border border-border bg-card p-4')}>
      <div className={cn('mb-2 flex items-center justify-between')}>
        <Label className={cn('text-sm font-medium')}>{title}</Label>
        <Base64CopyButton label='Copy' state={copyState} onClick={onCopy} disabled={!text} />
      </div>
      <pre className={cn('overflow-x-auto text-xs leading-relaxed text-foreground')}>{text}</pre>
    </div>
  );
}

export function Base64JwtPanel({ analytics, className }: Base64JwtPanelProps) {
  const [token, setToken] = useState('');
  const [headerCopyState, setHeaderCopyState] = useState<CopyState>('idle');
  const [payloadCopyState, setPayloadCopyState] = useState<CopyState>('idle');
  const hasTracked = useRef(false);
  const copyTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const result = useMemo(() => (token.trim() ? parseJwt(token) : null), [token]);

  useEffect(() => {
    if (result?.ok) {
      analytics.onResult({ panel: 'jwt', status: result.status });
    }
  }, [result, analytics]);

  const handleChange = useCallback(
    (value: string) => {
      if (!hasTracked.current && value.trim()) {
        hasTracked.current = true;
        analytics.onUse({ panel: 'jwt' });
      }
      setToken(value);
    },
    [analytics],
  );

  const handleReset = useCallback(() => {
    analytics.onReset();
    hasTracked.current = false;
    setToken('');
  }, [analytics]);

  const handleCopy = useCallback(
    (kind: 'header' | 'payload', value: unknown) => {
      analytics.onCopy(`jwt-${kind}`);
      if (copyTimerRef.current) clearTimeout(copyTimerRef.current);

      const setState = kind === 'header' ? setHeaderCopyState : setPayloadCopyState;
      try {
        navigator.clipboard.writeText(JSON.stringify(value, null, 2));
        setState('copied');
      } catch {
        setState('failed');
      }
      copyTimerRef.current = setTimeout(() => setState('idle'), COPY_FEEDBACK_MS);
    },
    [analytics],
  );

  return (
    <div className={cn('flex flex-col gap-5', className)}>
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

      <div className={cn('rounded-xl border border-border bg-card p-4')}>
        <Label htmlFor='jwt-input' className={cn('mb-1.5 block text-sm font-medium')}>
          JWT
        </Label>
        <Textarea
          id='jwt-input'
          value={token}
          onChange={e => handleChange(e.target.value)}
          placeholder='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9…'
          rows={4}
          aria-invalid={!!result && !result.ok}
          className={cn('font-mono text-xs')}
        />
        {result && !result.ok && (
          <p role='alert' className={cn('mt-2 text-xs text-destructive')}>
            {result.error}
          </p>
        )}
        <p className={cn('mt-2 text-xs text-muted-foreground')}>
          Decoding only — this tool does not verify the signature, since that
          requires the issuer&apos;s secret or public key. Never trust claims
          from a token you haven&apos;t verified server-side.
        </p>
      </div>

      {result && result.ok && (
        <>
          <div className={cn('flex flex-wrap items-center gap-3')}>
            <span
              className={cn(
                'rounded-full px-3 py-0.5 text-xs font-semibold',
                STATUS_CLASSES[result.status],
              )}>
              {STATUS_LABEL[result.status]}
            </span>
            {result.issuedAt && (
              <span className={cn('text-xs text-muted-foreground')}>Issued {result.issuedAt}</span>
            )}
            {result.expiresAt && (
              <span className={cn('text-xs text-muted-foreground')}>Expires {result.expiresAt}</span>
            )}
            {result.notBefore && (
              <span className={cn('text-xs text-muted-foreground')}>
                Not before {result.notBefore}
              </span>
            )}
          </div>

          <div className={cn('grid gap-5 md:grid-cols-2')}>
            <JsonBlock
              title='Header'
              value={result.header}
              copyState={headerCopyState}
              onCopy={() => handleCopy('header', result.header)}
            />
            <JsonBlock
              title='Payload'
              value={result.payload}
              copyState={payloadCopyState}
              onCopy={() => handleCopy('payload', result.payload)}
            />
          </div>

          <div className={cn('rounded-xl border border-border bg-card p-4')}>
            <Label className={cn('mb-2 block text-sm font-medium')}>Signature (raw)</Label>
            <p className={cn('break-all font-mono text-xs text-muted-foreground')}>
              {result.signature}
            </p>
          </div>
        </>
      )}
    </div>
  );
}
