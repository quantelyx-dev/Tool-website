import type { Metadata } from 'next';

import { PageBreadcrumb } from '@/components/shared/page-breadcrumb';
import { ToolPageDetails } from '@/components/shared/tool-page-details';
import { GenerateRandomNamesToolContent } from '@/components/generate-random-names/generate-random-names-tool-content';
import { nameFaqs } from '@/lib/tool-faqs';
import { createPageMetadata } from '@/lib/seo/metadata';
import { cn } from '@/lib/utils';

export const metadata: Metadata = createPageMetadata({
  title: 'Random Name Generator: First & Last',
  description:
    'Generate up to 1,000 random first names, last names, or full names for test records, prototypes, and drafts.',
  path: '/tools/generate-random-names',
  keywords: [
    'random name generator',
    'test name generator',
    'random full name generator',
    'bulk name generator',
    'first and last name generator',
  ],
});


export default function GenerateRandomNamesPage() {
  return (
    <main className={cn('flex-1')}>
      <div className={cn('container mx-auto max-w-6xl px-4 pb-20 sm:px-6')}>
        <PageBreadcrumb items={[{ label: 'Random name generator' }]} />
        <GenerateRandomNamesToolContent />
        <ToolPageDetails toolLink='/tools/generate-random-names' faqs={nameFaqs} />
      </div>
    </main>
  );
}
