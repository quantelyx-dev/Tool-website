'use client';

import { CONSENT_OPEN_EVENT, resetConsent } from '@/lib/consent';
import { cn } from '@/lib/utils';

type CookieSettingsButtonProps = {
  className?: string;
};

/** Lets visitors withdraw or change their cookie choice at any time. */
export function CookieSettingsButton({ className }: CookieSettingsButtonProps) {
  // After AdSense approval, when Google's certified consent message replaces the
  // custom banner, replace the two calls below with:
  //   window.googlefc?.callbackQueue.push(() => window.googlefc.showRevocationMessage());
  function handleClick() {
    resetConsent();
    window.dispatchEvent(new Event(CONSENT_OPEN_EVENT));
  }

  return (
    <button type='button' onClick={handleClick} className={cn(className)}>
      Cookie settings
    </button>
  );
}
