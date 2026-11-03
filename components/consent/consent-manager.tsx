'use client';

import { ClarityAnalytics } from '@/components/clarity-analytics';
import { ConsentBanner } from '@/components/consent/consent-banner';
import { useConsent } from '@/hooks/use-consent';

type ConsentManagerProps = {
  clarityProjectId: string;
};

/** Shows the cookie banner and loads Clarity only after the visitor accepts. */
export function ConsentManager({ clarityProjectId }: ConsentManagerProps) {
  const choice = useConsent();

  return (
    <>
      {clarityProjectId && choice === 'granted' ? (
        <ClarityAnalytics projectId={clarityProjectId} />
      ) : null}
      <ConsentBanner />
    </>
  );
}
