import type { UnparseConfig } from 'papaparse';
import { jsonToCSV } from 'react-papaparse';

import type { DailyCompoundSavedRun } from '@/lib/daily-compound-interest/api';
import {
  buildDailyCompoundMonthlyTable,
  buildDailyCompoundSummaryAoA,
  compoundExportDateStamp,
  safeCompoundExportFilenameSegment,
} from '@/lib/daily-compound-interest/export-dataset';

const UNPARSE: UnparseConfig = {
  newline: '\r\n',
};

function buildUnparseRows(
  saved: DailyCompoundSavedRun,
): (string | number)[][] {
  const { headers, rows } = buildDailyCompoundMonthlyTable(saved);
  return [
    ...buildDailyCompoundSummaryAoA(saved),
    [],
    ['Monthly samples'],
    [...headers],
    ...rows,
  ];
}

function buildFilename(saved: DailyCompoundSavedRun): string {
  const stamp = compoundExportDateStamp();
  const cur = safeCompoundExportFilenameSegment(saved.result.currency);
  return `compound-projection_${stamp}_${cur}.csv`;
}

/**
 * Builds a UTF-8 CSV via Papa Parse (Excel-friendly `\r\n`, BOM prefix).
 * Matches XLSX summary + monthly sections.
 */
export function exportDailyCompoundToCsv(saved: DailyCompoundSavedRun): void {
  const csv = jsonToCSV(buildUnparseRows(saved), UNPARSE);
  const blob = new Blob([`\uFEFF${csv}`], {
    type: 'text/csv;charset=utf-8',
  });
  const url = URL.createObjectURL(blob);
  try {
    const a = document.createElement('a');
    a.href = url;
    a.download = buildFilename(saved);
    a.rel = 'noopener';
    document.body.appendChild(a);
    a.click();
    a.remove();
  } finally {
    URL.revokeObjectURL(url);
  }
}
