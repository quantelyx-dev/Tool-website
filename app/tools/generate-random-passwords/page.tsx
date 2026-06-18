import type { Metadata } from 'next';

import { GenerateRandomPasswordsToolContent } from '@/components/generate-random-passwords/generate-random-passwords-tool-content';
import { PageBreadcrumb } from '@/components/shared/page-breadcrumb';
import { ToolFaqSection } from '@/components/shared/tool-faq-section';
import { passwordFaqs } from '@/lib/tool-faqs';
import { cn } from '@/lib/utils';
import { siteDomain } from '@/lib/site-config';

export const metadata: Metadata = {
  title: 'Random Password Generator — Strong Passwords',
  description:
    'Create strong, random passwords with customizable length and character sets. Every password is zxcvbn-scored so you know how secure it is before use.',
  keywords: [
    'random password generator',
    'strong password generator',
    'secure password generator',
    'password strength checker',
    'bulk password generator',
    'free password generator',
  ],
  openGraph: {
    title: `Random Password Generator — Strong Passwords | ${siteDomain}`,
    description:
      'Create strong, random passwords with customizable length and character sets. Every password is scored with zxcvbn strength analysis.',
    url: '/tools/generate-random-passwords',
  },
  twitter: {
    title: `Random Password Generator — Strong Passwords | ${siteDomain}`,
    description:
      'Create strong, random passwords with customizable length and character sets. Strength scored with zxcvbn.',
  },
};


export default function GenerateRandomPasswordsPage() {
  return (
    <main className={cn('flex-1')}>
      <div className={cn('container mx-auto max-w-6xl px-4 pb-20 sm:px-6')}>
        <PageBreadcrumb items={[{ label: 'Random password generator' }]} />
        <GenerateRandomPasswordsToolContent />
        <ToolFaqSection faqs={passwordFaqs} />
      </div>
    </main>
  );
}
