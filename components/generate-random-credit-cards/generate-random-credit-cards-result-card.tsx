'use client';

import { motion } from 'framer-motion';
import { Check, Copy, Download, WandSparkles, X } from 'lucide-react';

import type { GeneratedFakeCreditCard } from '@/lib/generate-random-credit-cards/generate';
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
  cards: GeneratedFakeCreditCard[];
  reducedMotion: boolean | null;
  onCopySingleJson: () => void;
  onExportCsv: () => void;
  copyState: 'idle' | 'copied' | 'failed';
  className?: string;
};

export function GenerateRandomCreditCardsResultCard({
  mode,
  cards,
  reducedMotion,
  onCopySingleJson,
  onExportCsv,
  copyState,
  className,
}: Props) {
  const single = mode === 'single';
  const count = cards.length;

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
              <WandSparkles className={cn('size-5')} aria-hidden />
            </span>
            <div className={cn('min-w-0 space-y-1 text-left')}>
              <CardTitle className={cn('text-base font-semibold leading-snug')}>
                {single ? 'Generated card' : `Generated cards (${count})`}
              </CardTitle>
              <CardDescription className={cn('text-sm leading-relaxed')}>
                {single
                  ? 'Copy this card as valid JSON.'
                  : 'CSV export button is shown as a placeholder for the upcoming feature.'}
              </CardDescription>
            </div>
          </div>
        </CardHeader>

        <CardContent className={cn('space-y-4 px-4 pb-6 pt-4')}>
          <div className={cn('overflow-x-auto rounded-lg border border-border/70')}>
            <table className={cn('min-w-full text-sm')}>
              <thead>
                <tr className={cn('border-b border-border/70 bg-muted/35')}>
                  <th className={cn('px-3 py-2 text-left font-medium')}>Name</th>
                  <th className={cn('px-3 py-2 text-left font-medium')}>Issuer</th>
                  <th className={cn('px-3 py-2 text-left font-medium')}>Number</th>
                  <th className={cn('px-3 py-2 text-left font-medium')}>Expiry</th>
                  <th className={cn('px-3 py-2 text-left font-medium')}>CVV</th>
                </tr>
              </thead>
              <tbody>
                {cards.map(card => (
                  <tr key={`${card.number}-${card.cvv}`} className={cn('border-b border-border/50 last:border-b-0')}>
                    <td className={cn('px-3 py-2')}>{card.holderName}</td>
                    <td className={cn('px-3 py-2')}>{card.issuer}</td>
                    <td className={cn('px-3 py-2 font-mono')}>{card.number}</td>
                    <td className={cn('px-3 py-2 font-mono')}>{card.expiry}</td>
                    <td className={cn('px-3 py-2 font-mono')}>{card.cvv}</td>
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
                {copyState === 'copied' ? (
                  <motion.span
                    key='copied'
                    initial={{ opacity: 0, y: 3, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -3, scale: 0.97 }}
                    className={cn('inline-flex items-center')}>
                    <Check className={cn('mr-2 size-4')} aria-hidden />
                    Copied
                  </motion.span>
                ) : copyState === 'failed' ? (
                  <motion.span
                    key='failed'
                    initial={{ opacity: 0, y: 3, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -3, scale: 0.97 }}
                    className={cn('inline-flex items-center')}>
                    <X className={cn('mr-2 size-4')} aria-hidden />
                    Copy failed
                  </motion.span>
                ) : (
                  <motion.span
                    key='idle'
                    initial={{ opacity: 0, y: 3, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -3, scale: 0.97 }}
                    className={cn('inline-flex items-center')}>
                    <Copy className={cn('mr-2 size-4')} aria-hidden />
                    Copy JSON
                  </motion.span>
                )}
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
