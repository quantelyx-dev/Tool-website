import type { Metadata } from 'next';

import { GenerateRandomCreditCardsToolContent } from '@/components/generate-random-credit-cards/generate-random-credit-cards-tool-content';
import { PageBreadcrumb } from '@/components/shared/page-breadcrumb';
import { cn } from '@/lib/utils';

export const metadata: Metadata = {
  title: 'Random credit card generator - Tools',
  description:
    'Generate fake credit card numbers by issuer — Visa, Mastercard, Amex, and more — in single or bulk mode. Safe fictional data for testing and demos.',
};

export default function GenerateRandomCreditCardsPage() {
  return (
    <main className={cn('flex-1')}>
      <div className={cn('container mx-auto max-w-6xl px-4 pb-20 sm:px-6')}>
        <PageBreadcrumb items={[{ label: 'Random credit cards' }]} />
        <GenerateRandomCreditCardsToolContent />
      </div>
    </main>
  );
}
