const MAX_SLUG_LENGTH = 40;

/** Download name from the script's opening words, e.g. "stop-scrolling-because-this-voiceover.mp3". */
export function buildAudioFileName(text: string): string {
  const slug = text
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, '')
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 6)
    .join('-')
    .slice(0, MAX_SLUG_LENGTH)
    .replace(/-+$/, '');

  return slug ? `${slug}-voiceover.mp3` : 'voiceover.mp3';
}
