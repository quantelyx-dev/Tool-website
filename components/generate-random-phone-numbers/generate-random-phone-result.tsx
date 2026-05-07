'use client';

import { motion } from 'framer-motion';
import { WandSparkles } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { revealedPanelVariants } from '@/lib/motion-variants';
import { cn } from '@/lib/utils';

export type GeneratedPhoneShape = {
  countryCode: string;
  callingCode: string;
  nationalNumber: string;
  international: string;
  e164: string;
};

export type CopyField = 'international' | 'e164' | 'nationalNumber';

type Props = {
  generated: GeneratedPhoneShape;
  reducedMotion: boolean | null;
  copiedField: CopyField | null;
  onCopy: (field: CopyField, value: string) => void;
  className?: string;
};

export function GeneratedPhoneResultCard({
  generated,
  reducedMotion,
  copiedField,
  onCopy,
  className,
}: Props) {
  const rows: Array<{ label: string; field: CopyField; value: string }> = [
    {
      label: 'International',
      field: 'international',
      value: generated.international,
    },
    {
      label: 'E.164',
      field: 'e164',
      value: generated.e164,
    },
    {
      label: 'National',
      field: 'nationalNumber',
      value: generated.nationalNumber,
    },
  ];

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
                'bg-emerald-500/10 text-emerald-700 ring-1 ring-emerald-500/15 dark:text-emerald-300',
              )}>
              <WandSparkles className={cn('size-5')} aria-hidden />
            </span>
            <div className={cn('min-w-0 space-y-1 text-left')}>
              <CardTitle className={cn('text-base font-semibold leading-snug')}>
                Generated number
              </CardTitle>
              <CardDescription className={cn('text-sm leading-relaxed')}>
                Formatted for {generated.countryCode}. Copy any format below.
              </CardDescription>
            </div>
          </div>
        </CardHeader>

        <CardContent className={cn('space-y-4 px-4 pb-6 pt-4')}>
          {rows.map(row => (
            <div
              key={row.field}
              className={cn(
                'flex flex-col gap-2 rounded-lg border border-border/70 p-3 sm:flex-row sm:items-center sm:justify-between',
              )}>
              <div className={cn('space-y-1')}>
                <p
                  className={cn(
                    'text-xs font-medium uppercase tracking-wide text-muted-foreground',
                  )}>
                  {row.label}
                </p>
                <motion.p
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.28 }}
                  className={cn(
                    'text-base font-semibold tracking-tight text-foreground sm:text-lg',
                  )}>
                  {row.value}
                </motion.p>
              </div>

              <Button
                onClick={() => onCopy(row.field, row.value)}
                size='sm'
                variant='outline'>
                {copiedField === row.field ? 'Copied' : 'Copy'}
              </Button>
            </div>
          ))}
        </CardContent>
      </Card>
    </motion.div>
  );
}
