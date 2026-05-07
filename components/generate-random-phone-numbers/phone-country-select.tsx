'use client';

import { countries } from 'countries-list';
import type { CountryCode } from 'libphonenumber-js';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { cn } from '@/lib/utils';

type PhoneCountrySelectProps = {
  value: CountryCode;
  onValueChange: (value: CountryCode) => void;
  disabled?: boolean;
  className?: string;
};

type CountryOption = {
  iso2: CountryCode;
  name: string;
  callingCode: string;
};

const COUNTRY_SELECT_ID = 'random-phone-country';

const COUNTRY_OPTIONS: CountryOption[] = Object.entries(countries)
  .map(([iso2, country]) => ({
    iso2: iso2 as CountryCode,
    name: country.name,
    callingCode: country.phone[0] ? `+${country.phone[0]}` : 'N/A',
  }))
  .sort((a, b) => a.name.localeCompare(b.name));

export const PHONE_COUNTRY_DEFAULT: CountryCode = 'US';

export function PhoneCountrySelect({
  value,
  onValueChange,
  disabled,
  className,
}: PhoneCountrySelectProps) {
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
          className={cn('h-11 w-full sm:h-10')}>
          <SelectValue placeholder='Select country' />
        </SelectTrigger>
        <SelectContent>
          {COUNTRY_OPTIONS.map(option => (
            <SelectItem key={option.iso2} value={option.iso2}>
              {option.name} ({option.iso2}) {option.callingCode}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
