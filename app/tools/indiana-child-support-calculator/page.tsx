import type { Metadata } from 'next';

import { ChildSupportToolContent } from '@/components/indiana-child-support/child-support-tool-content';
import { PageBreadcrumb } from '@/components/shared/page-breadcrumb';
import { cn } from '@/lib/utils';

export const metadata: Metadata = {
  title: 'Child support calculator — Tools',
  description:
    'Estimate support inputs: parental incomes, intervals, and per-child parenting time. Calculation phase coming next.',
};

export default function ChildSupportCalculatorPage() {
  return (
    <main className={cn('flex-1')}>
      <div className={cn('container mx-auto max-w-6xl px-4 pb-20 sm:px-6')}>
        <PageBreadcrumb items={[{ label: 'Indiana Child support' }]} />
        <ChildSupportToolContent />
      </div>
    </main>
  );
}
