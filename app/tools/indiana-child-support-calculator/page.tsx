import type { Metadata } from 'next';

import { ChildSupportToolContent } from '@/components/indiana-child-support/child-support-tool-content';
import { ToolBlogPromo } from '@/components/blog/tool-blog-promo';
import { PageBreadcrumb } from '@/components/shared/page-breadcrumb';
import { ToolFaqSection } from '@/components/shared/tool-faq-section';
import { createPageMetadata } from '@/lib/seo/metadata';
import { childSupportFaqs } from '@/lib/tool-faqs';
import { cn } from '@/lib/utils';

export const metadata: Metadata = createPageMetadata({
  title: 'Indiana Child Support Calculator',
  description:
    "Estimate Indiana child support using the income shares model. Enter both parents' gross incomes and parenting time per child to get a preliminary support figure quickly.",
  path: '/tools/indiana-child-support-calculator',
  keywords: [
    'Indiana child support calculator',
    'Indiana child support estimator',
    'Indiana income shares model',
    'child support calculation Indiana',
    'Indiana child support worksheet',
    'IN child support guidelines',
    'indiana alimony calculator',
    'indiana spousal support calculator',
  ],
});


export default function ChildSupportCalculatorPage() {
  return (
    <main className={cn('flex-1')}>
      <div className={cn('container mx-auto max-w-6xl px-4 pb-20 sm:px-6')}>
        <PageBreadcrumb items={[{ label: 'Indiana child support calculator' }]} />
        <ChildSupportToolContent />
        <ToolBlogPromo toolLink='/tools/indiana-child-support-calculator' />
        <ToolFaqSection faqs={childSupportFaqs} />
      </div>
    </main>
  );
}
