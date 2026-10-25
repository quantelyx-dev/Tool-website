import type { Metadata } from 'next';

import { ToolBlogPromo } from '@/components/blog/tool-blog-promo';
import { PageBreadcrumb } from '@/components/shared/page-breadcrumb';
import { ToolFaqSection } from '@/components/shared/tool-faq-section';
import { PaycheckToolContent } from '@/components/us-paycheck/paycheck-tool-content';
import { createPageMetadata } from '@/lib/seo/metadata';
import { paycheckCalculatorFaqs } from '@/lib/tool-faqs';
import { cn } from '@/lib/utils';

export const metadata: Metadata = createPageMetadata({
  title: 'US Paycheck Calculator',
  description:
    'Free 2026 paycheck calculator. Estimate take-home pay after federal tax, Social Security, Medicare, state tax, 401(k), and deductions for any US state.',
  path: '/tools/us-paycheck-calculator',
  keywords: [
    'US paycheck calculator',
    'paycheck calculator',
    'take home pay calculator',
    'salary after tax calculator',
    'hourly paycheck calculator',
    'federal withholding calculator',
    'net pay calculator',
    'paycheck calculator by state',
    '2026 paycheck calculator',
  ],
});

export default function UsPaycheckCalculatorPage() {
  return (
    <main className={cn('flex-1')}>
      <div className={cn('container mx-auto max-w-6xl px-4 pb-20 sm:px-6')}>
        <PageBreadcrumb items={[{ label: 'US paycheck calculator' }]} />
        <PaycheckToolContent />
        <ToolBlogPromo toolLink='/tools/us-paycheck-calculator' />
        <ToolFaqSection faqs={paycheckCalculatorFaqs} />
      </div>
    </main>
  );
}
