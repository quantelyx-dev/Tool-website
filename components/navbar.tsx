import Link from 'next/link';
import { ThemeToggle } from '@/components/theme-toggle';

export function Navbar() {
  return (
    <nav className='sticky top-0 z-50 w-full border-b border-zinc-200 bg-white/80 backdrop-blur-md dark:border-zinc-800 dark:bg-black/80'>
      <div className='container mx-auto flex h-16 items-center justify-between px-4 sm:px-6'>
        <div className='flex items-center gap-2'>
          <div className='h-8 w-8 rounded-lg bg-indigo-600 flex items-center justify-center'>
            <span className='text-white font-bold text-xl'>T</span>
          </div>
          <span className='text-xl font-bold tracking-tight'>Tools</span>
        </div>

        <div className='hidden md:flex items-center gap-8'>
          <Link
            href='/'
            className='text-sm font-medium hover:text-indigo-600 transition-colors'>
            Home
          </Link>
          <Link
            href='/about'
            className='text-sm font-medium hover:text-indigo-600 transition-colors'>
            About Us
          </Link>
          <Link
            href='/request-a-tool'
            className='text-sm font-medium hover:text-indigo-600 transition-colors'>
            Request a tool
          </Link>
        </div>

        <ThemeToggle />
      </div>
    </nav>
  );
}
