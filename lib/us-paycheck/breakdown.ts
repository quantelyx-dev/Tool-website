import {
  totalDeductions,
  type PaycheckAmounts,
} from '@/lib/us-paycheck/compute-paycheck';
import { WEEKS_PER_YEAR } from '@/lib/us-paycheck/federal-tax-data';

export type BreakdownRow = {
  key: keyof PaycheckAmounts;
  label: string;
  /** Rendered even when the amount is zero. */
  alwaysShow?: boolean;
};

export type BreakdownGroup = {
  id: 'pretax' | 'taxes' | 'posttax';
  title: string;
  rows: readonly BreakdownRow[];
};

export function getBreakdownGroups(stateName: string): readonly BreakdownGroup[] {
  return [
    {
      id: 'pretax',
      title: 'Pre-tax deductions',
      rows: [
        { key: 'traditional401k', label: 'Traditional 401(k)' },
        { key: 'healthInsurance', label: 'Health insurance' },
        { key: 'hsaFsa', label: 'HSA / FSA' },
        { key: 'otherPreTax', label: 'Other pre-tax' },
      ],
    },
    {
      id: 'taxes',
      title: 'Taxes',
      rows: [
        { key: 'federalIncomeTax', label: 'Federal income tax', alwaysShow: true },
        { key: 'socialSecurity', label: 'Social Security', alwaysShow: true },
        { key: 'medicare', label: 'Medicare', alwaysShow: true },
        { key: 'additionalMedicare', label: 'Additional Medicare' },
        { key: 'stateIncomeTax', label: `${stateName} income tax`, alwaysShow: true },
        { key: 'otherStateLocal', label: 'Other state / local tax' },
      ],
    },
    {
      id: 'posttax',
      title: 'Post-tax deductions',
      rows: [
        { key: 'roth401k', label: 'Roth 401(k)' },
        { key: 'otherPostTax', label: 'Other post-tax' },
      ],
    },
  ];
}

export function visibleRows(
  group: BreakdownGroup,
  amounts: PaycheckAmounts,
): readonly BreakdownRow[] {
  return group.rows.filter(row => row.alwaysShow || amounts[row.key] > 0);
}

export type ViewOption = { id: string; label: string; divisor: number };

export function getViewOptions(periodsPerYear: number): readonly ViewOption[] {
  const options: ViewOption[] = [
    { id: 'paycheck', label: 'Paycheck', divisor: periodsPerYear },
    { id: 'weekly', label: 'Weekly', divisor: WEEKS_PER_YEAR },
    { id: 'monthly', label: 'Monthly', divisor: 12 },
    { id: 'annual', label: 'Annual', divisor: 1 },
  ];
  const seen = new Set<number>();
  return options.filter(option => {
    if (seen.has(option.divisor)) return false;
    seen.add(option.divisor);
    return true;
  });
}

export type ChartSegmentId = 'net' | 'federal' | 'fica' | 'state' | 'deductions';

export type ChartSegment = { id: ChartSegmentId; label: string; amount: number };

export function getChartSegments(annual: PaycheckAmounts): ChartSegment[] {
  const segments: ChartSegment[] = [
    { id: 'net', label: 'Take-home pay', amount: annual.net },
    { id: 'federal', label: 'Federal income tax', amount: annual.federalIncomeTax },
    {
      id: 'fica',
      label: 'Social Security & Medicare',
      amount: annual.socialSecurity + annual.medicare + annual.additionalMedicare,
    },
    {
      id: 'state',
      label: 'State & local tax',
      amount: annual.stateIncomeTax + annual.otherStateLocal,
    },
    {
      id: 'deductions',
      label: 'Deductions & savings',
      amount: totalDeductions(annual),
    },
  ];
  return segments.filter(segment => segment.amount > 0);
}
