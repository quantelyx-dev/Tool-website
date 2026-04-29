import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { FacebookIcon, TwitterIcon, InstagramIcon } from '@/components/icons';

export function Footer() {
  return (
    <footer className='border-t border-zinc-200 dark:border-zinc-800 py-12'>
      <div className='container mx-auto px-4 sm:px-6'>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-12 items-center'>
          {/* Logo and Copyright */}
          <div className='flex flex-col items-center md:items-start gap-4'>
            <div className='flex items-center gap-2'>
              <div className='h-6 w-6 rounded bg-indigo-600 flex items-center justify-center'>
                <span className='text-white font-bold text-sm'>T</span>
              </div>
              <span className='text-lg font-bold'>Tools</span>
            </div>
            <p className='text-xs text-zinc-500'>
              © 2024 Tools Inc. All rights reserved.
            </p>
          </div>

          {/* Links */}
          <div className='flex justify-center gap-8'>
            <Link
              href='#'
              className='text-sm text-zinc-600 hover:text-indigo-600 dark:text-zinc-400'>
              Privacy Policy
            </Link>
            <Link
              href='#'
              className='text-sm text-zinc-600 hover:text-indigo-600 dark:text-zinc-400'>
              Terms of Service
            </Link>
          </div>

          {/* Social Icons */}
          <div className='flex justify-center md:justify-end gap-6'>
            <Button variant='ghost' size='icon' asChild>
              <Link href='#' aria-label='Facebook'>
                <FacebookIcon className='size-5' />
              </Link>
            </Button>
            <Button variant='ghost' size='icon' asChild>
              <Link href='#' aria-label='Twitter'>
                <TwitterIcon className='size-5' />
              </Link>
            </Button>
            <Button variant='ghost' size='icon' asChild>
              <Link href='#' aria-label='Instagram'>
                <InstagramIcon className='size-5' />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </footer>
  );
}
