'use client';

import { Check, Copy, X } from 'lucide-react';

import type { CopyState } from '@/components/generate-random/shared/generator-types';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

type JsonToolCopyButtonProps = {
  label: string;
  state: CopyState;
  onClick: () => void;
  disabled: boolean;
  className?: string;
};

export function JsonToolCopyButton({
  label,
  state,
  onClick,
  disabled,
  className,
}: JsonToolCopyButtonProps) {
  return (
    <Button
      type='button'
      variant='outline'
      size='sm'
      onClick={onClick}
      disabled={disabled}
      className={cn(
        state === 'copied' &&
          'border-emerald-500/40 bg-emerald-500/10 text-emerald-800 dark:border-emerald-400/35 dark:bg-emerald-500/15 dark:text-emerald-100',
        state === 'failed' &&
          'border-destructive/40 bg-destructive/5 text-destructive',
        className,
      )}>
      {state === 'copied' ? (
        <Check className={cn('mr-1.5 size-3.5')} aria-hidden />
      ) : state === 'failed' ? (
        <X className={cn('mr-1.5 size-3.5')} aria-hidden />
      ) : (
        <Copy className={cn('mr-1.5 size-3.5')} aria-hidden />
      )}
      {state === 'copied' ? 'Copied' : state === 'failed' ? 'Failed' : label}
    </Button>
  );
}
