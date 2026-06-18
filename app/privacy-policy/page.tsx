import type { Metadata } from 'next';
import { PrivacyPolicyContent } from '@/components/privacy-policy/privacy-policy-content';
import { PageBreadcrumb } from '@/components/shared/page-breadcrumb';
import { cn } from '@/lib/utils';
import { siteDomain } from '@/lib/site-config';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description:
    `Read the ${siteDomain} Privacy Policy. All tool calculations run in your browser — we never store, sell, or share the data you enter. Your privacy is built into how we work.`,
  keywords: ['privacy policy', 'data privacy', 'toolcalcs privacy', 'no data collection'],
  openGraph: {
    title: `Privacy Policy | ${siteDomain}`,
    description:
      'All tool calculations run in your browser — we never store, sell, or share the data you enter.',
    url: '/privacy-policy',
  },
  twitter: {
    title: `Privacy Policy | ${siteDomain}`,
    description:
      'All tool calculations run in your browser — we never store, sell, or share the data you enter.',
  },
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
