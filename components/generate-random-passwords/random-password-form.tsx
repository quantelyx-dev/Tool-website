'use client';
import { AnimatePresence, motion } from 'framer-motion';
import { KeyRound, Loader2, RefreshCw, WandSparkles } from 'lucide-react';
import type { GeneratedPassword } from '@/lib/generate-random-passwords/generate';
import { fadeUpVariants } from '@/lib/motion-variants';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { GeneratorModeFields } from '@/components/generate-random/shared/generator-mode-fields';
import type {
  CopyState,
  GenerationMode,
  PasswordBulkCount,
} from '@/components/generate-random/shared/generator-types';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { GenerateRandomPasswordsResultCard } from './generate-random-passwords-result-card';
import { PasswordCharacterOptions } from './password-character-options';

type RandomPasswordFormProps = {
  reducedMotion: boolean | null;
  panelRef: React.RefObject<HTMLDivElement | null>;
  resultsRef: React.RefObject<HTMLDivElement | null>;
  mode: GenerationMode;
  bulkCount: PasswordBulkCount;
  length: number;
  includeUppercase: boolean;
  includeLowercase: boolean;
  includeNumbers: boolean;
  includeSymbols: boolean;
  loading: boolean;
  values: GeneratedPassword[];
  formError: string | null;
  error: string | null;
  copyState: CopyState;
  bulkCountValues: PasswordBulkCount[];
  onModeChange: (value: GenerationMode) => void;
  onBulkCountChange: (value: PasswordBulkCount) => void;
  onLengthChange: (value: number) => void;
  onIncludeUppercaseChange: (value: boolean) => void;
  onIncludeLowercaseChange: (value: boolean) => void;
  onIncludeNumbersChange: (value: boolean) => void;
  onIncludeSymbolsChange: (value: boolean) => void;
  onGenerate: () => void;
  onReset: () => void;
  onCopySinglePassword: () => void;
  onExportCsv: () => void;
  className?: string;
};
export function RandomPasswordForm({
  reducedMotion,
  panelRef,
  resultsRef,
  mode,
  bulkCount,
  length,
  includeUppercase,
  includeLowercase,
  includeNumbers,
  includeSymbols,
  loading,
  values,
  formError,
  error,
  copyState,
  bulkCountValues,
  onModeChange,
  onBulkCountChange,
  onLengthChange,
  onIncludeUppercaseChange,
  onIncludeLowercaseChange,
  onIncludeNumbersChange,
  onIncludeSymbolsChange,
  onGenerate,
  onReset,
  onCopySinglePassword,
  onExportCsv,
  className,
}: RandomPasswordFormProps) {
  return (
    <motion.div
      ref={panelRef}
      className={cn('mt-10 min-w-0 w-full sm:mt-12 lg:mt-14', className)}
      variants={fadeUpVariants(reducedMotion)}>
      <div className={cn('mx-auto max-w-3xl space-y-8 sm:space-y-10')}>
        <Card className={cn('py-0 shadow-xs ring-1 ring-foreground/10')}>
          <CardHeader className={cn('space-y-2 border-b border-border/80 px-4 py-3 [.border-b]:pb-3')}>
            <div className={cn('flex items-start gap-3.5 sm:items-center')}>
              <span className={cn('mt-0.5 inline-flex size-10 shrink-0 items-center justify-center rounded-xl bg-amber-500/10 text-amber-700 ring-1 ring-amber-500/15 dark:text-amber-300')}>
                <KeyRound className={cn('size-5')} aria-hidden />
              </span>
              <div className={cn('min-w-0 space-y-1 text-left')}>
                <CardTitle className={cn('text-base font-semibold leading-snug')}>
                  Password generator
                </CardTitle>
                <CardDescription className={cn('text-sm leading-relaxed')}>
                  Set length, character rules, and mode before generating.
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className={cn('space-y-6 px-4 pb-6 pt-4')}>
            <GeneratorModeFields
              mode={mode}
              bulkCount={bulkCount}
              bulkCountValues={bulkCountValues}
              loading={loading}
              onModeChange={onModeChange}
              onBulkCountChange={onBulkCountChange}
              className={cn('grid gap-4 sm:grid-cols-2')}
            />
            <div className={cn('space-y-3')}>
              <div className={cn('flex items-center justify-between text-sm')}>
                <Label>Password length</Label>
                <span className={cn('font-mono text-muted-foreground')}>{length}</span>
              </div>
              <Slider
                value={[length]}
                onValueChange={value => onLengthChange(value[0] ?? 16)}
                min={8}
                max={64}
                step={1}
                disabled={loading}
              />
              <p className={cn('text-xs text-muted-foreground')}>Range: 8 to 64 characters.</p>
            </div>
            <PasswordCharacterOptions
              includeUppercase={includeUppercase}
              includeLowercase={includeLowercase}
              includeNumbers={includeNumbers}
              includeSymbols={includeSymbols}
              loading={loading}
              onIncludeUppercaseChange={onIncludeUppercaseChange}
              onIncludeLowercaseChange={onIncludeLowercaseChange}
              onIncludeNumbersChange={onIncludeNumbersChange}
              onIncludeSymbolsChange={onIncludeSymbolsChange}
            />
            {formError ? <p className={cn('text-sm text-destructive')}>{formError}</p> : null}
            <div className={cn('flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:justify-end')}>
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
                className={cn('rounded-lg border border-destructive/25 bg-destructive/5 px-4 py-3 text-sm leading-relaxed text-destructive')}
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
              <GenerateRandomPasswordsResultCard
                mode={mode}
                values={values}
                reducedMotion={reducedMotion}
                onCopySinglePassword={onCopySinglePassword}
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
