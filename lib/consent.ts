'use client';

import { getGtag } from '@/lib/analytics';

export const CONSENT_STORAGE_KEY = 'tools:consent:v1';

export type ConsentChoice = 'granted' | 'denied';

const CHANGE_EVENT = 'tools:consent-change';

/** The saved choice, or null when the visitor has not decided (or storage is unavailable). */
export function readConsent(): ConsentChoice | null {
  try {
    const value = window.localStorage.getItem(CONSENT_STORAGE_KEY);
    return value === 'granted' || value === 'denied' ? value : null;
  } catch {
    return null;
  }
}

/** Tells Google tags what the visitor allows. `null` (withdrawn) counts as denied. */
function updateGoogleConsent(choice: ConsentChoice | null) {
  const state = choice === 'granted' ? 'granted' : 'denied';
  try {
    getGtag()('consent', 'update', {
      ad_storage: state,
      ad_user_data: state,
      ad_personalization: state,
      analytics_storage: state,
    });
  } catch {
    // gtag unavailable — nothing to update.
  }
}

function revokeClarity() {
  try {
    window.clarity?.('consent', false);
  } catch {
    // Clarity not loaded — nothing to revoke.
  }
}

function persist(choice: ConsentChoice | null) {
  try {
    if (choice) window.localStorage.setItem(CONSENT_STORAGE_KEY, choice);
    else window.localStorage.removeItem(CONSENT_STORAGE_KEY);
  } catch {
    // Storage blocked — the choice lasts only for this page view.
  }
  window.dispatchEvent(new Event(CHANGE_EVENT));
}

/**
 * Called only from visitor actions (never during render or hydration), so Google's
 * "default denied, then update" ordering from the GA bootstrap script is preserved.
 */
export function saveConsent(choice: ConsentChoice) {
  persist(choice);
  updateGoogleConsent(choice);
  if (choice === 'denied') revokeClarity();
}

/** Withdraws consent and brings the banner back. */
export function resetConsent() {
  persist(null);
  updateGoogleConsent(null);
  revokeClarity();
}

export function subscribeToConsent(onChange: () => void): () => void {
  window.addEventListener(CHANGE_EVENT, onChange);
  window.addEventListener('storage', onChange);
  return () => {
    window.removeEventListener(CHANGE_EVENT, onChange);
    window.removeEventListener('storage', onChange);
  };
}
