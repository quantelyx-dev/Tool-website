import { NextResponse } from 'next/server';

import {
  ExchangeRatesRedisUnavailableError,
  FrankfurterFetchError,
  resolveFrankfurterBaseCurrency,
  syncExchangeRatesToRedis,
} from '@/lib/upstash-redis';

export const runtime = 'nodejs';

type SyncBody = {
  /** Optional FX base currency; defaults to FRANKFURTER_BASE_CURRENCY or USD. */
  base?: string;
};

/**
 * Force-refreshes the Frankfurter snapshot and replaces the Redis payload
 * (24 h TTL), regardless of an existing cached record.
 *
 * POST JSON `{ "base": "EUR" }` is optional — omit to use configured default base.
 */
export async function POST(request: Request) {
  let requestedBase: string | null | undefined;
  try {
    const rawBody = await request.text();
    if (rawBody.trim()) {
      let parsed: unknown;
      try {
        parsed = JSON.parse(rawBody);
      } catch {
        return NextResponse.json(
          { ok: false as const, error: 'Invalid JSON body.' },
          { status: 400 },
        );
      }
      if (parsed && typeof parsed === 'object' && parsed !== null) {
        if ('base' in parsed) {
          const raw = (parsed as SyncBody).base;
          if (raw !== undefined && raw !== null) {
            if (typeof raw !== 'string') {
              return NextResponse.json(
                { ok: false as const, error: 'Field base must be a string.' },
                { status: 422 },
              );
            }
            requestedBase = raw;
          }
        }
      }
    }

    const resolvedBase = resolveFrankfurterBaseCurrency(requestedBase);
    const snapshot = await syncExchangeRatesToRedis(requestedBase);

    return NextResponse.json({
      ok: true as const,
      refreshed: true as const,
      baseCurrencyResolved: resolvedBase,
      cachedAtIso: snapshot.cachedAtIso,
      ttlSeconds: snapshot.ttlSeconds,
      data: snapshot.latest,
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

    console.error('[exchange-rates/sync POST]', err);
    return NextResponse.json(
      { ok: false as const, error: 'Unexpected error syncing exchange rates.' },
      { status: 500 },
    );
  }
}
