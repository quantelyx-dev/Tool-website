import { createOgImage, OG_CONTENT_TYPE, OG_SIZE } from '@/lib/seo/og-image';

export const alt = 'About toolcalcs.net: who runs the site and how tools are checked';
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  return createOgImage({
    eyebrow: 'About',
    title: 'About Us',
    subtitle: 'Learn about our free, privacy-first online tools and calculators.',
  });
}
