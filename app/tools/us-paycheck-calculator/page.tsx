import type { Metadata } from 'next';

import { PageBreadcrumb } from '@/components/shared/page-breadcrumb';
import { ToolPageDetails } from '@/components/shared/tool-page-details';
import { PaycheckToolContent } from '@/components/us-paycheck/paycheck-tool-content';
import { createPageMetadata } from '@/lib/seo/metadata';
import { paycheckCalculatorFaqs } from '@/lib/tool-faqs';
import { cn } from '@/lib/utils';

export const metadata: Metadata = createPageMetadata({
  title: 'US Paycheck Calculator (2026)',
  description:
    'Estimate 2026 take-home pay after federal tax, Social Security, Medicare, state tax, 401(k), and deductions for salary or hourly work in any US state.',
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
        <ToolPageDetails toolLink='/tools/us-paycheck-calculator' faqs={paycheckCalculatorFaqs} />
      </div>
    </main>
  );
}
