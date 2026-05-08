'use client';

import { cn } from '@/lib/utils';
import { Checkbox } from '@/components/ui/checkbox';

type PasswordCharacterOptionsProps = {
  includeUppercase: boolean;
  includeLowercase: boolean;
  includeNumbers: boolean;
  includeSymbols: boolean;
  loading: boolean;
  onIncludeUppercaseChange: (value: boolean) => void;
  onIncludeLowercaseChange: (value: boolean) => void;
  onIncludeNumbersChange: (value: boolean) => void;
  onIncludeSymbolsChange: (value: boolean) => void;
};

export function PasswordCharacterOptions({
  includeUppercase,
  includeLowercase,
  includeNumbers,
  includeSymbols,
  loading,
  onIncludeUppercaseChange,
  onIncludeLowercaseChange,
  onIncludeNumbersChange,
  onIncludeSymbolsChange,
}: PasswordCharacterOptionsProps) {
  return (
    <div className={cn('grid gap-3 sm:grid-cols-2')}>
      <label className={cn('flex items-center gap-2 text-sm')}>
        <Checkbox
          checked={includeUppercase}
          disabled={loading}
          onCheckedChange={checked => onIncludeUppercaseChange(Boolean(checked))}
        />
        <span>Include A-Z</span>
      </label>
      <label className={cn('flex items-center gap-2 text-sm')}>
        <Checkbox
          checked={includeLowercase}
          disabled={loading}
          onCheckedChange={checked => onIncludeLowercaseChange(Boolean(checked))}
        />
        <span>Include a-z</span>
      </label>
      <label className={cn('flex items-center gap-2 text-sm')}>
        <Checkbox
          checked={includeNumbers}
          disabled={loading}
          onCheckedChange={checked => onIncludeNumbersChange(Boolean(checked))}
        />
        <span>Include 0-9</span>
      </label>
      <label className={cn('flex items-center gap-2 text-sm')}>
        <Checkbox
          checked={includeSymbols}
          disabled={loading}
          onCheckedChange={checked => onIncludeSymbolsChange(Boolean(checked))}
        />
        <span>Include symbols</span>
      </label>
    </div>
  );
}
