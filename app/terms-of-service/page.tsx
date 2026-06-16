import type { Metadata } from 'next';
import { TermsOfServiceContent } from '@/components/terms-of-service/terms-of-service-content';
import { PageBreadcrumb } from '@/components/shared/page-breadcrumb';
import { cn } from '@/lib/utils';

export const metadata: Metadata = {
  title: 'Terms of Service — toolcalcs.net',
  description:
    'Read the Terms of Service for toolcalcs.net. Learn the rules for using our free online tools, calculators, and generators responsibly.',
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
