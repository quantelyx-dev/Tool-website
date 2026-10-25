'use client';

import { CopyIcon, DownloadIcon } from 'lucide-react';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import type { PaycheckResult } from '@/lib/us-paycheck/compute-paycheck';
import {
  buildCsv,
  buildSummaryText,
  downloadCsv,
} from '@/lib/us-paycheck/export-paycheck';

type PaycheckResultsActionsProps = {
  result: PaycheckResult;
  onCopy: (item?: string) => void;
  onDownload: (format?: string) => void;
};

export function PaycheckResultsActions({
  result,
  onCopy,
  onDownload,
}: PaycheckResultsActionsProps) {
  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(buildSummaryText(result));
      onCopy('summary');
      toast.success('Paycheck summary copied');
    } catch {
      toast.error('Could not copy to the clipboard');
    }
  }

  function handleDownload() {
    downloadCsv(buildCsv(result), 'paycheck-estimate.csv');
    onDownload('csv');
  }

  return (
    <div className='flex flex-wrap gap-2'>
      <Button type='button' variant='outline' size='sm' onClick={handleCopy}>
        <CopyIcon aria-hidden />
        Copy summary
      </Button>
      <Button type='button' variant='outline' size='sm' onClick={handleDownload}>
        <DownloadIcon aria-hidden />
        Download CSV
      </Button>
    </div>
  );
}
