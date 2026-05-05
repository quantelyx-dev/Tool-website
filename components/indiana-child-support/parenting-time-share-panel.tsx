'use client';

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import {
  nearestPreset,
  sortedSharesForSelect,
} from '@/lib/indiana-child-support/form-helpers';
import type { ChildSupportFormValues } from '@/lib/schemas/indiana-child-support-schema';
import type { Control, UseFormGetValues } from 'react-hook-form';

type ParentingSide = 'parentOne' | 'parentTwo';

type ParentingTimeSharePanelProps = {
  control: Control<ChildSupportFormValues>;
  childIndex: number;
  side: ParentingSide;
  isManual: boolean | undefined;
  onSetSharePair: (
    index: number,
    primary: ParentingSide,
    value: number,
  ) => void;
  getValues: UseFormGetValues<ChildSupportFormValues>;
};

const sideLabel: Record<ParentingSide, string> = {
  parentOne: 'Parent One',
  parentTwo: 'Parent Two',
};

const manualFieldPath = (index: number, side: ParentingSide) =>
  `children.${index}.${side}Manual` as const;

const timeFieldPath = (index: number, side: ParentingSide) =>
  `children.${index}.${side}Time` as const;

export function ParentingTimeSharePanel({
  control,
  childIndex,
  side,
  isManual,
  onSetSharePair,
  getValues,
}: ParentingTimeSharePanelProps) {
  const manualName = manualFieldPath(childIndex, side);
  const timeName = timeFieldPath(childIndex, side);
  const ariaLabel = `${sideLabel[side]} manual percentage`;

  return (
    <div className='flex flex-col gap-3 rounded-xl border border-border/80 bg-card p-4 shadow-xs'>
      <p className='text-sm font-medium'>{sideLabel[side]}</p>

      <FormField
        control={control}
        name={manualName}
        render={({ field: manualField }) => (
          <FormItem className='flex flex-row items-center justify-between gap-4 rounded-md border border-transparent px-1 py-2'>
            <div className='space-y-0.5'>
              <FormLabel className='text-sm font-normal'>Manual %</FormLabel>
              <p className='text-xs text-muted-foreground'>
                {manualField.value
                  ? 'Enter a custom percentage.'
                  : 'Choose a preset.'}
              </p>
            </div>
            <FormControl>
              <Switch
                checked={manualField.value}
                onCheckedChange={checked => {
                  if (!checked) {
                    const t = getValues(timeFieldPath(childIndex, side));
                    onSetSharePair(
                      childIndex,
                      side,
                      nearestPreset(t),
                    );
                  }
                  manualField.onChange(checked);
                }}
                aria-label={ariaLabel}
              />
            </FormControl>
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name={timeName}
        render={({ field }) => {
          const shareOptions = sortedSharesForSelect(field.value);
          const selectedShare =
            shareOptions.find(
              p => Math.abs(p - field.value) < 0.000_01,
            ) ?? shareOptions[0]!;
          return (
            <FormItem>
              <FormLabel>Parenting time (%)</FormLabel>
              {!isManual ? (
                <Select
                  value={String(selectedShare)}
                  onValueChange={v =>
                    onSetSharePair(childIndex, side, Number(v))
                  }>
                  <FormControl>
                    <SelectTrigger className='w-full min-w-0'>
                      <SelectValue placeholder='Select %' />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {shareOptions.map(p => (
                      <SelectItem key={p} value={String(p)}>
                        {p}%
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              ) : (
                <FormControl>
                  <Input
                    type='number'
                    inputMode='decimal'
                    min={0}
                    max={100}
                    step='0.01'
                    value={Number.isFinite(field.value) ? field.value : ''}
                    onChange={e => {
                      const raw = e.target.valueAsNumber;
                      if (Number.isNaN(raw)) {
                        field.onChange(Number.NaN);
                        return;
                      }
                      onSetSharePair(childIndex, side, raw);
                    }}
                    onBlur={field.onBlur}
                    name={field.name}
                    ref={field.ref}
                  />
                </FormControl>
              )}
              <FormMessage />
            </FormItem>
          );
        }}
      />
    </div>
  );
}
