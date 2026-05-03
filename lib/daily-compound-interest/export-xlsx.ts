import type { DailyCompoundSavedRun } from '@/lib/daily-compound-interest/api';
import {
  buildDailyCompoundMonthlyTable,
  buildDailyCompoundSummaryAoA,
  compoundExportDateStamp,
  safeCompoundExportFilenameSegment,
} from '@/lib/daily-compound-interest/export-dataset';

function buildFilename(saved: DailyCompoundSavedRun): string {
  const stamp = compoundExportDateStamp();
  const cur = safeCompoundExportFilenameSegment(saved.result.currency);
  return `compound-projection_${stamp}_${cur}.xlsx`;
}

/**
 * Builds a two-sheet workbook (summary + monthly samples) and triggers a browser download.
 * Dynamic-imports `xlsx` so the bundle only loads when the user exports.
 */

export async function exportDailyCompoundToXlsx(
  saved: DailyCompoundSavedRun,
): Promise<void> {
  const XLSX = await import('xlsx');

  const summaryBody = buildDailyCompoundSummaryAoA(saved);
  const summarySheet = XLSX.utils.aoa_to_sheet(summaryBody);
  const { headers, rows } = buildDailyCompoundMonthlyTable(saved);
  const monthlySheet = XLSX.utils.aoa_to_sheet([[...headers], ...rows]);

  monthlySheet['!cols'] = [{ wch: 14 }, { wch: 16 }, { wch: 18 }, { wch: 22 }];

  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, summarySheet, 'Summary');
  XLSX.utils.book_append_sheet(workbook, monthlySheet, 'Monthly samples');
  XLSX.writeFile(workbook, buildFilename(saved), { compression: true });
}
