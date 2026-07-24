'use client';

import { Base64FileDecodePanel } from '@/components/base64-tool/base64-file-decode-panel';
import { Base64FileEncodePanel } from '@/components/base64-tool/base64-file-encode-panel';
import type { Base64AnalyticsHandlers } from '@/components/base64-tool/base64-tool-content';
import { cn } from '@/lib/utils';

type Base64FilePanelProps = {
  analytics: Base64AnalyticsHandlers;
  className?: string;
};

export function Base64FilePanel({ analytics, className }: Base64FilePanelProps) {
  return (
    <div className={cn('flex flex-col gap-8', className)}>
      <div>
        <h2 className={cn('mb-3 text-sm font-semibold text-foreground')}>
          Encode a file to Base64
        </h2>
        <Base64FileEncodePanel analytics={analytics} />
      </div>

      <div>
        <h2 className={cn('mb-3 text-sm font-semibold text-foreground')}>
          Decode Base64 back to a file
        </h2>
        <Base64FileDecodePanel analytics={analytics} />
      </div>
    </div>
  );
}
