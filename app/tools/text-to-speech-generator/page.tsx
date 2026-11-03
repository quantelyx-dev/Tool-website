import type { Metadata } from 'next';

import { ToolBlogPromo } from '@/components/blog/tool-blog-promo';
import { PageBreadcrumb } from '@/components/shared/page-breadcrumb';
import { ToolFaqSection } from '@/components/shared/tool-faq-section';
import { TextToSpeechToolContent } from '@/components/text-to-speech/text-to-speech-tool-content';
import { createPageMetadata } from '@/lib/seo/metadata';
import { textToSpeechFaqs } from '@/lib/tool-faqs';
import { cn } from '@/lib/utils';

export const metadata: Metadata = createPageMetadata({
  title: 'Text to Speech & TikTok Voice Generator',
  description:
    'Free text to speech with 12 popular AI voices. Preview voices, match TikTok, Reels and Shorts timing, then download an MP3. No sign-up.',
  path: '/tools/text-to-speech-generator',
  keywords: [
    'text to speech',
    'text to speech generator',
    'free text to speech',
    'text to speech online',
    'ai voice generator',
    'text to mp3',
    'tts generator',
    'convert text to audio',
    'text to speech download',
    'tiktok text to speech',
    'tiktok voice generator',
    'ai voiceover for tiktok',
    'elevenlabs voices free',
    'voiceover generator for reels',
  ],
});

export default function TextToSpeechGeneratorPage() {
  return (
    <main className={cn('flex-1')}>
      <div className={cn('container mx-auto max-w-5xl px-4 pb-20 sm:px-6')}>
        <PageBreadcrumb items={[{ label: 'Text to speech generator' }]} />
        <TextToSpeechToolContent />
        <ToolBlogPromo toolLink='/tools/text-to-speech-generator' />
        <ToolFaqSection faqs={textToSpeechFaqs} />
      </div>
    </main>
  );
}
