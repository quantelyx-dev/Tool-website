'use client';

import { useEffect } from 'react';
import Clarity from '@microsoft/clarity';

type ClarityAnalyticsProps = {
  projectId: string;
};

// Clarity has no built-in JS-error capture, so unhandled errors/rejections are
// tagged and used to upgrade (prioritize) the session recording for review.
export function ClarityAnalytics({ projectId }: ClarityAnalyticsProps) {
  useEffect(() => {
    Clarity.init(projectId);

    function handleError(event: ErrorEvent) {
      Clarity.setTag('js_error', event.message);
      Clarity.event('js_error');
      Clarity.upgrade('js_error');
    }

    function handleRejection(event: PromiseRejectionEvent) {
      const reason = event.reason instanceof Error ? event.reason.message : String(event.reason);
      Clarity.setTag('unhandled_rejection', reason);
      Clarity.event('unhandled_rejection');
      Clarity.upgrade('unhandled_rejection');
    }

    window.addEventListener('error', handleError);
    window.addEventListener('unhandledrejection', handleRejection);

    return () => {
      window.removeEventListener('error', handleError);
      window.removeEventListener('unhandledrejection', handleRejection);
    };
  }, [projectId]);

  return null;
}
