'use client';

import { useMemo, useState, type ReactNode } from 'react';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import type { IndianaChildSupportComputationResult } from '@/lib/indiana-child-support/compute-child-support';
import { formatIncomeIntervalLabel } from '@/lib/indiana-child-support/form-helpers';
import { weeklySupportToMonthlyApproximate } from '@/lib/indiana-child-support/form-to-calculation';
import { roundMoney } from '@/lib/indiana-child-support/money';
import type { IndianaParentId } from '@/lib/indiana-child-support/types';
import type { ChildSupportFormValues } from '@/lib/schemas/indiana-child-support-schema';
import { cn } from '@/lib/utils';

const usd = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});

function parentLabel(id: IndianaParentId): string {
  return id === 'parentOne' ? 'Parent One' : 'Parent Two';
}

function payorFromRecipient(recipient: IndianaParentId): IndianaParentId {
  return recipient === 'parentOne' ? 'parentTwo' : 'parentOne';
}

type DisplayInterval = 'monthly' | 'yearly';

function transferForDisplay(
  weeklyTransfer: number,
  mode: DisplayInterval,
): number {
  if (mode === 'monthly') {
    return weeklySupportToMonthlyApproximate(weeklyTransfer);
  }
  return roundMoney(weeklyTransfer * 52);
}

type ChildSupportResultsPanelProps = {
  result: IndianaChildSupportComputationResult;
  formData: ChildSupportFormValues;
  className?: string;
};

type SummaryRow = {
  label: string;
  one: ReactNode;
  two: ReactNode;
  total: ReactNode;
};

export function ChildSupportResultsPanel({
  result,
  formData,
  className,
}: ChildSupportResultsPanelProps) {
  const [interval, setInterval] = useState<DisplayInterval>('monthly');

  const payorId = payorFromRecipient(result.step6.recipient);
  const recipientId = result.step6.recipient;
  const weeklyTransfer = result.step6.weeklyTransferFromPayorToRecipient;
  const displayTransfer = transferForDisplay(weeklyTransfer, interval);

  const nChildren = formData.children.length;
  const avgPct = useMemo(() => {
    const s1 = formData.children.reduce((s, c) => s + c.parentOneTime, 0);
    const s2 = formData.children.reduce((s, c) => s + c.parentTwoTime, 0);
    return {
      one: roundMoney(s1 / nChildren),
      two: roundMoney(s2 / nChildren),
    };
  }, [formData.children, nChildren]);

  const netFromWeekly = (weekly: number) =>
    interval === 'monthly'
      ? weeklySupportToMonthlyApproximate(weekly)
      : roundMoney(weekly * 52);

  const w1 = result.step1.parentOneWeeklyIncome;
  const w2 = result.step1.parentTwoWeeklyIncome;

  const p1Pay = payorId === 'parentOne' ? displayTransfer : 0;
  const p2Pay = payorId === 'parentTwo' ? displayTransfer : 0;

  /** Display-only: split total transfer equally across children (Indiana BCSO is for all children). */
  const perChildTransfer =
    nChildren > 0 ? roundMoney(displayTransfer / nChildren) : 0;

  const summaryRows: SummaryRow[] = [
    {
      label: 'Number of children',
      one: '—',
      two: '—',
      total: String(nChildren),
    },
    {
      label: 'Average parenting time',
      one: `${avgPct.one.toFixed(2)}%`,
      two: `${avgPct.two.toFixed(2)}%`,
      total: '—',
    },
    {
      label:
        interval === 'monthly'
          ? 'Net income (monthly equivalent)'
          : 'Net income (annual equivalent)',
      one: (
        <div className='space-y-0.5'>
          <div className='tabular-nums'>{usd.format(netFromWeekly(w1))}</div>
          <div className='text-xs text-muted-foreground'>
            Entered: {usd.format(formData.parentOneNetIncome)} (
            {formatIncomeIntervalLabel(formData.parentOneIncomeInterval)})
          </div>
        </div>
      ),
      two: (
        <div className='space-y-0.5'>
          <div className='tabular-nums'>{usd.format(netFromWeekly(w2))}</div>
          <div className='text-xs text-muted-foreground'>
            Entered: {usd.format(formData.parentTwoNetIncome)} (
            {formatIncomeIntervalLabel(formData.parentTwoIncomeInterval)})
          </div>
        </div>
      ),
      total: (
        <span className='tabular-nums font-medium'>
          {usd.format(netFromWeekly(w1 + w2))}
        </span>
      ),
    },
    {
      label:
        interval === 'monthly'
          ? 'Guideline child support payment'
          : 'Guideline child support payment (annual)',
      one: (
        <span className='tabular-nums font-medium'>{usd.format(p1Pay)}</span>
      ),
      two: (
        <span className='tabular-nums font-medium'>{usd.format(p2Pay)}</span>
      ),
      total: (
        <span className='tabular-nums font-medium'>
          {usd.format(displayTransfer)}
        </span>
      ),
    },
  ];

  return (
    <Card
      className={cn(
        'w-full overflow-hidden border-border/80 shadow-xs',
        className,
      )}
      data-slot='child-support-results'>
      <CardHeader className='space-y-4 border-b border-border/60 bg-muted/20 pb-4'>
        <div className='flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between'>
          <div className='space-y-1.5'>
            <CardTitle className='text-lg font-semibold tracking-tight'>
              Indiana child support calculation
            </CardTitle>
            <CardDescription className='max-w-prose text-pretty text-sm leading-relaxed'>
              Guideline estimate from Indiana&apos;s income-shares model and
              parenting-time credit. Orders may differ after deviations or
              add-ons.{' '}
              <span className='font-medium text-foreground/90'>
                This is not California (or other states&apos;) rules
              </span>
              —different states use different formulas, so equal income and
              50/50 time can show $0 on some sites but a non-zero transfer here.
            </CardDescription>
          </div>

          <div
            className='flex max-w-max shrink-0 rounded-lg border border-border bg-background p-0.5 shadow-xs'
            role='group'
            aria-label='Payment amount display interval'>
            <Button
              type='button'
              variant={interval === 'monthly' ? 'default' : 'ghost'}
              size='sm'
              className='h-8 rounded-md px-3 text-xs font-semibold uppercase tracking-wide'
              onClick={() => setInterval('monthly')}>
              Monthly
            </Button>
            <Button
              type='button'
              variant={interval === 'yearly' ? 'default' : 'ghost'}
              size='sm'
              className='h-8 rounded-md px-3 text-xs font-semibold uppercase tracking-wide'
              onClick={() => setInterval('yearly')}>
              Yearly
            </Button>
          </div>
        </div>

        <p className='text-sm font-medium text-foreground'>
          {parentLabel(payorId)} pays {parentLabel(recipientId)}
          <span className='font-normal text-muted-foreground'>
            {' '}
            ·{' '}
            {interval === 'monthly'
              ? 'Monthly = weekly × 52 ÷ 12'
              : 'Yearly = weekly × 52'}
          </span>
        </p>
      </CardHeader>

      <CardContent className='px-0 pt-0'>
        {/* Desktop / tablet table */}
        <div className='hidden overflow-x-auto md:block'>
          <table className='w-full min-w-[640px] text-sm'>
            <thead>
              <tr className='border-b border-border bg-muted/30 text-left'>
                <th className='px-4 py-3 font-medium text-muted-foreground' />
                <th className='px-4 py-3 font-semibold text-foreground'>
                  Parent One
                </th>
                <th className='px-4 py-3 font-semibold text-foreground'>
                  Parent Two
                </th>
                <th className='px-4 py-3 font-semibold text-foreground'>
                  Total
                </th>
              </tr>
            </thead>
            <tbody>
              {summaryRows.map(row => (
                <tr
                  key={row.label}
                  className='border-b border-border/80 last:border-0'>
                  <th
                    scope='row'
                    className='max-w-[200px] px-4 py-3 text-left font-medium text-muted-foreground'>
                    {row.label}
                  </th>
                  <td className='px-4 py-3 align-top text-foreground'>
                    {row.one}
                  </td>
                  <td className='px-4 py-3 align-top text-foreground'>
                    {row.two}
                  </td>
                  <td className='px-4 py-3 align-top text-foreground'>
                    {row.total}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile stacked cards */}
        <div className='divide-y divide-border md:hidden'>
          {summaryRows.map(row => (
            <div key={row.label} className='space-y-3 px-4 py-4'>
              <p className='text-xs font-semibold uppercase tracking-wide text-muted-foreground'>
                {row.label}
              </p>
              <div className='grid grid-cols-1 gap-3'>
                <div className='rounded-md border border-border/80 bg-card/50 px-3 py-2'>
                  <p className='text-xs text-muted-foreground'>Parent One</p>
                  <div className='mt-1 text-sm text-foreground'>{row.one}</div>
                </div>
                <div className='rounded-md border border-border/80 bg-card/50 px-3 py-2'>
                  <p className='text-xs text-muted-foreground'>Parent Two</p>
                  <div className='mt-1 text-sm text-foreground'>{row.two}</div>
                </div>
                <div className='rounded-md border border-border/80 bg-card/50 px-3 py-2'>
                  <p className='text-xs text-muted-foreground'>Total</p>
                  <div className='mt-1 text-sm font-medium text-foreground'>
                    {row.total}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Per-child (display split) */}
        <div className='border-t border-border bg-muted/15 px-4 py-4'>
          <h3 className='text-sm font-semibold text-foreground'>
            Support per child (equal split of total transfer)
          </h3>
          <p className='mt-1 text-xs text-muted-foreground'>
            Indiana combines children in one schedule; amounts below split the
            payor&apos;s transfer evenly for readability.
          </p>
          <div className='mt-3 hidden overflow-x-auto md:block'>
            <table className='w-full min-w-[480px] text-sm'>
              <thead>
                <tr className='border-b border-border text-left'>
                  <th className='py-2 pr-4 font-medium text-muted-foreground' />
                  <th className='py-2 pr-4 font-semibold'>Parent One</th>
                  <th className='py-2 pr-4 font-semibold'>Parent Two</th>
                  <th className='py-2 font-semibold'>Cumulative total</th>
                </tr>
              </thead>
              <tbody>
                {formData.children.map((_, i) => (
                  <tr
                    key={i}
                    className='border-b border-border/60 last:border-0'>
                    <th
                      scope='row'
                      className='py-2 pr-4 font-medium text-foreground'>
                      Child {i + 1}
                    </th>
                    <td className='py-2 pr-4 tabular-nums'>
                      {usd.format(
                        payorId === 'parentOne' ? perChildTransfer : 0,
                      )}
                    </td>
                    <td className='py-2 pr-4 tabular-nums'>
                      {usd.format(
                        payorId === 'parentTwo' ? perChildTransfer : 0,
                      )}
                    </td>
                    <td className='py-2 tabular-nums font-medium'>
                      {usd.format(perChildTransfer)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <ul className='mt-3 space-y-2 md:hidden'>
            {formData.children.map((_, i) => (
              <li
                key={i}
                className='rounded-lg border border-border/80 bg-card/40 px-3 py-3 text-sm'>
                <p className='font-medium text-foreground'>Child {i + 1}</p>
                <div className='mt-2 grid gap-2 text-xs'>
                  <div className='flex justify-between gap-2'>
                    <span className='text-muted-foreground'>Parent One</span>
                    <span className='tabular-nums'>
                      {usd.format(
                        payorId === 'parentOne' ? perChildTransfer : 0,
                      )}
                    </span>
                  </div>
                  <div className='flex justify-between gap-2'>
                    <span className='text-muted-foreground'>Parent Two</span>
                    <span className='tabular-nums'>
                      {usd.format(
                        payorId === 'parentTwo' ? perChildTransfer : 0,
                      )}
                    </span>
                  </div>
                  <div className='flex justify-between gap-2 border-t border-border/60 pt-2 font-medium'>
                    <span>Cumulative total</span>
                    <span className='tabular-nums'>
                      {usd.format(perChildTransfer)}
                    </span>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}
