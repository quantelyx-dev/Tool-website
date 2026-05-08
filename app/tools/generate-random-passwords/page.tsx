import type { Metadata } from 'next';

import { GenerateRandomPasswordsToolContent } from '@/components/generate-random-passwords/generate-random-passwords-tool-content';
import { PageBreadcrumb } from '@/components/shared/page-breadcrumb';
import { cn } from '@/lib/utils';

export const metadata: Metadata = {
  title: 'Random password generator - Tools',
  description:
    'Generate secure random passwords in single or bulk mode with configurable length and character sets.',
};

export default function GenerateRandomPasswordsPage() {
  return (
    <main className={cn('flex-1')}>
      <div className={cn('container mx-auto max-w-6xl px-4 pb-20 sm:px-6')}>
        <PageBreadcrumb items={[{ label: 'Random password' }]} />
        <GenerateRandomPasswordsToolContent />
      </div>
    </main>
  );
}
