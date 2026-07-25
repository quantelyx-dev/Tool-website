'use client';

import { useEffect } from 'react';
import Script from 'next/script';

type ClarityAnalyticsProps = {
  projectId: string;
};

declare global {
  interface Window {
    clarity?: {
      (...args: unknown[]): void;
      q?: unknown[];
    };
  }
}

function clarityCommand(...args: unknown[]) {
  window.clarity?.(...args);
}

// Clarity has no built-in JS-error capture, so unhandled errors/rejections are
// tagged and used to upgrade (prioritize) the session recording for review.
export function ClarityAnalytics({ projectId }: ClarityAnalyticsProps) {
  useEffect(() => {
    function handleError(event: ErrorEvent) {
      clarityCommand('set', 'js_error', event.message);
      clarityCommand('event', 'js_error');
      clarityCommand('upgrade', 'js_error');
    }

    function handleRejection(event: PromiseRejectionEvent) {
      const reason = event.reason instanceof Error ? event.reason.message : String(event.reason);
      clarityCommand('set', 'unhandled_rejection', reason);
      clarityCommand('event', 'unhandled_rejection');
      clarityCommand('upgrade', 'unhandled_rejection');
    }

    window.addEventListener('error', handleError);
    window.addEventListener('unhandledrejection', handleRejection);

    return () => {
      window.removeEventListener('error', handleError);
      window.removeEventListener('unhandledrejection', handleRejection);
    };
  }, []);

  return (
    <Script id='clarity-analytics' strategy='afterInteractive'>
      {`(function(c,l,a,r,i,t,y){
        c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
        t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
        y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
      })(window, document, "clarity", "script", "${projectId}");`}
    </Script>
  );
}
