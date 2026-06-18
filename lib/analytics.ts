'use client';

import { sendGAEvent } from '@next/third-parties/google';

// All GA4 custom event names used across the site
type GAEventName =
  | 'tool_use'
  | 'tool_result'
  | 'copy_result'
  | 'download_result'
  | 'share_result'
  | 'tool_search'
  | 'tool_reset'
  | 'outbound_link';

type GAEventParams = Record<string, string | number | boolean>;

export function trackEvent(name: GAEventName, params?: GAEventParams) {
  try {
    sendGAEvent('event', name, params ?? {});
  } catch {
    // GA not loaded yet (dev/SSR) — swallow silently
  }
}

// Convenience helpers used by tool components

export function trackToolUse(toolName: string, extraParams?: GAEventParams) {
  trackEvent('tool_use', { tool_name: toolName, ...extraParams });
}

export function trackToolResult(toolName: string, extraParams?: GAEventParams) {
  trackEvent('tool_result', { tool_name: toolName, ...extraParams });
}

export function trackCopy(toolName: string, item?: string) {
  trackEvent('copy_result', { tool_name: toolName, ...(item ? { item } : {}) });
}

export function trackDownload(toolName: string, format?: string) {
  trackEvent('download_result', { tool_name: toolName, ...(format ? { format } : {}) });
}

export function trackReset(toolName: string) {
  trackEvent('tool_reset', { tool_name: toolName });
}

export function trackSearch(query: string, resultCount?: number) {
  trackEvent('tool_search', {
    search_term: query,
    ...(resultCount !== undefined ? { result_count: resultCount } : {}),
  });
}
