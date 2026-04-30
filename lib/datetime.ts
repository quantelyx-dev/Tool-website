import { DateTime } from 'luxon';

/** Wall-clock milliseconds (e.g. rate limiting), via Luxon. */
export function nowMillis(): number {
  return DateTime.now().toMillis();
}

/** Today as `YYYY-MM-DD` in the local zone. */
export function todayIsoDate(): string {
  return DateTime.now().toISODate() ?? '';
}

export function currentCalendarYear(): number {
  return DateTime.now().year;
}

/**
 * True when `YYYY-MM-DD` is a calendar date on or before today's date (local zone).
 * Use after confirming `DateTime.fromISO(iso).isValid`.
 */
export function isIsoCalendarDateOnOrBeforeToday(iso: string): boolean {
  const birth = DateTime.fromISO(iso);
  if (!birth.isValid) return false;
  const birthDay = birth.startOf('day');
  const today = DateTime.now().startOf('day');
  return birthDay <= today;
}

export function isValidIsoDateOnly(iso: string): boolean {
  return DateTime.fromISO(iso).isValid;
}

/** Long localized label for a calendar date `YYYY-MM-DD` (local interpretation). */
export function formatIsoDateLocaleFull(isoDate: string): string {
  const dt = DateTime.fromISO(isoDate);
  if (!dt.isValid) return isoDate;
  return dt.toLocaleString(DateTime.DATE_FULL);
}

export function formatBirthSummaryLine(
  isoDate: string,
  timeOfBirth: string,
  birthCity: string,
): string {
  const dateLabel = formatIsoDateLocaleFull(isoDate);
  return `${dateLabel} · ${timeOfBirth} · ${birthCity}`;
}

/** ISO-like wall times from `<input type="time">` (e.g. `HH:mm`, `HH:mm:ss`). */
const WALL_CLOCK_PARSE_FORMATS = [
  'HH:mm:ss',
  'HH:mm',
  'H:mm:ss',
  'H:mm',
] as const;

export function isValidWallClockTimeHm(raw: string): boolean {
  const value = raw.trim();
  if (!value) return false;
  return WALL_CLOCK_PARSE_FORMATS.some((fmt) =>
    DateTime.fromFormat(value, fmt).isValid,
  );
}
