'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  FormControl,
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
import { formatIncomeIntervalLabel } from '@/lib/indiana-child-support/form-helpers';
import {
  INCOME_INTERVAL_VALUES,
  type ChildSupportFormValues,
} from '@/lib/schemas/indiana-child-support-schema';
import type { Control } from 'react-hook-form';

type ParentIncomeCardProps = {
  control: Control<ChildSupportFormValues>;
  title: string;
  description: string;
  netIncomeInvalid: boolean;
} & (
  | {
      parent: 'parentOne';
    }
  | {
      parent: 'parentTwo';
    }
);

export function ParentIncomeCard({
  control,
  title,
  description,
  parent,
  netIncomeInvalid,
}: ParentIncomeCardProps) {
  const incomeIntervalName =
    parent === 'parentOne'
      ? ('parentOneIncomeInterval' as const)
      : ('parentTwoIncomeInterval' as const);
  const netIncomeName =
    parent === 'parentOne'
      ? ('parentOneNetIncome' as const)
      : ('parentTwoNetIncome' as const);

  return (
    <Card className='justify-between border-border/80 shadow-xs'>
      <CardHeader className='pb-4'>
        <CardTitle className='text-base font-semibold'>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className='space-y-4'>
        <FormField
          control={control}
          name={incomeIntervalName}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Income interval</FormLabel>
              <Select value={field.value} onValueChange={field.onChange}>
                <FormControl>
                  <SelectTrigger className='w-full min-w-0'>
                    <SelectValue placeholder='Select interval' />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {INCOME_INTERVAL_VALUES.map(v => (
                    <SelectItem key={v} value={v}>
                      {formatIncomeIntervalLabel(v)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name={netIncomeName}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Net income</FormLabel>
              <FormControl>
                <Input
                  type='number'
                  inputMode='decimal'
                  min={0}
                  step='0.01'
                  value={Number.isFinite(field.value) ? field.value : ''}
                  onChange={e => field.onChange(e.target.valueAsNumber)}
                  onBlur={field.onBlur}
                  name={field.name}
                  ref={field.ref}
                  aria-invalid={netIncomeInvalid}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </CardContent>
    </Card>
  );
}
