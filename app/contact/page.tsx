import type { Metadata } from 'next';
import { ContactContent } from '@/components/contact/contact-content';
import { PageBreadcrumb } from '@/components/shared/page-breadcrumb';
import { cn } from '@/lib/utils';
import { siteDomain } from '@/lib/site-config';

export const metadata: Metadata = {
  title: 'Contact Us',
  description:
    `Have a question, found a bug, or want to share feedback? Reach out to the ${siteDomain} team — we read every message and respond as quickly as we can.`,
  keywords: ['contact toolcalcs', 'support', 'feedback', 'report a bug'],
  openGraph: {
    title: `Contact Us | ${siteDomain}`,
    description:
      `Have a question or found a bug? Reach out to the ${siteDomain} team — we read every message.`,
    url: '/contact',
  },
  twitter: {
    title: `Contact Us | ${siteDomain}`,
    description:
      `Have a question or found a bug? Reach out to the ${siteDomain} team — we read every message.`,
  },
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
