"use client";

import Link from "next/link";

import { trackBlogPostClick } from "@/lib/analytics";
import type { BlogPost } from "@/lib/blogs/types";
import { cn } from "@/lib/utils";

type RelatedBlogPostsProps = {
  posts: BlogPost[];
  className?: string;
};

export function RelatedBlogPosts({ posts, className }: RelatedBlogPostsProps) {
  if (posts.length === 0) {
    return null;
  }

  return (
    <section
      className={cn("mt-12 border-t border-border pt-10", className)}
      aria-labelledby="related-guides-heading"
    >
      <h2
        id="related-guides-heading"
        className="mb-6 text-xl font-bold tracking-tight"
      >
        Related guides
      </h2>
      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3" role="list">
        {posts.map((related) => (
          <li key={related.slug}>
            <Link
              href={`/blog/${related.slug}`}
              className="block rounded-lg border border-border p-4 transition-colors hover:border-indigo-300 hover:bg-muted/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600 focus-visible:ring-offset-2"
              onClick={() => trackBlogPostClick(related.slug, "related")}
            >
              <p className="font-medium leading-snug hover:text-indigo-600 transition-colors">
                {related.title}
              </p>
              <p className="mt-1 text-sm text-muted-foreground line-clamp-2">
                {related.excerpt}
              </p>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
