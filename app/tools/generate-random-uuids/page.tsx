import type { Metadata } from 'next';

import { GenerateRandomUuidsToolContent } from '@/components/generate-random-uuids/generate-random-uuids-tool-content';
import { PageBreadcrumb } from '@/components/shared/page-breadcrumb';
import { ToolPageDetails } from '@/components/shared/tool-page-details';
import { uuidFaqs } from '@/lib/tool-faqs';
import { createPageMetadata } from '@/lib/seo/metadata';
import { cn } from '@/lib/utils';

export const metadata: Metadata = createPageMetadata({
  title: 'UUIDv7 Generator: Sortable UUIDs',
  description:
    'Generate time-ordered UUIDv7 identifiers one at a time or in batches of up to 200, with copy and CSV export.',
  path: '/tools/generate-random-uuids',
  keywords: [
    'UUIDv7 generator',
    'UUID generator online',
    'generate UUIDv7',
    'sortable UUID generator',
    'bulk UUID generator',
  ],
});


export default function GenerateRandomUuidsPage() {
  return (
    <main className={cn('flex-1')}>
      <div className={cn('container mx-auto max-w-6xl px-4 pb-20 sm:px-6')}>
        <PageBreadcrumb items={[{ label: 'UUIDv7 generator' }]} />
        <GenerateRandomUuidsToolContent />
        <ToolPageDetails toolLink='/tools/generate-random-uuids' faqs={uuidFaqs} />
      </div>
    </main>
  );
}
