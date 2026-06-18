"use client";

import {
  DownloadIcon,
  FileSpreadsheetIcon,
  FileText,
  Loader2Icon,
} from "lucide-react";
import { useCallback, useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import type { DailyCompoundSavedRun } from "@/lib/daily-compound-interest/api";
import { exportDailyCompoundToCsv } from "@/lib/daily-compound-interest/export-csv";
import { exportDailyCompoundToXlsx } from "@/lib/daily-compound-interest/export-xlsx";
import { cn } from "@/lib/utils";
import { trackDownload } from "@/lib/analytics";

const EXPORT_FOOTNOTE_ID = "dcf-export-footnote";

type DailyCompoundExportCardProps = {
  className?: string;
  /** Inputs + projection snapshot after last successful Calculate; enables exports. */
  savedRun: DailyCompoundSavedRun | null;
};

export function DailyCompoundExportCard({
  className,
  savedRun,
}: DailyCompoundExportCardProps) {
  const [xlsxBusy, setXlsxBusy] = useState(false);
  const [csvBusy, setCsvBusy] = useState(false);
  const [pdfBusy, setPdfBusy] = useState(false);

  const anyExportBusy = xlsxBusy || csvBusy || pdfBusy;
  const canExport = Boolean(savedRun) && !anyExportBusy;

  const handleXlsx = useCallback(async () => {
    if (!savedRun || anyExportBusy) return;
    trackDownload("daily-compound-interest", "xlsx");
    setXlsxBusy(true);
    try {
      await exportDailyCompoundToXlsx(savedRun);
    } catch {
      toast.error("Could not build the spreadsheet.", {
        description: "Try again, or reload the page if the issue persists.",
      });
    } finally {
      setXlsxBusy(false);
    }
  }, [anyExportBusy, savedRun]);

  const handleCsv = useCallback(() => {
    if (!savedRun || anyExportBusy) return;
    trackDownload("daily-compound-interest", "csv");
    setCsvBusy(true);
    try {
      exportDailyCompoundToCsv(savedRun);
    } catch {
      toast.error("Could not build the CSV file.", {
        description: "Try again, or reload the page if the issue persists.",
      });
    } finally {
      setCsvBusy(false);
    }
  }, [anyExportBusy, savedRun]);

  const handlePdf = useCallback(async () => {
    if (!savedRun || anyExportBusy) return;
    trackDownload("daily-compound-interest", "pdf");
    setPdfBusy(true);
    try {
      const { exportDailyCompoundExplanationPdf } =
        await import("@/lib/daily-compound-interest/export-pdf");
      await exportDailyCompoundExplanationPdf(savedRun);
    } catch {
      toast.error("Could not build the PDF.", {
        description: "Try again, or reload the page if the issue persists.",
      });
    } finally {
      setPdfBusy(false);
    }
  }, [anyExportBusy, savedRun]);

  return (
    <Card className={cn("shadow-xs", className)}>
      <CardHeader className="pb-3">
        <CardTitle className="text-base" id="dcf-export-heading">
          Export
        </CardTitle>
        <CardDescription id="dcf-export-desc">
          Download summaries for spreadsheets or archiving.
        </CardDescription>
      </CardHeader>
      <CardContent
        className="space-y-3"
        role="group"
        aria-labelledby="dcf-export-heading"
        aria-describedby="dcf-export-desc"
      >
        <Button
          id="dcf-export-xlsx"
          type="button"
          variant="outline"
          className="w-full justify-start gap-2"
          disabled={!canExport}
          onClick={() => void handleXlsx()}
          aria-describedby={EXPORT_FOOTNOTE_ID}
        >
          {xlsxBusy ? (
            <Loader2Icon className="size-4 shrink-0 animate-spin" aria-hidden />
          ) : (
            <FileSpreadsheetIcon className="size-4 shrink-0" aria-hidden />
          )}
          Excel workbook (.xlsx)
        </Button>
        <Button
          id="dcf-export-csv"
          type="button"
          variant="outline"
          className="w-full justify-start gap-2"
          disabled={!canExport}
          onClick={handleCsv}
          aria-describedby={EXPORT_FOOTNOTE_ID}
        >
          {csvBusy ? (
            <Loader2Icon className="size-4 shrink-0 animate-spin" aria-hidden />
          ) : (
            <FileText className="size-4 shrink-0" aria-hidden />
          )}
          CSV schedule
        </Button>
        <Button
          id="dcf-export-pdf"
          type="button"
          variant="outline"
          className="w-full justify-start gap-2"
          disabled={!canExport}
          onClick={() => void handlePdf()}
          aria-describedby={EXPORT_FOOTNOTE_ID}
        >
          {pdfBusy ? (
            <Loader2Icon className="size-4 shrink-0 animate-spin" aria-hidden />
          ) : (
            <DownloadIcon className="size-4 shrink-0" aria-hidden />
          )}
          PDF summary
        </Button>
        <Separator />
        <p id={EXPORT_FOOTNOTE_ID} className="text-xs text-muted-foreground">
          Excel and CSV carry full tabular snapshots. PDF today is an
          explanatory companion (methodology plus your headline numbers); TOC,
          richer tables, and chart inset will arrive in a future update.
        </p>
      </CardContent>
    </Card>
  );
}
