'use client';

import { useSyncExternalStore } from 'react';

import { readConsent, subscribeToConsent, type ConsentChoice } from '@/lib/consent';

/** The visitor's saved cookie choice; null until they decide (and during server render). */
export function useConsent(): ConsentChoice | null {
  return useSyncExternalStore(subscribeToConsent, readConsent, () => null);
}
