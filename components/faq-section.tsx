'use client';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

type Faq = {
  q: string;
  a: string;
};

export function FaqSection({ faqs }: { faqs: Faq[] }) {
  return (
    <section className='py-24 bg-zinc-50 dark:bg-zinc-900/50'>
      <div className='container mx-auto px-4 sm:px-6 max-w-3xl'>
        <h2 className='text-3xl font-bold text-center mb-12'>
          Frequently Asked Questions
        </h2>
        <Accordion type='single' collapsible className='w-full space-y-4'>
          {faqs.map((faq, i) => (
            <AccordionItem
              key={i}
              value={`item-${i}`}
              className='border rounded-xl bg-white px-6 dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800'>
              <AccordionTrigger className='hover:no-underline font-bold text-left'>
                {faq.q}
              </AccordionTrigger>
              <AccordionContent className='text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed pb-4'>
                {faq.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
