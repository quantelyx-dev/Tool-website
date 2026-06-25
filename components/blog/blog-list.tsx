"use client";

import Link from "next/link";
import { useEffect } from "react";
import { ArrowRight, Clock, Calendar } from "lucide-react";

import { trackBlogListView, trackBlogPostClick } from "@/lib/analytics";
import { cn } from "@/lib/utils";
import type { BlogPost } from "@/lib/blogs/types";

type BlogListProps = {
  posts: BlogPost[];
  className?: string;
};

function formatBlogDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export function BlogList({ posts, className }: BlogListProps) {
  useEffect(() => {
    trackBlogListView(posts.length);
  }, [posts.length]);

  return (
    <div className={cn("py-6", className)}>
      <div className="mb-10 border-b border-border pb-6">
        <h1 className="mb-2 text-3xl font-bold tracking-tight sm:text-4xl">
          Blog
        </h1>
        <p className="max-w-2xl text-muted-foreground">
          In-depth guides, tutorials, and tips for every tool on our site —
          written to help you work smarter and rank nothing but knowledge.
        </p>
      </div>

      <ul className="grid gap-6 sm:grid-cols-2" role="list">
        {posts.map((post) => (
          <li key={post.slug}>
            <article className="group flex h-full flex-col rounded-xl border border-border bg-card p-6 transition-shadow hover:shadow-md">
              <Link
                href={`/blog/${post.slug}`}
                className="flex flex-1 flex-col focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600 focus-visible:ring-offset-2 rounded-lg"
                aria-label={`Read: ${post.title}`}
                onClick={() => trackBlogPostClick(post.slug, "list")}
              >
                <h2 className="mb-2 text-lg font-semibold leading-snug">
                  {post.title}
                </h2>
                <p className="mb-4 flex-1 text-sm text-muted-foreground leading-relaxed">
                  {post.excerpt}
                </p>
                <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
                  <span className="inline-flex items-center gap-1">
                    <Calendar className="size-3.5" aria-hidden="true" />
                    <time dateTime={post.publishedAt}>
                      {formatBlogDate(post.publishedAt)}
                    </time>
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <Clock className="size-3.5" aria-hidden="true" />
                    {post.readTimeMinutes} min read
                  </span>
                </div>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-foreground transition-all group-hover:gap-2 group-hover:text-indigo-600 dark:text-white dark:group-hover:text-indigo-400">
                  Read guide
                  <ArrowRight className="size-4" aria-hidden="true" />
                </span>
              </Link>
            </article>
          </li>
        ))}
      </ul>
    </div>
  );
}
