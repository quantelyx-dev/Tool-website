import { createOgImage, OG_CONTENT_TYPE, OG_SIZE } from '@/lib/seo/og-image';

export const alt = 'toolcalcs.net disclaimer for calculators and test data';
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  return createOgImage({
    eyebrow: 'Legal',
    title: 'Disclaimer',
    subtitle: 'What our calculators and test data generators can and cannot be used for.',
  });
}
