'use client';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import type { RandomNameType } from '@/lib/generate-random-names/api-response';
import { cn } from '@/lib/utils';

export const NAME_TYPE_DEFAULT: RandomNameType = 'fullName';

const TYPE_OPTIONS: { value: RandomNameType; label: string }[] = [
  { value: 'firstName', label: 'First name only' },
  { value: 'lastName', label: 'Last name only' },
  { value: 'fullName', label: 'Full name' },
];

const TYPE_SELECT_ID = 'random-name-type';

type NameTypeSelectProps = {
  value: RandomNameType;
  onValueChange: (value: RandomNameType) => void;
  disabled?: boolean;
  className?: string;
};

export function NameTypeSelect({
  value,
  onValueChange,
  disabled,
  className,
}: NameTypeSelectProps) {
  return (
    <div
      className={cn(
        'flex min-w-0 flex-1 flex-col gap-2 sm:max-w-xs',
        className,
      )}>
      <label
        htmlFor={TYPE_SELECT_ID}
        className='text-sm font-medium text-foreground'>
        Name format
      </label>
      <Select
        value={value}
        onValueChange={v => onValueChange(v as RandomNameType)}
        disabled={disabled}>
        <SelectTrigger id={TYPE_SELECT_ID} className='h-11 w-full sm:h-10'>
          <SelectValue placeholder='Select format' />
        </SelectTrigger>
        <SelectContent>
          {TYPE_OPTIONS.map(opt => (
            <SelectItem key={opt.value} value={opt.value}>
              {opt.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
