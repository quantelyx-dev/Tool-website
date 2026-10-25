'use client';

import type { Control } from 'react-hook-form';
import { useWatch } from 'react-hook-form';
import { BanknoteIcon } from 'lucide-react';

import {
  PaycheckNumberField,
  PaycheckSelectField,
} from '@/components/us-paycheck/paycheck-fields';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { FormField } from '@/components/ui/form';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import type { PaycheckFormValues } from '@/lib/schemas/us-paycheck-schema';
import { FILING_STATUS_OPTIONS } from '@/lib/us-paycheck/federal-tax-data';
import { PAY_FREQUENCY_OPTIONS } from '@/lib/us-paycheck/pay-frequency';
import { STATE_TAX_RULES } from '@/lib/us-paycheck/state-tax-data';

const STATE_OPTIONS = STATE_TAX_RULES.map(rule => ({
  value: rule.code,
  label: rule.name,
})).sort((a, b) => a.label.localeCompare(b.label));

type PaycheckIncomeSectionProps = {
  control: Control<PaycheckFormValues>;
};

export function PaycheckIncomeSection({ control }: PaycheckIncomeSectionProps) {
  const payType = useWatch({ control, name: 'payType' });

  return (
    <Card className='border-border/80 shadow-xs'>
      <CardHeader>
        <CardTitle className='flex items-center gap-2 text-base font-semibold'>
          <BanknoteIcon
            aria-hidden
            className='size-4 text-teal-600 dark:text-teal-400'
          />
          Pay &amp; location
        </CardTitle>
        <CardDescription>
          Your gross pay, how often you are paid, and where you work.
        </CardDescription>
      </CardHeader>
      <CardContent className='space-y-5'>
        <FormField
          control={control}
          name='payType'
          render={({ field }) => (
            <Tabs value={field.value} onValueChange={field.onChange}>
              <TabsList aria-label='Pay type' className='w-full sm:w-72'>
                <TabsTrigger value='salary' aria-controls={undefined}>
                  Salary
                </TabsTrigger>
                <TabsTrigger value='hourly' aria-controls={undefined}>
                  Hourly
                </TabsTrigger>
              </TabsList>
            </Tabs>
          )}
        />

        {payType === 'salary' ? (
          <PaycheckNumberField
            control={control}
            name='annualSalary'
            label='Annual salary'
            affix='$'
            placeholder='75,000'
          />
        ) : (
          <div className='grid gap-4 sm:grid-cols-3'>
            <PaycheckNumberField
              control={control}
              name='hourlyRate'
              label='Hourly rate'
              affix='$'
              placeholder='25.00'
            />
            <PaycheckNumberField
              control={control}
              name='hoursPerWeek'
              label='Hours per week'
              placeholder='40'
            />
            <PaycheckNumberField
              control={control}
              name='overtimeHoursPerWeek'
              label='Overtime hours'
              description='Paid at 1.5×'
            />
          </div>
        )}

        <div className='grid gap-4 sm:grid-cols-2'>
          <PaycheckSelectField
            control={control}
            name='payFrequency'
            label='Pay frequency'
            options={PAY_FREQUENCY_OPTIONS}
          />
          <PaycheckSelectField
            control={control}
            name='stateCode'
            label='State'
            options={STATE_OPTIONS}
            placeholder='Select state'
          />
        </div>

        <PaycheckSelectField
          control={control}
          name='filingStatus'
          label='Federal filing status'
          options={FILING_STATUS_OPTIONS}
        />
      </CardContent>
    </Card>
  );
}
