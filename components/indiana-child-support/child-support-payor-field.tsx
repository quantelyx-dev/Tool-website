'use client';

import { FormField, FormItem, FormMessage } from '@/components/ui/form';
import { PARENT_LABELS } from '@/lib/indiana-child-support/form-helpers';
import {
  PARENT_IDS,
  type ChildSupportFormValues,
} from '@/lib/schemas/indiana-child-support-schema';
import type { Control } from 'react-hook-form';

type ChildSupportPayorFieldProps = {
  control: Control<ChildSupportFormValues>;
};

export function ChildSupportPayorField({ control }: ChildSupportPayorFieldProps) {
  return (
    <FormField
      control={control}
      name='payor'
      render={({ field }) => (
        <FormItem>
          <fieldset className='space-y-2' aria-describedby='payor-help'>
            <legend className='text-sm font-medium'>
              Parent who pays support and gets the parenting time credit
            </legend>
            <p id='payor-help' className='text-sm text-muted-foreground'>
              Usually the parent with fewer overnights. With equal time (181 to
              183 overnights) the court names one parent to pay the
              &ldquo;controlled expenses&rdquo; such as school costs and
              clothing. Choose the other parent here.
            </p>
            <div className='flex flex-wrap gap-4'>
              {PARENT_IDS.map(id => (
                <label key={id} className='flex items-center gap-2 text-sm'>
                  <input
                    type='radio'
                    name={field.name}
                    value={id}
                    checked={field.value === id}
                    onChange={() => field.onChange(id)}
                    className='size-4 accent-primary'
                  />
                  {PARENT_LABELS[id]}
                </label>
              ))}
            </div>
          </fieldset>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
