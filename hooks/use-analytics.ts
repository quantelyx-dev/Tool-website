'use client';

import { useCallback } from 'react';
import {
  trackToolUse,
  trackToolResult,
  trackCopy,
  trackDownload,
  trackReset,
} from '@/lib/analytics';

/**
 * Returns stable, tool-scoped event helpers.
 * Pass the tool name once and call helpers without repeating it.
 *
 * Usage:
 *   const { onUse, onResult, onCopy, onDownload, onReset } = useAnalytics('random-names');
 */
export function useAnalytics(toolName: string) {
  const onUse = useCallback(
    (extra?: Record<string, string | number | boolean>) => trackToolUse(toolName, extra),
    [toolName],
  );

  const onResult = useCallback(
    (extra?: Record<string, string | number | boolean>) => trackToolResult(toolName, extra),
    [toolName],
  );

  const onCopy = useCallback(
    (item?: string) => trackCopy(toolName, item),
    [toolName],
  );

  const onDownload = useCallback(
    (format?: string) => trackDownload(toolName, format),
    [toolName],
  );

  const onReset = useCallback(() => trackReset(toolName), [toolName]);

  return { onUse, onResult, onCopy, onDownload, onReset };
}
