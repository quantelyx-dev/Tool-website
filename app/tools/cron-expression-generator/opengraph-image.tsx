import { createToolOgImage, OG_CONTENT_TYPE } from '@/lib/seo/og-image';

export const alt = 'Cron Expression Generator - free online tool';
export const size = { width: 1200, height: 630 };
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  return createToolOgImage('/tools/cron-expression-generator');
}
