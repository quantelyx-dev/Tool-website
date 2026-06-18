import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { cn } from '@/lib/utils';

export type ToolFaq = { q: string; a: string };

type ToolFaqSectionProps = {
  faqs: ToolFaq[];
  className?: string;
};

export function ToolFaqSection({ faqs, className }: ToolFaqSectionProps) {
  return (
    <section className={cn('py-16 mt-4 border-t border-border/60', className)}>
      <div className='mx-auto max-w-3xl'>
        <h2 className='text-2xl font-bold text-center mb-8'>
          Frequently Asked Questions
        </h2>
        <Accordion type='single' collapsible className='w-full space-y-4'>
          {faqs.map((faq, i) => (
            <AccordionItem
              key={i}
              value={`item-${i}`}
              className='border rounded-xl bg-white px-6 dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800'>
              <AccordionTrigger className='hover:no-underline font-semibold text-left text-sm sm:text-base'>
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
