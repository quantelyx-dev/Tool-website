'use client';

import { motion } from 'framer-motion';
import { Check, Copy, Download, Fingerprint, X } from 'lucide-react';

import type { GeneratedUuid } from '@/lib/generate-random-uuids/generate';
import { revealedPanelVariants } from '@/lib/motion-variants';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

type GenerationMode = 'single' | 'bulk';

type Props = {
  mode: GenerationMode;
  values: GeneratedUuid[];
  reducedMotion: boolean | null;
  onCopySingleJson: () => void;
  onExportCsv: () => void;
  copyState: 'idle' | 'copied' | 'failed';
  className?: string;
};

function copyLabel(copyState: 'idle' | 'copied' | 'failed'): string {
  if (copyState === 'copied') {
    return 'Copied';
  }

  if (copyState === 'failed') {
    return 'Copy failed';
  }

  return 'Copy JSON';
}

function CopyIcon({ state }: { state: 'idle' | 'copied' | 'failed' }) {
  if (state === 'copied') {
    return <Check className={cn('mr-2 size-4')} aria-hidden />;
  }

  if (state === 'failed') {
    return <X className={cn('mr-2 size-4')} aria-hidden />;
  }

  return <Copy className={cn('mr-2 size-4')} aria-hidden />;
}

export function GenerateRandomUuidsResultCard({
  mode,
  values,
  reducedMotion,
  onCopySingleJson,
  onExportCsv,
  copyState,
  className,
}: Props) {
  const single = mode === 'single';

  return (
    <motion.div
      initial='hidden'
      animate='visible'
      exit='exit'
      variants={revealedPanelVariants(reducedMotion)}
      className={cn('mx-auto max-w-3xl', className)}>
      <Card className={cn('mt-2 py-0 shadow-xs ring-1 ring-foreground/10')}>
        <CardHeader
          className={cn(
            'space-y-2 border-b border-border/80 px-4 py-3 [.border-b]:pb-3',
          )}>
          <div className={cn('flex items-start gap-3.5 sm:items-center')}>
            <span
              className={cn(
                'mt-0.5 inline-flex size-10 shrink-0 items-center justify-center rounded-xl',
                'bg-primary/10 text-primary ring-1 ring-primary/15',
              )}>
              <Fingerprint className={cn('size-5')} aria-hidden />
            </span>
            <div className={cn('min-w-0 space-y-1 text-left')}>
              <CardTitle className={cn('text-base font-semibold leading-snug')}>
                {single
                  ? 'Generated UUIDv7'
                  : `Generated UUIDv7s (${values.length})`}
              </CardTitle>
              <CardDescription className={cn('text-sm leading-relaxed')}>
                {single
                  ? 'Copy this UUID payload as JSON.'
                  : 'Export the generated UUIDs as CSV.'}
              </CardDescription>
            </div>
          </div>
        </CardHeader>

        <CardContent className={cn('space-y-4 px-4 pb-6 pt-4')}>
          <div
            className={cn(
              'overflow-x-auto rounded-lg scrollbar-thin border border-border/70',
              mode === 'bulk' && 'max-h-96 overflow-y-auto',
            )}>
            <table className={cn('min-w-full text-sm')}>
              <thead className={cn('sticky top-0 z-10 bg-muted')}>
                <tr className={cn('border-b border-border/70')}>
                  <th className={cn('px-3 py-2 text-left font-medium')}>
                    UUIDv7
                  </th>
                </tr>
              </thead>
              <tbody>
                {values.map(value => (
                  <tr
                    key={value.uuid}
                    className={cn('border-b border-border/50 last:border-b-0')}>
                    <td className={cn('px-3 py-2 font-mono')}>{value.uuid}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className={cn('flex justify-end')}>
            {single ? (
              <Button
                type='button'
                variant='outline'
                onClick={onCopySingleJson}
                aria-live='polite'
                className={cn(
                  copyState === 'copied' &&
                    'border-emerald-500/40 bg-emerald-500/10 text-emerald-800 hover:bg-emerald-500/15 dark:border-emerald-400/35 dark:bg-emerald-500/15 dark:text-emerald-100 dark:hover:bg-emerald-500/20',
                  copyState === 'failed' &&
                    'border-destructive/40 bg-destructive/5 text-destructive hover:bg-destructive/10',
                )}>
                <motion.span
                  key={copyState}
                  initial={{ opacity: 0, y: 3, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -3, scale: 0.97 }}
                  className={cn('inline-flex items-center')}>
                  <CopyIcon state={copyState} />
                  {copyLabel(copyState)}
                </motion.span>
              </Button>
            ) : (
              <Button type='button' variant='outline' onClick={onExportCsv}>
                <Download className={cn('mr-2 size-4')} aria-hidden />
                Export CSV
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
