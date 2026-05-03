'use client';

import type { CheckedState } from '@radix-ui/react-checkbox';
import type { RefObject } from 'react';
import type { UseFormReturn } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { MoneyMaskedInput } from '@/components/daily-compound-interest/money-masked-input';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  CONTRIBUTION_FREQUENCY_LABELS,
  CONTRIBUTION_FREQUENCY_VALUES,
} from '@/lib/daily-compound-interest/contribution-frequency';
import {
  formatCompactNumber,
  formatCurrencyAmount,
} from '@/lib/daily-compound-interest/format-currency';
import type { ExchangeRateQuoteRow } from '@/lib/daily-compound-interest/use-exchange-rates-snippet';
import { SUPPORTED_FIAT_OPTIONS } from '@/lib/daily-compound-interest/supported-fiats';
import { DAILY_COMPOUND_LIMITS } from '@/lib/schemas/daily-compound-schema';
import type { DailyCompoundFormValues } from '@/lib/schemas/daily-compound-schema';
import { cn } from '@/lib/utils';
import {
  CalculatorIcon,
  Loader2Icon,
  PiggyBankIcon,
  RotateCcwIcon,
  TrendingUpIcon,
} from 'lucide-react';

/** Same footprint as a caption line — keeps stacked controls visually aligned across columns. */
const FORM_CAPTION_MIN = 'min-h-10';

const RATE_BASIS_ITEMS: { value: 'nominal' | 'apy'; label: string; hint: string }[] =
  [
    {
      value: 'nominal',
      label: 'Nominal annual (APR-style)',
      hint: 'APR is spread evenly across 365 daily periods.',
    },
    {
      value: 'apy',
      label: 'Effective annual (APY)',
      hint: 'APY is mapped to an equivalent daily compound rate.',
    },
  ];

type DailyCompoundCalculatorFieldsProps = {
  principalAnchorRef: RefObject<HTMLDivElement | null>;
  form: UseFormReturn<DailyCompoundFormValues>;
  isSubmitting: boolean;
  onSubmit: (values: DailyCompoundFormValues) => void;
  onReset: () => void;
  fxSnippet: ExchangeRateQuoteRow | null;
};

export function DailyCompoundCalculatorFields({
  principalAnchorRef,
  form,
  isSubmitting,
  onSubmit,
  onReset,
  fxSnippet,
}: DailyCompoundCalculatorFieldsProps) {
  const watchedCurrency = form.watch('currency');
  const approximateDaysPreview = (): number => {
    const y = Number(form.watch('timelineYears'));
    const m = Number(form.watch('timelineMonths'));
    const d = Number(form.watch('timelineExtraDays'));
    if (![y, m, d].every((x) => Number.isInteger(x) && x >= 0)) return 0;
    return y * 365 + m * 30 + d;
  };
  const days = approximateDaysPreview();

  return (
    <Form {...form}>
      <form
        className='min-w-0 flex-1 space-y-6'
        noValidate
        onSubmit={form.handleSubmit(onSubmit)}>
        <div
          ref={principalAnchorRef}
          id='dcf-principal-section'
          tabIndex={-1}
          className='scroll-mt-28 outline-none lg:scroll-mt-24'>
        <fieldset className='space-y-6 rounded-2xl border border-border bg-card p-5 shadow-xs sm:p-6'>
          <legend className='sr-only'>Principal and currency</legend>
          <div>
            <h2 className='text-lg font-semibold tracking-tight'>
              Principal &amp; currency
            </h2>
            <p className='mt-1 text-sm text-muted-foreground'>
              Starting balance and display currency for all amounts.
            </p>
          </div>
          <div className='grid gap-6 sm:auto-rows-fr sm:grid-cols-2'>
            <FormField
              control={form.control}
              name='principal'
              render={({ field }) => (
                <FormItem className='flex h-full flex-col'>
                  <FormLabel className={cn('leading-snug')}>Principal</FormLabel>
                  <FormControl>
                    <MoneyMaskedInput
                      placeholder='e.g. 10,000'
                      name={field.name}
                      ref={field.ref}
                      value={field.value}
                      onBlur={field.onBlur}
                      onValueChange={field.onChange}
                    />
                  </FormControl>
                  <FormDescription id='dcf-principal-hint' className={FORM_CAPTION_MIN}>
                    Commas insert automatically — must be greater than zero.
                  </FormDescription>
                  <FormMessage className='mt-auto pt-1' />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='currency'
              render={({ field }) => (
                <FormItem className='flex h-full flex-col'>
                  <FormLabel className='leading-snug'>Currency</FormLabel>
                  <Select value={field.value} onValueChange={field.onChange}>
                    <FormControl>
                      <SelectTrigger
                        aria-label='Display currency'
                        className={cn(
                          'h-10 w-full min-w-0 text-left font-normal',
                        )}>
                        <SelectValue />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent align='start' position='popper'>
                      {SUPPORTED_FIAT_OPTIONS.map((opt) => (
                        <SelectItem key={opt.code} value={opt.code}>
                          {opt.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormDescription id='dcf-currency-caption' className={FORM_CAPTION_MIN}>
                    {fxSnippet ? (
                      <>
                        Approx.{' '}
                        {formatCurrencyAmount(watchedCurrency, fxSnippet.rate)} per{' '}
                        1 {fxSnippet.base} (cached; projection ignores FX).
                      </>
                    ) : (
                      <>
                        Projection amounts use this ISO code — no FX conversion in
                        math.
                      </>
                    )}
                  </FormDescription>
                  <FormMessage className='mt-auto pt-1' />
                </FormItem>
              )}
            />
          </div>
        </fieldset>
        </div>

        <Card className='shadow-xs'>
          <CardHeader className='pb-4'>
            <CardTitle className='text-lg'>Interest rate</CardTitle>
            <CardDescription>
              Nominal annual (APR-style) divides the year into 365 equal day
              periods. APY is converted to an equivalent daily rate for this
              simulation.
            </CardDescription>
          </CardHeader>
          <CardContent className='space-y-5'>
            <div className='grid gap-6 sm:auto-rows-fr sm:grid-cols-2'>
              <FormField
                control={form.control}
                name='annualRatePercent'
                render={({ field }) => (
                  <FormItem className='flex h-full flex-col'>
                    <FormLabel className='leading-snug'>
                      Rate (% per year)
                    </FormLabel>
                    <FormControl>
                      <Input
                        type='text'
                        inputMode='decimal'
                        placeholder='e.g. 5.25'
                        autoComplete='off'
                        {...field}
                      />
                    </FormControl>
                    <FormDescription className={FORM_CAPTION_MIN}>
                      Strictly between{' '}
                      {DAILY_COMPOUND_LIMITS.minAnnualRatePercentExclusive} and{' '}
                      {DAILY_COMPOUND_LIMITS.maxAnnualRatePercentExclusive}%.
                    </FormDescription>
                    <FormMessage className='mt-auto pt-1' />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='rateBasis'
                render={({ field }) => (
                  <FormItem className='flex h-full flex-col'>
                    <FormLabel className='leading-snug'>Basis</FormLabel>
                    <Select
                      value={field.value}
                      onValueChange={field.onChange}>
                      <FormControl>
                        <SelectTrigger className='h-10 w-full min-w-0 text-left font-normal'>
                          <SelectValue />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent align='start' position='popper'>
                        {RATE_BASIS_ITEMS.map((item) => (
                          <SelectItem key={item.value} value={item.value}>
                            {item.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormDescription className={FORM_CAPTION_MIN}>
                      {
                        RATE_BASIS_ITEMS.find((i) => i.value === field.value)
                          ?.hint
                      }
                    </FormDescription>
                    <FormMessage className='mt-auto pt-1' />
                  </FormItem>
                )}
              />
            </div>
          </CardContent>
        </Card>

        <Card className='shadow-xs'>
          <CardHeader className='pb-4'>
            <CardTitle className='text-lg'>Timeline</CardTitle>
            <CardDescription>
              Horizon is approximated as years×365 + months×30 + extra days for
              the daily loop.
              {days > 0 ? (
                <span className='mt-1 block font-medium text-foreground'>
                  ≈ {formatCompactNumber(days)} simulated days
                </span>
              ) : null}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className='grid gap-6 sm:auto-rows-fr sm:grid-cols-3'>
              <FormField
                control={form.control}
                name='timelineYears'
                render={({ field }) => (
                  <FormItem className='flex h-full flex-col'>
                    <FormLabel className='leading-snug'>Years</FormLabel>
                    <FormControl>
                      <Input
                        type='text'
                        inputMode='numeric'
                        placeholder='0'
                        autoComplete='off'
                        {...field}
                      />
                    </FormControl>
                    <FormDescription className={FORM_CAPTION_MIN}>
                      Whole years portion of the horizon.
                    </FormDescription>
                    <FormMessage className='mt-auto pt-1' />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='timelineMonths'
                render={({ field }) => (
                  <FormItem className='flex h-full flex-col'>
                    <FormLabel className='leading-snug'>Months</FormLabel>
                    <FormControl>
                      <Input
                        type='text'
                        inputMode='numeric'
                        placeholder='0'
                        autoComplete='off'
                        {...field}
                      />
                    </FormControl>
                    <FormDescription className={FORM_CAPTION_MIN}>
                      Residual calendar months (0–11).
                    </FormDescription>
                    <FormMessage className='mt-auto pt-1' />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='timelineExtraDays'
                render={({ field }) => (
                  <FormItem className='flex h-full flex-col'>
                    <FormLabel className='leading-snug'>Extra days</FormLabel>
                    <FormControl>
                      <Input
                        type='text'
                        inputMode='numeric'
                        placeholder='0'
                        autoComplete='off'
                        {...field}
                      />
                    </FormControl>
                    <FormDescription className={FORM_CAPTION_MIN}>
                      Adds on top of years and months (~30-day months above).
                    </FormDescription>
                    <FormMessage className='mt-auto pt-1' />
                  </FormItem>
                )}
              />
            </div>
          </CardContent>
        </Card>

        <Card className='shadow-xs'>
          <CardHeader className='pb-4'>
            <CardTitle className='text-lg flex items-center gap-2'>
              <PiggyBankIcon
                className='size-5 text-emerald-600 dark:text-emerald-400'
                aria-hidden
              />
              Contributions
            </CardTitle>
            <CardDescription>
              Deposits on a fixed schedule (optional). Amount is per period at
              the frequency you choose.
            </CardDescription>
          </CardHeader>
          <CardContent className='space-y-5'>
            <div className='grid gap-6 sm:auto-rows-fr sm:grid-cols-2'>
              <FormField
                control={form.control}
                name='contributionAmount'
                render={({ field }) => (
                  <FormItem className='flex h-full flex-col'>
                    <FormLabel className='leading-snug'>
                      Amount per period
                    </FormLabel>
                    <FormControl>
                      <MoneyMaskedInput
                        placeholder='optional'
                        name={field.name}
                        ref={field.ref}
                        value={field.value}
                        onBlur={field.onBlur}
                        onValueChange={field.onChange}
                      />
                    </FormControl>
                    <FormDescription className={FORM_CAPTION_MIN}>
                      Optional — commas insert automatically. Leave blank for no
                      recurring deposits.
                    </FormDescription>
                    <FormMessage className='mt-auto pt-1' />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='contributionFrequency'
                render={({ field }) => (
                  <FormItem className='flex h-full flex-col'>
                    <FormLabel className='leading-snug'>Frequency</FormLabel>
                    <Select value={field.value} onValueChange={field.onChange}>
                      <FormControl>
                        <SelectTrigger className='h-10 w-full min-w-0 text-left font-normal'>
                          <SelectValue />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent align='start' position='popper'>
                        {CONTRIBUTION_FREQUENCY_VALUES.map((v) => (
                          <SelectItem key={v} value={v}>
                            {CONTRIBUTION_FREQUENCY_LABELS[v]}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormDescription className={FORM_CAPTION_MIN}>
                      How often contribution amounts enter the simulated balance.
                    </FormDescription>
                    <FormMessage className='mt-auto pt-1' />
                  </FormItem>
                )}
              />
            </div>
          </CardContent>
        </Card>

        <Card className='shadow-xs'>
          <CardHeader className='pb-4'>
            <CardTitle className='text-lg flex items-center gap-2'>
              <TrendingUpIcon
                className='size-5 text-emerald-600 dark:text-emerald-400'
                aria-hidden
              />
              Reinvestment
            </CardTitle>
            <CardDescription>
              When off, interest accrues on principal and deposits only (simple
              interest on the growing capital base each day).
            </CardDescription>
          </CardHeader>
          <CardContent>
            <FormField
              control={form.control}
              name='reinvestInterest'
              render={({ field }) => (
                <FormItem className='space-y-0'>
                  <div className='flex flex-wrap gap-4 rounded-xl border border-dashed border-border bg-muted/30 px-4 py-3 sm:items-start sm:gap-5'>
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={(v: CheckedState) =>
                          field.onChange(v === true)
                        }
                        className='mt-1 size-[1.125rem]'
                      />
                    </FormControl>
                    <div className='min-w-0 flex-1 space-y-1'>
                      <FormLabel className='cursor-pointer text-base font-semibold'>
                        Reinvest accrued interest
                      </FormLabel>
                      <p className='text-xs text-muted-foreground'>
                        On: daily compounding on the full balance.
                      </p>
                    </div>
                  </div>
                  <FormMessage className='pt-2' />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

        <div className='flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center'>
          <div className='flex flex-col gap-3 sm:flex-row sm:flex-wrap'>
            <Button
              type='submit'
              disabled={isSubmitting}
              className='inline-flex gap-2 sm:min-w-[9rem]'
              size='lg'>
              {isSubmitting ? (
                <Loader2Icon
                  className='size-4 shrink-0 animate-spin'
                  aria-hidden
                />
              ) : (
                <CalculatorIcon className='size-4 shrink-0' aria-hidden />
              )}
              {isSubmitting ? 'Calculating…' : 'Calculate'}
            </Button>
            <Button
              type='button'
              variant='outline'
              disabled={isSubmitting}
              className='inline-flex gap-2 sm:min-w-[9rem]'
              size='lg'
              onClick={() => onReset()}>
              <RotateCcwIcon className='size-4 shrink-0' aria-hidden />
              Reset
            </Button>
          </div>
          <p className='text-xs text-muted-foreground sm:ml-auto sm:max-w-[14rem] sm:text-right'>
            Runs on the server from your inputs; no account required. Reset
            clears the form and projection.
          </p>
        </div>
      </form>
    </Form>
  );
}
