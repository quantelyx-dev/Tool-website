'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { motion, useReducedMotion } from 'framer-motion';
import { MoonIcon, SparklesIcon, SunIcon } from 'lucide-react';
import { useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';

import {
  ChartSignRow,
  getChartSignRowStatus,
} from '@/components/sun-moon-rising/chart-sign-row';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { formatBirthSummaryLine, todayIsoDate } from '@/lib/datetime';
import {
  cardItemVariants,
  staggerContainerVariants,
} from '@/lib/motion-variants';
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
  const [snapshot, setSnapshot] = useState<SunMoonRisingFormValues | null>(
    null,
  );

  const form = useForm<SunMoonRisingFormValues>({
    resolver: zodResolver(sunMoonRisingFormSchema),
    defaultValues: {
      name: '',
      dateOfBirth: '',
      timeOfBirth: '',
      birthCity: '',
    },
    mode: 'onBlur',
  });

  const onSubmit = useCallback((values: SunMoonRisingFormValues) => {
    setSnapshot(values);
  }, []);

  const today = todayIsoDate();
  const rowStatus = getChartSignRowStatus(snapshot);

  return (
    <motion.div
      className={cn(
        'grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(280px,340px)] lg:items-start',
        className,
      )}
      variants={staggerContainerVariants(reducedMotion, 0.11)}
      initial='hidden'
      animate='visible'>
      <motion.div variants={cardItemVariants(reducedMotion)}>
        <Card className='shadow-sm'>
          <CardHeader className='space-y-1 border-b border-border/80 pb-6'>
            <CardTitle className='text-xl'>Birth details</CardTitle>
            <CardDescription>
              Enter your details as they appear on your birth record.
              Calculation logic will plug in next; this step validates input and
              previews your chart layout.
            </CardDescription>
          </CardHeader>
          <CardContent className='pt-6'>
            <Form {...form}>
              <form
                className='space-y-6'
                noValidate
                onSubmit={form.handleSubmit(onSubmit)}>
                <FormField
                  control={form.control}
                  name='name'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full name</FormLabel>
                      <FormControl>
                        <Input
                          placeholder='Alex Rivera'
                          autoComplete='name'
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className='grid gap-6 sm:grid-cols-2'>
                  <FormField
                    control={form.control}
                    name='dateOfBirth'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Date of birth</FormLabel>
                        <FormControl>
                          <Input
                            type='date'
                            max={today}
                            min='1900-01-01'
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          Local calendar date where you were born.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name='timeOfBirth'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Time of birth</FormLabel>
                        <FormControl>
                          <Input type='time' step={60} {...field} />
                        </FormControl>
                        <FormDescription>
                          Use 24-hour time if unsure; refine later with records.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name='birthCity'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Birth location</FormLabel>
                      <FormControl>
                        <Input
                          placeholder='Portland, Oregon, USA'
                          autoComplete='address-level2'
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        City plus region or country helps locate latitude,
                        longitude, and timezone for rising sign math.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button type='submit'>
                  <SparklesIcon className='size-4' />
                  Calculate signs
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div variants={cardItemVariants(reducedMotion)}>
        <Card className='shadow-sm'>
          <CardHeader className='space-y-1 border-b border-border/80 pb-6'>
            <CardTitle className='text-xl'>Your chart</CardTitle>
            <CardDescription>
              Sun, Moon, and Rising appear here once astronomical calculations
              are connected.
            </CardDescription>
          </CardHeader>
          <CardContent className='space-y-6 pt-6'>
            {!snapshot ? (
              <p className='text-sm leading-relaxed text-muted-foreground'>
                Submit the form to lock in your birth snapshot. Three sign slots
                below will fill automatically after we wire{' '}
                <span className='font-medium text-foreground'>astronomia</span>,{' '}
                <span className='font-medium text-foreground'>Luxon</span>, and{' '}
                <span className='font-medium text-foreground'>tz-lookup</span>.
              </p>
            ) : (
              <div className='rounded-xl border border-indigo-100 bg-indigo-50/80 px-4 py-3 text-sm dark:border-indigo-900/60 dark:bg-indigo-950/40'>
                <p className='font-semibold text-indigo-950 dark:text-indigo-50'>
                  {snapshot.name.trim()}
                </p>
                <p className='mt-1 text-muted-foreground'>
                  {formatBirthSummaryLine(
                    snapshot.dateOfBirth,
                    snapshot.timeOfBirth,
                    snapshot.birthCity,
                  )}
                </p>
              </div>
            )}

            <motion.ul
              className='space-y-3'
              variants={staggerContainerVariants(reducedMotion, 0.07)}
              initial='hidden'
              animate='visible'>
              <ChartSignRow
                icon={<SunIcon className='size-5' />}
                label='Sun sign'
                hint='Core vitality & ego expression'
                status={rowStatus}
              />
              <ChartSignRow
                icon={<MoonIcon className='size-5' />}
                label='Moon sign'
                hint='Emotional terrain & instincts'
                status={rowStatus}
              />
              <ChartSignRow
                icon={<SparklesIcon className='size-5' />}
                label='Rising sign'
                hint='Ascendant & first impressions'
                status={rowStatus}
              />
            </motion.ul>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
}
