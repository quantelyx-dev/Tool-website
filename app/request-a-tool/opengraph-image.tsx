import { createOgImage, OG_CONTENT_TYPE, OG_SIZE } from '@/lib/seo/og-image';

export const alt = 'Request a Tool';
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  return createOgImage({
    eyebrow: 'Community',
    title: 'Request a Tool',
    subtitle: 'Tell us which free tool we should build next.',
  });
}
