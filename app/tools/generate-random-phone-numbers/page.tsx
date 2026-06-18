import type { Metadata } from 'next';

import { PageBreadcrumb } from '@/components/shared/page-breadcrumb';
import { ToolFaqSection } from '@/components/shared/tool-faq-section';
import { GenerateRandomPhoneNumbersToolContent } from '@/components/generate-random-phone-numbers/generate-random-phone-numbers-tool-content';
import { phoneNumberFaqs } from '@/lib/tool-faqs';
import { cn } from '@/lib/utils';
import { siteDomain } from '@/lib/site-config';

export const metadata: Metadata = {
  title: 'Random Phone Number Generator by Country',
  description:
    'Generate fake phone numbers for 50+ countries. Uses libphonenumber to produce structurally valid numbers safe for UI testing, form validation, and demos.',
  keywords: [
    'random phone number generator',
    'fake phone number generator',
    'fake phone numbers for testing',
    'dummy phone number generator',
    'phone number by country',
    'test phone numbers',
  ],
  openGraph: {
    title: `Random Phone Number Generator by Country | ${siteDomain}`,
    description:
      'Generate properly formatted fake phone numbers for 50+ countries. Structurally valid numbers safe for UI testing and demo data.',
    url: '/tools/generate-random-phone-numbers',
  },
  twitter: {
    title: `Random Phone Number Generator by Country | ${siteDomain}`,
    description:
      'Generate properly formatted fake phone numbers for 50+ countries. Safe for testing and demos.',
  },
};


export default function GenerateRandomPhoneNumbersPage() {
  return (
    <main className={cn('flex-1')}>
      <div className={cn('container mx-auto max-w-6xl px-4 pb-20 sm:px-6')}>
        <PageBreadcrumb items={[{ label: 'Random phone number generator' }]} />
        <GenerateRandomPhoneNumbersToolContent />
        <ToolFaqSection faqs={phoneNumberFaqs} />
      </div>
    </main>
  );
}
