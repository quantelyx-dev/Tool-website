import { SearchBar } from '@/components/search-bar';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

export default function Home() {
  const faqs = [
    {
      q: 'What is Tools?',
      a: 'Tools is an all-in-one web application providing essential utilities for developers and digital professionals, ranging from code formatters to unit converters.',
    },
    {
      q: 'Is it free to use?',
      a: 'Yes, Tools is completely free for everyone. Our mission is to provide accessible utilities without the clutter of traditional tool sites.',
    },
    {
      q: 'How do I request a new tool?',
      a: "If you can't find what you're looking for, click 'Request a tool' in the navbar to let our developers know what we should build next.",
    },
    {
      q: 'Are my data and inputs secure?',
      a: 'Absolutely. All processing happens locally in your browser. We never store or transmit the data you input into our tools.',
    },
    {
      q: 'Can I use Tools offline?',
      a: "Yes! Tools is built as a Progressive Web App, meaning once it's loaded, many features will continue to work even without an internet connection.",
    },
    {
      q: 'How often are new tools added?',
      a: 'We aim to add at least 2-3 new tools every month based on user requests and industry trends.',
    },
  ];
  return (
    <main className='flex-1'>
      {/* Hero Section */}
      <section className='relative overflow-hidden py-24 lg:py-32'>
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
