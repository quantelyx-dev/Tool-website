import type { Metadata } from 'next';

import { PageBreadcrumb } from '@/components/shared/page-breadcrumb';
import { ToolFaqSection } from '@/components/shared/tool-faq-section';
import { SunMoonRisingToolContent } from '@/components/sun-moon-rising/sun-moon-rising-tool-content';
import { sunMoonRisingFaqs } from '@/lib/tool-faqs';
import { cn } from '@/lib/utils';
import { siteDomain } from '@/lib/site-config';

export const metadata: Metadata = {
  title: 'Sun, Moon & Rising Sign Calculator — Find Your Big Three',
  description:
    "Find your Sun sign, Moon sign, and Rising sign instantly. Enter your birth date, time, and location to reveal your complete astrological big three — free.",
  keywords: [
    'sun moon rising calculator',
    'big three astrology calculator',
    'rising sign calculator',
    'ascendant sign calculator',
    'moon sign calculator',
    'birth chart calculator',
  ],
  openGraph: {
    title: `Sun, Moon & Rising Sign Calculator — Find Your Big Three | ${siteDomain}`,
    description:
      "Find your Sun sign, Moon sign, and Rising sign instantly. Enter your birth date, time, and location to reveal your astrological big three.",
    url: '/tools/sun-moon-rising-calculator',
  },
  twitter: {
    title: `Sun, Moon & Rising Sign Calculator — Find Your Big Three | ${siteDomain}`,
    description:
      "Find your Sun sign, Moon sign, and Rising sign. Enter your birth details to reveal your astrological big three.",
  },
};


export default function SunMoonRisingCalculatorPage() {
  return (
    <main className={cn('flex-1')}>
      <div className={cn('container mx-auto max-w-5xl px-4 pb-20 sm:px-6')}>
        <PageBreadcrumb items={[{ label: 'Sun, Moon & Rising calculator' }]} />
        <SunMoonRisingToolContent />
        <ToolFaqSection faqs={sunMoonRisingFaqs} />
      </div>
    </main>
  );
}
