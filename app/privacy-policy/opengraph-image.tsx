import { createOgImage, OG_CONTENT_TYPE, OG_SIZE } from '@/lib/seo/og-image';

export const alt = 'Privacy Policy';
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  return createOgImage({
    eyebrow: 'Legal',
    title: 'Privacy Policy',
    subtitle: 'How we handle your data, cookies, and the tools that use our servers or partners.',
  });
}
