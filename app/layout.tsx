import type { Metadata } from 'next';
import { Geist_Mono, Inter } from 'next/font/google';
import { GoogleAnalytics } from '@next/third-parties/google';
import './globals.css';
import { cn } from '@/lib/utils';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { ThemeProvider } from '@/components/theme-provider';
import { ClarityAnalytics } from '@/components/clarity-analytics';
import { Toaster } from '@/components/lazy-toaster';
import { siteUrl, siteDomain } from '@/lib/site-config';

const GA_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID ?? '';
const CLARITY_PROJECT_ID = process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID ?? '';

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${siteDomain} — Free Online Tools & Calculators`,
    template: `%s | ${siteDomain}`,
  },
  description:
    'Free online tools and calculators for developers and everyday tasks. Generate test data, calculate finances, and explore astrology — fast, private, no sign-up.',
  keywords: ['online tools', 'free calculators', 'developer tools', 'test data generator', 'toolcalcs'],
  openGraph: {
    siteName: siteDomain,
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang='en'
      suppressHydrationWarning
      className={cn(
        'h-full',
        'antialiased',
        geistMono.variable,
        'font-sans',
        inter.variable,
      )}>
      <body className='min-h-full flex flex-col'>
        <ThemeProvider
          attribute='class'
          defaultTheme='system'
          enableSystem
          disableTransitionOnChange>
          <Navbar />
          {children}
          <Footer />
          <Toaster />
        </ThemeProvider>
        {CLARITY_PROJECT_ID && <ClarityAnalytics projectId={CLARITY_PROJECT_ID} />}
      </body>
      {GA_ID && <GoogleAnalytics gaId={GA_ID} />}
    </html>
  );
}
