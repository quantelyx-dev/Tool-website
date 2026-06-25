import type { Metadata } from 'next';

import { ToolBlogPromo } from '@/components/blog/tool-blog-promo';
import { PageBreadcrumb } from '@/components/shared/page-breadcrumb';
import { ToolFaqSection } from '@/components/shared/tool-faq-section';
import { GenerateRandomEmailsToolContent } from '@/components/generate-random-emails/generate-random-emails-tool-content';
import { emailFaqs } from '@/lib/tool-faqs';
import { cn } from '@/lib/utils';
import { siteDomain } from '@/lib/site-config';

export const metadata: Metadata = {
  title: 'Random Email Generator — Fake Bulk Emails',
  description:
    'Generate up to 1,000 realistic fake email addresses instantly. Perfect for test databases, staging environments, and UI mockups — free, no sign-up required.',
  keywords: [
    'random email generator',
    'fake email generator',
    'bulk email generator',
    'test email addresses',
    'dummy email generator',
    'fake emails for testing',
  ],
  openGraph: {
    title: `Random Email Generator — Fake Bulk Emails | ${siteDomain}`,
    description:
      'Generate up to 1,000 realistic fake email addresses instantly. Perfect for test databases, staging environments, and UI mockups.',
    url: '/tools/generate-random-emails',
  },
  twitter: {
    title: `Random Email Generator — Fake Bulk Emails | ${siteDomain}`,
    description:
      'Generate up to 1,000 realistic fake email addresses instantly. Perfect for test databases and UI mockups.',
  },
};


export default function GenerateRandomEmailsPage() {
  return (
    <main className={cn('flex-1')}>
      <div className={cn('container mx-auto max-w-6xl px-4 pb-20 sm:px-6')}>
        <PageBreadcrumb items={[{ label: 'Random email generator' }]} />
        <GenerateRandomEmailsToolContent />
        <ToolBlogPromo toolLink='/tools/generate-random-emails' />
        <ToolFaqSection faqs={emailFaqs} />
      </div>
    </main>
  );
}
