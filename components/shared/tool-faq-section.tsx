import { FaqList, type ToolFaq } from '@/components/shared/faq-list';
import { cn } from '@/lib/utils';

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
        <FaqList faqs={faqs} questionClassName='font-semibold text-sm sm:text-base' />
      </div>
    </section>
  );
}
