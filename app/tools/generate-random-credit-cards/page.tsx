import type { Metadata } from 'next';

import { GenerateRandomCreditCardsToolContent } from '@/components/generate-random-credit-cards/generate-random-credit-cards-tool-content';
import { PageBreadcrumb } from '@/components/shared/page-breadcrumb';
import { createPageMetadata } from '@/lib/seo/metadata';
import { ToolDisclaimer } from '@/components/shared/tool-disclaimer';
import { cn } from '@/lib/utils';

export const metadata: Metadata = createPageMetadata({
  title: 'Random Test Card Number Generator',
  description:
    'Generate test card numbers by issuer for software testing only.',
  path: '/tools/generate-random-credit-cards',
  // Hidden from the site and search engines (see lib/tools-data.ts).
  noindex: true,
});

export default function GenerateRandomCreditCardsPage() {
  return (
    <main className={cn('flex-1')}>
      <div className={cn('container mx-auto max-w-6xl px-4 pb-20 sm:px-6')}>
        <PageBreadcrumb items={[{ label: 'Random credit cards' }]} />
        <GenerateRandomCreditCardsToolContent />
        <ToolDisclaimer toolLink='/tools/generate-random-credit-cards' variant='test-data' />
      </div>
    </main>
  );
}
