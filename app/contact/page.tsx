import type { Metadata } from 'next';
import { ContactContent } from '@/components/contact/contact-content';
import { PageBreadcrumb } from '@/components/shared/page-breadcrumb';
import { cn } from '@/lib/utils';

export const metadata: Metadata = {
  title: 'Contact Us — toolcalcs.net',
  description:
    'Get in touch with the toolcalcs.net team. Ask a question, report a bug, or share feedback — we read every message.',
};

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
