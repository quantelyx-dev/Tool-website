'use client';

import { ChildSupportNumberField } from '@/components/indiana-child-support/child-support-number-field';
import { ParentAdjustmentFields } from '@/components/indiana-child-support/parent-adjustment-fields';
import {
  Card,
  CardContent,
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  formatIncomeIntervalLabel,
  PARENT_LABELS,
} from '@/lib/indiana-child-support/form-helpers';
import type { IndianaParentId } from '@/lib/indiana-child-support/types';
import {
  INCOME_INTERVAL_VALUES,
  type ChildSupportFormValues,
} from '@/lib/schemas/indiana-child-support-schema';
import type { Control } from 'react-hook-form';

type ParentIncomeCardProps = {
  control: Control<ChildSupportFormValues>;
  parent: IndianaParentId;
};

export function ParentIncomeCard({ control, parent }: ParentIncomeCardProps) {
  return (
    <Card className='border-border/80 shadow-xs'>
      <CardHeader className='pb-4'>
        <CardTitle className='text-base font-semibold'>
          {PARENT_LABELS[parent]}
        </CardTitle>
      </CardHeader>
      <CardContent className='space-y-4'>
        <FormField
          control={control}
          name={`${parent}.incomeInterval`}
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
        <ChildSupportNumberField
          control={control}
          name={`${parent}.grossIncome`}
          label='Gross income ($)'
          hint='Before taxes and deductions, for the interval above.'
        />
        <ParentAdjustmentFields control={control} parent={parent} />
      </CardContent>
    </Card>
  );
}
