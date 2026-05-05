'use client';

import { Trash2 } from 'lucide-react';

import { ParentingTimeSharePanel } from '@/components/indiana-child-support/parenting-time-share-panel';
import { Button } from '@/components/ui/button';
import type { ChildSupportFormValues } from '@/lib/schemas/indiana-child-support-schema';
import type { Control, UseFormGetValues } from 'react-hook-form';

type ParentingSide = 'parentOne' | 'parentTwo';

type ChildSupportChildRowProps = {
  index: number;
  control: Control<ChildSupportFormValues>;
  watchedEntry: ChildSupportFormValues['children'][number] | undefined;
  canRemove: boolean;
  onRemove: () => void;
  onSetSharePair: (
    index: number,
    primary: ParentingSide,
    value: number,
  ) => void;
  getValues: UseFormGetValues<ChildSupportFormValues>;
};

export function ChildSupportChildRow({
  index,
  control,
  watchedEntry,
  canRemove,
  onRemove,
  onSetSharePair,
  getValues,
}: ChildSupportChildRowProps) {
  return (
    <div className='space-y-4'>
      <div className='flex flex-wrap items-center justify-between gap-3'>
        <h3 className='text-sm font-semibold text-foreground'>
          Child {index + 1}
        </h3>
        <Button
          type='button'
          variant='ghost'
          size='sm'
          className='text-destructive hover:bg-destructive/10 hover:text-destructive'
          disabled={!canRemove}
          onClick={onRemove}>
          <Trash2 className='mr-1 size-4' />
          Remove child
        </Button>
      </div>

      <div className='grid gap-6 md:grid-cols-2'>
        <ParentingTimeSharePanel
          control={control}
          childIndex={index}
          side='parentOne'
          isManual={watchedEntry?.parentOneManual}
          onSetSharePair={onSetSharePair}
          getValues={getValues}
        />
        <ParentingTimeSharePanel
          control={control}
          childIndex={index}
          side='parentTwo'
          isManual={watchedEntry?.parentTwoManual}
          onSetSharePair={onSetSharePair}
          getValues={getValues}
        />
      </div>
    </div>
  );
}
