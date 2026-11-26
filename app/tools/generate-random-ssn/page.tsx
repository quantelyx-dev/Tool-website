import type { Metadata } from 'next';

import { GenerateRandomSsnToolContent } from '@/components/generate-random-ssn/generate-random-ssn-tool-content';
import { PageBreadcrumb } from '@/components/shared/page-breadcrumb';
import { ToolPageDetails } from '@/components/shared/tool-page-details';
import { ssnFaqs } from '@/lib/tool-faqs';
import { createPageMetadata } from '@/lib/seo/metadata';
import { ToolDisclaimer } from '@/components/shared/tool-disclaimer';
import { cn } from '@/lib/utils';

export const metadata: Metadata = createPageMetadata({
  title: 'Random Test SSN Generator',
  description:
    'Generate structurally formatted test Social Security numbers for software testing only.',
  path: '/tools/generate-random-ssn',
  keywords: [
    'test SSN generator',
    'random SSN generator',
    'test social security number',
    'SSN for testing',
    'dummy SSN generator',
  ],
  // Hidden from the site and search engines (see lib/tools-data.ts).
  noindex: true,
});


export default function GenerateRandomSsnPage() {
  return (
    <main className={cn('flex-1')}>
      <div className={cn('container mx-auto max-w-6xl px-4 pb-20 sm:px-6')}>
        <PageBreadcrumb items={[{ label: 'Random test SSN generator' }]} />
        <GenerateRandomSsnToolContent />
        <ToolDisclaimer toolLink='/tools/generate-random-ssn' variant='test-data' />
        <ToolPageDetails toolLink='/tools/generate-random-ssn' faqs={ssnFaqs} />
      </div>
    </main>
  );
}
