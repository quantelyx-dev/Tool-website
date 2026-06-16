import type { Metadata } from 'next';
import { PrivacyPolicyContent } from '@/components/privacy-policy/privacy-policy-content';
import { PageBreadcrumb } from '@/components/shared/page-breadcrumb';
import { cn } from '@/lib/utils';

export const metadata: Metadata = {
  title: 'Privacy Policy — toolcalcs.net',
  description:
    'Learn how toolcalcs.net collects, uses, and protects your data. All tool calculations run entirely in your browser — we never store your inputs.',
};

export default function PrivacyPolicyPage() {
  return (
    <main className={cn('flex-1')}>
      <div className={cn('container mx-auto max-w-5xl', 'px-4 pb-20 sm:px-6')}>
        <PageBreadcrumb items={[{ label: 'Privacy Policy' }]} />
        <PrivacyPolicyContent />
      </div>
    </main>
  );
}
