'use client';

import { Loader2Icon, SparklesIcon } from 'lucide-react';
import type { UseFormReturn } from 'react-hook-form';

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
import type { SunMoonRisingFormValues } from '@/lib/schemas/sun-moon-rising-schema';

type BirthDetailsCardProps = {
  form: UseFormReturn<SunMoonRisingFormValues>;
  /** `YYYY-MM-DD` max for date input (typically today in local zone). */
  todayIsoMax: string;
  onSubmit: (values: SunMoonRisingFormValues) => void;
};

export function BirthDetailsCard({
  form,
  todayIsoMax,
  onSubmit,
}: BirthDetailsCardProps) {
  const { isSubmitting } = form.formState;

  return (
    <Card className='shadow-sm'>
      <CardHeader className='space-y-1 border-b border-border/80 pb-6'>
        <CardTitle className='text-xl'>Birth details</CardTitle>
        <CardDescription>
          Enter your details as they appear on your birth record. We validate
          input here, then compute signs on the server from location and
          timezone.
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
                        max={todayIsoMax}
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

            <Button type='submit' disabled={isSubmitting}>
              {isSubmitting ? (
                <Loader2Icon className='size-4 animate-spin' aria-hidden />
              ) : (
                <SparklesIcon className='size-4' aria-hidden />
              )}
              {isSubmitting ? 'Working…' : 'Calculate signs'}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
