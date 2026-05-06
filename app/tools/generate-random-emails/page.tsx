import type { Metadata } from 'next';

import { GenerateRandomEmailsBreadcrumb } from '@/components/generate-random-emails/generate-random-emails-breadcrumb';
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
        <GenerateRandomEmailsBreadcrumb />
        <GenerateRandomEmailsToolContent />
      </div>
    </main>
  );
}
