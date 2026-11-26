import { JsonLd } from "@/lib/seo/json-ld";
import { AUTHOR, BRAND_NAME, siteUrl } from "@/lib/site-config";
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
    image: `${siteUrl}/icon.png`,
    headline: truncateForSeo(post.title, SEO_ARTICLE_HEADLINE_MAX),
    description: buildSeoDescription(post.excerpt),
    datePublished: toIsoDate(post.publishedAt),
    dateModified: toIsoDate(post.updatedAt),
    author: {
      "@type": AUTHOR.type,
      name: AUTHOR.name,
      url: `${siteUrl}${AUTHOR.path}`,
    },
    publisher: {
      "@type": "Organization",
      name: BRAND_NAME,
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

  return <JsonLd data={jsonLd} />;
}
