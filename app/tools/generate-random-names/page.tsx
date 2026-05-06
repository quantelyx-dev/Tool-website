import type { Metadata } from 'next';

import { GenerateRandomNamesBreadcrumb } from '@/components/generate-random-names/generate-random-names-breadcrumb';
import { GenerateRandomNamesToolContent } from '@/components/generate-random-names/generate-random-names-tool-content';
import { cn } from '@/lib/utils';

export const metadata: Metadata = {
  title: 'Random name generator — Tools',
  description:
    'Generate batches of first names, last names, or full names for fixtures and demos. Server-cached pool with one-click comma-separated copy.',
};

export default function GenerateRandomNamesPage() {
  return (
    <main className={cn('flex-1')}>
      <div className={cn('container mx-auto max-w-6xl px-4 pb-20 sm:px-6')}>
        <GenerateRandomNamesBreadcrumb />
        <GenerateRandomNamesToolContent />
      </div>
    </main>
  );
}
