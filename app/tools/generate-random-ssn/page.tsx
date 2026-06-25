import type { Metadata } from 'next';

import { GenerateRandomSsnToolContent } from '@/components/generate-random-ssn/generate-random-ssn-tool-content';
import { ToolBlogPromo } from '@/components/blog/tool-blog-promo';
import { PageBreadcrumb } from '@/components/shared/page-breadcrumb';
import { ToolFaqSection } from '@/components/shared/tool-faq-section';
import { ssnFaqs } from '@/lib/tool-faqs';
import { cn } from '@/lib/utils';
import { siteDomain } from '@/lib/site-config';

export const metadata: Metadata = {
  title: 'Fake SSN Generator — Random SSN for Testing',
  description:
    'Generate structurally valid fake U.S. Social Security Numbers for testing. All SSNs are fictional, follow IRS formatting rules, and safe for demos.',
  keywords: [
    'fake SSN generator',
    'random SSN generator',
    'fake social security number',
    'SSN for testing',
    'dummy SSN generator',
    'test social security number',
  ],
  openGraph: {
    title: `Fake SSN Generator — Random SSN for Testing | ${siteDomain}`,
    description:
      'Generate structurally valid fake U.S. Social Security Numbers for development and testing. Fictional, safe for non-production use.',
    url: '/tools/generate-random-ssn',
  },
  twitter: {
    title: `Fake SSN Generator — Random SSN for Testing | ${siteDomain}`,
    description:
      'Generate structurally valid fake U.S. Social Security Numbers for development and testing.',
  },
};


export default function GenerateRandomSsnPage() {
  return (
    <main className={cn('flex-1')}>
      <div className={cn('container mx-auto max-w-6xl px-4 pb-20 sm:px-6')}>
        <PageBreadcrumb items={[{ label: 'Fake SSN generator' }]} />
        <GenerateRandomSsnToolContent />
        <ToolBlogPromo toolLink='/tools/generate-random-ssn' />
        <ToolFaqSection faqs={ssnFaqs} />
      </div>
    </main>
  );
}
