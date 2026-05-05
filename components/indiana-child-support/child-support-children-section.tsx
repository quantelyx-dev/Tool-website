'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { Plus } from 'lucide-react';

import { ChildSupportChildRow } from '@/components/indiana-child-support/child-support-child-row';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { defaultChildRow } from '@/lib/indiana-child-support/form-defaults';
import type { ChildSupportFormValues } from '@/lib/schemas/indiana-child-support-schema';
import type {
  Control,
  FieldArrayWithId,
  UseFieldArrayAppend,
  UseFieldArrayRemove,
  UseFormGetValues,
} from 'react-hook-form';

type ParentingSide = 'parentOne' | 'parentTwo';

type ChildSupportChildrenSectionProps = {
  control: Control<ChildSupportFormValues>;
  fields: FieldArrayWithId<ChildSupportFormValues, 'children', 'id'>[];
  watchedChildren: ChildSupportFormValues['children'] | undefined;
  append: UseFieldArrayAppend<ChildSupportFormValues, 'children'>;
  remove: UseFieldArrayRemove;
  onSetSharePair: (
    index: number,
    primary: ParentingSide,
    value: number,
  ) => void;
  getValues: UseFormGetValues<ChildSupportFormValues>;
};

export function ChildSupportChildrenSection({
  control,
  fields,
  watchedChildren,
  append,
  remove,
  onSetSharePair,
  getValues,
}: ChildSupportChildrenSectionProps) {
  const canRemoveChild = fields.length > 1;

  return (
    <section className='space-y-6'>
      <Card className='border-primary/20 bg-primary/5 shadow-xs dark:border-primary/30 dark:bg-primary/10'>
        <CardHeader className='pb-2'>
          <CardTitle className='text-base font-semibold'>Children</CardTitle>
          <CardDescription className='text-sm leading-relaxed text-muted-foreground'>
            List every child included in this support calculation. For each
            child, capture how parenting time is split between parents using
            either preset percentages or your own numbers. Shares should
            reflect overnights (or the schedule your guidelines use). Parent
            Two&apos;s share stays paired with Parent One so the two always add
            up to 100%.
          </CardDescription>
        </CardHeader>
      </Card>

      <div className='flex flex-wrap items-center gap-3'>
        <Button
          type='button'
          variant='outline'
          size='sm'
          className='gap-1.5'
          onClick={() => append(defaultChildRow())}>
          <Plus className='size-4' />
          Add child
        </Button>
        <p className='text-xs text-muted-foreground'>
          {fields.length} {fields.length === 1 ? 'child' : 'children'}
        </p>
      </div>

      <div className='flex flex-col gap-8'>
        <AnimatePresence initial={false} mode='popLayout'>
          {fields.map((field, index) => (
            <motion.div
              key={field.id}
              layout
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.18 }}
              className='space-y-4'>
              <ChildSupportChildRow
                index={index}
                control={control}
                watchedEntry={watchedChildren?.[index]}
                canRemove={canRemoveChild}
                onRemove={() => remove(index)}
                onSetSharePair={onSetSharePair}
                getValues={getValues}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </section>
  );
}
