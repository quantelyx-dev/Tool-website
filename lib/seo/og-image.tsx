import { ImageResponse } from 'next/og';

import { siteDomain } from '@/lib/site-config';
import { TOOL_GROUPS } from '@/lib/tools-data';
import type { ToolEntry } from '@/lib/types';

export const OG_SIZE = { width: 1200, height: 630 } as const;
export const OG_CONTENT_TYPE = 'image/png';

type OgImageInput = {
  eyebrow: string;
  title: string;
  subtitle?: string;
};

const TITLE_MAX_LENGTH = 90;
const SUBTITLE_MAX_LENGTH = 130;

function clamp(text: string, max: number): string {
  return text.length <= max ? text : `${text.slice(0, max - 1).trimEnd()}…`;
}

function titleFontSize(title: string): number {
  if (title.length > 60) return 60;
  if (title.length > 36) return 70;
  return 82;
}

/** Branded 1200x630 social card shared by the site, tool pages, and blog posts. */
export function createOgImage({ eyebrow, title, subtitle }: OgImageInput): ImageResponse {
  const safeTitle = clamp(title, TITLE_MAX_LENGTH);

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '64px 72px',
          color: '#ffffff',
          background: 'linear-gradient(135deg, #0b0b14 0%, #17143a 55%, #312e81 100%)',
        }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: 14,
              background: '#4f46e5',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 36,
              fontWeight: 700,
            }}>
            T
          </div>
          <div style={{ fontSize: 34, fontWeight: 700, letterSpacing: -0.5 }}>{siteDomain}</div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 22 }}>
          <div
            style={{
              fontSize: 26,
              fontWeight: 700,
              letterSpacing: 5,
              textTransform: 'uppercase',
              color: '#a5b4fc',
            }}>
            {eyebrow}
          </div>
          <div
            style={{
              fontSize: titleFontSize(safeTitle),
              fontWeight: 800,
              lineHeight: 1.08,
              letterSpacing: -2,
            }}>
            {safeTitle}
          </div>
          {subtitle ? (
            <div style={{ fontSize: 31, lineHeight: 1.35, color: '#c7d2fe', maxWidth: 980 }}>
              {clamp(subtitle, SUBTITLE_MAX_LENGTH)}
            </div>
          ) : null}
        </div>

        <div style={{ display: 'flex', gap: 14, fontSize: 24, color: '#e0e7ff' }}>
          <div
            style={{
              padding: '10px 22px',
              borderRadius: 999,
              border: '2px solid rgba(165,180,252,0.5)',
            }}>
            Free
          </div>
          <div
            style={{
              padding: '10px 22px',
              borderRadius: 999,
              border: '2px solid rgba(165,180,252,0.5)',
            }}>
            No sign-up
          </div>
        </div>
      </div>
    ),
    { ...OG_SIZE },
  );
}

function titleCaseFromSlug(slug: string): string {
  return slug
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

/** Card for a tool page, using the name and description from the tool registry. */
export function createToolOgImage(toolLink: string): ImageResponse {
  const tools: ToolEntry[] = TOOL_GROUPS.flatMap(group => [...group.tools]);
  const tool = tools.find(entry => entry.link === toolLink);
  const slug = toolLink.split('/').pop() ?? '';

  return createOgImage({
    eyebrow: 'Free online tool',
    title: tool?.name ?? titleCaseFromSlug(slug),
    subtitle: tool?.description,
  });
}
