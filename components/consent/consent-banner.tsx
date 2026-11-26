'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';

import { Button } from '@/components/ui/button';
import { useConsent } from '@/hooks/use-consent';
import { CONSENT_OPEN_EVENT, saveConsent } from '@/lib/consent';
import { cn } from '@/lib/utils';

/** Waits until after load so the banner never competes with the page's first paint. */
const SHOW_DELAY_MS = 1500;

export function ConsentBanner() {
  const choice = useConsent();
  const [ready, setReady] = useState(false);
  const [openRequests, setOpenRequests] = useState(0);
  const bannerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const timer = window.setTimeout(() => setReady(true), SHOW_DELAY_MS);
    return () => window.clearTimeout(timer);
  }, []);

  // "Cookie settings" must visibly respond even when the banner is already open.
  useEffect(() => {
    function open() {
      setReady(true);
      setOpenRequests(count => count + 1);
    }
    window.addEventListener(CONSENT_OPEN_EVENT, open);
    return () => window.removeEventListener(CONSENT_OPEN_EVENT, open);
  }, []);

  useEffect(() => {
    if (openRequests > 0) bannerRef.current?.focus();
  }, [openRequests]);

  if (!ready || choice !== null) return null;

  return (
    <section
      ref={bannerRef}
      role='dialog'
      aria-modal='false'
      aria-labelledby='cookie-consent-title'
      aria-describedby='cookie-consent-description'
      tabIndex={-1}
      className={cn(
        'fixed inset-x-3 bottom-3 z-50 rounded-xl border bg-background p-4 shadow-lg outline-none focus:ring-3 focus:ring-indigo-500',
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
