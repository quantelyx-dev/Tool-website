'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import { ABOUT_MISSION, ABOUT_STORY } from '@/lib/about-data';
import {
  fadeUpVariants,
  staggerContainerVariants,
} from '@/components/about/about-motion';

type AboutMissionProps = {
  className?: string;
};

export function AboutMission({ className }: AboutMissionProps) {
  const reducedMotion = useReducedMotion();

  return (
    <motion.section
      className={cn(className)}
      initial='hidden'
      animate='visible'
      variants={staggerContainerVariants(reducedMotion)}>
      <motion.div variants={fadeUpVariants(reducedMotion)}>
        <h2 className='font-heading text-xl font-semibold tracking-tight text-foreground sm:text-2xl'>
          Why we built Tools
        </h2>
        <p className='mt-4 max-w-3xl text-pretty text-sm leading-relaxed text-muted-foreground sm:text-base'>
          {ABOUT_MISSION}
        </p>
      </motion.div>
      <motion.div className='mt-8' variants={fadeUpVariants(reducedMotion)}>
        <Separator className='max-w-md' />
      </motion.div>
      <motion.div className='mt-8' variants={fadeUpVariants(reducedMotion)}>
        <h3 className='font-heading text-lg font-semibold tracking-tight text-foreground'>
          Our story
        </h3>
        <p className='mt-3 max-w-3xl text-pretty text-sm leading-relaxed text-muted-foreground sm:text-base'>
          {ABOUT_STORY}
        </p>
      </motion.div>
    </motion.section>
  );
}
