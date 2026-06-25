"use client";

import Link from "next/link";
import { BookOpen, ArrowRight } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";

import { getBlogPostByToolLink } from "@/lib/blogs";
import { trackBlogPostClick } from "@/lib/analytics";
import { fadeUpVariants } from "@/lib/motion-variants";
import { cn } from "@/lib/utils";

type ToolBlogPromoProps = {
  toolLink: string;
  className?: string;
};

export function ToolBlogPromo({ toolLink, className }: ToolBlogPromoProps) {
  const reducedMotion = useReducedMotion();
  const post = getBlogPostByToolLink(toolLink);

  if (!post) {
    return null;
  }

  return (
    <motion.section
      className={cn("mx-auto mt-12 w-full max-w-3xl", className)}
      aria-labelledby={`blog-promo-${post.slug}`}
      initial="hidden"
      animate="visible"
      variants={fadeUpVariants(reducedMotion)}
    >
      <div className="rounded-xl border border-border bg-muted/40 px-6 py-5">
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
            className="inline-flex shrink-0 items-center gap-1 rounded-sm text-sm font-medium text-indigo-600 hover:text-indigo-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600 focus-visible:ring-offset-2 dark:text-indigo-400 dark:hover:text-indigo-300"
            onClick={() => trackBlogPostClick(post.slug, "tool_promo")}
          >
            Read guide
            <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </motion.section>
  );
}
