'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

import { Button } from '@/components/ui/button';
import { useConsent } from '@/hooks/use-consent';
import { saveConsent } from '@/lib/consent';
import { cn } from '@/lib/utils';

/** Waits until after load so the banner never competes with the page's first paint. */
const SHOW_DELAY_MS = 1500;

export const CONSENT_BANNER_ID = 'cookie-consent';

export function ConsentBanner() {
  const choice = useConsent();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => setReady(true), SHOW_DELAY_MS);
    return () => window.clearTimeout(timer);
  }, []);

  if (!ready || choice !== null) return null;

  return (
    <section
      id={CONSENT_BANNER_ID}
      role='dialog'
      aria-modal='false'
      aria-labelledby='cookie-consent-title'
      aria-describedby='cookie-consent-description'
      tabIndex={-1}
      className={cn(
        'fixed inset-x-3 bottom-3 z-50 rounded-xl border bg-background p-4 shadow-lg outline-none',
        'sm:inset-x-auto sm:bottom-4 sm:left-4 sm:max-w-md',
        'animate-in fade-in slide-in-from-bottom-3 duration-300 motion-reduce:animate-none',
      )}>
      <h2 id='cookie-consent-title' className='text-sm font-semibold'>
        Cookies &amp; privacy
      </h2>
      <p id='cookie-consent-description' className='mt-1.5 text-sm text-muted-foreground'>
        We use cookies to understand how the site is used and, where enabled, to show relevant
        ads. You can accept or reject them, and change your mind any time from Cookie settings
        in the footer. See our{' '}
        <Link href='/privacy-policy' className='underline underline-offset-2 hover:text-foreground'>
          Privacy Policy
        </Link>
        .
      </p>
      <div className='mt-3 grid grid-cols-2 gap-2'>
        <Button type='button' variant='outline' onClick={() => saveConsent('denied')}>
          Reject
        </Button>
        <Button type='button' onClick={() => saveConsent('granted')}>
          Accept
        </Button>
      </div>
    </section>
  );
}
