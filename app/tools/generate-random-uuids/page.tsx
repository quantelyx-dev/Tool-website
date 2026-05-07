import type { Metadata } from 'next';

import { GenerateRandomUuidsToolContent } from '@/components/generate-random-uuids/generate-random-uuids-tool-content';
import { PageBreadcrumb } from '@/components/shared/page-breadcrumb';
import { cn } from '@/lib/utils';

export const metadata: Metadata = {
  title: 'Random UUIDv7 generator - Tools',
  description:
    'Generate random UUIDv7 values in single or bulk mode for fixtures and demos.',
};

export default function GenerateRandomUuidsPage() {
  return (
    <main className={cn('flex-1')}>
      <div className={cn('container mx-auto max-w-6xl px-4 pb-20 sm:px-6')}>
        <PageBreadcrumb items={[{ label: 'Random UUIDv7' }]} />
        <GenerateRandomUuidsToolContent />
      </div>
    </main>
  );
}
