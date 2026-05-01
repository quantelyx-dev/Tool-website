import { postJson } from '@/lib/http';
import type { SunMoonRisingFormValues } from '@/lib/schemas/sun-moon-rising-schema';

import type { TropicalSign } from '@/lib/sun-moon-rising/chart';

export type SunMoonRisingChartEphemeris = {
  julianDayUt: number;
  julianEphemerisDay: number;
  sunLongitudeDeg: number;
  moonLongitudeDeg: number;
  ascendantLongitudeDeg: number;
};

export type SunMoonRisingChartSuccess = {
  ok: true;
  name: string;
  sunSign: TropicalSign;
  moonSign: TropicalSign;
  risingSign: TropicalSign;
  ephemeris: SunMoonRisingChartEphemeris;
  instant: {
    timezone: string;
    localIso: string | null;
    utcIso: string | null;
  };
  location: {
    query: string;
    latitude: number;
    longitude: number;
    label: string;
  };
};

/** Shape returned on non-2xx (parsed JSON when present). */
export type SunMoonRisingChartFailureBody = {
  ok?: false;
  error?: string;
  code?: string;
  detail?: string;
  fieldErrors?: Record<string, string[] | undefined>;
};

export type SubmitSunMoonRisingChartOptions = {
  signal?: AbortSignal;
};

/**
 * POST `/api/sun-moon-rising`. Throws `ApiError` from `@/lib/http` when the response is not OK.
 */
export function submitSunMoonRisingChart(
  values: SunMoonRisingFormValues,
  options?: SubmitSunMoonRisingChartOptions,
): Promise<SunMoonRisingChartSuccess> {
  return postJson<SunMoonRisingChartSuccess>('/api/sun-moon-rising', values, {
    signal: options?.signal,
  });
}
