import { Calendar, Clock } from "lucide-react";

import { BlogToolCta } from "@/components/blog/blog-tool-cta";
import type { BlogPost, BlogSection } from "@/lib/blogs/types";
import { cn } from "@/lib/utils";

type BlogPostRendererProps = {
  post: BlogPost;
  className?: string;
};

function formatBlogDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

function renderSection(
  section: BlogSection,
  index: number,
  post: BlogPost,
): React.ReactNode {
  switch (section.type) {
    case "heading":
      if (section.level === 2) {
        return (
          <h2
            key={index}
            className="mb-4 mt-10 text-2xl font-bold tracking-tight first:mt-0"
          >
            {section.text}
          </h2>
        );
      }
      return (
        <h3 key={index} className="mb-3 mt-6 text-xl font-semibold">
          {section.text}
        </h3>
      );
    case "paragraph":
      return (
        <p
          key={index}
          className="mb-4 text-[15px] leading-[1.75] text-muted-foreground"
        >
          {section.text}
        </p>
      );
    case "list": {
      const ListTag = section.ordered ? "ol" : "ul";
      return (
        <ListTag
          key={index}
          className={cn(
            "mb-4 ml-5 space-y-2 text-[15px] leading-[1.75] text-muted-foreground",
            section.ordered ? "list-decimal" : "list-disc",
          )}
        >
          {section.items.map((item, itemIndex) => (
            <li key={itemIndex}>{item}</li>
          ))}
        </ListTag>
      );
    }
    case "callout":
      return (
        <div
          key={index}
          className="my-6 rounded-lg border-l-4 border-amber-500 bg-amber-50 px-5 py-4 dark:bg-amber-950/30"
          role="note"
        >
          <p className="text-sm leading-relaxed text-foreground">{section.text}</p>
        </div>
      );
    case "toolCta":
      return (
        <BlogToolCta
          key={index}
          blogSlug={post.slug}
          toolLink={post.toolLink}
          toolName={post.toolName}
          source="inline"
        />
      );
    default:
      return null;
  }
}

export function BlogPostRenderer({ post, className }: BlogPostRendererProps) {
  return (
    <article className={cn("py-6", className)}>
      <header className="mb-8 border-b border-border pb-6">
        <h1 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">
          {post.title}
        </h1>
        <p className="mb-4 text-lg text-muted-foreground leading-relaxed">
          {post.excerpt}
        </p>
        <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
          <span className="inline-flex items-center gap-1.5">
            <Calendar className="size-4" aria-hidden="true" />
            <time dateTime={post.publishedAt}>
              Published {formatBlogDate(post.publishedAt)}
            </time>
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Clock className="size-4" aria-hidden="true" />
            {post.readTimeMinutes} min read
          </span>
          {post.updatedAt !== post.publishedAt ? (
            <span className="text-xs">
              Updated{" "}
              <time dateTime={post.updatedAt}>
                {formatBlogDate(post.updatedAt)}
              </time>
            </span>
          ) : null}
        </div>
      </header>

      <div className="max-w-3xl">
        {post.sections.map((section, index) =>
          renderSection(section, index, post),
        )}
      </div>

      <BlogToolCta
        blogSlug={post.slug}
        toolLink={post.toolLink}
        toolName={post.toolName}
        source="footer"
        className="max-w-3xl"
      />
    </article>
  );
}
