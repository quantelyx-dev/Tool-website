import type { Metadata } from 'next';

import { PageBreadcrumb } from '@/components/shared/page-breadcrumb';
import { SunMoonRisingToolContent } from '@/components/sun-moon-rising/sun-moon-rising-tool-content';
import { cn } from '@/lib/utils';

export const metadata: Metadata = {
  title: 'Sun, Moon & Rising calculator — Tools',
  description:
    'Enter your birth details to discover your Sun sign, Moon sign, and Rising (Ascendant) sign. Chart logic coming soon.',
};

export default function SunMoonRisingCalculatorPage() {
  return (
    <main className={cn('flex-1')}>
      <div className={cn('container mx-auto max-w-5xl px-4 pb-20 sm:px-6')}>
        <PageBreadcrumb items={[{ label: 'Sun, Moon & Rising' }]} />
        <SunMoonRisingToolContent />
      </div>
    </main>
  );
}
