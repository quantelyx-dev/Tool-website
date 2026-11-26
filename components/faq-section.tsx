import { FaqList, type ToolFaq } from '@/components/shared/faq-list';

export function FaqSection({ faqs }: { faqs: ToolFaq[] }) {
  return (
    <section className='py-24 bg-zinc-50 dark:bg-zinc-900/50'>
      <div className='container mx-auto px-4 sm:px-6 max-w-3xl'>
        <h2 className='text-3xl font-bold text-center mb-12'>
          Frequently Asked Questions
        </h2>
        <FaqList faqs={faqs} questionClassName='font-bold text-sm' />
      </div>
    </section>
  );
}
