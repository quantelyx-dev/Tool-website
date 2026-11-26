'use client';

import type { CountryCode } from 'libphonenumber-js';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { RESERVED_PHONE_COUNTRIES } from '@/lib/generate-random-phone-numbers/reserved-ranges';
import { cn } from '@/lib/utils';

type PhoneCountrySelectProps = {
  value: CountryCode;
  onValueChange: (value: CountryCode) => void;
  disabled?: boolean;
  className?: string;
};

const COUNTRY_SELECT_ID = 'random-phone-country';
const RANGE_HINT_ID = 'random-phone-range';

export const PHONE_COUNTRY_DEFAULT: CountryCode = 'US';

export function PhoneCountrySelect({
  value,
  onValueChange,
  disabled,
  className,
}: PhoneCountrySelectProps) {
  const selected = RESERVED_PHONE_COUNTRIES.find(c => c.iso2 === value);

  return (
    <div
      className={cn(
        'flex min-w-0 flex-1 flex-col gap-2 sm:max-w-md',
        className,
      )}>
      <label
        htmlFor={COUNTRY_SELECT_ID}
        className={cn('text-sm font-medium text-foreground')}>
        Country
      </label>
      <Select value={value} onValueChange={onValueChange} disabled={disabled}>
        <SelectTrigger
          id={COUNTRY_SELECT_ID}
          aria-describedby={RANGE_HINT_ID}
          className={cn('h-11 w-full sm:h-10')}>
          <SelectValue placeholder='Select country' />
        </SelectTrigger>
        <SelectContent>
          {RESERVED_PHONE_COUNTRIES.map(option => (
            <SelectItem key={option.iso2} value={option.iso2}>
              {option.name} ({option.iso2}) +{option.callingCode}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <p id={RANGE_HINT_ID} className={cn('text-xs text-muted-foreground')}>
        {selected?.rangeLabel}
      </p>
    </div>
  );
}
