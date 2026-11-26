import type { Metadata } from 'next';

import { PageBreadcrumb } from '@/components/shared/page-breadcrumb';
import { ToolPageDetails } from '@/components/shared/tool-page-details';
import { GenerateRandomEmailsToolContent } from '@/components/generate-random-emails/generate-random-emails-tool-content';
import { emailFaqs } from '@/lib/tool-faqs';
import { createPageMetadata } from '@/lib/seo/metadata';
import { cn } from '@/lib/utils';

export const metadata: Metadata = createPageMetadata({
  title: 'Random Test Email Generator',
  description:
    'Generate up to 1,000 test email addresses on reserved example.com, example.net, and example.org domains for forms, fixtures, and demos.',
  path: '/tools/generate-random-emails',
  keywords: [
    'random email generator',
    'test email generator',
    'bulk email generator',
    'test email addresses',
    'dummy email generator',
    'example.com email list',
  ],
});


export default function GenerateRandomEmailsPage() {
  return (
    <main className={cn('flex-1')}>
      <div className={cn('container mx-auto max-w-6xl px-4 pb-20 sm:px-6')}>
        <PageBreadcrumb items={[{ label: 'Random email generator' }]} />
        <GenerateRandomEmailsToolContent />
        <ToolPageDetails toolLink='/tools/generate-random-emails' faqs={emailFaqs} />
      </div>
    </main>
  );
}
