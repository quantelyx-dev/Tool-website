'use client';

import { motion } from 'framer-motion';
import { Check, Copy, Download, KeyRound, X } from 'lucide-react';

import type { GeneratedPassword } from '@/lib/generate-random-passwords/generate';
import { revealedPanelVariants } from '@/lib/motion-variants';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

type GenerationMode = 'single' | 'bulk';

type Props = {
  mode: GenerationMode;
  values: GeneratedPassword[];
  reducedMotion: boolean | null;
  onCopySinglePassword: () => void;
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

  return 'Copy password';
}

function strengthClasses(score: number): string {
  if (score <= 1) {
    return 'bg-red-500/10 text-red-700 ring-red-500/20 dark:text-red-300';
  }

  if (score === 2) {
    return 'bg-amber-500/10 text-amber-700 ring-amber-500/20 dark:text-amber-300';
  }

  if (score === 3) {
    return 'bg-blue-500/10 text-blue-700 ring-blue-500/20 dark:text-blue-300';
  }

  return 'bg-emerald-500/10 text-emerald-700 ring-emerald-500/20 dark:text-emerald-300';
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

export function GenerateRandomPasswordsResultCard({
  mode,
  values,
  reducedMotion,
  onCopySinglePassword,
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
        <CardHeader className={cn('space-y-2 border-b border-border/80 px-4 py-3 [.border-b]:pb-3')}>
          <div className={cn('flex items-start gap-3.5 sm:items-center')}>
            <span className={cn('mt-0.5 inline-flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary ring-1 ring-primary/15')}>
              <KeyRound className={cn('size-5')} aria-hidden />
            </span>
            <div className={cn('min-w-0 space-y-1 text-left')}>
              <CardTitle className={cn('text-base font-semibold leading-snug')}>
                {single ? 'Generated password' : `Generated passwords (${values.length})`}
              </CardTitle>
              <CardDescription className={cn('text-sm leading-relaxed')}>
                {single ? 'Review strength details and copy the password.' : 'Export generated passwords and strength details as CSV.'}
              </CardDescription>
            </div>
          </div>
        </CardHeader>

        <CardContent className={cn('space-y-4 px-4 pb-6 pt-4')}>
          <div className={cn('overflow-x-auto rounded-lg scrollbar-thin border border-border/70', mode === 'bulk' && 'max-h-96 overflow-y-auto')}>
            <table className={cn('min-w-full text-sm')}>
              <thead className={cn('sticky top-0 z-10 bg-muted')}>
                <tr className={cn('border-b border-border/70')}>
                  <th className={cn('px-3 py-2 text-left font-medium')}>Password</th>
                  <th className={cn('px-3 py-2 text-left font-medium')}>Strength</th>
                  <th className={cn('px-3 py-2 text-left font-medium')}>Crack time</th>
                </tr>
              </thead>
              <tbody>
                {values.map(value => (
                  <tr key={value.password} className={cn('border-b border-border/50 last:border-b-0')}>
                    <td className={cn('px-3 py-2 font-mono')}>{value.password}</td>
                    <td className={cn('px-3 py-2')}>
                      <span className={cn('inline-flex rounded-md px-2 py-0.5 text-xs font-medium ring-1', strengthClasses(value.strength.score))}>
                        {value.strength.label}
                      </span>
                    </td>
                    <td className={cn('px-3 py-2 text-muted-foreground')}>{value.strength.crackTimeDisplay}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {single && values[0]?.strength.feedbackWarning ? (
            <p className={cn('rounded-md border border-amber-500/20 bg-amber-500/5 px-3 py-2 text-sm text-amber-700 dark:text-amber-300')}>
              {values[0].strength.feedbackWarning}
            </p>
          ) : null}

          <div className={cn('flex justify-end')}>
            {single ? (
              <Button
                type='button'
                variant='outline'
                onClick={onCopySinglePassword}
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
