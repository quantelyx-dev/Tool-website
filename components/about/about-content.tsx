'use client';

import { AboutCta } from '@/components/about/about-cta';
import { AboutHero } from '@/components/about/about-hero';
import { AboutMission } from '@/components/about/about-mission';
import { AboutPillars } from '@/components/about/about-pillars';
import { cn } from '@/lib/utils';

type AboutContentProps = {
  className?: string;
};

export function AboutContent({ className }: AboutContentProps) {
  return (
    <div className={cn('flex flex-col', className)}>
      <AboutHero />
      <AboutMission className='mt-16 sm:mt-20 lg:mt-24' />
      <AboutPillars className='mt-16 sm:mt-20 lg:mt-24' />
      <AboutCta className='mt-16 sm:mt-20 lg:mt-24' />
    </div>
  );
}
