import type { Metadata } from 'next';
import { TermsOfServiceContent } from '@/components/terms-of-service/terms-of-service-content';
import { PageBreadcrumb } from '@/components/shared/page-breadcrumb';
import { cn } from '@/lib/utils';
import { siteDomain } from '@/lib/site-config';

export const metadata: Metadata = {
  title: 'Terms of Service',
  description:
    `Read the ${siteDomain} Terms of Service. Understand the guidelines for using our free online tools, calculators, and data generators responsibly and legally.`,
  keywords: ['terms of service', 'terms and conditions', 'toolcalcs terms', 'usage policy'],
  openGraph: {
    title: `Terms of Service | ${siteDomain}`,
    description:
      'Understand the guidelines for using our free online tools, calculators, and data generators responsibly.',
    url: '/terms-of-service',
  },
  twitter: {
    title: `Terms of Service | ${siteDomain}`,
    description:
      'Understand the guidelines for using our free online tools, calculators, and data generators responsibly.',
  },
};

export default function TermsOfServicePage() {
  return (
    <main className={cn('flex-1')}>
      <div className={cn('container mx-auto max-w-5xl', 'px-4 pb-20 sm:px-6')}>
        <PageBreadcrumb items={[{ label: 'Terms of Service' }]} />
        <TermsOfServiceContent />
      </div>
    </main>
  );
}
