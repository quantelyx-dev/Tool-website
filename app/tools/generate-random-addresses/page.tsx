import type { Metadata } from 'next';

import { GenerateRandomAddressesToolContent } from '@/components/generate-random-addresses/generate-random-addresses-tool-content';
import { PageBreadcrumb } from '@/components/shared/page-breadcrumb';
import { ToolPageDetails } from '@/components/shared/tool-page-details';
import { addressFaqs } from '@/lib/tool-faqs';
import { createPageMetadata } from '@/lib/seo/metadata';
import { cn } from '@/lib/utils';

export const metadata: Metadata = createPageMetadata({
  title: 'Random Test Address Generator',
  description:
    'Generate made-up test addresses singly or in batches of up to 200, then copy JSON or export CSV for forms, imports, and demos.',
  path: '/tools/generate-random-addresses',
  keywords: [
    'random address generator',
    'test address generator',
    'mailing address test data',
    'dummy address generator',
    'test addresses for development',
  ],
});


export default function GenerateRandomAddressesPage() {
  return (
    <main className={cn('flex-1')}>
      <div className={cn('container mx-auto max-w-6xl px-4 pb-20 sm:px-6')}>
        <PageBreadcrumb items={[{ label: 'Random test address generator' }]} />
        <GenerateRandomAddressesToolContent />
        <ToolPageDetails toolLink='/tools/generate-random-addresses' faqs={addressFaqs} />
      </div>
    </main>
  );
}
