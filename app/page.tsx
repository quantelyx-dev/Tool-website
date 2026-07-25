import dynamic from 'next/dynamic';
import { HomeToolDirectory } from '@/components/home-tool-directory';
import { SearchBar } from '@/components/search-bar';
import { faqs } from '@/lib/home-data';
import type { Metadata } from 'next';
import { siteDomain } from '@/lib/site-config';

const FaqSection = dynamic(() =>
  import('@/components/faq-section').then(mod => mod.FaqSection),
);

export const metadata: Metadata = {
  title: `${siteDomain} — Free Online Tools & Calculators`,
  description:
    'Discover free online tools for developers and everyday users. Generate fake data, calculate compound interest, explore astrology, and more — no sign-up, no ads.',
  keywords: [
    'free online tools',
    'developer utilities',
    'test data generator',
    'online calculators',
    'fake data generator',
    'toolcalcs',
  ],
  openGraph: {
    title: `${siteDomain} — Free Online Tools & Calculators`,
    description:
      'Free online tools for developers and everyday users. Generate test data, calculate finances, and more — no sign-up required.',
    url: '/',
  },
  twitter: {
    title: `${siteDomain} — Free Online Tools & Calculators`,
    description:
      'Free online tools for developers and everyday users. Generate test data, calculate finances, and more — no sign-up required.',
  },
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

      <FaqSection faqs={faqs} />
    </main>
  );
}
