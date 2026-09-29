'use client';

import ReactDOM from 'react-dom';
import Script from 'next/script';

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
