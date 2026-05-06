'use client';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { cn } from '@/lib/utils';

export const USERNAME_LIMIT_OPTIONS = [10, 50, 100, 500, 1000] as const;

export const USERNAME_DEFAULT_LIMIT = '10';

const LIMIT_SELECT_ID = 'random-username-count';

type UsernameLimitSelectProps = {
  value: string;
  onValueChange: (value: string) => void;
  disabled?: boolean;
  className?: string;
};

export function UsernameLimitSelect({
  value,
  onValueChange,
  disabled,
  className,
}: UsernameLimitSelectProps) {
  return (
    <div
      className={cn(
        'flex min-w-0 flex-1 flex-col gap-2 sm:max-w-xs',
        className,
      )}>
      <label
        htmlFor={LIMIT_SELECT_ID}
        className='text-sm font-medium text-foreground'>
        Number of usernames
      </label>
      <Select value={value} onValueChange={onValueChange} disabled={disabled}>
        <SelectTrigger id={LIMIT_SELECT_ID} className='h-11 w-full sm:h-10'>
          <SelectValue placeholder='Select count' />
        </SelectTrigger>
        <SelectContent>
          {USERNAME_LIMIT_OPTIONS.map(n => (
            <SelectItem key={n} value={String(n)}>
              {n} usernames
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
