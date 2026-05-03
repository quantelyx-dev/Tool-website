/** PDF export (@react-pdf/renderer). Dynamically imported from client UI only — avoid SSR. */

import React from 'react';

import {
  Document,
  Page,
  pdf,
  StyleSheet,
  Text,
  View,
} from '@react-pdf/renderer';

import type { DailyCompoundSavedRun } from '@/lib/daily-compound-interest/api';
import {
  compoundExportDateStamp,
  compoundExportGeneratedAtUtcIso,
  safeCompoundExportFilenameSegment,
} from '@/lib/daily-compound-interest/export-dataset';
import { PdfGrowthCurveChart } from '@/lib/daily-compound-interest/export-pdf-growth-chart';
import { CONTRIBUTION_FREQUENCY_LABELS } from '@/lib/daily-compound-interest/contribution-frequency';
import { formatCurrencyAmount } from '@/lib/daily-compound-interest/format-currency';
import { parseNonNegativeMoneyString } from '@/lib/daily-compound-interest/form-parsing';
import type { DailyCompoundFormValues } from '@/lib/schemas/daily-compound-schema';

/** Horizontal inset — keeps body copy clear of trim / viewer chrome. */
const PAGE_MARGIN_X = 64;

/**
 * Bottom inset reserved for the fixed footer band so wrapped paragraphs cannot
 * render underneath it.
 */
const PAGE_MARGIN_BOTTOM = 78;

const PAGE_MARGIN_TOP = 52;

const TOC_ENTRIES = [
  'Overview — calculator purpose & options',
  'Inputs & outputs (tabular summary)',
  'Growth visualization',
  'Disclaimer',
] as const;

const styles = StyleSheet.create({
  page: {
    paddingTop: PAGE_MARGIN_TOP,
    paddingBottom: PAGE_MARGIN_BOTTOM,
    paddingHorizontal: PAGE_MARGIN_X,
    fontFamily: 'Helvetica',
    fontSize: 11,
    lineHeight: 1.55,
    color: '#111827',
  },
  title: {
    fontFamily: 'Helvetica-Bold',
    fontSize: 20,
    marginBottom: 6,
    color: '#0f172a',
  },
  subtitle: {
    fontSize: 10,
    color: '#4b5563',
    marginBottom: 22,
  },
  tocHeading: {
    fontFamily: 'Helvetica-Bold',
    fontSize: 13,
    marginTop: 8,
    marginBottom: 10,
    color: '#1e293b',
  },
  tocIntro: {
    fontSize: 10,
    color: '#64748b',
    marginBottom: 14,
    lineHeight: 1.45,
  },
  tocRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
    paddingVertical: 8,
    borderBottomWidth: 0.5,
    borderBottomColor: '#e2e8f0',
    borderBottomStyle: 'solid',
  },
  tocIndex: {
    width: 18,
    flexShrink: 0,
    fontSize: 10,
    fontFamily: 'Helvetica-Bold',
    color: '#6366f1',
    lineHeight: 1.45,
  },
  tocTitle: {
    flexGrow: 1,
    flexShrink: 1,
    fontSize: 10,
    color: '#334155',
    lineHeight: 1.45,
  },
  h2: {
    fontFamily: 'Helvetica-Bold',
    fontSize: 12,
    marginTop: 14,
    marginBottom: 6,
    color: '#1e293b',
  },
  /** First heading after page break — no extra top margin. */
  h2First: {
    marginTop: 0,
  },
  h3: {
    fontFamily: 'Helvetica-Bold',
    fontSize: 10,
    marginTop: 12,
    marginBottom: 6,
    color: '#334155',
  },
  p: {
    marginBottom: 8,
    textAlign: 'justify',
  },
  tableSectionBanner: {
    marginTop: 10,
    paddingVertical: 6,
    paddingHorizontal: 10,
    backgroundColor: '#eef2ff',
    borderLeftWidth: 3,
    borderLeftColor: '#6366f1',
    borderLeftStyle: 'solid',
  },
  tableSectionTitle: {
    fontFamily: 'Helvetica-Bold',
    fontSize: 9,
    color: '#3730a3',
    textTransform: 'uppercase',
    letterSpacing: 0.6,
  },
  tableRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    borderBottomWidth: 0.5,
    borderBottomColor: '#e2e8f0',
    borderBottomStyle: 'solid',
  },
  tableCellLabel: {
    flex: 2.25,
    paddingVertical: 7,
    paddingHorizontal: 10,
    fontSize: 9,
    color: '#475569',
  },
  tableCellValue: {
    flex: 2.85,
    paddingVertical: 7,
    paddingHorizontal: 10,
    fontSize: 9,
    fontFamily: 'Helvetica-Bold',
    color: '#0f172a',
    textAlign: 'right',
  },
  chartCard: {
    marginTop: 10,
    padding: 12,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderStyle: 'solid',
    borderRadius: 4,
    backgroundColor: '#ffffff',
  },
  chartCaption: {
    marginTop: 10,
    fontSize: 8,
    color: '#64748b',
    lineHeight: 1.45,
  },
  legendRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 14,
    marginTop: 10,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  legendBullet: {
    fontSize: 9,
    fontFamily: 'Helvetica-Bold',
    color: '#059669',
  },
  legendBulletMuted: {
    fontSize: 9,
    fontFamily: 'Helvetica-Bold',
    color: '#64748b',
  },
  legendLabel: {
    fontSize: 9,
    color: '#475569',
  },
  footnote: {
    marginTop: 14,
    fontSize: 9,
    color: '#64748b',
    lineHeight: 1.45,
  },
  footerBand: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: PAGE_MARGIN_X,
    paddingTop: 10,
    paddingBottom: 14,
    backgroundColor: '#eef2ff',
    borderTopWidth: 1,
    borderTopColor: '#c7d2fe',
    borderTopStyle: 'solid',
  },
  footerBrand: {
    fontSize: 9,
    color: '#475569',
    textAlign: 'center',
  },
});

function PdfFooterBand() {
  return (
    <View style={styles.footerBand} fixed>
      <Text style={styles.footerBrand}>
        Tools · Daily compound interest calculator
      </Text>
    </View>
  );
}

function PdfKvRow({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.tableRow} wrap={false}>
      <Text style={styles.tableCellLabel}>{label}</Text>
      <Text style={styles.tableCellValue}>{value}</Text>
    </View>
  );
}

function rateBasisLabel(basis: DailyCompoundFormValues['rateBasis']): string {
  return basis === 'nominal'
    ? 'Nominal APR-style (spread across 365 daily periods)'
    : 'Effective annual APY (mapped to a daily multiplier)';
}

function formatTimelinePhrase(inputs: DailyCompoundFormValues): string {
  const y = Number(inputs.timelineYears);
  const mo = Number(inputs.timelineMonths);
  const d = Number(inputs.timelineExtraDays);
  const parts: string[] = [];
  if (y > 0) parts.push(`${y} year${y === 1 ? '' : 's'}`);
  if (mo > 0) parts.push(`${mo} month${mo === 1 ? '' : 's'}`);
  if (d > 0) parts.push(`${d} extra day${d === 1 ? '' : 's'}`);
  return parts.length ? parts.join(', ') : '—';
}

function contributionAmountDisplay(
  inputs: DailyCompoundFormValues,
  currency: string,
): string {
  const raw = inputs.contributionAmount.trim();
  if (!raw) return 'None';
  const n = parseNonNegativeMoneyString(raw);
  if (n === null) return raw;
  return formatCurrencyAmount(currency, n);
}

function buildPdfFilename(saved: DailyCompoundSavedRun): string {
  const stamp = compoundExportDateStamp();
  const cur = safeCompoundExportFilenameSegment(saved.result.currency);
  return `compound-projection_summary_${stamp}_${cur}.pdf`;
}

function truncateMeta(s: string, maxLen: number): string {
  if (s.length <= maxLen) return s;
  return `${s.slice(0, Math.max(0, maxLen - 1)).trim()}…`;
}

export function DailyCompoundExplanationPdfDoc({
  saved,
}: {
  saved: DailyCompoundSavedRun;
}) {
  const { inputs, result } = saved;
  const { projection, monthlySeries } = result;
  const generated = compoundExportGeneratedAtUtcIso();
  const cur = result.currency;

  const principalParsed = parseNonNegativeMoneyString(inputs.principal.trim());
  const principalDisplay =
    principalParsed !== null
      ? formatCurrencyAmount(cur, principalParsed)
      : inputs.principal;

  return (
    <Document
      title='Daily compound interest — projection summary'
      subject='Calculator overview, inputs & outputs, growth curve'
      language='en'>
      <Page size='A4' wrap={false} style={styles.page}>
        <Text style={styles.title}>
          Daily compound interest — projection summary
        </Text>
        <Text style={styles.subtitle}>
          Generated (UTC){generated ? `: ${truncateMeta(generated, 140)}` : ''}.
          Figures reflect this saved run; rounding may differ slightly from CSV
          / Excel exports.
        </Text>

        <Text style={styles.tocHeading}>Contents</Text>
        <Text style={styles.tocIntro}>
          Sections begin on page 2: an overview of the tool, your inputs &
          outputs in tables, then the growth curve used in the results card.
        </Text>

        <View>
          {TOC_ENTRIES.map((label, i) => (
            <View key={label} style={styles.tocRow} wrap={false}>
              <Text style={styles.tocIndex}>{`${i + 1}.`}</Text>
              <Text style={styles.tocTitle}>{label}</Text>
            </View>
          ))}
        </View>

        <PdfFooterBand />
      </Page>

      <Page size='A4' wrap style={styles.page}>
        <Text style={[styles.h2, styles.h2First]}>
          Overview — calculator purpose & options
        </Text>
        <Text style={styles.p}>
          This workbook estimates how a balance grows when interest compounds
          daily. You choose a starting principal, currency, annual rate, how
          that rate is interpreted (nominal vs APY-style), how long to run the
          simulation (years, months, and optional extra days), optional
          recurring deposits on a fixed rhythm, and whether accrued interest
          should reinvest into the balance each day or accumulate separately
          until the end.
        </Text>
        <Text style={styles.p}>
          The engine advances one simulated day at a time: months contribute 30
          simulated days and years add 365 — deterministic for reproducible
          totals, though real bank calendars may differ.
        </Text>
        <Text style={styles.p}>
          With <Text style={{ fontFamily: 'Helvetica-Bold' }}>reinvest</Text>{' '}
          enabled, the whole balance including prior interest scales daily by{' '}
          <Text style={{ fontFamily: 'Helvetica-Oblique' }}>
            (1 + daily rate)
          </Text>
          . With reinvest off, capital (principal + deposits) earns interest
          while a separate bucket tracks accrued interest until the horizon ends
          — matching what you see in the app and spreadsheet exports.
        </Text>

        <Text style={styles.h2}>Inputs & outputs (tabular summary)</Text>

        <Text style={styles.h3}>Inputs</Text>
        <View style={styles.tableSectionBanner} wrap={false}>
          <Text style={styles.tableSectionTitle}>Scenario inputs</Text>
        </View>
        <PdfKvRow label='Principal' value={principalDisplay} />
        <PdfKvRow label='Currency (ISO)' value={cur} />
        <PdfKvRow
          label='Annual rate'
          value={`${inputs.annualRatePercent.trim()}%`}
        />
        <PdfKvRow label='Rate basis' value={rateBasisLabel(inputs.rateBasis)} />
        <PdfKvRow label='Timeline' value={formatTimelinePhrase(inputs)} />
        <PdfKvRow
          label='Contribution amount (per period)'
          value={contributionAmountDisplay(inputs, cur)}
        />
        <PdfKvRow
          label='Contribution frequency'
          value={CONTRIBUTION_FREQUENCY_LABELS[inputs.contributionFrequency]}
        />
        <PdfKvRow
          label='Reinvest interest daily'
          value={inputs.reinvestInterest ? 'Yes' : 'No'}
        />

        <Text style={styles.h3}>Outputs</Text>
        <View style={styles.tableSectionBanner} wrap={false}>
          <Text style={styles.tableSectionTitle}>Projection totals</Text>
        </View>
        <PdfKvRow
          label='Simulated horizon'
          value={`${projection.simulationDays.toLocaleString('en-US')} days`}
        />
        <PdfKvRow
          label='Final balance'
          value={formatCurrencyAmount(cur, projection.finalBalance)}
        />
        <PdfKvRow
          label='Total deposits'
          value={formatCurrencyAmount(cur, projection.totalDeposits)}
        />
        <PdfKvRow
          label='Interest earned'
          value={formatCurrencyAmount(cur, projection.interestEarned)}
        />

        <View minPresenceAhead={120}>
          <Text style={styles.h2}>Growth visualization</Text>
          <Text style={styles.p}>
            The chart below uses the same monthly sample series as the Growth
            curve card in your results: balance (filled area + solid line)
            versus cumulative contributions (dashed).
          </Text>

          <View style={styles.chartCard} wrap={false}>
            <PdfGrowthCurveChart currency={cur} monthlySeries={monthlySeries} />
          </View>

          <View style={styles.legendRow}>
            <View style={styles.legendItem}>
              <Text style={styles.legendBullet}>Total balance</Text>
            </View>
            <View style={styles.legendItem}>
              <Text style={styles.legendBulletMuted}>
                Cumulative contributions
              </Text>
            </View>
          </View>

          <Text style={styles.chartCaption}>
            Horizontal axis: elapsed months (~30 simulated days between
            samples). Horizon for this run:{' '}
            {projection.simulationDays.toLocaleString('en-US')} simulated days (
            {cur}).
          </Text>
        </View>

        <Text style={styles.h2}>Disclaimer</Text>
        <Text style={styles.footnote}>
          Pedagogical simulator only — not tax, lending, brokerage, or fiduciary
          advice. Fees, taxes, institution rounding, leap rules, and FX are not
          modeled unless you reproduce them elsewhere. For row-level schedules
          use the CSV / Excel exports from the Export panel.
        </Text>

        <PdfFooterBand />
      </Page>
    </Document>
  );
}

function triggerPdfDownload(blob: Blob, filename: string): void {
  const url = URL.createObjectURL(blob);
  try {
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.rel = 'noopener';
    document.body.appendChild(a);
    a.click();
    a.remove();
  } finally {
    URL.revokeObjectURL(url);
  }
}

/** Builds narrative PDF and triggers browser download (client environments only). */
export async function exportDailyCompoundExplanationPdf(
  saved: DailyCompoundSavedRun,
): Promise<void> {
  const instance = pdf(<DailyCompoundExplanationPdfDoc saved={saved} />);
  const blob = await instance.toBlob();
  triggerPdfDownload(blob, buildPdfFilename(saved));
}
