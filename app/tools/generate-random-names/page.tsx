import type { Metadata } from 'next';

import { ToolBlogPromo } from '@/components/blog/tool-blog-promo';
import { PageBreadcrumb } from '@/components/shared/page-breadcrumb';
import { ToolFaqSection } from '@/components/shared/tool-faq-section';
import { GenerateRandomNamesToolContent } from '@/components/generate-random-names/generate-random-names-tool-content';
import { nameFaqs } from '@/lib/tool-faqs';
import { cn } from '@/lib/utils';
import { siteDomain } from '@/lib/site-config';

export const metadata: Metadata = {
  title: 'Random Name Generator — First & Last Names',
  description:
    'Generate realistic first names, last names, or full names in bulk. Ideal for seeding user databases, creating fictional personas, and building demo datasets.',
  keywords: [
    'random name generator',
    'fake name generator',
    'random full name generator',
    'bulk name generator',
    'fictional name generator',
    'first and last name generator',
  ],
  openGraph: {
    title: `Random Name Generator — First & Last Names | ${siteDomain}`,
    description:
      'Generate realistic first names, last names, or full names in bulk. Perfect for seeding user databases and creating fictional personas.',
    url: '/tools/generate-random-names',
  },
  twitter: {
    title: `Random Name Generator — First & Last Names | ${siteDomain}`,
    description:
      'Generate realistic first names, last names, or full names in bulk. Free and instant.',
  },
};


export default function GenerateRandomNamesPage() {
  return (
    <main className={cn('flex-1')}>
      <div className={cn('container mx-auto max-w-6xl px-4 pb-20 sm:px-6')}>
        <PageBreadcrumb items={[{ label: 'Random name generator' }]} />
        <GenerateRandomNamesToolContent />
        <ToolBlogPromo toolLink='/tools/generate-random-names' />
        <ToolFaqSection faqs={nameFaqs} />
      </div>
    </main>
  );
}
