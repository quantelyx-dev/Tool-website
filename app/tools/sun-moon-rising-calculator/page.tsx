import type { Metadata } from 'next';

import { PageBreadcrumb } from '@/components/shared/page-breadcrumb';
import { ToolPageDetails } from '@/components/shared/tool-page-details';
import { SunMoonRisingToolContent } from '@/components/sun-moon-rising/sun-moon-rising-tool-content';
import { createPageMetadata } from '@/lib/seo/metadata';
import { sunMoonRisingFaqs } from '@/lib/tool-faqs';
import { cn } from '@/lib/utils';

export const metadata: Metadata = createPageMetadata({
  title: 'Sun, Moon & Rising Sign Calculator',
  description:
    'Find your Sun, Moon, and Rising signs from your birth date, time, and city, using astronomical calculations in the tropical zodiac.',
  path: '/tools/sun-moon-rising-calculator',
  keywords: [
    'sun moon rising calculator',
    'big three astrology calculator',
    'big 3 calculator',
    'find your big 3',
    'rising sign calculator',
    'ascendant sign calculator',
    'moon sign calculator',
    'birth chart calculator',
    'what is my rising sign and moon',
  ],
});


export default function SunMoonRisingCalculatorPage() {
  return (
    <main className={cn('flex-1')}>
      <div className={cn('container mx-auto max-w-5xl px-4 pb-20 sm:px-6')}>
        <PageBreadcrumb items={[{ label: 'Sun, Moon & Rising calculator' }]} />
        <SunMoonRisingToolContent />
        <ToolPageDetails toolLink='/tools/sun-moon-rising-calculator' faqs={sunMoonRisingFaqs} />
      </div>
    </main>
  );
}
