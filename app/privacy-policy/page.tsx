import type { Metadata } from 'next';
import { PrivacyPolicyContent } from '@/components/privacy-policy/privacy-policy-content';
import { PageBreadcrumb } from '@/components/shared/page-breadcrumb';
import { cn } from '@/lib/utils';
import { siteDomain } from '@/lib/site-config';

export const metadata: Metadata = {
  alternates: { canonical: '/privacy-policy' },
  title: 'Privacy Policy',
  description:
    `Read the ${siteDomain} Privacy Policy. Most tools run in your browser, and we never sell your data. See exactly which tools use our servers or partners and why.`,
  keywords: ['privacy policy', 'data privacy', 'toolcalcs privacy', 'no data collection'],
  openGraph: {
    title: `Privacy Policy | ${siteDomain}`,
    description:
      'Most tools run in your browser. A few use our servers or partners to produce results — we never sell your data.',
    url: '/privacy-policy',
  },
  twitter: {
    card: 'summary_large_image',
    title: `Privacy Policy | ${siteDomain}`,
    description:
      'Most tools run in your browser. A few use our servers or partners to produce results — we never sell your data.',
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
