import type { Metadata } from 'next';
import { PrivacyPolicyContent } from '@/components/privacy-policy/privacy-policy-content';
import { PageBreadcrumb } from '@/components/shared/page-breadcrumb';
import { createPageMetadata } from '@/lib/seo/metadata';
import { cn } from '@/lib/utils';

export const metadata: Metadata = createPageMetadata({
  title: 'Privacy Policy',
  description:
    'How toolcalcs.net handles data: which tools use our servers or partners, analytics and advertising cookies, your choices, and your rights.',
  path: '/privacy-policy',
  keywords: ['privacy policy', 'data privacy', 'toolcalcs privacy', 'advertising cookies'],
});

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
