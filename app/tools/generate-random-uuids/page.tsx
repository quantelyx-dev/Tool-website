import type { Metadata } from 'next';

import { GenerateRandomUuidsToolContent } from '@/components/generate-random-uuids/generate-random-uuids-tool-content';
import { PageBreadcrumb } from '@/components/shared/page-breadcrumb';
import { ToolFaqSection } from '@/components/shared/tool-faq-section';
import { uuidFaqs } from '@/lib/tool-faqs';
import { cn } from '@/lib/utils';
import { siteDomain } from '@/lib/site-config';

export const metadata: Metadata = {
  title: 'UUIDv7 Generator — Sortable UUIDs Online',
  description:
    'Generate time-ordered UUIDv7 identifiers in bulk. Chronologically sortable and globally unique — a better choice than UUIDv4 for database primary keys.',
  keywords: [
    'UUIDv7 generator',
    'UUID generator online',
    'generate UUIDv7',
    'sortable UUID generator',
    'random UUID generator',
    'bulk UUID generator',
  ],
  openGraph: {
    title: `UUIDv7 Generator — Sortable UUIDs Online | ${siteDomain}`,
    description:
      'Generate time-ordered UUIDv7 identifiers in bulk. Chronologically sortable, globally unique, and better than UUIDv4 for database keys.',
    url: '/tools/generate-random-uuids',
  },
  twitter: {
    title: `UUIDv7 Generator — Sortable UUIDs Online | ${siteDomain}`,
    description:
      'Generate time-ordered UUIDv7 identifiers. Sortable, unique, and better than UUIDv4 for database primary keys.',
  },
};


export default function GenerateRandomUuidsPage() {
  return (
    <main className={cn('flex-1')}>
      <div className={cn('container mx-auto max-w-6xl px-4 pb-20 sm:px-6')}>
        <PageBreadcrumb items={[{ label: 'UUIDv7 generator' }]} />
        <GenerateRandomUuidsToolContent />
        <ToolFaqSection faqs={uuidFaqs} />
      </div>
    </main>
  );
}
