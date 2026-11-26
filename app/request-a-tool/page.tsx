import type { Metadata } from 'next';
import { RequestToolContent } from '@/components/request-tool/request-tool-content';
import { PageBreadcrumb } from '@/components/shared/page-breadcrumb';
import { createPageMetadata } from '@/lib/seo/metadata';
import { cn } from '@/lib/utils';

export const metadata: Metadata = createPageMetadata({
  title: 'Request a Tool',
  description:
    'Need a tool that toolcalcs.net does not have? Describe it and how you would use it. We read every request when deciding what to build.',
  path: '/request-a-tool',
  keywords: ['request a tool', 'suggest a feature', 'new tool request'],
});

export default function RequestAToolPage() {
  return (
    <main className={cn('flex-1')}>
      <div className={cn('container mx-auto max-w-5xl', 'px-4 pb-20 sm:px-6')}>
        <PageBreadcrumb items={[{ label: 'Request a tool' }]} />
        <RequestToolContent />
      </div>
    </main>
  );
}
