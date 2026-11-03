import { createToolOgImage, OG_CONTENT_TYPE } from '@/lib/seo/og-image';

export const alt = 'Generate Random Usernames - free online tool';
export const size = { width: 1200, height: 630 };
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  return createToolOgImage('/tools/generate-random-usernames');
}
