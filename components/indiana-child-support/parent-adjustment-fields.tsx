'use client';

import { ChildSupportNumberField } from '@/components/indiana-child-support/child-support-number-field';
import type { IndianaParentId } from '@/lib/indiana-child-support/types';
import type { ChildSupportFormValues } from '@/lib/schemas/indiana-child-support-schema';
import type { Control } from 'react-hook-form';

type ParentAdjustmentFieldsProps = {
  control: Control<ChildSupportFormValues>;
  parent: IndianaParentId;
};

/** Worksheet lines 1A to 1D, 4A, and 4B. Closed by default because most are zero. */
export function ParentAdjustmentFields({
  control,
  parent,
}: ParentAdjustmentFieldsProps) {
  return (
    <details className='rounded-lg border border-border/80 px-3 py-2'>
      <summary className='cursor-pointer rounded-sm text-sm font-medium outline-none focus-visible:ring-3 focus-visible:ring-ring/50'>
        Deductions, child care, and health insurance (weekly)
      </summary>
      <div className='space-y-4 pt-4 pb-2'>
        <ChildSupportNumberField
          control={control}
          name={`${parent}.subsequentChildren`}
          label='Later-born or adopted children (line 1A)'
          hint='Born or adopted after the children in this order, and actually supported.'
          step='1'
        />
        <ChildSupportNumberField
          control={control}
          name={`${parent}.priorBornOrderedSupport`}
          label='Court-ordered support for prior-born children, $ per week (1B)'
        />
        <ChildSupportNumberField
          control={control}
          name={`${parent}.priorBornSupportWithoutOrder`}
          label='Support paid for prior-born children without an order, $ per week (1C)'
        />
        <ChildSupportNumberField
          control={control}
          name={`${parent}.maintenancePaid`}
          label='Court-ordered maintenance or alimony paid, $ per week (1D)'
        />
        <ChildSupportNumberField
          control={control}
          name={`${parent}.childCare`}
          label='Work-related child care this parent pays, $ per week (4A)'
        />
        <ChildSupportNumberField
          control={control}
          name={`${parent}.healthInsurance`}
          label="Children's share of health premium this parent pays, $ per week (4B)"
        />
      </div>
    </details>
  );
}
