import type { Metadata } from 'next';

import { GenerateRandomAddressesToolContent } from '@/components/generate-random-addresses/generate-random-addresses-tool-content';
import { PageBreadcrumb } from '@/components/shared/page-breadcrumb';
import { cn } from '@/lib/utils';

export const metadata: Metadata = {
  title: 'Address Generator - Generate Fictional Addresses - Tools',
  description:
    'Generate fictional mailing addresses in single or bulk mode for fixtures and demos.',
};

export default function GenerateRandomAddressesPage() {
  return (
    <main className={cn('flex-1')}>
      <div className={cn('container mx-auto max-w-6xl px-4 pb-20 sm:px-6')}>
        <PageBreadcrumb items={[{ label: 'Address Generator' }]} />
        <GenerateRandomAddressesToolContent />
      </div>
    </main>
  );
}
