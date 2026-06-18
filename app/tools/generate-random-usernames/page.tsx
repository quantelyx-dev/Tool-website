import type { Metadata } from 'next';

import { PageBreadcrumb } from '@/components/shared/page-breadcrumb';
import { ToolFaqSection } from '@/components/shared/tool-faq-section';
import { GenerateRandomUsernamesToolContent } from '@/components/generate-random-usernames/generate-random-usernames-tool-content';
import { usernameFaqs } from '@/lib/tool-faqs';
import { cn } from '@/lib/utils';
import { siteDomain } from '@/lib/site-config';

export const metadata: Metadata = {
  title: 'Random Username Generator — Bulk Fake Usernames for Testing',
  description:
    'Generate hundreds of realistic, unique usernames in seconds. Ideal for seeding test databases, populating staging environments, and building demo user lists.',
  keywords: [
    'random username generator',
    'fake username generator',
    'bulk username creator',
    'username ideas',
    'test usernames',
    'dummy usernames',
  ],
  openGraph: {
    title: `Random Username Generator — Bulk Fake Usernames for Testing | ${siteDomain}`,
    description:
      'Generate hundreds of realistic, unique usernames in seconds. Ideal for seeding test databases and building demo user lists.',
    url: '/tools/generate-random-usernames',
  },
  twitter: {
    title: `Random Username Generator — Bulk Fake Usernames for Testing | ${siteDomain}`,
    description:
      'Generate hundreds of realistic, unique usernames in seconds. Ideal for test databases and demo user lists.',
  },
};


export default function GenerateRandomUsernamesPage() {
  return (
    <main className={cn('flex-1')}>
      <div className={cn('container mx-auto max-w-6xl px-4 pb-20 sm:px-6')}>
        <PageBreadcrumb items={[{ label: 'Random username generator' }]} />
        <GenerateRandomUsernamesToolContent />
        <ToolFaqSection faqs={usernameFaqs} />
      </div>
    </main>
  );
}
