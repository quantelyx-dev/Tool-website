import type { Metadata } from 'next';

import { PageBreadcrumb } from '@/components/shared/page-breadcrumb';
import { GenerateRandomUsernamesToolContent } from '@/components/generate-random-usernames/generate-random-usernames-tool-content';
import { cn } from '@/lib/utils';

export const metadata: Metadata = {
  title: 'Random username generator — Tools',
  description:
    'Generate batches of usernames for fixtures and demos. Server-cached pool with one-click comma-separated copy.',
};

export default function GenerateRandomUsernamesPage() {
  return (
    <main className={cn('flex-1')}>
      <div className={cn('container mx-auto max-w-6xl px-4 pb-20 sm:px-6')}>
        <PageBreadcrumb items={[{ label: 'Random usernames' }]} />
        <GenerateRandomUsernamesToolContent />
      </div>
    </main>
  );
}
