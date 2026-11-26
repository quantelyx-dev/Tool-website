import type { Metadata } from 'next';
import { ContactContent } from '@/components/contact/contact-content';
import { PageBreadcrumb } from '@/components/shared/page-breadcrumb';
import { createPageMetadata } from '@/lib/seo/metadata';
import { cn } from '@/lib/utils';

export const metadata: Metadata = createPageMetadata({
  title: 'Contact Us',
  description:
    'Contact toolcalcs.net by email or form to ask a question, report a wrong result or a bug, or share feedback about a tool.',
  path: '/contact',
  keywords: ['contact toolcalcs', 'support', 'feedback', 'report a bug'],
});

export default function ContactPage() {
  return (
    <main className={cn('flex-1')}>
      <div className={cn('container mx-auto max-w-5xl', 'px-4 pb-20 sm:px-6')}>
        <PageBreadcrumb items={[{ label: 'Contact' }]} />
        <ContactContent />
      </div>
    </main>
  );
}
