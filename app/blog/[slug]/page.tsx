import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { BlogArticleJsonLd } from "@/components/blog/blog-article-json-ld";
import { BlogFaqJsonLd } from "@/components/blog/blog-faq-json-ld";
import {
  BlogPostRenderer,
  RelatedBlogPosts,
} from "@/components/blog/blog-post-renderer";
import { PageBreadcrumb } from "@/components/shared/page-breadcrumb";
import { ToolFaqSection } from "@/components/shared/tool-faq-section";
import {
  getAllBlogSlugs,
  getBlogPostBySlug,
  getRelatedBlogPosts,
} from "@/lib/blogs";
import { createPageMetadata, toIsoDate } from "@/lib/seo/metadata";
import { cn } from "@/lib/utils";

type BlogPostPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getAllBlogSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) {
    return { title: "Post not found", robots: { index: false, follow: false } };
  }

  return createPageMetadata({
    title: post.title,
    description: post.excerpt,
    path: `/blog/${post.slug}`,
    keywords: post.keywords,
    openGraphType: "article",
    publishedTime: toIsoDate(post.publishedAt),
    modifiedTime: toIsoDate(post.updatedAt),
  });
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const relatedPosts = getRelatedBlogPosts(post);

  return (
    <>
      <BlogArticleJsonLd post={post} />
      <BlogFaqJsonLd faqs={post.faqs} />
      <main className={cn("flex-1")}>
        <div
          className={cn("container mx-auto max-w-5xl", "px-4 pb-20 sm:px-6")}
        >
          <PageBreadcrumb
            items={[
              { label: "Blog", href: "/blog" },
              { label: post.title },
            ]}
          />
          <BlogPostRenderer post={post} />
          <RelatedBlogPosts posts={relatedPosts} />
          <ToolFaqSection faqs={post.faqs} />
        </div>
      </main>
    </>
  );
}
