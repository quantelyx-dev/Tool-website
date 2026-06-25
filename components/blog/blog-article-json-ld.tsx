import { siteDomain, siteUrl } from "@/lib/site-config";
import type { BlogPost } from "@/lib/blogs/types";
import {
  buildSeoDescription,
  toIsoDate,
  truncateForSeo,
  SEO_ARTICLE_HEADLINE_MAX,
} from "@/lib/seo/metadata";

type BlogArticleJsonLdProps = {
  post: BlogPost;
};

export function BlogArticleJsonLd({ post }: BlogArticleJsonLdProps) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: truncateForSeo(post.title, SEO_ARTICLE_HEADLINE_MAX),
    description: buildSeoDescription(post.excerpt),
    datePublished: toIsoDate(post.publishedAt),
    dateModified: toIsoDate(post.updatedAt),
    author: {
      "@type": "Organization",
      name: siteDomain,
      url: siteUrl,
    },
    publisher: {
      "@type": "Organization",
      name: siteDomain,
      url: siteUrl,
      logo: {
        "@type": "ImageObject",
        url: `${siteUrl}/icon.png`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${siteUrl}/blog/${post.slug}`,
    },
    url: `${siteUrl}/blog/${post.slug}`,
    keywords: post.keywords.join(", "),
    inLanguage: "en-US",
    isAccessibleForFree: true,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
