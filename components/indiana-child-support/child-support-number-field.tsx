'use client';

import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import type { ChildSupportFormValues } from '@/lib/schemas/indiana-child-support-schema';
import type { Control, FieldPathByValue } from 'react-hook-form';

type ChildSupportNumberFieldProps = {
  control: Control<ChildSupportFormValues>;
  name: FieldPathByValue<ChildSupportFormValues, number>;
  label: string;
  hint?: string;
  step?: string;
};

export function ChildSupportNumberField({
  control,
  name,
  label,
  hint,
  step = '0.01',
}: ChildSupportNumberFieldProps) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Input
              type='number'
              inputMode='decimal'
              min={0}
              step={step}
              value={Number.isFinite(field.value) ? field.value : ''}
              onChange={e => field.onChange(e.target.valueAsNumber)}
              onBlur={field.onBlur}
              name={field.name}
              ref={field.ref}
            />
          </FormControl>
          {hint ? <FormDescription>{hint}</FormDescription> : null}
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
