import { HomeToolDirectory } from '@/components/home-tool-directory';
import { SearchBar } from '@/components/search-bar';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { faqs } from '@/lib/home-data';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Tools - Your All-in-One Utility Suite',
  description:
    'Streamline your workflow with our curated collection of development, design, and productivity utilities. Fast, secure, and always at your fingertips.',
};

export default function Home() {
  return (
    <main className='flex-1'>
      {/* Hero Section */}
      <section className='relative overflow-hidden pt-24 pb-12'>
        <div className='container mx-auto px-4 sm:px-6 text-center'>
          <h1 className='text-4xl font-extrabold tracking-tight sm:text-6xl mb-6'>
            All the tools you need, <br />
            <span className='text-indigo-600'>in one place.</span>
          </h1>
          <p className='mx-auto max-w-2xl text-lg text-zinc-600 dark:text-zinc-400 mb-10'>
            Streamline your workflow with our curated collection of development,
            design, and productivity utilities. Fast, secure, and always at your
            fingertips.
          </p>

          {/* Search Bar */}
          <SearchBar />
        </div>
      </section>

      <HomeToolDirectory />

      {/* FAQs Section */}
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
    </main>
  );
}
