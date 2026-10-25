import { formatCurrencyAmount } from '@/lib/daily-compound-interest/format-currency';
import {
  getBreakdownGroups,
  visibleRows,
} from '@/lib/us-paycheck/breakdown';
import {
  scaleAmounts,
  type PaycheckResult,
} from '@/lib/us-paycheck/compute-paycheck';
import { FEDERAL_TAX_YEAR } from '@/lib/us-paycheck/federal-tax-data';

const usd = (amount: number) => formatCurrencyAmount('USD', amount, 'en-US');

type ExportRow = { label: string; perPaycheck: number; annual: number };

function buildRows(result: PaycheckResult): ExportRow[] {
  const perPaycheck = scaleAmounts(result.annual, result.periodsPerYear);
  const annual = scaleAmounts(result.annual, 1);
  const rows: ExportRow[] = [
    { label: 'Gross pay', perPaycheck: perPaycheck.gross, annual: annual.gross },
  ];

  getBreakdownGroups(result.state.name).forEach(group => {
    visibleRows(group, annual).forEach(row => {
      rows.push({
        label: row.label,
        perPaycheck: -perPaycheck[row.key],
        annual: -annual[row.key],
      });
    });
  });

  rows.push({ label: 'Take-home pay', perPaycheck: perPaycheck.net, annual: annual.net });
  return rows;
}

export function buildSummaryText(result: PaycheckResult): string {
  const lines = buildRows(result).map(
    row => `${row.label}: ${usd(row.perPaycheck)} per paycheck / ${usd(row.annual)} per year`,
  );
  return [
    `US paycheck estimate (${FEDERAL_TAX_YEAR} tax rules, ${result.state.name})`,
    ...lines,
    `Effective tax rate: ${(result.effectiveTaxRate * 100).toFixed(1)}%`,
  ].join('\n');
}

export function buildCsv(result: PaycheckResult): string {
  const header = ['Item', 'Per paycheck (USD)', 'Per year (USD)'];
  const body = buildRows(result).map(row => [
    row.label,
    row.perPaycheck.toFixed(2),
    row.annual.toFixed(2),
  ]);
  return [header, ...body]
    .map(cells => cells.map(cell => `"${cell.replace(/"/g, '""')}"`).join(','))
    .join('\r\n');
}

export function downloadCsv(csv: string, fileName: string): void {
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}
