'use client';

import { CONSENT_BANNER_ID } from '@/components/consent/consent-banner';
import { resetConsent } from '@/lib/consent';
import { cn } from '@/lib/utils';

type CookieSettingsButtonProps = {
  className?: string;
};

/** Lets visitors withdraw or change their cookie choice at any time. */
export function CookieSettingsButton({ className }: CookieSettingsButtonProps) {
  function handleClick() {
    resetConsent();
    requestAnimationFrame(() => {
      document.getElementById(CONSENT_BANNER_ID)?.focus();
    });
  }

  return (
    <button type='button' onClick={handleClick} className={cn(className)}>
      Cookie settings
    </button>
  );
}
