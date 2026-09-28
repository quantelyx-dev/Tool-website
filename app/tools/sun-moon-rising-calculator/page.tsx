import type { Metadata } from 'next';

import { ToolBlogPromo } from '@/components/blog/tool-blog-promo';
import { PageBreadcrumb } from '@/components/shared/page-breadcrumb';
import { ToolFaqSection } from '@/components/shared/tool-faq-section';
import { SunMoonRisingToolContent } from '@/components/sun-moon-rising/sun-moon-rising-tool-content';
import { createPageMetadata } from '@/lib/seo/metadata';
import { sunMoonRisingFaqs } from '@/lib/tool-faqs';
import { cn } from '@/lib/utils';

export const metadata: Metadata = createPageMetadata({
  title: 'Sun, Moon & Rising Calculator — Big Three',
  description:
    'Find your Sun sign, Moon sign, and Rising sign instantly. Enter your birth date, time, and location to reveal your complete astrological big three — free.',
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
        <ToolBlogPromo toolLink='/tools/sun-moon-rising-calculator' />
        <ToolFaqSection faqs={sunMoonRisingFaqs} />
      </div>
    </main>
  );
}
