import type { Metadata } from "next";

import { BlogList } from "@/components/blog/blog-list";
import { PageBreadcrumb } from "@/components/shared/page-breadcrumb";
import { BLOG_POSTS } from "@/lib/blogs";
import { createPageMetadata } from "@/lib/seo/metadata";
import { cn } from "@/lib/utils";

export const metadata: Metadata = createPageMetadata({
  title: "Blog: Guides for Our Tools",
  description:
    "Guides to our calculators, test data generators, and developer tools, including paycheck math, compound interest, cron syntax, and UUIDv7.",
  path: "/blog",
  keywords: [
    "tools blog",
    "online calculator guides",
    "developer testing guides",
    "free tool tutorials",
  ],
});

export default function BlogPage() {
  return (
    <main className={cn("flex-1")}>
      <div className={cn("container mx-auto max-w-5xl", "px-4 pb-20 sm:px-6")}>
        <PageBreadcrumb items={[{ label: "Blog" }]} />
        <BlogList posts={BLOG_POSTS} />
      </div>
    </main>
  );
}
