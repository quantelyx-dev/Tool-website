import { createOgImage, OG_CONTENT_TYPE, OG_SIZE } from '@/lib/seo/og-image';

export const alt = 'Terms of Service';
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  return createOgImage({
    eyebrow: 'Legal',
    title: 'Terms of Service',
    subtitle: 'The rules for using our free online tools and calculators.',
  });
}
