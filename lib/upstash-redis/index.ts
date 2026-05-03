/**
 * Central place for cached server state backed by Upstash Redis REST.
 */

export type {
  CachedExchangeRatesSnapshot,
  FrankfurterLatestRates,
} from '@/lib/upstash-redis/exchange-rates-cache';
export {
  ExchangeRatesRedisUnavailableError,
  FrankfurterFetchError,
  getExchangeRatesLazy,
  resolveFrankfurterBaseCurrency,
  syncExchangeRatesToRedis,
} from '@/lib/upstash-redis/exchange-rates-cache';
export {
  EXCHANGE_RATES_TTL_SECONDS,
  getRedisClient,
  redisExchangeRatesKey,
} from '@/lib/upstash-redis/client';
