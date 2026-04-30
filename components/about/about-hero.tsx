'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { fadeUpVariants } from '@/lib/motion-variants';

type AboutHeroProps = {
  className?: string;
};

export function AboutHero({ className }: AboutHeroProps) {
  const reducedMotion = useReducedMotion();

  return (
    <header className={cn('relative', className)}>
      <div
        aria-hidden
        className={cn(
          'pointer-events-none absolute inset-0 -z-10 overflow-hidden rounded-3xl',
          'bg-[radial-gradient(ellipse_80%_60%_at_50%_-30%,rgba(79,70,229,0.18),transparent)]',
          'dark:bg-[radial-gradient(ellipse_80%_60%_at_50%_-30%,rgba(129,140,248,0.16),transparent)]',
        )}
      />
      <motion.div
        className='mx-auto max-w-3xl px-1 pt-4 text-center sm:px-4'
        initial='hidden'
        animate='visible'
        variants={fadeUpVariants(reducedMotion)}>
        <p className='mb-3 text-xs font-semibold uppercase tracking-[0.22em] text-indigo-600 dark:text-indigo-400 sm:text-sm'>
          About Tools
        </p>
        <h1 className='font-heading text-balance text-3xl font-semibold tracking-tight text-foreground sm:text-4xl lg:text-5xl'>
          A sleek suite of utilities for people who ship.
        </h1>
        <p className='mx-auto mt-5 max-w-2xl text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg'>
          Tools is the web app built to replace scattered bookmarks with one
          calm, fast surface—whether you are formatting JSON, converting units,
          or polishing assets before release.
        </p>
      </motion.div>
    </header>
  );
}
