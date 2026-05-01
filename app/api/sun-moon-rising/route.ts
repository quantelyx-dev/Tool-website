import { DateTime } from 'luxon';
import { NextResponse } from 'next/server';
import tzLookup from 'tz-lookup';
import { z } from 'zod';

import { computeSunMoonRisingChart } from '@/lib/sun-moon-rising/chart';
import { geocodeWithNominatim } from '@/lib/sun-moon-rising/geocode';
import { sunMoonRisingFormSchema } from '@/lib/schemas/sun-moon-rising-schema';

export const runtime = 'nodejs';

function normalizeWallClockForIso(timeOfBirth: string): string {
  const t = timeOfBirth.trim();
  const match = /^(\d{1,2}):(\d{2})(?::(\d{2}))?$/.exec(t);
  if (!match) return t;
  const h = match[1]!.padStart(2, '0');
  const m = match[2]!.padStart(2, '0');
  const s = (match[3] ?? '00').padStart(2, '0');
  return `${h}:${m}:${s}`;
}

export async function POST(request: Request) {
  let json: unknown;
  try {
    json = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false as const, error: 'Invalid JSON body' },
      { status: 400 },
    );
  }

  const parsed = sunMoonRisingFormSchema.safeParse(json);
  if (!parsed.success) {
    const { errors, properties } = z.treeifyError(parsed.error);
    return NextResponse.json(
      {
        ok: false as const,
        error: errors[0] ?? 'Validation failed',
        fieldErrors: Object.fromEntries(
          Object.entries(properties ?? {}).map(([key, value]) => [
            key,
            value?.errors ?? [],
          ]),
        ),
      },
      { status: 422 },
    );
  }

  const {
    name,
    dateOfBirth,
    timeOfBirth,
    birthCity,
  } = parsed.data;

  const geo = await geocodeWithNominatim(birthCity);
  if (!geo.ok) {
    const message =
      geo.reason === 'no_results'
        ? 'Could not resolve that birth location. Try a fuller address (city, region, country).'
        : 'Location lookup failed. Try again shortly.';
    return NextResponse.json(
      {
        ok: false as const,
        code: geo.reason,
        error: message,
      },
      { status: geo.reason === 'no_results' ? 422 : 502 },
    );
  }

  let timeZone: string;
  try {
    timeZone = tzLookup(geo.hit.latitude, geo.hit.longitude);
  } catch {
    return NextResponse.json(
      {
        ok: false as const,
        code: 'timezone_lookup',
        error:
          'Resolved coordinates map to an ambiguous timezone polygon. Try refining the location.',
      },
      { status: 422 },
    );
  }

  const localIso = `${dateOfBirth}T${normalizeWallClockForIso(timeOfBirth)}`;
  const birthLocal = DateTime.fromISO(localIso, { zone: timeZone });
  if (!birthLocal.isValid) {
    return NextResponse.json(
      {
        ok: false as const,
        error: 'Birth date and time could not be interpreted in the resolved timezone.',
        detail: birthLocal.invalidExplanation ?? birthLocal.invalidReason,
      },
      { status: 422 },
    );
  }

  const birthUtc = birthLocal.toUTC();

  const chart = computeSunMoonRisingChart({
    birthUtc,
    latitudeDegNorth: geo.hit.latitude,
    longitudeDegEast: geo.hit.longitude,
  });

  return NextResponse.json({
    ok: true as const,
    name,
    sunSign: chart.sunSign,
    moonSign: chart.moonSign,
    risingSign: chart.risingSign,
    ephemeris: {
      julianDayUt: chart.jdUt,
      julianEphemerisDay: chart.jde,
      sunLongitudeDeg: chart.sunLongitudeDeg,
      moonLongitudeDeg: chart.moonLongitudeDeg,
      ascendantLongitudeDeg: chart.ascendantLongitudeDeg,
    },
    instant: {
      timezone: timeZone,
      localIso: birthLocal.toISO(),
      utcIso: birthUtc.toISO(),
    },
    location: {
      query: birthCity.trim(),
      latitude: geo.hit.latitude,
      longitude: geo.hit.longitude,
      label: geo.hit.displayName,
    },
  });
}
