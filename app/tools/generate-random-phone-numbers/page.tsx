import type { Metadata } from 'next';

import { PageBreadcrumb } from '@/components/shared/page-breadcrumb';
import { ToolPageDetails } from '@/components/shared/tool-page-details';
import { GenerateRandomPhoneNumbersToolContent } from '@/components/generate-random-phone-numbers/generate-random-phone-numbers-tool-content';
import { phoneNumberFaqs } from '@/lib/tool-faqs';
import { createPageMetadata } from '@/lib/seo/metadata';
import { cn } from '@/lib/utils';

export const metadata: Metadata = createPageMetadata({
  title: 'Random Test Phone Number Generator',
  description:
    'Generate test phone numbers only from ranges reserved for fiction in the US, Canada, the UK, and Australia, in international and E.164 formats.',
  path: '/tools/generate-random-phone-numbers',
  keywords: [
    'random phone number generator',
    'test phone number generator',
    '555 phone number generator',
    'reserved phone numbers',
    'test phone numbers',
  ],
});


export default function GenerateRandomPhoneNumbersPage() {
  return (
    <main className={cn('flex-1')}>
      <div className={cn('container mx-auto max-w-6xl px-4 pb-20 sm:px-6')}>
        <PageBreadcrumb items={[{ label: 'Random phone number generator' }]} />
        <GenerateRandomPhoneNumbersToolContent />
        <ToolPageDetails toolLink='/tools/generate-random-phone-numbers' faqs={phoneNumberFaqs} />
      </div>
    </main>
  );
}
