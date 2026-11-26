import Link from 'next/link';
import { FooterSocialLinks } from '@/components/footer-social-links';
import { CookieSettingsButton } from '@/components/consent/cookie-settings-button';
import { currentCalendarYear } from '@/lib/datetime';
import { BRAND_NAME } from '@/lib/site-config';

export function Footer() {
  return (
    <footer className='border-t border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-950/50'>
      <div className='container mx-auto px-4 sm:px-6'>
        <div className='flex flex-col md:flex-row justify-between items-center gap-8 py-12'>
          {/* Logo Section */}
          <div className='flex flex-col items-center md:items-start gap-4'>
            <Link href='/' className='flex items-center gap-2 group'>
              <div className='h-6 w-6 rounded bg-indigo-600 flex items-center justify-center'>
                <span className='text-white font-bold text-sm'>T</span>
              </div>
              <span className='text-lg font-bold tracking-tight'>{BRAND_NAME}</span>
            </Link>
          </div>

          {/* Navigation Links */}
          <nav className='flex flex-wrap justify-center gap-x-8 gap-y-4'>
            <Link
              href='/about'
              prefetch={false}
              className='text-sm font-medium text-zinc-600 hover:text-indigo-600 dark:text-zinc-400 dark:hover:text-indigo-400 transition-colors'>
              About
            </Link>
            <Link
              href='/blog'
              prefetch={false}
              className='text-sm font-medium text-zinc-600 hover:text-indigo-600 dark:text-zinc-400 dark:hover:text-indigo-400 transition-colors'>
              Blog
            </Link>
            <Link
              href='/contact'
              prefetch={false}
              className='text-sm font-medium text-zinc-600 hover:text-indigo-600 dark:text-zinc-400 dark:hover:text-indigo-400 transition-colors'>
              Contact
            </Link>
            <Link
              href='/privacy-policy'
              prefetch={false}
              className='text-sm font-medium text-zinc-600 hover:text-indigo-600 dark:text-zinc-400 dark:hover:text-indigo-400 transition-colors'>
              Privacy Policy
            </Link>
            <Link
              href='/terms-of-service'
              prefetch={false}
              className='text-sm font-medium text-zinc-600 hover:text-indigo-600 dark:text-zinc-400 dark:hover:text-indigo-400 transition-colors'>
              Terms of Service
            </Link>
            <Link
              href='/disclaimer'
              prefetch={false}
              className='text-sm font-medium text-zinc-600 hover:text-indigo-600 dark:text-zinc-400 dark:hover:text-indigo-400 transition-colors'>
              Disclaimer
            </Link>
            <CookieSettingsButton className='text-sm font-medium text-zinc-600 hover:text-indigo-600 dark:text-zinc-400 dark:hover:text-indigo-400 transition-colors' />
          </nav>

          <FooterSocialLinks />
        </div>

        {/* Copyright Section */}
        <p className='text-center pb-5 text-xs text-zinc-500 dark:text-zinc-400 font-medium'>
          © {currentCalendarYear()} {BRAND_NAME}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
