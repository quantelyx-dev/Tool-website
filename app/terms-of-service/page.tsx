import type { Metadata } from 'next';
import { TermsOfServiceContent } from '@/components/terms-of-service/terms-of-service-content';
import { PageBreadcrumb } from '@/components/shared/page-breadcrumb';
import { createPageMetadata } from '@/lib/seo/metadata';
import { cn } from '@/lib/utils';

export const metadata: Metadata = createPageMetadata({
  title: 'Terms of Service',
  description:
    'The rules for using toolcalcs.net: age eligibility, acceptable use of tools and test data, text to speech limits, cookies, and liability.',
  path: '/terms-of-service',
  keywords: ['terms of service', 'terms and conditions', 'toolcalcs terms', 'usage policy'],
});

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
