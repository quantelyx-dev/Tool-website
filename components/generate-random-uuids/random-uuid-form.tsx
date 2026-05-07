'use client';

import { AnimatePresence, LayoutGroup, motion } from 'framer-motion';
import { Fingerprint, Loader2, RefreshCw, WandSparkles } from 'lucide-react';

import type { GeneratedUuid } from '@/lib/generate-random-uuids/generate';
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { GenerateRandomUuidsResultCard } from './generate-random-uuids-result-card';

type GenerationMode = 'single' | 'bulk';
type BulkCount = '10' | '50' | '100' | '200';

type RandomUuidFormProps = {
  reducedMotion: boolean | null;
  panelRef: React.RefObject<HTMLDivElement | null>;
  resultsRef: React.RefObject<HTMLDivElement | null>;
  mode: GenerationMode;
  bulkCount: BulkCount;
  loading: boolean;
  values: GeneratedUuid[];
  formError: string | null;
  error: string | null;
  copyState: 'idle' | 'copied' | 'failed';
  resultKey: string;
  bulkCountValues: BulkCount[];
  onModeChange: (value: GenerationMode) => void;
  onBulkCountChange: (value: BulkCount) => void;
  onGenerate: () => void;
  onReset: () => void;
  onCopySingleJson: () => void;
  onExportCsv: () => void;
  className?: string;
};

export function RandomUuidForm({
  reducedMotion,
  panelRef,
  resultsRef,
  mode,
  bulkCount,
  loading,
  values,
  formError,
  error,
  copyState,
  resultKey,
  bulkCountValues,
  onModeChange,
  onBulkCountChange,
  onGenerate,
  onReset,
  onCopySingleJson,
  onExportCsv,
  className,
}: RandomUuidFormProps) {
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
                <Fingerprint className={cn('size-5')} aria-hidden />
              </span>
              <div className={cn('min-w-0 space-y-1 text-left')}>
                <CardTitle className={cn('text-base font-semibold leading-snug')}>
                  UUID generator
                </CardTitle>
                <CardDescription className={cn('text-sm leading-relaxed')}>
                  Choose generation mode and create UUIDv7 values.
                </CardDescription>
              </div>
            </div>
          </CardHeader>

          <CardContent className={cn('space-y-6 px-4 pb-6 pt-0')}>
            <LayoutGroup>
              <motion.div
                layout
                transition={{
                  type: 'spring',
                  stiffness: 210,
                  damping: 24,
                  mass: 0.7,
                }}
                className={cn('relative flex flex-col gap-4 sm:flex-row sm:gap-5')}>
                <motion.div
                  layout
                  transition={{
                    type: 'spring',
                    stiffness: 210,
                    damping: 24,
                    mass: 0.7,
                  }}
                  className={cn('flex flex-col gap-2 sm:min-w-0 sm:flex-1')}>
                  <label className={cn('text-sm font-medium text-foreground')}>
                    Mode
                  </label>
                  <Select
                    value={mode}
                    onValueChange={value => onModeChange(value as GenerationMode)}
                    disabled={loading}>
                    <SelectTrigger className={cn('h-11 w-full sm:h-10')}>
                      <SelectValue placeholder='Select mode' />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value='single'>Single</SelectItem>
                      <SelectItem value='bulk'>Bulk</SelectItem>
                    </SelectContent>
                  </Select>
                  {formError ? (
                    <p className={cn('text-sm text-destructive')}>{formError}</p>
                  ) : null}
                </motion.div>

                <AnimatePresence initial={false} mode='popLayout'>
                  {mode === 'bulk' ? (
                    <motion.div
                      key='bulk-count'
                      layout
                      className={cn('flex flex-col gap-2 sm:min-w-0 sm:flex-1')}
                      initial={{ opacity: 0, y: 10, scale: 0.985 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.99 }}
                      transition={{
                        type: 'spring',
                        stiffness: 210,
                        damping: 24,
                        mass: 0.7,
                      }}>
                      <label className={cn('text-sm font-medium text-foreground')}>
                        Count
                      </label>
                      <Select
                        value={bulkCount}
                        onValueChange={value => onBulkCountChange(value as BulkCount)}
                        disabled={loading}>
                        <SelectTrigger className={cn('h-11 w-full sm:h-10')}>
                          <SelectValue placeholder='Select count' />
                        </SelectTrigger>
                        <SelectContent>
                          {bulkCountValues.map(value => (
                            <SelectItem key={value} value={value}>
                              {value}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </motion.div>
            </LayoutGroup>

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
                    <Loader2 className={cn('size-4 shrink-0 animate-spin')} aria-hidden />
                    Generating...
                  </>
                ) : (
                  <>
                    <WandSparkles className={cn('size-4 shrink-0')} aria-hidden />
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
            {values.length > 0 ? (
              <GenerateRandomUuidsResultCard
                key={resultKey}
                mode={mode}
                values={values}
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
