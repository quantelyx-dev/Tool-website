import { type NextRequest, NextResponse } from 'next/server';

import {
  ExchangeRatesRedisUnavailableError,
  FrankfurterFetchError,
  getExchangeRatesLazy,
} from '@/lib/upstash-redis';

export const runtime = 'nodejs';

/**
 * Reads exchange rates lazily via Redis (`tools:v1:exchange-rates:*`).
 * Cache miss or corrupt payload ⇒ fetch Frankfurter, store with 24 h TTL, return.
 *
 * Query: `?base=USD` (optional ISO-4217-ish code; truncated to three letters).
 */
export async function GET(request: NextRequest) {
  try {
    const baseParam =
      request.nextUrl.searchParams.get('base')?.trim() ?? null;
    const result = await getExchangeRatesLazy(baseParam ?? undefined);

    return NextResponse.json({
      ok: true as const,
      source: result.hitCache ? ('redis' as const) : ('frankfurter' as const),
      baseCurrencyResolved: result.baseCurrency,
      cachedAtIso: result.snapshot.cachedAtIso,
      ttlSeconds: result.snapshot.ttlSeconds,
      data: result.snapshot.latest,
    });
  } catch (err) {
    if (err instanceof ExchangeRatesRedisUnavailableError) {
      return NextResponse.json(
        {
          ok: false as const,
          code: 'redis_unconfigured' as const,
          error: err.message,
        },
        { status: 503 },
      );
    }
    if (err instanceof FrankfurterFetchError) {
      return NextResponse.json(
        {
          ok: false as const,
          code: 'frankfurter_error' as const,
          error: err.message,
        },
        { status: 502 },
      );
    }

    console.error('[exchange-rates GET]', err);
    return NextResponse.json(
      { ok: false as const, error: 'Unexpected error resolving rates.' },
      { status: 500 },
    );
  }
}
