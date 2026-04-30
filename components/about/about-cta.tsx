'use client';

import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRightIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { fadeUpVariants } from '@/components/about/about-motion';

type AboutCtaProps = {
  className?: string;
};

export function AboutCta({ className }: AboutCtaProps) {
  const reducedMotion = useReducedMotion();

  return (
    <motion.div
      className={cn(className)}
      initial='hidden'
      animate='visible'
      variants={fadeUpVariants(reducedMotion)}>
      <Card
        className={cn(
          'overflow-hidden border-indigo-500/20 bg-gradient-to-br from-indigo-500/[0.06] to-transparent',
          'dark:border-indigo-400/25 dark:from-indigo-500/10',
        )}>
        <CardHeader className='gap-2 pb-2 sm:flex-row sm:items-center sm:justify-between'>
          <div>
            <CardTitle className='text-lg sm:text-xl'>
              Ready to explore the suite?
            </CardTitle>
            <CardDescription className='mt-1 max-w-xl'>
              Jump back to the home page to search tools and get straight to
              work.
            </CardDescription>
          </div>
          <Button className='mt-4 w-full shrink-0 sm:mt-0 sm:w-auto' asChild>
            <Link href='/' className='gap-2'>
              Go to Tools
              <ArrowRightIcon className='size-4' aria-hidden />
            </Link>
          </Button>
        </CardHeader>
        <CardContent className='pb-6 pt-0'>
          <p className='text-xs text-muted-foreground'>
            Have an idea for a new utility? Use Request a tool in the navbar—we
            read every suggestion.
          </p>
        </CardContent>
      </Card>
    </motion.div>
  );
}
