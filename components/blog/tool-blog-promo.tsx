import Link from "next/link";
import { BookOpen, ArrowRight } from "lucide-react";

import { getBlogPostByToolLink } from "@/lib/blogs";
import { cn } from "@/lib/utils";

type ToolBlogPromoProps = {
  toolLink: string;
  className?: string;
};

export function ToolBlogPromo({ toolLink, className }: ToolBlogPromoProps) {
  const post = getBlogPostByToolLink(toolLink);

  if (!post) {
    return null;
  }

  return (
    <section
      className={cn(
        "mt-12 rounded-xl border border-border bg-muted/40 px-6 py-5",
        className,
      )}
      aria-labelledby={`blog-promo-${post.slug}`}
    >
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-start gap-3">
          <BookOpen
            className="mt-0.5 size-5 shrink-0 text-indigo-600 dark:text-indigo-400"
            aria-hidden="true"
          />
          <div>
            <p
              id={`blog-promo-${post.slug}`}
              className="text-sm font-semibold text-foreground"
            >
              Read our full guide
            </p>
            <p className="text-sm text-muted-foreground">{post.title}</p>
          </div>
        </div>
        <Link
          href={`/blog/${post.slug}`}
          className="inline-flex items-center gap-1 text-sm font-medium text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600 focus-visible:ring-offset-2 rounded-sm shrink-0"
        >
          Read guide
          <ArrowRight className="size-4" aria-hidden="true" />
        </Link>
      </div>
    </section>
  );
}
