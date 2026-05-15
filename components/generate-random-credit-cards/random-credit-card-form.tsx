'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { CreditCard, Loader2, RefreshCw, WandSparkles } from 'lucide-react';

import {
  type SupportedCardIssuer,
  type GeneratedFakeCreditCard,
} from '@/lib/generate-random-credit-cards/generate';
import { fadeUpVariants } from '@/lib/motion-variants';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { GeneratorModeFields } from '@/components/generate-random/shared/generator-mode-fields';
import type {
  CopyState,
  GenerationMode,
  StandardBulkCount,
} from '@/components/generate-random/shared/generator-types';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { GenerateRandomCreditCardsResultCard } from './generate-random-credit-cards-result-card';

type RandomCreditCardFormProps = {
  reducedMotion: boolean | null;
  panelRef: React.RefObject<HTMLDivElement | null>;
  resultsRef: React.RefObject<HTMLDivElement | null>;
  issuer: SupportedCardIssuer;
  mode: GenerationMode;
  bulkCount: StandardBulkCount;
  loading: boolean;
  cards: GeneratedFakeCreditCard[];
  formError: string | null;
  error: string | null;
  copyState: CopyState;
  resultKey: string;
  issuerOptions: SupportedCardIssuer[];
  bulkCountValues: StandardBulkCount[];
  onIssuerChange: (value: SupportedCardIssuer) => void;
  onModeChange: (value: GenerationMode) => void;
  onBulkCountChange: (value: StandardBulkCount) => void;
  onGenerate: () => void;
  onReset: () => void;
  onCopySingleJson: () => void;
  onExportCsv: () => void;
  className?: string;
};

export function RandomCreditCardForm({
  reducedMotion,
  panelRef,
  resultsRef,
  issuer,
  mode,
  bulkCount,
  loading,
  cards,
  formError,
  error,
  copyState,
  resultKey,
  issuerOptions,
  bulkCountValues,
  onIssuerChange,
  onModeChange,
  onBulkCountChange,
  onGenerate,
  onReset,
  onCopySingleJson,
  onExportCsv,
  className,
}: RandomCreditCardFormProps) {
  return (
    <motion.div
      ref={panelRef}
      className={cn('mt-10 min-w-0 w-full sm:mt-12 lg:mt-14', className)}
      variants={fadeUpVariants(reducedMotion)}>
      <div className={cn('mx-auto max-w-3xl space-y-8 sm:space-y-10')}>
        <Card className={cn('py-0 shadow-xs ring-1 ring-foreground/10')}>
          <CardHeader
            className={cn(
              'space-y-2 border-b border-border/80 px-4 py-3 [.border-b]:pb-3',
            )}>
            <div className={cn('flex items-start gap-3.5 sm:items-center')}>
              <span
                className={cn(
                  'mt-0.5 inline-flex size-10 shrink-0 items-center justify-center rounded-xl',
                  'bg-blue-500/10 text-blue-700 ring-1 ring-blue-500/15 dark:text-blue-300',
                )}>
                <CreditCard className={cn('size-5')} aria-hidden />
              </span>
              <div className={cn('min-w-0 space-y-1 text-left')}>
                <CardTitle
                  className={cn('text-base font-semibold leading-snug')}>
                  Card generator
                </CardTitle>
                <CardDescription className={cn('text-sm leading-relaxed')}>
                  Choose issuer and generation mode before creating fake card
                  data.
                </CardDescription>
              </div>
            </div>
          </CardHeader>

          <CardContent className={cn('space-y-6 px-4 pb-6 pt-0')}>
            <GeneratorModeFields
              mode={mode}
              bulkCount={bulkCount}
              bulkCountValues={bulkCountValues}
              loading={loading}
              onModeChange={onModeChange}
              onBulkCountChange={onBulkCountChange}
              formError={formError}
              leadingField={
                <motion.div
                  layout
                  transition={{
                    type: 'spring',
                    stiffness: 210,
                    damping: 24,
                    mass: 0.7,
                  }}
                  className={cn('flex flex-col gap-2 sm:min-w-0 sm:flex-1')}>
                  <Label className={cn('text-sm font-medium text-foreground')}>
                    Issuer
                  </Label>
                  <Select
                    value={issuer}
                    onValueChange={value =>
                      onIssuerChange(value as SupportedCardIssuer)
                    }
                    disabled={loading}>
                    <SelectTrigger className={cn('h-11 w-full sm:h-10')}>
                      <SelectValue placeholder='Select issuer' />
                    </SelectTrigger>
                    <SelectContent>
                      {issuerOptions.map(option => (
                        <SelectItem key={option} value={option}>
                          {option}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </motion.div>
              }
            />

            <div
              className={cn(
                'flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:justify-end',
              )}>
              <Button
                type='button'
                onClick={onGenerate}
                disabled={loading}
                className={cn('inline-flex w-full gap-2 sm:w-auto sm:min-w-36')}
                size='lg'>
                {loading ? (
                  <>
                    <Loader2
                      className={cn('size-4 shrink-0 animate-spin')}
                      aria-hidden
                    />
                    Generating...
                  </>
                ) : (
                  <>
                    <WandSparkles
                      className={cn('size-4 shrink-0')}
                      aria-hidden
                    />
                    Generate
                  </>
                )}
              </Button>
              <Button
                type='button'
                variant='outline'
                onClick={onReset}
                disabled={loading}
                className={cn('inline-flex w-full gap-2 sm:w-auto sm:min-w-36')}
                size='lg'>
                <RefreshCw className={cn('size-4 shrink-0')} aria-hidden />
                Reset
              </Button>
            </div>

            {error ? (
              <p
                className={cn(
                  'rounded-lg border border-destructive/25 bg-destructive/5 px-4 py-3 text-sm leading-relaxed text-destructive',
                )}
                role='alert'>
                {error}
              </p>
            ) : null}
          </CardContent>
        </Card>

        <motion.div
          ref={resultsRef}
          variants={fadeUpVariants(reducedMotion)}
          className={cn('mx-auto max-w-3xl')}>
          <AnimatePresence initial={false}>
            {cards.length > 0 ? (
              <GenerateRandomCreditCardsResultCard
                key={resultKey}
                mode={mode}
                cards={cards}
                reducedMotion={reducedMotion}
                onCopySingleJson={onCopySingleJson}
                onExportCsv={onExportCsv}
                copyState={copyState}
              />
            ) : null}
          </AnimatePresence>
        </motion.div>
      </div>
    </motion.div>
  );
}
