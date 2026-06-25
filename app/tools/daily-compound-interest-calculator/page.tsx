import type { Metadata } from 'next';

import { DailyCompoundToolContent } from '@/components/daily-compound-interest/daily-compound-tool-content';
import { ToolBlogPromo } from '@/components/blog/tool-blog-promo';
import { PageBreadcrumb } from '@/components/shared/page-breadcrumb';
import { ToolFaqSection } from '@/components/shared/tool-faq-section';
import { compoundInterestFaqs } from '@/lib/tool-faqs';
import { cn } from '@/lib/utils';
import { siteDomain } from '@/lib/site-config';

export const metadata: Metadata = {
  title: 'Daily Compound Interest Calculator — Growth',
  description:
    "Calculate your investment's future value with daily compounding. Factor in regular contributions and multiple currencies to see exactly how your money grows.",
  keywords: [
    'daily compound interest calculator',
    'compound interest calculator',
    'investment growth calculator',
    'daily compounding calculator',
    'future value calculator',
    'savings calculator',
  ],
  openGraph: {
    title: `Daily Compound Interest Calculator — Growth | ${siteDomain}`,
    description:
      "Calculate your investment's future value with daily compounding. Factor in contributions and reinvestment to see how your money grows.",
    url: '/tools/daily-compound-interest-calculator',
  },
  twitter: {
    title: `Daily Compound Interest Calculator — Growth | ${siteDomain}`,
    description:
      "Calculate your investment's future value with daily compounding, contributions, and reinvestment.",
  },
};


export default function DailyCompoundInterestCalculatorPage() {
  return (
    <main className={cn('flex-1')}>
      <div className={cn('container mx-auto max-w-6xl px-4 pb-20 sm:px-6')}>
        <PageBreadcrumb items={[{ label: 'Daily compound interest calculator' }]} />
        <DailyCompoundToolContent />
        <ToolBlogPromo toolLink='/tools/daily-compound-interest-calculator' />
        <ToolFaqSection faqs={compoundInterestFaqs} />
      </div>
    </main>
  );
}
