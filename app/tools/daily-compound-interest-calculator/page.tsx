import type { Metadata } from 'next';

import { DailyCompoundToolContent } from '@/components/daily-compound-interest/daily-compound-tool-content';
import { PageBreadcrumb } from '@/components/shared/page-breadcrumb';
import { cn } from '@/lib/utils';

export const metadata: Metadata = {
  title: 'Daily compound interest calculator — Tools',
  description:
    'Estimate final balance, deposits, and interest with daily compounding, optional contributions, and reinvestment semantics. Charts and exports are not included yet.',
};

export default function DailyCompoundInterestCalculatorPage() {
  return (
    <main className={cn('flex-1')}>
      <div className={cn('container mx-auto max-w-6xl px-4 pb-20 sm:px-6')}>
        <PageBreadcrumb items={[{ label: 'Daily compound interest' }]} />
        <DailyCompoundToolContent />
      </div>
    </main>
  );
}
