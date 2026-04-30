'use client';

import { motion, useReducedMotion } from 'framer-motion';
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { ABOUT_PILLARS } from '@/lib/about-data';
import { cn } from '@/lib/utils';
import {
  cardItemVariants,
  staggerContainerVariants,
} from '@/lib/motion-variants';

type AboutPillarsProps = {
  className?: string;
};

export function AboutPillars({ className }: AboutPillarsProps) {
  const reducedMotion = useReducedMotion();

  return (
    <motion.section
      className={cn(className)}
      initial='hidden'
      animate='visible'
      variants={staggerContainerVariants(reducedMotion, 0.1)}>
      <motion.div
        className='mb-8 max-w-2xl'
        variants={cardItemVariants(reducedMotion)}>
        <h2 className='font-heading text-xl font-semibold tracking-tight text-foreground sm:text-2xl'>
          What we stand for
        </h2>
        <p className='mt-2 text-sm text-muted-foreground sm:text-base'>
          Principles that guide every screen and every utility in the suite.
        </p>
      </motion.div>
      <ul
        className={cn(
          'grid gap-4 sm:grid-cols-2 sm:gap-5',
          'lg:gap-6',
        )}>
        {ABOUT_PILLARS.map((pillar) => (
          <motion.li key={pillar.title} variants={cardItemVariants(reducedMotion)}>
            <Card
              size='sm'
              className={cn(
                'h-full transition-shadow duration-300',
                'hover:shadow-md hover:ring-indigo-500/15 dark:hover:ring-indigo-400/20',
              )}>
              <CardHeader className='gap-3'>
                <div
                  className={cn(
                    'flex size-10 items-center justify-center rounded-lg',
                    'bg-indigo-600/10 text-indigo-600 dark:bg-indigo-400/15 dark:text-indigo-400',
                  )}
                  aria-hidden>
                  <pillar.icon className='size-5' strokeWidth={1.75} />
                </div>
                <CardTitle className='text-base font-semibold sm:text-[1.05rem]'>
                  {pillar.title}
                </CardTitle>
                <CardDescription className='text-sm leading-relaxed'>
                  {pillar.description}
                </CardDescription>
              </CardHeader>
            </Card>
          </motion.li>
        ))}
      </ul>
    </motion.section>
  );
}
