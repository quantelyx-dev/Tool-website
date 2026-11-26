import Link from 'next/link';

import { INDIANA_SOURCES } from '@/lib/indiana-child-support/guideline-constants';
import { BRAND_NAME, CONTACT_EMAIL, LEGAL_EFFECTIVE_DATE } from '@/lib/site-config';
import { cn } from '@/lib/utils';

const HEADING_CLASS = 'mt-8 mb-2 text-lg font-semibold tracking-tight';
const TEXT_CLASS = 'mb-3 text-[15px] leading-[1.75] text-muted-foreground';
const LINK_CLASS = 'underline underline-offset-2 hover:text-foreground';

export function DisclaimerContent({ className }: { className?: string }) {
  return (
    <div className={cn('max-w-2xl py-6', className)}>
      <h1 className='mb-1 text-3xl font-bold tracking-tight'>Disclaimer</h1>
      <p className='mb-6 text-sm text-muted-foreground'>
        Effective date: {LEGAL_EFFECTIVE_DATE}
      </p>

      <h2 className={HEADING_CLASS}>General information only</h2>
      <p className={TEXT_CLASS}>
        The tools and articles on {BRAND_NAME} are provided for general information.
        We work to keep them accurate, but we do not guarantee that any result is
        complete, current, or correct for your situation. You use them at your own risk.
      </p>

      <h2 className={HEADING_CLASS}>Money and legal calculators</h2>
      <p className={TEXT_CLASS}>
        Results from the paycheck, compound interest, and child support calculators
        are estimates for informational purposes only — not tax, legal, or financial
        advice. Verify them with a qualified professional or an official source. Using
        the site does not create a professional or attorney-client relationship.
      </p>
      <p className={TEXT_CLASS}>
        {BRAND_NAME} is not affiliated with the Internal Revenue Service, any state
        tax agency, the State of Indiana, or any court. Indiana users should read the
        official{' '}
        <a
          href={INDIANA_SOURCES[0].href}
          target='_blank'
          rel='noopener noreferrer'
          className={LINK_CLASS}>
          Indiana Child Support Guidelines
        </a>
        .
      </p>

      <h2 className={HEADING_CLASS}>Test data generators</h2>
      <p className={TEXT_CLASS}>
        Generated names, usernames, emails, phone numbers, addresses, IP addresses,
        and similar values are for testing and demos only. You must not use them for
        fraud, impersonation, creating accounts on third-party services, or to deceive
        anyone. Some values, such as common names or generated addresses, can resemble
        real ones by coincidence.
      </p>

      <h2 className={HEADING_CLASS}>Other tools</h2>
      <p className={TEXT_CLASS}>
        Astrology results are for entertainment and reflection and are not scientific
        predictions. AI-generated speech can mispronounce words; review it before use,
        and never use it to impersonate a real person or mislead listeners.
      </p>

      <h2 className={HEADING_CLASS}>External links</h2>
      <p className={TEXT_CLASS}>
        Links to other websites are provided for convenience and as sources. We do not
        control their content and are not responsible for it.
      </p>

      <h2 className={HEADING_CLASS}>Questions and corrections</h2>
      <p className={TEXT_CLASS}>
        Email{' '}
        <a href={`mailto:${CONTACT_EMAIL}`} className={LINK_CLASS}>
          {CONTACT_EMAIL}
        </a>{' '}
        or use the{' '}
        <Link href='/contact' className={LINK_CLASS}>
          Contact page
        </Link>
        . See also our{' '}
        <Link href='/terms-of-service' className={LINK_CLASS}>
          Terms of Service
        </Link>{' '}
        and{' '}
        <Link href='/privacy-policy' className={LINK_CLASS}>
          Privacy Policy
        </Link>
        .
      </p>
    </div>
  );
}
