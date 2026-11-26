import { getAllBlogSlugs, getBlogPostBySlug } from '@/lib/blogs';
import { createOgImage, OG_CONTENT_TYPE, OG_SIZE } from '@/lib/seo/og-image';

export function generateStaticParams() {
  return getAllBlogSlugs().map(slug => ({ slug }));
}

/** Gives each post's social image its own alt text. */
export async function generateImageMetadata({
  params,
}: {
  params: { slug: string } | Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  return [
    {
      id: 'card',
      alt: `Guide: ${post?.title ?? 'toolcalcs.net blog'}`,
      size: OG_SIZE,
      contentType: OG_CONTENT_TYPE,
    },
  ];
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
