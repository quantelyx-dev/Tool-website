'use client';

import type { Control, FieldPath } from 'react-hook-form';

import { MoneyMaskedInput } from '@/components/daily-compound-interest/money-masked-input';
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import type { PaycheckFormValues } from '@/lib/schemas/us-paycheck-schema';
import { cn } from '@/lib/utils';

type PaycheckControl = Control<PaycheckFormValues>;
type FieldName = FieldPath<PaycheckFormValues>;

type NumberFieldProps = {
  control: PaycheckControl;
  name: FieldName;
  label: string;
  description?: string;
  affix?: '$' | '%';
  placeholder?: string;
  className?: string;
};

export function PaycheckNumberField({
  control,
  name,
  label,
  description,
  affix,
  placeholder,
  className,
}: NumberFieldProps) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className={className}>
          <FormLabel>{label}</FormLabel>
          <div className='relative'>
            {affix === '$' ? (
              <span
                aria-hidden
                className='pointer-events-none absolute inset-y-0 left-2.5 flex items-center text-sm text-muted-foreground'>
                $
              </span>
            ) : null}
            <FormControl>
              <MoneyMaskedInput
                name={field.name}
                ref={field.ref}
                value={String(field.value ?? '')}
                onValueChange={field.onChange}
                onBlur={field.onBlur}
                placeholder={placeholder ?? '0'}
                className={cn(
                  affix === '$' && 'pl-6',
                  affix === '%' && 'pr-7',
                )}
              />
            </FormControl>
            {affix === '%' ? (
              <span
                aria-hidden
                className='pointer-events-none absolute inset-y-0 right-2.5 flex items-center text-sm text-muted-foreground'>
                %
              </span>
            ) : null}
          </div>
          {description ? <FormDescription>{description}</FormDescription> : null}
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

type CountFieldProps = Omit<NumberFieldProps, 'affix' | 'placeholder'>;

export function PaycheckCountField({
  control,
  name,
  label,
  description,
  className,
}: CountFieldProps) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className={className}>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Input
              name={field.name}
              ref={field.ref}
              inputMode='numeric'
              autoComplete='off'
              placeholder='0'
              value={String(field.value ?? '')}
              onChange={event =>
                field.onChange(event.target.value.replace(/\D/g, '').slice(0, 2))
              }
              onBlur={field.onBlur}
            />
          </FormControl>
          {description ? <FormDescription>{description}</FormDescription> : null}
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

type SelectFieldProps = {
  control: PaycheckControl;
  name: FieldName;
  label: string;
  options: readonly { value: string; label: string }[];
  placeholder?: string;
  description?: string;
  className?: string;
};

export function PaycheckSelectField({
  control,
  name,
  label,
  options,
  placeholder,
  description,
  className,
}: SelectFieldProps) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className={className}>
          <FormLabel>{label}</FormLabel>
          <Select value={String(field.value ?? '')} onValueChange={field.onChange}>
            <FormControl>
              <SelectTrigger className='w-full min-w-0' onBlur={field.onBlur}>
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {options.map(option => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {description ? <FormDescription>{description}</FormDescription> : null}
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
