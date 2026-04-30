'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { useCallback, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';

import { BirthDetailsCard } from '@/components/sun-moon-rising/birth-details-card';
import { ChartResultsCard } from '@/components/sun-moon-rising/chart-results-card';
import { todayIsoDate } from '@/lib/datetime';
import { calculatorSwapMotionProps } from '@/lib/sun-moon-rising/calculator-motion';
import { SUN_MOON_RISING_EMPTY_VALUES } from '@/lib/sun-moon-rising/form-defaults';
import {
  sunMoonRisingFormSchema,
  type SunMoonRisingFormValues,
} from '@/lib/schemas/sun-moon-rising-schema';
import { cn } from '@/lib/utils';

type SunMoonRisingCalculatorFormProps = {
  className?: string;
};

export function SunMoonRisingCalculatorForm({
  className,
}: SunMoonRisingCalculatorFormProps) {
  const reducedMotion = useReducedMotion();
  const formSectionRef = useRef<HTMLDivElement>(null);
  const [snapshot, setSnapshot] = useState<SunMoonRisingFormValues | null>(
    null,
  );

  const form = useForm<SunMoonRisingFormValues>({
    resolver: zodResolver(sunMoonRisingFormSchema),
    defaultValues: SUN_MOON_RISING_EMPTY_VALUES,
    mode: 'onBlur',
  });

  const handleCalculate = useCallback((values: SunMoonRisingFormValues) => {
    setSnapshot(values);
  }, []);

  const resetForm = useCallback(() => {
    setSnapshot(null);
    form.reset(SUN_MOON_RISING_EMPTY_VALUES);
    requestAnimationFrame(() => {
      formSectionRef.current?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    });
  }, [form]);

  const swapMotion = calculatorSwapMotionProps(reducedMotion);

  return (
    <div
      ref={formSectionRef}
      className={cn('flex w-full flex-col items-center', className)}>
      <AnimatePresence mode='wait'>
        {!snapshot ? (
          <motion.div key='birth-form' {...swapMotion}>
            <BirthDetailsCard
              form={form}
              todayIsoMax={todayIsoDate()}
              onSubmit={handleCalculate}
            />
          </motion.div>
        ) : (
          <motion.div
            key='chart-panel'
            role='region'
            aria-labelledby='your-chart-heading'
            {...swapMotion}>
            <ChartResultsCard
              snapshot={snapshot}
              reducedMotion={reducedMotion}
              onReset={resetForm}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
