import type { Metadata } from 'next';

import { DailyCompoundToolContent } from '@/components/daily-compound-interest/daily-compound-tool-content';
import { PageBreadcrumb } from '@/components/shared/page-breadcrumb';
import { ToolPageDetails } from '@/components/shared/tool-page-details';
import { compoundInterestFaqs } from '@/lib/tool-faqs';
import { createPageMetadata } from '@/lib/seo/metadata';
import { cn } from '@/lib/utils';

export const metadata: Metadata = createPageMetadata({
  title: 'Daily Compound Interest Calculator',
  description:
    'Project a balance with daily compounding, APR or APY rates, regular deposits, and optional reinvestment, then export the results.',
  path: '/tools/daily-compound-interest-calculator',
  keywords: [
    'daily compound interest calculator',
    'compound interest calculator',
    'investment growth calculator',
    'daily compounding calculator',
    'future value calculator',
    'savings calculator',
  ],
});


export default function DailyCompoundInterestCalculatorPage() {
  return (
    <main className={cn('flex-1')}>
      <div className={cn('container mx-auto max-w-6xl px-4 pb-20 sm:px-6')}>
        <PageBreadcrumb items={[{ label: 'Daily compound interest calculator' }]} />
        <DailyCompoundToolContent />
        <ToolPageDetails toolLink='/tools/daily-compound-interest-calculator' faqs={compoundInterestFaqs} />
      </div>
    </main>
  );
}
