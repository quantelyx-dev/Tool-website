'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { useCallback, useMemo, useState } from 'react';

import { JsonFormatPanel } from '@/components/json-tool/json-format-panel';
import { JsonTreePanel } from '@/components/json-tool/json-tree-panel';
import { JsonTypescriptPanel } from '@/components/json-tool/json-typescript-panel';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import { useAnalytics } from '@/hooks/use-analytics';
import { parseJson } from '@/lib/json-tool/parse';
import {
  fadeUpVariants,
  staggerContainerVariants,
} from '@/lib/motion-variants';
import { cn } from '@/lib/utils';

export type JsonAnalyticsHandlers = ReturnType<typeof useAnalytics>;

const SAMPLE_JSON = `{
  "id": "ORD-4471",
  "customer": { "name": "Ada Lovelace", "vip": true },
  "items": [
    { "sku": "BK-01", "qty": 2, "price": 14.99 },
    { "sku": "BK-02", "qty": 1, "price": 22.5 }
  ],
  "shipped": false,
  "notes": null
}`;

type JsonToolContentProps = {
  className?: string;
};

export function JsonToolContent({ className }: JsonToolContentProps) {
  const reducedMotion = useReducedMotion();
  const analytics = useAnalytics('json-formatter-validator');

  const [rawInput, setRawInput] = useState('');
  const [resetKey, setResetKey] = useState(0);

  const parsed = useMemo(() => parseJson(rawInput), [rawInput]);

  const handleLoadSample = useCallback(() => {
    setRawInput(SAMPLE_JSON);
  }, []);

  const handleReset = useCallback(() => {
    analytics.onReset();
    setRawInput('');
    setResetKey(key => key + 1);
  }, [analytics]);

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
            JSON formatter &amp; validator
          </h1>
          <p
            className={cn(
              'mx-auto mt-5 max-w-2xl px-1 text-pretty text-base leading-relaxed text-muted-foreground',
              'sm:mt-6 sm:px-0 sm:text-lg',
            )}>
            Paste JSON once and beautify it, explore it as a collapsible tree,
            or turn it straight into TypeScript interfaces — with exact
            line/column error locations when something&apos;s broken. 100%
            client-side.
          </p>
        </motion.header>

        <motion.div
          className={cn('mx-auto mt-8 w-full max-w-4xl')}
          variants={fadeUpVariants(reducedMotion)}>
          <Tabs defaultValue='format' className={cn('w-full gap-6')}>
            <TabsList className={cn('w-full sm:w-auto')}>
              <TabsTrigger value='format'>Format &amp; validate</TabsTrigger>
              <TabsTrigger value='tree'>Tree view</TabsTrigger>
              <TabsTrigger value='typescript'>JSON → TypeScript</TabsTrigger>
            </TabsList>

            <TabsContent value='format'>
              <JsonFormatPanel
                key={resetKey}
                rawInput={rawInput}
                parsed={parsed}
                analytics={analytics}
                onInputChange={setRawInput}
                onLoadSample={handleLoadSample}
                onReset={handleReset}
              />
            </TabsContent>
            <TabsContent value='tree'>
              <JsonTreePanel
                key={resetKey}
                parsed={parsed}
                hasInput={rawInput.trim() !== ''}
                analytics={analytics}
                onReset={handleReset}
              />
            </TabsContent>
            <TabsContent value='typescript'>
              <JsonTypescriptPanel
                key={resetKey}
                parsed={parsed}
                hasInput={rawInput.trim() !== ''}
                analytics={analytics}
                onReset={handleReset}
              />
            </TabsContent>
          </Tabs>
        </motion.div>
      </motion.section>
    </div>
  );
}
