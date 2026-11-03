/** Measured average for these voices at 1.0x (roughly 175 words per minute). */
const CHARS_PER_SECOND = 14.5;

/** Common short-form video lengths, in seconds. */
const SHORT_FORM_LENGTHS = [15, 30, 60, 90] as const;

export function estimateDurationSeconds(characters: number, speed: number): number {
  if (characters <= 0 || speed <= 0) return 0;
  return Math.max(1, Math.round(characters / (CHARS_PER_SECOND * speed)));
}

export function formatDuration(seconds: number): string {
  if (seconds < 60) return `${seconds} sec`;
  const minutes = Math.floor(seconds / 60);
  const rest = seconds % 60;
  return rest === 0 ? `${minutes} min` : `${minutes} min ${rest} sec`;
}

/** Short-form length (TikTok, Reels, Shorts) the narration fits in, or null if longer than all. */
export function fittingShortFormLength(seconds: number): number | null {
  return SHORT_FORM_LENGTHS.find(length => seconds <= length) ?? null;
}

/** Human-readable estimate, e.g. "≈ 17 sec · fits a 30-second video". */
export function describeDuration(characters: number, speed: number): string {
  const seconds = estimateDurationSeconds(characters, speed);
  if (seconds === 0) return '';
  const fit = fittingShortFormLength(seconds);
  const length = `≈ ${formatDuration(seconds)}`;
  return fit === null ? `${length} · longer than most short videos` : `${length} · fits a ${fit}-second video`;
}
