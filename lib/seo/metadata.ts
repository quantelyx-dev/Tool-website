import type { Metadata } from "next";

import { siteDomain } from "@/lib/site-config";

/** Google & Bing recommended max visible title length (pixels ≈ 60 chars). */
export const SEO_TITLE_MAX = 60;

/** Google & Bing recommended meta description length. */
export const SEO_DESCRIPTION_MAX = 160;

/** Google Article headline limit in structured data. */
export const SEO_ARTICLE_HEADLINE_MAX = 110;

const TITLE_SUFFIX = () => ` | ${siteDomain}`;

export function truncateForSeo(text: string, max: number): string {
  const normalized = text.replace(/\s+/g, " ").trim();
  if (normalized.length <= max) {
    return normalized;
  }

  const slice = normalized.slice(0, max);
  const lastSpace = slice.lastIndexOf(" ");

  if (lastSpace > Math.floor(max * 0.6)) {
    return `${slice.slice(0, lastSpace).trimEnd()}…`;
  }

  return `${slice.trimEnd()}…`;
}

/** Title segment before the root layout `| siteDomain` template suffix. */
export function buildDocumentTitle(pageTitle: string): string {
  const maxSegment = SEO_TITLE_MAX - TITLE_SUFFIX().length;
  return truncateForSeo(pageTitle, maxSegment);
}

/** Full title for Open Graph, Twitter, and JSON-LD (includes site name). */
export function buildFullTitle(pageTitle: string): string {
  return truncateForSeo(`${pageTitle}${TITLE_SUFFIX()}`, SEO_TITLE_MAX);
}

export function buildSeoDescription(description: string): string {
  return truncateForSeo(description, SEO_DESCRIPTION_MAX);
}

export type PageMetadataInput = {
  title: string;
  description: string;
  /** Site path starting with `/`, e.g. `/blog/my-post`. */
  path: string;
  keywords?: string[];
  openGraphType?: "website" | "article";
  publishedTime?: string;
  modifiedTime?: string;
};

export function createPageMetadata(input: PageMetadataInput): Metadata {
  const description = buildSeoDescription(input.description);
  const documentTitle = buildDocumentTitle(input.title);
  const fullTitle = buildFullTitle(input.title);
  const canonicalPath = input.path.startsWith("/") ? input.path : `/${input.path}`;

  return {
    title: documentTitle,
    description,
    keywords: input.keywords,
    alternates: {
      canonical: canonicalPath,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    openGraph: {
      title: fullTitle,
      description,
      url: canonicalPath,
      siteName: siteDomain,
      locale: "en_US",
      type: input.openGraphType ?? "website",
      ...(input.publishedTime ? { publishedTime: input.publishedTime } : {}),
      ...(input.modifiedTime ? { modifiedTime: input.modifiedTime } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
    },
  };
}

/** Normalize YYYY-MM-DD dates to ISO 8601 for structured data. */
export function toIsoDate(date: string): string {
  if (date.includes("T")) {
    return date;
  }
  return `${date}T00:00:00.000Z`;
}
