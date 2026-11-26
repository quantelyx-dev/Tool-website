import { ChevronDownIcon } from 'lucide-react';

import { JsonLd } from '@/lib/seo/json-ld';
import { cn } from '@/lib/utils';

export type ToolFaq = { q: string; a: string };

type FaqListProps = {
  faqs: ToolFaq[];
  questionClassName?: string;
  className?: string;
};

/**
 * FAQ accordion built on native <details>, so every answer is in the server-rendered
 * HTML while collapsed and no client JavaScript is needed. The matching FAQPage
 * JSON-LD comes from the same array, so the two cannot drift apart.
 */
export function FaqList({ faqs, questionClassName, className }: FaqListProps) {
  if (faqs.length === 0) return null;

  return (
    <div className={cn('flex w-full flex-col gap-4', className)}>
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: faqs.map(faq => ({
            '@type': 'Question',
            name: faq.q,
            acceptedAnswer: { '@type': 'Answer', text: faq.a },
          })),
        }}
      />
      {faqs.map(faq => (
        <details
          key={faq.q}
          name='faq'
          className='group rounded-xl border border-zinc-200 bg-white px-6 dark:border-zinc-800 dark:bg-zinc-900'>
          <summary
            className={cn(
              'flex cursor-pointer list-none items-start justify-between gap-4 rounded-md py-4 text-left',
              'outline-none focus-visible:ring-3 focus-visible:ring-ring/50 [&::-webkit-details-marker]:hidden',
              questionClassName,
            )}>
            <h3 className='min-w-0'>{faq.q}</h3>
            <ChevronDownIcon
              className='mt-0.5 size-4 shrink-0 text-muted-foreground transition-transform group-open:rotate-180 motion-reduce:transition-none'
              aria-hidden
            />
          </summary>
          <p className='pb-4 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400'>
            {faq.a}
          </p>
        </details>
      ))}
    </div>
  );
}
