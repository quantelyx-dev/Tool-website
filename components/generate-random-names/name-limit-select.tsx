'use client';

import {
  USERNAME_DEFAULT_LIMIT,
  USERNAME_LIMIT_OPTIONS,
} from '@/components/generate-random-usernames/username-limit-select';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { cn } from '@/lib/utils';

export const NAME_DEFAULT_LIMIT = USERNAME_DEFAULT_LIMIT;

const LIMIT_SELECT_ID = 'random-name-count';

type NameLimitSelectProps = {
  value: string;
  onValueChange: (value: string) => void;
  disabled?: boolean;
  className?: string;
};

export function NameLimitSelect({
  value,
  onValueChange,
  disabled,
  className,
}: NameLimitSelectProps) {
  return (
    <div
      className={cn(
        'flex min-w-0 flex-1 flex-col gap-2 sm:max-w-xs',
        className,
      )}>
      <label
        htmlFor={LIMIT_SELECT_ID}
        className='text-sm font-medium text-foreground'>
        Number of names
      </label>
      <Select value={value} onValueChange={onValueChange} disabled={disabled}>
        <SelectTrigger id={LIMIT_SELECT_ID} className='h-11 w-full sm:h-10'>
          <SelectValue placeholder='Select count' />
        </SelectTrigger>
        <SelectContent>
          {USERNAME_LIMIT_OPTIONS.map(n => (
            <SelectItem key={n} value={String(n)}>
              {n} names
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
