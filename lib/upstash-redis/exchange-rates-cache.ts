import {
  EXCHANGE_RATES_TTL_SECONDS,
  getRedisClient,
  redisExchangeRatesKey,
} from '@/lib/upstash-redis/client';

const FRANKFURTER_BASE =
  (process.env.FRANKFURTER_BASE_CURRENCY ?? '').trim().toUpperCase() ||
  'USD';

const FRANKFURTER_FETCH_TIMEOUT_MS = 12_000;

export type FrankfurterLatestRates = {
  amount: number;
  base: string;
  date: string;
  rates: Record<string, number>;
};

export type CachedExchangeRatesSnapshot = {
  provider: 'frankfurter';
  /** UTC instant when we stored this payload in Redis */
  cachedAtIso: string;
  ttlSeconds: number;
  latest: FrankfurterLatestRates;
};

export function resolveFrankfurterBaseCurrency(override?: string | null): string {
  const raw = (override ?? FRANKFURTER_BASE).trim().toUpperCase();
  return raw.length >= 3 ? raw.slice(0, 3) : FRANKFURTER_BASE;
}

function parseStoredSnapshot(raw: unknown): CachedExchangeRatesSnapshot | null {
  let parsed: unknown;
  if (typeof raw === 'string') {
    if (!raw.trim()) return null;
    try {
      parsed = JSON.parse(raw) as unknown;
    } catch {
      return null;
    }
  } else {
    parsed = raw;
  }
  try {
    if (!parsed || typeof parsed !== 'object') return null;
    const provider = (parsed as { provider?: unknown }).provider;
    const cachedAtIso = (parsed as { cachedAtIso?: unknown }).cachedAtIso;
    const ttlSeconds = (parsed as { ttlSeconds?: unknown }).ttlSeconds;
    const latest = (parsed as { latest?: unknown }).latest;
    if (provider !== 'frankfurter') return null;
    if (typeof cachedAtIso !== 'string' || typeof ttlSeconds !== 'number')
      return null;
    if (!latest || typeof latest !== 'object') return null;
    const l = latest as Record<string, unknown>;
    const base = typeof l.base === 'string' ? l.base : null;
    const date = typeof l.date === 'string' ? l.date : null;
    const rates = l.rates;
    const amount = typeof l.amount === 'number' ? l.amount : null;
    if (!base || !date || amount === null || !rates || typeof rates !== 'object')
      return null;
    const outRates: Record<string, number> = {};
    for (const [code, rate] of Object.entries(rates)) {
      if (typeof rate !== 'number' || Number.isNaN(rate)) return null;
      outRates[code] = rate;
    }
    return {
      provider: 'frankfurter',
      cachedAtIso,
      ttlSeconds,
      latest: { amount, base, date, rates: outRates },
    };
  } catch {
    return null;
  }
}

async function fetchFrankfurterLatest(
  base: string,
): Promise<FrankfurterLatestRates> {
  const url = new URL('https://api.frankfurter.dev/v1/latest');
  url.searchParams.set('from', base);
  let res: Response;
  try {
    res = await fetch(url, {
      method: 'GET',
      headers: { Accept: 'application/json' },
      cache: 'no-store',
      signal: AbortSignal.timeout(FRANKFURTER_FETCH_TIMEOUT_MS),
    });
  } catch (cause) {
    throw new FrankfurterFetchError(
      'Could not reach Frankfurter.',
      undefined,
      cause,
    );
  }
  let body: unknown;
  try {
    body = await res.json();
  } catch {
    throw new FrankfurterFetchError(
      `Frankfurter returned non-JSON (status ${res.status}).`,
      res.status,
    );
  }
  if (!res.ok) {
    const message =
      typeof body === 'object' &&
      body &&
      typeof (body as { message?: unknown }).message === 'string'
        ? (body as { message: string }).message
        : `Frankfurter request failed (${res.status}).`;
    throw new FrankfurterFetchError(message, res.status);
  }

  if (!body || typeof body !== 'object') {
    throw new FrankfurterFetchError('Frankfurter response was empty.', res.status);
  }
  const payload = body as Record<string, unknown>;
  const baseOut = typeof payload.base === 'string' ? payload.base : null;
  const date = typeof payload.date === 'string' ? payload.date : null;
  const ratesRaw = payload.rates;
  const amount =
    typeof payload.amount === 'number' && Number.isFinite(payload.amount)
      ? payload.amount
      : 1;

  if (!baseOut || !date || !ratesRaw || typeof ratesRaw !== 'object') {
    throw new FrankfurterFetchError(
      'Frankfurter response missing base, date, or rates.',
      res.status,
    );
  }
  const rates: Record<string, number> = {};
  for (const [code, val] of Object.entries(ratesRaw)) {
    if (typeof val !== 'number' || !Number.isFinite(val)) continue;
    rates[code] = val;
  }

  return { amount, base: baseOut, date, rates };
}

export class FrankfurterFetchError extends Error {
  readonly status?: number;

  constructor(message: string, status?: number, cause?: unknown) {
    super(message, cause ? { cause } : undefined);
    this.name = 'FrankfurterFetchError';
    this.status = status;
  }
}

export async function persistFrankfurterSnapshot(
  redis: NonNullable<ReturnType<typeof getRedisClient>>,
  baseCurrency: string,
): Promise<CachedExchangeRatesSnapshot> {
  const latest = await fetchFrankfurterLatest(baseCurrency);
  const snapshot: CachedExchangeRatesSnapshot = {
    provider: 'frankfurter',
    cachedAtIso: new Date().toISOString(),
    ttlSeconds: EXCHANGE_RATES_TTL_SECONDS,
    latest,
  };

  await redis.set(redisExchangeRatesKey(baseCurrency), snapshot, {
    ex: EXCHANGE_RATES_TTL_SECONDS,
  });

  return snapshot;
}

/**
 * Lazily resolves exchange rates.
 * Reads Redis first; when the key is missing or unreadable,
 * pulls Frankfurter and repopulates the cache before returning.
 */
export async function getExchangeRatesLazy(
  baseCurrencyOverride?: string | null,
): Promise<{
  baseCurrency: string;
  hitCache: boolean;
  snapshot: CachedExchangeRatesSnapshot;
}> {
  const redis = getRedisClient();
  if (!redis) {
    throw new ExchangeRatesRedisUnavailableError(
      'Upstash Redis is not configured.',
    );
  }

  const baseCurrency = resolveFrankfurterBaseCurrency(baseCurrencyOverride);
  const raw = await redis.get(redisExchangeRatesKey(baseCurrency));
  const parsed = parseStoredSnapshot(raw ?? null);

  if (parsed) {
    return { baseCurrency, hitCache: true, snapshot: parsed };
  }

  const snapshot = await persistFrankfurterSnapshot(redis, baseCurrency);
  return { baseCurrency, hitCache: false, snapshot };
}

/** Force-refresh snapshot from Frankfurter and overwrite Redis regardless of TTL. */
export async function syncExchangeRatesToRedis(
  baseCurrencyOverride?: string | null,
): Promise<CachedExchangeRatesSnapshot> {
  const redis = getRedisClient();
  if (!redis) {
    throw new ExchangeRatesRedisUnavailableError(
      'Upstash Redis is not configured.',
    );
  }
  const baseCurrency = resolveFrankfurterBaseCurrency(baseCurrencyOverride);
  return persistFrankfurterSnapshot(redis, baseCurrency);
}

export class ExchangeRatesRedisUnavailableError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ExchangeRatesRedisUnavailableError';
  }
}
