import type { Metadata } from 'next';

import { PageBreadcrumb } from '@/components/shared/page-breadcrumb';
import { GenerateRandomPhoneNumbersToolContent } from '@/components/generate-random-phone-numbers/generate-random-phone-numbers-tool-content';
import { cn } from '@/lib/utils';

export const metadata: Metadata = {
  title: 'Random phone number generator - Tools',
  description:
    'Generate random phone numbers by selected country. Configure country and volume before generation.',
};

export default function GenerateRandomPhoneNumbersPage() {
  return (
    <main className={cn('flex-1')}>
      <div className={cn('container mx-auto max-w-6xl px-4 pb-20 sm:px-6')}>
        <PageBreadcrumb items={[{ label: 'Random phone numbers' }]} />
        <GenerateRandomPhoneNumbersToolContent />
      </div>
    </main>
  );
}
