import type { Metadata } from 'next';

import { DisclaimerContent } from '@/components/disclaimer/disclaimer-content';
import { PageBreadcrumb } from '@/components/shared/page-breadcrumb';
import { createPageMetadata } from '@/lib/seo/metadata';
import { cn } from '@/lib/utils';

export const metadata: Metadata = createPageMetadata({
  title: 'Disclaimer',
  description:
    'Limits of our calculators and test data generators: results are estimates, not tax, legal, or financial advice, and generated data is for testing only.',
  path: '/disclaimer',
});

export default function DisclaimerPage() {
  return (
    <main className={cn('flex-1')}>
      <div className={cn('container mx-auto max-w-5xl', 'px-4 pb-20 sm:px-6')}>
        <PageBreadcrumb items={[{ label: 'Disclaimer' }]} />
        <DisclaimerContent />
      </div>
    </main>
  );
}
