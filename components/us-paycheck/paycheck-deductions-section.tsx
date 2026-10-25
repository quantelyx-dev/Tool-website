'use client';

import type { Control } from 'react-hook-form';
import { PiggyBankIcon } from 'lucide-react';

import { PaycheckNumberField } from '@/components/us-paycheck/paycheck-fields';
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
} from '@/components/ui/form';
import { Switch } from '@/components/ui/switch';
import type { PaycheckFormValues } from '@/lib/schemas/us-paycheck-schema';

type PaycheckDeductionsSectionProps = {
  control: Control<PaycheckFormValues>;
};

export function PaycheckDeductionsSection({
  control,
}: PaycheckDeductionsSectionProps) {
  return (
    <Card className='border-border/80 shadow-xs'>
      <CardHeader>
        <CardTitle className='flex items-center gap-2 text-base font-semibold'>
          <PiggyBankIcon
            aria-hidden
            className='size-4 text-teal-600 dark:text-teal-400'
          />
          Deductions &amp; savings
        </CardTitle>
        <CardDescription>
          Optional. Dollar amounts are per paycheck; retirement is a percent of
          gross pay.
        </CardDescription>
      </CardHeader>
      <CardContent className='space-y-5'>
        <div className='grid gap-4 sm:grid-cols-2'>
          <PaycheckNumberField
            control={control}
            name='traditional401kPercent'
            label='Traditional 401(k)'
            description='Pre-tax'
            affix='%'
          />
          <PaycheckNumberField
            control={control}
            name='roth401kPercent'
            label='Roth 401(k)'
            description='Post-tax'
            affix='%'
          />
        </div>

        <FormField
          control={control}
          name='age50Plus'
          render={({ field }) => (
            <FormItem className='flex items-center justify-between gap-3 rounded-lg border border-border/80 px-3 py-2.5'>
              <FormLabel className='cursor-pointer text-sm font-normal'>
                I am 50 or older (401(k) catch-up limit)
              </FormLabel>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <div className='grid gap-4 sm:grid-cols-2'>
          <PaycheckNumberField
            control={control}
            name='healthInsurance'
            label='Health insurance'
            description='Pre-tax premium'
            affix='$'
          />
          <PaycheckNumberField
            control={control}
            name='hsaFsa'
            label='HSA / FSA'
            description='Pre-tax contribution'
            affix='$'
          />
          <PaycheckNumberField
            control={control}
            name='otherPreTax'
            label='Other pre-tax'
            description='Commuter, dental, vision'
            affix='$'
          />
          <PaycheckNumberField
            control={control}
            name='otherPostTax'
            label='Other post-tax'
            description='Union dues, garnishments'
            affix='$'
          />
        </div>

        <PaycheckNumberField
          control={control}
          name='otherTaxRatePercent'
          label='Other state / local payroll tax'
          description='City tax, CA SDI, NY PFL, WA Cares, etc. as a percent of gross pay'
          affix='%'
        />
      </CardContent>
    </Card>
  );
}
