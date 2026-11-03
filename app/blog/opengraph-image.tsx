import { createOgImage, OG_CONTENT_TYPE, OG_SIZE } from '@/lib/seo/og-image';

export const alt = 'Guides and tutorials for our free online tools';
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  return createOgImage({
    eyebrow: 'Blog',
    title: 'Guides & Tutorials for Every Tool',
    subtitle: 'In-depth, practical guides for our free online tools and calculators.',
  });
}
