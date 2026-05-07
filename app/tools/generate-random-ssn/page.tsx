import type { Metadata } from 'next';

import { GenerateRandomSsnToolContent } from '@/components/generate-random-ssn/generate-random-ssn-tool-content';
import { PageBreadcrumb } from '@/components/shared/page-breadcrumb';
import { cn } from '@/lib/utils';

export const metadata: Metadata = {
  title: 'Random SSN generator - Tools',
  description:
    'Generate random fake SSNs in single or bulk mode for fixtures and demos.',
};

export default function GenerateRandomSsnPage() {
  return (
    <main className={cn('flex-1')}>
      <div className={cn('container mx-auto max-w-6xl px-4 pb-20 sm:px-6')}>
        <PageBreadcrumb items={[{ label: 'Random SSN' }]} />
        <GenerateRandomSsnToolContent />
      </div>
    </main>
  );
}
