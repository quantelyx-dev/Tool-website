import type { Metadata } from 'next';

import { PageBreadcrumb } from '@/components/shared/page-breadcrumb';
import { ToolPageDetails } from '@/components/shared/tool-page-details';
import { GenerateRandomUsernamesToolContent } from '@/components/generate-random-usernames/generate-random-usernames-tool-content';
import { usernameFaqs } from '@/lib/tool-faqs';
import { createPageMetadata } from '@/lib/seo/metadata';
import { cn } from '@/lib/utils';

export const metadata: Metadata = createPageMetadata({
  title: 'Random Test Username Generator',
  description:
    'Generate up to 1,000 readable test usernames for database seeds, staging environments, and interface mockups. Copy the whole batch at once.',
  path: '/tools/generate-random-usernames',
  keywords: [
    'random username generator',
    'test username generator',
    'bulk username creator',
    'test usernames',
    'dummy usernames',
  ],
});


export default function GenerateRandomUsernamesPage() {
  return (
    <main className={cn('flex-1')}>
      <div className={cn('container mx-auto max-w-6xl px-4 pb-20 sm:px-6')}>
        <PageBreadcrumb items={[{ label: 'Random username generator' }]} />
        <GenerateRandomUsernamesToolContent />
        <ToolPageDetails toolLink='/tools/generate-random-usernames' faqs={usernameFaqs} />
      </div>
    </main>
  );
}
