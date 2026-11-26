import { createOgImage, OG_CONTENT_TYPE, OG_SIZE } from '@/lib/seo/og-image';

export const alt = 'toolcalcs.net free online calculators, generators, and developer tools';
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  return createOgImage({
    eyebrow: 'Free online tools',
    title: 'Free Online Tools & Calculators',
    subtitle: 'Generate test data, calculate finances, create AI voiceovers, and more.',
  });
}
