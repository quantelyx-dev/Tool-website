'use client';

import { motion, useReducedMotion } from 'framer-motion';

import { Base64FilePanel } from '@/components/base64-tool/base64-file-panel';
import { Base64JwtPanel } from '@/components/base64-tool/base64-jwt-panel';
import { Base64TextPanel } from '@/components/base64-tool/base64-text-panel';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import { useAnalytics } from '@/hooks/use-analytics';
import {
  fadeUpVariants,
  staggerContainerVariants,
} from '@/lib/motion-variants';
import { cn } from '@/lib/utils';

export type Base64AnalyticsHandlers = ReturnType<typeof useAnalytics>;

type Base64ToolContentProps = {
  className?: string;
};

export function Base64ToolContent({ className }: Base64ToolContentProps) {
  const reducedMotion = useReducedMotion();
  const analytics = useAnalytics('base64-tool');

  return (
    <div className={cn('flex flex-col', className)}>
      <motion.section
        className={cn('flex flex-col')}
        initial='hidden'
        animate='visible'
        variants={staggerContainerVariants(reducedMotion, 0.1)}>
        <motion.header
          className={cn(
            'relative mx-auto max-w-3xl px-3 pt-2 text-center sm:px-4 sm:pt-4',
          )}
          variants={fadeUpVariants(reducedMotion)}>
          <div
            aria-hidden
            className={cn(
              'pointer-events-none absolute inset-0 -z-10 mx-auto max-w-xl overflow-hidden rounded-3xl',
              'bg-[radial-gradient(ellipse_72%_56%_at_50%_-30%,rgba(139,92,246,0.16),transparent)]',
              'dark:bg-[radial-gradient(ellipse_72%_56%_at_50%_-30%,rgba(167,139,250,0.15),transparent)]',
            )}
          />
          <p
            className={cn(
              'mb-3 text-xs font-semibold uppercase tracking-[0.2em]',
              'text-violet-700 dark:text-violet-400 sm:text-sm',
            )}>
            Developer utilities
          </p>
          <h1
            className={cn(
              'font-heading text-balance text-3xl font-semibold tracking-tight text-foreground',
              'sm:text-4xl lg:text-[2.25rem]',
            )}>
            Base64 encoder &amp; decoder
          </h1>
          <p
            className={cn(
              'mx-auto mt-5 max-w-2xl px-1 text-pretty text-base leading-relaxed text-muted-foreground',
              'sm:mt-6 sm:px-0 sm:text-lg',
            )}>
            Encode and decode text live as you type, turn files and images
            into Base64 data URIs, or decode a JWT to inspect its header and
            claims — all 100% client-side, nothing you enter ever leaves your
            browser.
          </p>
        </motion.header>

        <motion.div
          className={cn('mx-auto mt-8 w-full max-w-3xl')}
          variants={fadeUpVariants(reducedMotion)}>
          <Tabs defaultValue='text' className={cn('w-full gap-6')}>
            <TabsList className={cn('w-full sm:w-auto')}>
              <TabsTrigger value='text'>Text</TabsTrigger>
              <TabsTrigger value='file'>File &amp; image</TabsTrigger>
              <TabsTrigger value='jwt'>JWT decoder</TabsTrigger>
            </TabsList>

            <TabsContent value='text'>
              <Base64TextPanel analytics={analytics} />
            </TabsContent>
            <TabsContent value='file'>
              <Base64FilePanel analytics={analytics} />
            </TabsContent>
            <TabsContent value='jwt'>
              <Base64JwtPanel analytics={analytics} />
            </TabsContent>
          </Tabs>
        </motion.div>
      </motion.section>
    </div>
  );
}
