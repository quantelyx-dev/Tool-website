import { getAllBlogSlugs, getBlogPostBySlug } from '@/lib/blogs';
import { createOgImage, OG_CONTENT_TYPE, OG_SIZE } from '@/lib/seo/og-image';

export const alt = 'Guide from our free online tools blog';
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export function generateStaticParams() {
  return getAllBlogSlugs().map(slug => ({ slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  return createOgImage({
    eyebrow: 'Guide',
    title: post?.title ?? 'Guide',
    subtitle: post?.excerpt,
  });
}
