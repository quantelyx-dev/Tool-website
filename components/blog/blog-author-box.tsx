import Link from 'next/link';
import { UserRound } from 'lucide-react';

import { AUTHOR } from '@/lib/site-config';
import { cn } from '@/lib/utils';

export function BlogAuthorBox({ className }: { className?: string }) {
  return (
    <aside
      aria-label='About the author'
      className={cn(
        'mt-10 flex max-w-3xl items-start gap-4 rounded-xl border border-border bg-card p-5',
        className,
      )}>
      <span className='flex size-11 shrink-0 items-center justify-center rounded-full bg-muted'>
        <UserRound className='size-5 text-muted-foreground' aria-hidden />
      </span>
      <div>
        <p className='font-semibold'>{AUTHOR.name}</p>
        <p className='mt-1 text-sm leading-relaxed text-muted-foreground'>{AUTHOR.bio}</p>
        <Link
          href={AUTHOR.path}
          prefetch={false}
          className='mt-2 inline-block text-sm underline underline-offset-2'>
          About this site and its author
        </Link>
      </div>
    </aside>
  );
}
