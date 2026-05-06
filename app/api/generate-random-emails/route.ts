import { NextResponse } from 'next/server';

import type {
  GenerateRandomEmailsErrorBody,
  GenerateRandomEmailsSuccessBody,
} from '@/lib/generate-random-emails/api-response';
import {
  parseEmailLimitParam,
  RandomUserFetchError,
  RandomUsernamesRedisUnavailableError,
  takeRandomEmailsFromPool,
} from '@/lib/upstash-redis/random-emails-pool';

export const runtime = 'nodejs';

/**
 * GET /api/generate-random-emails?limit=20
 *
 * Uses the same cached identity pool as `/api/generate-random-usernames`
 * (Redis LIST, TTL 24h, randomuser.me backfill). Returns only email strings,
 * shuffled with the pool layer.
 */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const parsedLimit = parseEmailLimitParam(searchParams.get('limit'));
  if (!parsedLimit.ok) {
    const body: GenerateRandomEmailsErrorBody = {
      ok: false,
      error: parsedLimit.error,
    };
    return NextResponse.json(body, { status: 400 });
  }

  try {
    const { emails } = await takeRandomEmailsFromPool(parsedLimit.limit);

    const body: GenerateRandomEmailsSuccessBody = {
      ok: true,
      requested: parsedLimit.limit,
      count: emails.length,
      emails,
    };
    return NextResponse.json(body);
  } catch (err) {
    if (err instanceof RandomUsernamesRedisUnavailableError) {
      const body: GenerateRandomEmailsErrorBody = {
        ok: false,
        code: 'redis_unconfigured',
        error: err.message,
      };
      return NextResponse.json(body, { status: 503 });
    }
    if (err instanceof RandomUserFetchError) {
      const body: GenerateRandomEmailsErrorBody = {
        ok: false,
        code: 'randomuser_error',
        error: err.message,
      };
      return NextResponse.json(body, { status: 502 });
    }

    console.error('[generate-random-emails GET]', err);
    const body: GenerateRandomEmailsErrorBody = {
      ok: false,
      error: 'Unexpected error generating emails.',
    };
    return NextResponse.json(body, { status: 500 });
  }
}
