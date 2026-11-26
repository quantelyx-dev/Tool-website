import { PARENT_LABELS } from '@/lib/indiana-child-support/form-helpers';
import type { IndianaWorksheet } from '@/lib/indiana-child-support/compute-child-support';
import { PARENT_IDS } from '@/lib/schemas/indiana-child-support-schema';
import { formatUsd } from '@/lib/indiana-child-support/money';

type WorksheetRow = {
  line: string;
  label: string;
  /** One value per parent, or a single combined value. */
  perParent?: [string, string];
  combined?: string;
};

function buildRows(result: IndianaWorksheet): WorksheetRow[] {
  const { parentOne, parentTwo } = result.parents;
  const percent = (share: number) => `${(share * 100).toFixed(2)}%`;
  return [
    {
      line: '1',
      label: 'Weekly gross income',
      perParent: [formatUsd(parentOne.weeklyGrossIncome), formatUsd(parentTwo.weeklyGrossIncome)],
    },
    {
      line: '1E',
      label: 'Weekly adjusted income (after lines 1A to 1D)',
      perParent: [
        formatUsd(parentOne.weeklyAdjustedIncome),
        formatUsd(parentTwo.weeklyAdjustedIncome),
      ],
    },
    {
      line: '2',
      label: 'Percentage share of combined income',
      perParent: [percent(parentOne.incomeShare), percent(parentTwo.incomeShare)],
    },
    {
      line: '3',
      label: 'Combined weekly adjusted income',
      combined: formatUsd(result.combinedWeeklyAdjustedIncome),
    },
    {
      line: '4',
      label: 'Basic child support obligation (schedule)',
      combined: formatUsd(result.basicObligation),
    },
    { line: '4A', label: 'Work-related child care', combined: formatUsd(result.childCare) },
    { line: '4B', label: "Children's health premiums", combined: formatUsd(result.healthInsurance) },
    { line: '5', label: 'Total child support obligation', combined: formatUsd(result.totalObligation) },
    {
      line: '6',
      label: "Each parent's obligation (line 2 × line 5)",
      perParent: [formatUsd(parentOne.obligation), formatUsd(parentTwo.obligation)],
    },
  ];
}

export function ChildSupportWorksheetTable({ result }: { result: IndianaWorksheet }) {
  return (
    <div className='overflow-x-auto'>
      <table className='w-full min-w-[520px] text-sm'>
        <caption className='sr-only'>
          Child Support Obligation Worksheet, weekly amounts
        </caption>
        <thead>
          <tr className='border-b border-border text-left'>
            <th scope='col' className='py-2 pr-3 font-medium text-muted-foreground'>
              Worksheet line (weekly)
            </th>
            {PARENT_IDS.map(id => (
              <th key={id} scope='col' className='py-2 pr-3 font-semibold'>
                {PARENT_LABELS[id]}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {buildRows(result).map(row => (
            <tr key={row.line} className='border-b border-border/70'>
              <th scope='row' className='py-2 pr-3 text-left font-normal text-muted-foreground'>
                {row.line}. {row.label}
              </th>
              {row.perParent ? (
                row.perParent.map((value, index) => (
                  <td key={PARENT_IDS[index]} className='py-2 pr-3 tabular-nums'>
                    {value}
                  </td>
                ))
              ) : (
                <td colSpan={2} className='py-2 pr-3 tabular-nums'>
                  {row.combined}
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
