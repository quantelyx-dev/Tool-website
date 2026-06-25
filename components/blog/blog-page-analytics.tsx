'use client';

import { useBlogAnalytics } from '@/hooks/use-blog-analytics';

type BlogPageAnalyticsProps = {
  slug: string;
  toolName: string;
};

export function BlogPageAnalytics({ slug, toolName }: BlogPageAnalyticsProps) {
  useBlogAnalytics(slug, { toolName, trackViewOnMount: true });
  return null;
}
