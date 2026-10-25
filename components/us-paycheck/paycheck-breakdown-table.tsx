import { formatCurrencyAmount } from '@/lib/daily-compound-interest/format-currency';
import {
  getBreakdownGroups,
  visibleRows,
} from '@/lib/us-paycheck/breakdown';
import type { PaycheckAmounts } from '@/lib/us-paycheck/compute-paycheck';
import { cn } from '@/lib/utils';

const usd = (amount: number) => formatCurrencyAmount('USD', amount, 'en-US');

type PaycheckBreakdownTableProps = {
  amounts: PaycheckAmounts;
  periodLabel: string;
  stateName: string;
  className?: string;
};

export function PaycheckBreakdownTable({
  amounts,
  periodLabel,
  stateName,
  className,
}: PaycheckBreakdownTableProps) {
  const groups = getBreakdownGroups(stateName);
  const percentOfGross = (value: number) =>
    amounts.gross > 0 ? `${((value / amounts.gross) * 100).toFixed(1)}%` : '—';

  return (
    <div className={cn('overflow-hidden rounded-xl border border-border/80', className)}>
      <table className='w-full text-sm'>
        <caption className='sr-only'>
          Paycheck breakdown, {periodLabel.toLowerCase()}
        </caption>
        <thead className='bg-muted/40 text-xs text-muted-foreground'>
          <tr>
            <th scope='col' className='px-4 py-2.5 text-left font-medium'>
              Item
            </th>
            <th scope='col' className='hidden px-2 py-2.5 text-right font-medium sm:table-cell'>
              % of gross
            </th>
            <th scope='col' className='px-4 py-2.5 text-right font-medium'>
              {periodLabel}
            </th>
          </tr>
        </thead>
        <tbody className='divide-y divide-border/60'>
          <tr className='font-medium'>
            <th scope='row' className='px-4 py-2.5 text-left font-medium'>
              Gross pay
            </th>
            <td className='hidden px-2 py-2.5 text-right tabular-nums text-muted-foreground sm:table-cell'>
              100%
            </td>
            <td className='px-4 py-2.5 text-right tabular-nums'>{usd(amounts.gross)}</td>
          </tr>
          {groups.map(group => {
            const rows = visibleRows(group, amounts);
            if (rows.length === 0) return null;
            return (
              <GroupRows
                key={group.id}
                title={group.title}
                rows={rows.map(row => ({
                  label: row.label,
                  value: amounts[row.key],
                }))}
                percentOfGross={percentOfGross}
              />
            );
          })}
          <tr className='bg-teal-500/10 font-semibold text-teal-800 dark:text-teal-300'>
            <th scope='row' className='px-4 py-3 text-left font-semibold'>
              Take-home pay
            </th>
            <td className='hidden px-2 py-3 text-right tabular-nums sm:table-cell'>
              {percentOfGross(amounts.net)}
            </td>
            <td className='px-4 py-3 text-right tabular-nums'>{usd(amounts.net)}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

type GroupRowsProps = {
  title: string;
  rows: readonly { label: string; value: number }[];
  percentOfGross: (value: number) => string;
};

function GroupRows({ title, rows, percentOfGross }: GroupRowsProps) {
  return (
    <>
      <tr className='bg-muted/30'>
        <th
          scope='colgroup'
          colSpan={3}
          className='px-4 py-1.5 text-left text-xs font-semibold uppercase tracking-wide text-muted-foreground'>
          {title}
        </th>
      </tr>
      {rows.map(row => (
        <tr key={row.label}>
          <th scope='row' className='px-4 py-2 text-left font-normal text-foreground'>
            {row.label}
          </th>
          <td className='hidden px-2 py-2 text-right tabular-nums text-muted-foreground sm:table-cell'>
            {percentOfGross(row.value)}
          </td>
          <td className='px-4 py-2 text-right tabular-nums text-foreground'>
            <span aria-hidden>−</span>
            <span className='sr-only'>minus </span>
            {formatCurrencyAmount('USD', row.value, 'en-US')}
          </td>
        </tr>
      ))}
    </>
  );
}
