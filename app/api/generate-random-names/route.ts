import { NextResponse } from 'next/server';

import type {
  GenerateRandomNamesErrorBody,
  GenerateRandomNamesSuccessBody,
} from '@/lib/generate-random-names/api-response';
import {
  parseNameLimitParam,
  parseNameTypeParam,
  RandomUserFetchError,
  RandomUsernamesRedisUnavailableError,
  takeRandomNamesFromPool,
} from '@/lib/upstash-redis/random-names-pool';

export const runtime = 'nodejs';

/**
 * GET /api/generate-random-names?limit=20&type=fullName
 *
 * type: firstName | lastName | fullName — uses the cached identity pool
 * (Redis LIST, TTL 24h, randomuser.me backfill).
 */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const parsedLimit = parseNameLimitParam(searchParams.get('limit'));
  if (!parsedLimit.ok) {
    const body: GenerateRandomNamesErrorBody = {
      ok: false,
      error: parsedLimit.error,
    };
    return NextResponse.json(body, { status: 400 });
  }

  const parsedType = parseNameTypeParam(searchParams.get('type'));
  if (!parsedType.ok) {
    const body: GenerateRandomNamesErrorBody = {
      ok: false,
      error: parsedType.error,
    };
    return NextResponse.json(body, { status: 400 });
  }

  try {
    const { names } = await takeRandomNamesFromPool(
      parsedLimit.limit,
      parsedType.nameType,
    );

    const body: GenerateRandomNamesSuccessBody = {
      ok: true,
      requested: parsedLimit.limit,
      count: names.length,
      nameType: parsedType.nameType,
      names,
    };
    return NextResponse.json(body);
  } catch (err) {
    if (err instanceof RandomUsernamesRedisUnavailableError) {
      const body: GenerateRandomNamesErrorBody = {
        ok: false,
        code: 'redis_unconfigured',
        error: err.message,
      };
      return NextResponse.json(body, { status: 503 });
    }
    if (err instanceof RandomUserFetchError) {
      const body: GenerateRandomNamesErrorBody = {
        ok: false,
        code: 'randomuser_error',
        error: err.message,
      };
      return NextResponse.json(body, { status: 502 });
    }

    console.error('[generate-random-names GET]', err);
    const body: GenerateRandomNamesErrorBody = {
      ok: false,
      error: 'Unexpected error generating names.',
    };
    return NextResponse.json(body, { status: 500 });
  }
}
