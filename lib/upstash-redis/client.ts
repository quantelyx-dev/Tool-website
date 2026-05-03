import { Redis } from '@upstash/redis';

/** 24-hour lazy cache TTL for Frankfurter snapshots */
export const EXCHANGE_RATES_TTL_SECONDS = 86_400;

let singleton: Redis | null | undefined;

/**
 * Reads Upstash Redis credentials only when constructing the client so env is
 * stable per server instance.
 */
export function getRedisClient(): Redis | null {
  if (singleton !== undefined) {
    return singleton;
  }
  const url = process.env.UPSTASH_REDIS_REST_URL?.trim();
  const token = process.env.UPSTASH_REDIS_REST_TOKEN?.trim();
  if (!url || !token) {
    singleton = null;
    return null;
  }
  singleton = new Redis({ url, token });
  return singleton;
}

export function redisExchangeRatesKey(baseCurrency: string): string {
  return `tools:v1:exchange-rates:${baseCurrency.toUpperCase().trim()}`;
}
