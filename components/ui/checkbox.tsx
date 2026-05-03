'use client';

import * as React from 'react';
import {
  Checkbox as CheckboxPrimitive,
  CheckboxIndicator as CheckboxIndicatorPrimitive,
} from '@radix-ui/react-checkbox';
import { CheckIcon } from 'lucide-react';

import { cn } from '@/lib/utils';

function Checkbox({
  className,
  ...props
}: React.ComponentProps<typeof CheckboxPrimitive>) {
  return (
    <CheckboxPrimitive
      data-slot='checkbox'
      className={cn(
        'peer size-4 shrink-0 rounded-sm border border-input bg-background shadow-xs outline-none transition-colors focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:border-primary data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground dark:bg-input/30 dark:data-[state=checked]:bg-primary',
        className,
      )}
      {...props}>
      <CheckboxIndicatorPrimitive
        data-slot='checkbox-indicator'
        className='flex items-center justify-center text-current [&>svg]:size-3'>
        <CheckIcon className='stroke-[3]' />
      </CheckboxIndicatorPrimitive>
    </CheckboxPrimitive>
  );
}

export { Checkbox };
