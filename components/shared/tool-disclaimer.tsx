import { InfoIcon } from 'lucide-react';

import { INDIANA_SOURCES } from '@/lib/indiana-child-support/guideline-constants';
import type { ToolContent } from '@/lib/tool-content/types';
import { cn } from '@/lib/utils';

type ToolDisclaimerProps = {
  toolLink: string;
  variant: NonNullable<ToolContent['disclaimer']>;
  className?: string;
};

const DISCLAIMER_TEXT: Record<NonNullable<ToolContent['disclaimer']>, string> = {
  estimate:
    'Estimates for informational purposes only — not tax, legal, or financial advice. Verify with a qualified professional / official source.',
  'test-data':
    'This data is fictional and for testing and demos only. You must not use it for fraud, impersonation, creating accounts on third-party services, or to deceive anyone.',
};

const CHILD_SUPPORT_LINK = '/tools/indiana-child-support-calculator';

/** The visible notice for money, legal, and test-data tools. */
export function ToolDisclaimer({ toolLink, variant, className }: ToolDisclaimerProps) {
  return (
    <aside
      role='note'
      aria-label='Important notice'
      data-slot='tool-disclaimer'
      className={cn(
        'mx-auto mt-8 flex max-w-3xl items-start gap-3 rounded-lg border border-amber-500/40 bg-amber-50 px-4 py-3 dark:bg-amber-950/30',
        className,
      )}>
      <InfoIcon
        className='mt-0.5 size-4 shrink-0 text-amber-700 dark:text-amber-400'
        aria-hidden
      />
      <p className='text-sm leading-relaxed text-foreground'>
        {DISCLAIMER_TEXT[variant]}
        {toolLink === CHILD_SUPPORT_LINK ? (
          <>
            {' '}
            Read the{' '}
            <a
              href={INDIANA_SOURCES[0].href}
              target='_blank'
              rel='noopener noreferrer'
              className='font-medium underline underline-offset-2'>
              official Indiana Child Support Guidelines
            </a>
            .
          </>
        ) : null}
      </p>
    </aside>
  );
}
