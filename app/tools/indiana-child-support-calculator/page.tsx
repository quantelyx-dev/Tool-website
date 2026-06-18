import type { Metadata } from 'next';

import { ChildSupportToolContent } from '@/components/indiana-child-support/child-support-tool-content';
import { PageBreadcrumb } from '@/components/shared/page-breadcrumb';
import { ToolFaqSection } from '@/components/shared/tool-faq-section';
import { childSupportFaqs } from '@/lib/tool-faqs';
import { cn } from '@/lib/utils';
import { siteDomain } from '@/lib/site-config';

export const metadata: Metadata = {
  title: 'Indiana Child Support Calculator — Income Shares Estimator',
  description:
    "Estimate Indiana child support using the state's income shares model. Enter both parents' gross incomes and parenting time per child to get a preliminary support figure quickly.",
  keywords: [
    'Indiana child support calculator',
    'Indiana child support estimator',
    'Indiana income shares model',
    'child support calculation Indiana',
    'Indiana child support worksheet',
    'IN child support guidelines',
  ],
  openGraph: {
    title: `Indiana Child Support Calculator — Income Shares Estimator | ${siteDomain}`,
    description:
      "Estimate Indiana child support using the income shares model. Enter both parents' gross incomes and parenting time for a quick preliminary figure.",
    url: '/tools/indiana-child-support-calculator',
  },
  twitter: {
    title: `Indiana Child Support Calculator — Income Shares Estimator | ${siteDomain}`,
    description:
      "Estimate Indiana child support using the income shares model. Enter gross incomes and parenting time.",
  },
};


export default function ChildSupportCalculatorPage() {
  return (
    <main className={cn('flex-1')}>
      <div className={cn('container mx-auto max-w-6xl px-4 pb-20 sm:px-6')}>
        <PageBreadcrumb items={[{ label: 'Indiana child support calculator' }]} />
        <ChildSupportToolContent />
        <ToolFaqSection faqs={childSupportFaqs} />
      </div>
    </main>
  );
}
