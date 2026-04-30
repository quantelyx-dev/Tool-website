import type { Metadata } from 'next';
import { RequestToolBreadcrumb } from '@/components/request-tool/request-tool-breadcrumb';
import { RequestToolContent } from '@/components/request-tool/request-tool-content';
import { cn } from '@/lib/utils';

export const metadata: Metadata = {
  title: 'Request a tool — Tools',
  description:
    'Suggest a new utility for the Tools suite. Tell us what you need and we will consider it for our roadmap.',
};

export default function RequestAToolPage() {
  return (
    <main className={cn('flex-1')}>
      <div className={cn('container mx-auto max-w-5xl', 'px-4 pb-20 sm:px-6')}>
        <RequestToolBreadcrumb />
        <RequestToolContent />
      </div>
    </main>
  );
}
