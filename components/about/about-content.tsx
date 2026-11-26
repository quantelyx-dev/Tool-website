import Link from 'next/link';

import { INDIANA_SOURCES } from '@/lib/indiana-child-support/guideline-constants';
import { BRAND_NAME, CONTACT_EMAIL, OWNER } from '@/lib/site-config';
import { cn } from '@/lib/utils';

const HEADING_CLASS = 'mt-10 mb-3 text-xl font-semibold tracking-tight sm:text-2xl';
const TEXT_CLASS = 'mb-3 text-[15px] leading-[1.75] text-muted-foreground';
const LINK_CLASS = 'underline underline-offset-2 hover:text-foreground';

export function AboutContent({ className }: { className?: string }) {
  return (
    <div className={cn('max-w-3xl py-6', className)}>
      <h1 className='mb-4 text-3xl font-bold tracking-tight sm:text-4xl'>About Us</h1>
      <p className={TEXT_CLASS}>
        {BRAND_NAME} is a free collection of calculators, test-data generators, and
        developer utilities. You can use every tool without creating an account.
      </p>

      <h2 className={HEADING_CLASS}>Who runs this site</h2>
      <p className={TEXT_CLASS}>
        {OWNER.name
          ? `${OWNER.name} runs ${BRAND_NAME} from ${OWNER.location}.`
          : `${BRAND_NAME} is an independent website run from ${OWNER.location}.`}
      </p>
      {OWNER.bio ? <p className={TEXT_CLASS}>{OWNER.bio}</p> : null}

      <h2 className={HEADING_CLASS}>Why it exists</h2>
      <p className={TEXT_CLASS}>
        Many everyday jobs, such as checking a schedule expression, estimating a
        paycheck, or filling a test database, need only a small tool. The aim of this
        site is to keep those tools in one place and to explain on each page how the
        result is produced, so you can judge whether to rely on it.
      </p>

      <h2 className={HEADING_CLASS}>How tools are built and checked</h2>
      <p className={TEXT_CLASS}>
        Each tool page describes the method it uses, walks through an example, and
        lists what the tool does not cover. Where a result depends on published
        rules, we say which ones:
      </p>
      <ul className={cn(TEXT_CLASS, 'ml-5 list-disc space-y-2')}>
        <li>
          The paycheck calculator uses 2026 federal tax brackets, the 2026 standard
          deduction, and 2026 Social Security and Medicare figures.
        </li>
        <li>
          The child support calculator follows the{' '}
          <a
            href={INDIANA_SOURCES[0].href}
            target='_blank'
            rel='noopener noreferrer'
            className={LINK_CLASS}>
            Indiana Child Support Guidelines
          </a>{' '}
          as updated May 14, 2024. Its parenting time credit reproduces the worked
          example in those Guidelines.
        </li>
        <li>
          Test phone numbers, email domains, and IP addresses come from ranges that
          are reserved for fiction, testing, or documentation.
        </li>
      </ul>
      <p className={TEXT_CLASS}>
        These checks reduce errors but cannot rule them out. Estimates are not tax,
        legal, or financial advice; see the{' '}
        <Link href='/disclaimer' className={LINK_CLASS}>
          Disclaimer
        </Link>
        .
      </p>

      {/* TODO(owner): replace with your real review schedule if you commit to one. */}
      <h2 className={HEADING_CLASS}>How content is kept up to date</h2>
      <p className={TEXT_CLASS}>
        Guides show the date they were last updated. Some content has to change when
        official figures change: US tax figures are set for each tax year, and
        Indiana reviews its child support Guidelines periodically. Tool pages are
        revised when a tool or the rules behind it change. If you spot a mistake,
        please report it with the inputs you used so it can be checked and corrected.
      </p>

      <h2 className={HEADING_CLASS}>Contact</h2>
      <p className={TEXT_CLASS}>
        Email{' '}
        <a href={`mailto:${CONTACT_EMAIL}`} className={LINK_CLASS}>
          {CONTACT_EMAIL}
        </a>{' '}
        or use the{' '}
        <Link href='/contact' className={LINK_CLASS}>
          Contact page
        </Link>
        . To suggest a new tool, use{' '}
        <Link href='/request-a-tool' className={LINK_CLASS}>
          Request a tool
        </Link>
        .
      </p>
    </div>
  );
}
