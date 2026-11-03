import { createOgImage, OG_CONTENT_TYPE, OG_SIZE } from '@/lib/seo/og-image';

export const alt = 'Contact Us';
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  return createOgImage({
    eyebrow: 'Contact',
    title: 'Contact Us',
    subtitle: 'Questions, feedback, or ideas? Get in touch with our team.',
  });
}
