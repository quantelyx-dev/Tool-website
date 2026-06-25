import type { Metadata } from 'next';

import { GenerateRandomAddressesToolContent } from '@/components/generate-random-addresses/generate-random-addresses-tool-content';
import { ToolBlogPromo } from '@/components/blog/tool-blog-promo';
import { PageBreadcrumb } from '@/components/shared/page-breadcrumb';
import { ToolFaqSection } from '@/components/shared/tool-faq-section';
import { addressFaqs } from '@/lib/tool-faqs';
import { cn } from '@/lib/utils';
import { siteDomain } from '@/lib/site-config';

export const metadata: Metadata = {
  title: 'Fake Address Generator — Mailing Addresses',
  description:
    'Generate realistic fictional mailing addresses in single or bulk mode. Export as CSV to seed test databases, validate shipping forms, and build demo checkouts.',
  keywords: [
    'fake address generator',
    'random address generator',
    'fictional address generator',
    'fake mailing address',
    'dummy address generator',
    'test addresses for development',
  ],
  openGraph: {
    title: `Fake Address Generator — Mailing Addresses | ${siteDomain}`,
    description:
      'Generate realistic fictional mailing addresses in single or bulk mode. Export as CSV to seed databases and validate shipping forms.',
    url: '/tools/generate-random-addresses',
  },
  twitter: {
    title: `Fake Address Generator — Mailing Addresses | ${siteDomain}`,
    description:
      'Generate realistic fictional mailing addresses in bulk. Export as CSV for test databases and shipping forms.',
  },
};


export default function GenerateRandomAddressesPage() {
  return (
    <main className={cn('flex-1')}>
      <div className={cn('container mx-auto max-w-6xl px-4 pb-20 sm:px-6')}>
        <PageBreadcrumb items={[{ label: 'Fake address generator' }]} />
        <GenerateRandomAddressesToolContent />
        <ToolBlogPromo toolLink='/tools/generate-random-addresses' />
        <ToolFaqSection faqs={addressFaqs} />
      </div>
    </main>
  );
}
