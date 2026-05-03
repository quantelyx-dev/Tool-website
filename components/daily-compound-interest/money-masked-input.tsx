'use client';

import * as React from 'react';
import { IMaskInput } from 'react-imask';

import { cn } from '@/lib/utils';

/** Matches `components/ui/input` layout so masked fields look identical. */
const CONTROL_INPUT_CLASSES =
  'h-9 w-full min-w-0 rounded-md border border-input bg-transparent px-2.5 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 md:text-sm dark:bg-input/30 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40';

export type MoneyMaskedInputProps = Omit<
  React.ComponentProps<'input'>,
  | 'type'
  | 'value'
  | 'defaultValue'
  | 'onChange'
  | 'children'
  /** IMask `Number` mask owns these; HTML versions are strings and clash with types. */
  | 'min'
  | 'max'
  | 'step'
> & {
  value: string;
  /** Masked string (digits, `,`, optional `.` fraction) for react-hook-form. */
  onValueChange: (value: string) => void;
};

export const MoneyMaskedInput = React.forwardRef<
  HTMLInputElement,
  MoneyMaskedInputProps
>(function MoneyMaskedInput(
  { value, onValueChange, className, onBlur, ...rest },
  ref,
) {
  return (
    <IMaskInput
      {...rest}
      inputRef={ref}
      data-slot='input'
      className={cn(CONTROL_INPUT_CLASSES, className)}
      type='text'
      inputMode='decimal'
      autoComplete='off'
      mask={Number}
      radix='.'
      thousandsSeparator=','
      scale={20}
      min={0}
      normalizeZeros
      value={value}
      onAccept={(masked) => {
        onValueChange(typeof masked === 'string' ? masked : String(masked));
      }}
      onBlur={onBlur}
    />
  );
});
