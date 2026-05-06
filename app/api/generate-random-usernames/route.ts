import { NextResponse } from 'next/server';

import type {
  GenerateRandomUsernamesErrorBody,
  GenerateRandomUsernamesSuccessBody,
} from '@/lib/generate-random-usernames/api-response';
import {
  parseUsernameLimitParam,
  RandomUserFetchError,
  RandomUsernamesRedisUnavailableError,
  takeRandomUsernamesFromPool,
} from '@/lib/upstash-redis/random-usernames-pool';

export const runtime = 'nodejs';

/**
 * GET /api/generate-random-usernames?limit=20
 *
 * Backed by a Redis LIST (JSON per element), TTL 24h. Fetches from
 * randomuser.me only when the key is empty (e.g. expired) or the list has fewer
 * than `limit` entries; returns LRANGE without popping, up to ~1000 cached rows.
 * Success body exposes only `usernames` (strings), not full profile objects.
 * Order is randomized in the pool layer (Fisher–Yates on fetch batches and on
 * each read slice).
 */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const parsedLimit = parseUsernameLimitParam(searchParams.get('limit'));
  if (!parsedLimit.ok) {
    const body: GenerateRandomUsernamesErrorBody = {
      ok: false,
      error: parsedLimit.error,
    };
    return NextResponse.json(body, { status: 400 });
  }

  try {
    const { entries } = await takeRandomUsernamesFromPool(parsedLimit.limit);
    const usernames = entries.map(entry => entry.username);

    const body: GenerateRandomUsernamesSuccessBody = {
      ok: true,
      requested: parsedLimit.limit,
      count: usernames.length,
      usernames,
    };
    return NextResponse.json(body);
  } catch (err) {
    if (err instanceof RandomUsernamesRedisUnavailableError) {
      const body: GenerateRandomUsernamesErrorBody = {
        ok: false,
        code: 'redis_unconfigured',
        error: err.message,
      };
      return NextResponse.json(body, { status: 503 });
    }
    if (err instanceof RandomUserFetchError) {
      const body: GenerateRandomUsernamesErrorBody = {
        ok: false,
        code: 'randomuser_error',
        error: err.message,
      };
      return NextResponse.json(body, { status: 502 });
    }

    console.error('[generate-random-usernames GET]', err);
    const body: GenerateRandomUsernamesErrorBody = {
      ok: false,
      error: 'Unexpected error generating usernames.',
    };
    return NextResponse.json(body, { status: 500 });
  }
}
