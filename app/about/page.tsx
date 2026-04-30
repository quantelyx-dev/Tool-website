import type { Metadata } from 'next';
import { AboutBreadcrumb } from '@/components/about/about-breadcrumb';
import { AboutContent } from '@/components/about/about-content';
import { cn } from '@/lib/utils';

export const metadata: Metadata = {
  title: 'About — Tools',
  description:
    'Learn about Tools: an all-in-one web suite for developer, design, and productivity utilities—fast, accessible, and privacy-minded.',
};

export default function AboutPage() {
  return (
    <main className={cn('flex-1')}>
      <div className={cn('container mx-auto max-w-5xl', 'px-4 pb-20 sm:px-6')}>
        <AboutBreadcrumb />
        <AboutContent />
      </div>
    </main>
  );
}
