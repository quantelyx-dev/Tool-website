'use client';

import ReactDOM from 'react-dom';
import Script from 'next/script';

import { CONSENT_STORAGE_KEY } from '@/lib/consent';

type GoogleAnalyticsProps = {
  gaId: string;
};

export function GoogleAnalytics({ gaId }: GoogleAnalyticsProps) {
  ReactDOM.preconnect('https://www.googletagmanager.com');

  return (
    <>
      <Script id='ga-init' strategy='afterInteractive'>
        {`window.dataLayer = window.dataLayer || [];
        function gtag(){window.dataLayer.push(arguments);}
        window.gtag = window.gtag || gtag;
        gtag('consent', 'default', {
          ad_storage: 'denied',
          ad_user_data: 'denied',
          ad_personalization: 'denied',
          analytics_storage: 'denied',
          wait_for_update: 500
        });
        try {
          if (window.localStorage.getItem('${CONSENT_STORAGE_KEY}') === 'granted') {
            gtag('consent', 'update', {
              ad_storage: 'granted',
              ad_user_data: 'granted',
              ad_personalization: 'granted',
              analytics_storage: 'granted'
            });
          }
        } catch (e) {}
        gtag('js', new Date());
        gtag('config', '${gaId}');`}
      </Script>
      <Script
        id='ga-script'
        src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
        strategy='lazyOnload'
      />
    </>
  );
}
