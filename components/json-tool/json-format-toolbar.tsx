'use client';

import { RefreshCw, Sparkles } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import type { JsonIndent } from '@/lib/json-tool/format';
import { cn } from '@/lib/utils';

const INDENT_OPTIONS: { value: JsonIndent; label: string }[] = [
  { value: '2', label: '2 spaces' },
  { value: '4', label: '4 spaces' },
  { value: 'tab', label: 'Tab' },
  { value: 'minify', label: 'Minify' },
];

type JsonFormatToolbarProps = {
  indent: JsonIndent;
  onIndentChange: (indent: JsonIndent) => void;
  sortKeys: boolean;
  onSortKeysChange: (sortKeys: boolean) => void;
  onLoadSample: () => void;
  onReset: () => void;
};

export function JsonFormatToolbar({
  indent,
  onIndentChange,
  sortKeys,
  onSortKeysChange,
  onLoadSample,
  onReset,
}: JsonFormatToolbarProps) {
  return (
    <div
      className={cn(
        'flex flex-wrap items-center gap-x-6 gap-y-3 rounded-xl border border-border bg-card p-4',
      )}>
      <div className={cn('flex items-center gap-2.5')}>
        <Label htmlFor='json-indent-select' className={cn('text-sm')}>
          Indent
        </Label>
        <Select value={indent} onValueChange={value => onIndentChange(value as JsonIndent)}>
          <SelectTrigger id='json-indent-select' className={cn('w-36')}>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {INDENT_OPTIONS.map(option => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className={cn('flex items-center gap-2.5')}>
        <Switch id='sort-keys-toggle' checked={sortKeys} onCheckedChange={onSortKeysChange} />
        <Label htmlFor='sort-keys-toggle' className={cn('text-sm')}>
          Sort keys A→Z
        </Label>
      </div>
      <Button
        type='button'
        variant='ghost'
        size='sm'
        onClick={onLoadSample}
        className={cn('gap-1.5')}>
        <Sparkles className={cn('size-3.5')} aria-hidden />
        Load sample
      </Button>
      <Button
        type='button'
        variant='outline'
        size='sm'
        onClick={onReset}
        className={cn('ml-auto gap-1.5')}>
        <RefreshCw className={cn('size-3.5')} aria-hidden />
        Reset
      </Button>
    </div>
  );
}
