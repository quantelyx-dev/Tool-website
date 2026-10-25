'use client';

import type { Control } from 'react-hook-form';
import { FileTextIcon } from 'lucide-react';

import {
  PaycheckCountField,
  PaycheckNumberField,
} from '@/components/us-paycheck/paycheck-fields';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import type { PaycheckFormValues } from '@/lib/schemas/us-paycheck-schema';

type PaycheckWithholdingSectionProps = {
  control: Control<PaycheckFormValues>;
};

export function PaycheckWithholdingSection({
  control,
}: PaycheckWithholdingSectionProps) {
  return (
    <Card className='border-border/80 shadow-xs'>
      <CardHeader>
        <CardTitle className='flex items-center gap-2 text-base font-semibold'>
          <FileTextIcon
            aria-hidden
            className='size-4 text-teal-600 dark:text-teal-400'
          />
          Form W-4 adjustments
        </CardTitle>
        <CardDescription>
          Optional. Mirrors steps 3 and 4 of the W-4 you gave your employer.
        </CardDescription>
      </CardHeader>
      <CardContent className='space-y-4'>
        <div className='grid gap-4 sm:grid-cols-2'>
          <PaycheckCountField
            control={control}
            name='qualifyingChildren'
            label='Children under 17'
            description='$2,200 credit each'
          />
          <PaycheckCountField
            control={control}
            name='otherDependents'
            label='Other dependents'
            description='$500 credit each'
          />
        </div>
        <div className='grid gap-4 sm:grid-cols-2'>
          <PaycheckNumberField
            control={control}
            name='otherIncome'
            label='Other income (per year)'
            description='Step 4(a)'
            affix='$'
          />
          <PaycheckNumberField
            control={control}
            name='otherDeductions'
            label='Extra deductions (per year)'
            description='Step 4(b)'
            affix='$'
          />
        </div>
        <PaycheckNumberField
          control={control}
          name='extraWithholding'
          label='Extra withholding (per paycheck)'
          description='Step 4(c)'
          affix='$'
        />
      </CardContent>
    </Card>
  );
}
