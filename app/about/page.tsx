import type { Metadata } from 'next';
import { AboutContent } from '@/components/about/about-content';
import { PageBreadcrumb } from '@/components/shared/page-breadcrumb';
import { createPageMetadata } from '@/lib/seo/metadata';
import { cn } from '@/lib/utils';

export const metadata: Metadata = createPageMetadata({
  title: 'About Us',
  description:
    'Who runs toolcalcs.net, why it exists, how its tools are built and checked, how content is kept up to date, and how to get in touch.',
  path: '/about',
  keywords: ['about toolcalcs', 'free online tools', 'developer utilities'],
});

export default function AboutPage() {
  return (
    <main className={cn('flex-1')}>
      <div className={cn('container mx-auto max-w-5xl', 'px-4 pb-20 sm:px-6')}>
        <PageBreadcrumb items={[{ label: 'About Us' }]} />
        <AboutContent />
      </div>
    </main>
  );
}
