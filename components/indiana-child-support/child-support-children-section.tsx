'use client';

import { Plus, Trash2 } from 'lucide-react';

import { ChildSupportNumberField } from '@/components/indiana-child-support/child-support-number-field';
import { ChildSupportPayorField } from '@/components/indiana-child-support/child-support-payor-field';
import { Button } from '@/components/ui/button';
import { defaultChildRow } from '@/lib/indiana-child-support/form-defaults';
import { MAX_CHILDREN } from '@/lib/indiana-child-support/guideline-constants';
import type { ChildSupportFormValues } from '@/lib/schemas/indiana-child-support-schema';
import type {
  Control,
  FieldArrayWithId,
  UseFieldArrayAppend,
  UseFieldArrayRemove,
} from 'react-hook-form';

type ChildSupportChildrenSectionProps = {
  control: Control<ChildSupportFormValues>;
  fields: FieldArrayWithId<ChildSupportFormValues, 'children', 'id'>[];
  append: UseFieldArrayAppend<ChildSupportFormValues, 'children'>;
  remove: UseFieldArrayRemove;
};

export function ChildSupportChildrenSection({
  control,
  fields,
  append,
  remove,
}: ChildSupportChildrenSectionProps) {
  return (
    <section className='space-y-5'>
      <div>
        <h2 className='text-lg font-semibold tracking-tight text-foreground'>
          Children and parenting time
        </h2>
        <p className='mt-1 text-sm text-muted-foreground'>
          For each child in this order, enter the nights per year spent with the
          paying parent. The credit starts at 52 overnights. About 96 to 100 is
          typical under the Indiana Parenting Time Guidelines without extra
          weeknight overnights.
        </p>
      </div>

      <ChildSupportPayorField control={control} />

      <ul className='grid gap-4 sm:grid-cols-2'>
        {fields.map((field, index) => (
          <li key={field.id} className='flex items-start gap-2'>
            <div className='min-w-0 flex-1'>
              <ChildSupportNumberField
                control={control}
                name={`children.${index}.payorOvernights`}
                label={`Child ${index + 1}: annual overnights`}
                step='1'
              />
            </div>
            {fields.length > 1 ? (
              <Button
                type='button'
                variant='ghost'
                size='icon'
                className='mt-6'
                onClick={() => remove(index)}
                aria-label={`Remove child ${index + 1}`}>
                <Trash2 className='size-4' aria-hidden />
              </Button>
            ) : null}
          </li>
        ))}
      </ul>

      <div className='flex flex-wrap items-center gap-3'>
        <Button
          type='button'
          variant='outline'
          size='sm'
          className='gap-1.5'
          disabled={fields.length >= MAX_CHILDREN}
          onClick={() => append(defaultChildRow())}>
          <Plus className='size-4' aria-hidden />
          Add child
        </Button>
        <p className='text-xs text-muted-foreground' aria-live='polite'>
          {fields.length} {fields.length === 1 ? 'child' : 'children'}
        </p>
      </div>
    </section>
  );
}
