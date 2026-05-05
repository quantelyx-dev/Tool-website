'use client';

import { ParentIncomeCard } from '@/components/indiana-child-support/parent-income-card';
import type { ChildSupportFormValues } from '@/lib/schemas/indiana-child-support-schema';
import type { Control, FieldErrors } from 'react-hook-form';

type ChildSupportIncomeSectionProps = {
  control: Control<ChildSupportFormValues>;
  errors: FieldErrors<ChildSupportFormValues>;
};

export function ChildSupportIncomeSection({
  control,
  errors,
}: ChildSupportIncomeSectionProps) {
  return (
    <section className='space-y-4'>
      <div>
        <h2 className='text-lg font-semibold tracking-tight text-foreground'>
          Income
        </h2>
        <p className='mt-1 text-sm text-muted-foreground'>
          Use each parent’s take-home pay for the selected interval.
        </p>
      </div>

      <div className='grid gap-6 md:grid-cols-2'>
        <ParentIncomeCard
          control={control}
          parent='parentOne'
          title='Parent One'
          description='Gross-up or adjustments can come in a later phase.'
          netIncomeInvalid={Boolean(errors.parentOneNetIncome)}
        />
        <ParentIncomeCard
          control={control}
          parent='parentTwo'
          title='Parent Two'
          description='Same cadence as court worksheets, simplified for this tool.'
          netIncomeInvalid={Boolean(errors.parentTwoNetIncome)}
        />
      </div>
    </section>
  );
}
