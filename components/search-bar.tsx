import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

export function SearchBar() {
  return (
    <div className='mx-auto max-w-xl relative group'>
      <div className='absolute inset-y-0 left-4 flex items-center pointer-events-none'>
        <Search className='size-5 text-zinc-400 group-focus-within:text-indigo-600 transition-colors' />
      </div>
      <Input
        type='text'
        placeholder='Search for tools (e.g. JSON Formatter, Base64...)'
        className='h-14 pl-12 pr-4 rounded-2xl border-zinc-200 bg-white shadow-xl focus-visible:ring-indigo-500 dark:border-zinc-800 dark:bg-zinc-900 text-lg'
      />
    </div>
  );
}
