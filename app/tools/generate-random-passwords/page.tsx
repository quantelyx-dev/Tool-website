import type { Metadata } from 'next';

import { GenerateRandomPasswordsToolContent } from '@/components/generate-random-passwords/generate-random-passwords-tool-content';
import { PageBreadcrumb } from '@/components/shared/page-breadcrumb';
import { ToolPageDetails } from '@/components/shared/tool-page-details';
import { passwordFaqs } from '@/lib/tool-faqs';
import { createPageMetadata } from '@/lib/seo/metadata';
import { cn } from '@/lib/utils';

export const metadata: Metadata = createPageMetadata({
  title: 'Random Password Generator',
  description:
    'Create random passwords in your browser with a custom length and character sets, each with a zxcvbn strength estimate.',
  path: '/tools/generate-random-passwords',
  keywords: [
    'random password generator',
    'strong password generator',
    'secure password generator',
    'password strength checker',
    'bulk password generator',
    'free password generator',
  ],
});


export default function GenerateRandomPasswordsPage() {
  return (
    <main className={cn('flex-1')}>
      <div className={cn('container mx-auto max-w-6xl px-4 pb-20 sm:px-6')}>
        <PageBreadcrumb items={[{ label: 'Random password generator' }]} />
        <GenerateRandomPasswordsToolContent />
        <ToolPageDetails toolLink='/tools/generate-random-passwords' faqs={passwordFaqs} />
      </div>
    </main>
  );
}
