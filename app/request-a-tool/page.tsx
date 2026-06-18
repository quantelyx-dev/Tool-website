import type { Metadata } from 'next';
import { RequestToolContent } from '@/components/request-tool/request-tool-content';
import { PageBreadcrumb } from '@/components/shared/page-breadcrumb';
import { cn } from '@/lib/utils';
import { siteDomain } from '@/lib/site-config';

export const metadata: Metadata = {
  title: 'Request a Tool',
  description:
    "Missing a tool you need? Submit a request and we'll consider it for our roadmap. We build based on real user demand — popular requests ship first.",
  keywords: ['request a tool', 'suggest a feature', 'toolcalcs roadmap', 'new tool request'],
  openGraph: {
    title: `Request a Tool | ${siteDomain}`,
    description:
      "Missing a tool? Submit a request and we'll consider it for our roadmap. Popular requests ship first.",
    url: '/request-a-tool',
  },
  twitter: {
    title: `Request a Tool | ${siteDomain}`,
    description:
      "Missing a tool? Submit a request and we'll consider it for our roadmap. Popular requests ship first.",
  },
};

export default function RequestAToolPage() {
  return (
    <main className={cn('flex-1')}>
      <div className={cn('container mx-auto max-w-5xl', 'px-4 pb-20 sm:px-6')}>
        <PageBreadcrumb items={[{ label: 'Request a tool' }]} />
        <RequestToolContent />
      </div>
    </main>
  );
}
