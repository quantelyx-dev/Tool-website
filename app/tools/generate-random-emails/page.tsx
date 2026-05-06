import type { Metadata } from 'next';

import { PageBreadcrumb } from '@/components/shared/page-breadcrumb';
import { GenerateRandomEmailsToolContent } from '@/components/generate-random-emails/generate-random-emails-tool-content';
import { cn } from '@/lib/utils';

export const metadata: Metadata = {
  title: 'Random email generator — Tools',
  description:
    'Generate batches of email addresses for fixtures and demos. Server-cached pool with one-click comma-separated copy.',
};

export default function GenerateRandomEmailsPage() {
  return (
    <main className={cn('flex-1')}>
      <div className={cn('container mx-auto max-w-6xl px-4 pb-20 sm:px-6')}>
        <PageBreadcrumb items={[{ label: 'Random emails' }]} />
        <GenerateRandomEmailsToolContent />
      </div>
    </main>
  );
}
