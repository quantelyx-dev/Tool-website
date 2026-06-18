import type { Metadata } from 'next';
import { AboutContent } from '@/components/about/about-content';
import { PageBreadcrumb } from '@/components/shared/page-breadcrumb';
import { cn } from '@/lib/utils';
import { siteDomain } from '@/lib/site-config';

export const metadata: Metadata = {
  title: 'About Us',
  description:
    `Learn the story behind ${siteDomain} — a free, privacy-first toolkit for developers and curious minds. No ads, no tracking, no sign-up required.`,
  keywords: ['about toolcalcs', 'free online tools', 'developer utilities', 'privacy-first tools'],
  openGraph: {
    title: `About Us | ${siteDomain}`,
    description:
      `Learn the story behind ${siteDomain} — a free, privacy-first suite of online tools built for developers, designers, and curious minds.`,
    url: '/about',
  },
  twitter: {
    title: `About Us | ${siteDomain}`,
    description:
      `Learn the story behind ${siteDomain} — a free, privacy-first suite of online tools built for developers, designers, and curious minds.`,
  },
};

export default function AboutPage() {
  return (
    <main className={cn('flex-1')}>
      <div className={cn('container mx-auto max-w-5xl', 'px-4 pb-20 sm:px-6')}>
        <PageBreadcrumb items={[{ label: 'About' }]} />
        <AboutContent />
      </div>
    </main>
  );
}
