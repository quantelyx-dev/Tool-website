'use client';

import { ParentIncomeCard } from '@/components/indiana-child-support/parent-income-card';
import type { ChildSupportFormValues } from '@/lib/schemas/indiana-child-support-schema';
import type { Control } from 'react-hook-form';

type ChildSupportIncomeSectionProps = {
  control: Control<ChildSupportFormValues>;
};

export function ChildSupportIncomeSection({
  control,
}: ChildSupportIncomeSectionProps) {
  return (
    <section className='space-y-4'>
      <div>
        <h2 className='text-lg font-semibold tracking-tight text-foreground'>
          Weekly gross income
        </h2>
        <p className='mt-1 text-sm text-muted-foreground'>
          Indiana uses gross income, before taxes. If a parent is unemployed or
          underemployed, a court may use potential income, which this calculator
          does not estimate.
        </p>
      </div>

      <div className='grid items-start gap-6 md:grid-cols-2'>
        <ParentIncomeCard control={control} parent='parentOne' />
        <ParentIncomeCard control={control} parent='parentTwo' />
      </div>
    </section>
  );
}
