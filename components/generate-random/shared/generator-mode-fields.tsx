'use client';

import { AnimatePresence, LayoutGroup, motion } from 'framer-motion';
import type React from 'react';

import { cn } from '@/lib/utils';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import type { BulkCount, GenerationMode } from './generator-types';

type GeneratorModeFieldsProps<TBulkCount extends BulkCount> = {
  mode: GenerationMode;
  bulkCount: TBulkCount;
  bulkCountValues: TBulkCount[];
  loading: boolean;
  onModeChange: (value: GenerationMode) => void;
  onBulkCountChange: (value: TBulkCount) => void;
  formError?: string | null;
  modeLabel?: string;
  countLabel?: string;
  className?: string;
  leadingField?: React.ReactNode;
};

export function GeneratorModeFields<TBulkCount extends BulkCount>({
  mode,
  bulkCount,
  bulkCountValues,
  loading,
  onModeChange,
  onBulkCountChange,
  formError,
  modeLabel = 'Mode',
  countLabel = 'Count',
  className,
  leadingField,
}: GeneratorModeFieldsProps<TBulkCount>) {
  return (
    <LayoutGroup>
      <motion.div
        layout
        transition={{ type: 'spring', stiffness: 210, damping: 24, mass: 0.7 }}
        className={cn('relative flex flex-col gap-4 sm:flex-row sm:gap-5', className)}>
        {leadingField}
        <motion.div
          layout
          transition={{ type: 'spring', stiffness: 210, damping: 24, mass: 0.7 }}
          className={cn('flex flex-col gap-2 sm:min-w-0 sm:flex-1')}>
          <Label className={cn('text-sm font-medium text-foreground')}>{modeLabel}</Label>
          <Select value={mode} onValueChange={value => onModeChange(value as GenerationMode)} disabled={loading}>
            <SelectTrigger className={cn('h-11 w-full sm:h-10')}>
              <SelectValue placeholder='Select mode' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='single'>Single</SelectItem>
              <SelectItem value='bulk'>Bulk</SelectItem>
            </SelectContent>
          </Select>
          {formError ? <p className={cn('text-sm text-destructive')}>{formError}</p> : null}
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
              transition={{ type: 'spring', stiffness: 210, damping: 24, mass: 0.7 }}>
              <Label className={cn('text-sm font-medium text-foreground')}>{countLabel}</Label>
              <Select
                value={bulkCount}
                onValueChange={value => onBulkCountChange(value as TBulkCount)}
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
  );
}
