import { ToolBlogPromoCard } from "@/components/blog/tool-blog-promo-card";
import { getBlogPostByToolLink } from "@/lib/blogs";

type ToolBlogPromoProps = {
  toolLink: string;
  className?: string;
};

/** Server component: keeps every blog post out of the tool pages' client bundle. */
export function ToolBlogPromo({ toolLink, className }: ToolBlogPromoProps) {
  const post = getBlogPostByToolLink(toolLink);

  if (!post) {
    return null;
  }

  return (
    <ToolBlogPromoCard slug={post.slug} title={post.title} className={className} />
  );
}
