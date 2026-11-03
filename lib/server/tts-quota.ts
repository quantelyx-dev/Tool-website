import { createHmac, randomUUID } from 'node:crypto';

import { DateTime } from 'luxon';

import {
  peekSlidingWindow,
  recordSlidingWindowEvent,
} from '@/lib/server/memory-rate-limit';
import { browserFingerprintSource, networkPrefix } from '@/lib/server/request-guard';
import { getClientIp } from '@/lib/server/request-ip';
import { getRedisClient } from '@/lib/upstash-redis/client';

/**
 * Free generations per UTC day. Each one spends provider credits, so the same visitor is
 * counted from several angles: hopping IPs, clearing cookies, or opening incognito each
 * leave at least one of these counters intact.
 */
export const TTS_DAILY_LIMITS = {
  /** Same IP address (an incognito window or cleared cookies keep the IP). */
  ip: 6,
  /** Same IPv4 /24 or IPv6 /64 (hopping between addresses on one network). */
  network: 15,
  /** Same device cookie (switching IP or VPN on the same browser profile). */
  device: 6,
  /** Same browser signature (VPN plus incognito); loose because many people share one. */
  fingerprint: 30,
  /** Everyone combined, so a distributed burst cannot drain the credit balance. */
  global: 150,
} as const;

/** Minimum gap between two generations from one IP, which stops scripted rapid-fire. */
export const TTS_COOLDOWN_SECONDS = 10;

export const TTS_DEVICE_COOKIE = 'tts_device';
export const TTS_DEVICE_COOKIE_MAX_AGE_SECONDS = 31_536_000;

const DAY_SECONDS = 86_400;
const KEY_TTL_SECONDS = 90_000;
const DEVICE_ID_PATTERN = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/;

export type TtsQuotaScope = keyof typeof TTS_DAILY_LIMITS | 'cooldown';

type QuotaEntry = {
  scope: TtsQuotaScope;
  key: string;
  limit: number;
  /** Counter lifetime; daily counters omit it. */
  windowSeconds?: number;
};

export type TtsQuotaReservation =
  | { ok: true; release: () => Promise<void>; deviceId: string }
  | { ok: false; scope: TtsQuotaScope; retryAfterSeconds: number; deviceId: string };

function secondsUntilUtcMidnight(): number {
  const now = DateTime.utc();
  return Math.max(1, Math.ceil(now.endOf('day').diff(now, 'seconds').seconds));
}

/** One-way, keyed hash so raw IPs and user agents never appear in Redis keys. */
function hashPart(value: string): string {
  const secret = process.env.STV_API_TOKEN?.trim() || 'tts-quota';
  return createHmac('sha256', secret).update(value).digest('hex').slice(0, 24);
}

function readDeviceId(request: Request): string | null {
  const cookie = request.headers.get('cookie') ?? '';
  const match = new RegExp(`(?:^|;\\s*)${TTS_DEVICE_COOKIE}=([^;]+)`).exec(cookie);
  const value = match?.[1];
  return value && DEVICE_ID_PATTERN.test(value) ? value : null;
}

function buildEntries(request: Request, deviceId: string): QuotaEntry[] {
  const day = DateTime.utc().toFormat('yyyyLLdd');
  const ip = getClientIp(request);
  const prefix = `tools:v1:tts:${day}`;

  return [
    {
      scope: 'cooldown',
      key: `tools:v1:tts:cooldown:${hashPart(ip)}`,
      limit: 1,
      windowSeconds: TTS_COOLDOWN_SECONDS,
    },
    { scope: 'ip', key: `${prefix}:ip:${hashPart(ip)}`, limit: TTS_DAILY_LIMITS.ip },
    {
      scope: 'network',
      key: `${prefix}:net:${hashPart(networkPrefix(ip))}`,
      limit: TTS_DAILY_LIMITS.network,
    },
    { scope: 'device', key: `${prefix}:dev:${hashPart(deviceId)}`, limit: TTS_DAILY_LIMITS.device },
    {
      scope: 'fingerprint',
      key: `${prefix}:fp:${hashPart(browserFingerprintSource(request))}`,
      limit: TTS_DAILY_LIMITS.fingerprint,
    },
    { scope: 'global', key: `${prefix}:global`, limit: TTS_DAILY_LIMITS.global },
  ];
}

function retryAfterFor(entry: QuotaEntry): number {
  return entry.windowSeconds ?? secondsUntilUtcMidnight();
}

async function reserveWithRedis(
  entries: QuotaEntry[],
  deviceId: string,
): Promise<TtsQuotaReservation | null> {
  const redis = getRedisClient();
  if (!redis) return null;

  const incremented: string[] = [];
  const release = async () => {
    await Promise.all(incremented.map(key => redis.decr(key))).catch(() => undefined);
  };

  try {
    for (const entry of entries) {
      const count = await redis.incr(entry.key);
      incremented.push(entry.key);
      if (count === 1) await redis.expire(entry.key, entry.windowSeconds ?? KEY_TTL_SECONDS);

      if (count > entry.limit) {
        await release();
        return { ok: false, scope: entry.scope, retryAfterSeconds: retryAfterFor(entry), deviceId };
      }
    }
    return { ok: true, release, deviceId };
  } catch (error) {
    console.error('[tts-quota] redis error, falling back to memory', error);
    await release();
    return null;
  }
}

function reserveInMemory(entries: QuotaEntry[], deviceId: string): TtsQuotaReservation {
  for (const entry of entries) {
    const windowMs = (entry.windowSeconds ?? DAY_SECONDS) * 1000;
    const peek = peekSlidingWindow([entry.key], entry.limit, windowMs);
    if (!peek.ok) {
      return { ok: false, scope: entry.scope, retryAfterSeconds: peek.retryAfterSeconds, deviceId };
    }
  }

  for (const entry of entries) {
    recordSlidingWindowEvent([entry.key], (entry.windowSeconds ?? DAY_SECONDS) * 1000);
  }
  return { ok: true, release: async () => undefined, deviceId };
}

/**
 * Reserves one generation against every counter at once (all or nothing). Uses Upstash
 * Redis when configured, so limits hold across server instances, and falls back to
 * per-instance memory otherwise. Call `release()` if the provider job was not queued.
 * `deviceId` is the visitor's device cookie value; the caller must set the cookie when new.
 */
export async function reserveTtsQuota(request: Request): Promise<TtsQuotaReservation> {
  const deviceId = readDeviceId(request) ?? randomUUID();
  const entries = buildEntries(request, deviceId);
  return (await reserveWithRedis(entries, deviceId)) ?? reserveInMemory(entries, deviceId);
}
