'use client';

import { useCallback, useEffect } from 'react';
import {
  trackBlogPostClick,
  trackBlogToolCtaClick,
  trackBlogView,
} from '@/lib/analytics';

/**
 * Returns stable, blog-scoped event helpers.
 * Pass the slug once and call helpers without repeating it.
 *
 * Usage:
 *   const { onView, onPostClick, onToolCtaClick } = useBlogAnalytics('my-slug', { toolName: 'My Tool' });
 */
export function useBlogAnalytics(
  blogSlug: string,
  options?: { toolName?: string; trackViewOnMount?: boolean },
) {
  const { toolName, trackViewOnMount = false } = options ?? {};

  const onView = useCallback(
    (extra?: Record<string, string | number | boolean>) =>
      trackBlogView(blogSlug, {
        ...(toolName ? { tool_name: toolName } : {}),
        ...extra,
      }),
    [blogSlug, toolName],
  );

  const onPostClick = useCallback(
    (source: 'list' | 'related' | 'tool_promo') =>
      trackBlogPostClick(blogSlug, source),
    [blogSlug],
  );

  const onToolCtaClick = useCallback(
    (source: 'inline' | 'footer') => {
      if (!toolName) return;
      trackBlogToolCtaClick(blogSlug, toolName, source);
    },
    [blogSlug, toolName],
  );

  useEffect(() => {
    if (trackViewOnMount) {
      onView();
    }
  }, [trackViewOnMount, onView]);

  return { onView, onPostClick, onToolCtaClick };
}
