import { getRedisClient } from '@/lib/upstash-redis/client';

/** Match exchange-rates cache: 24 hours */
export const RANDOM_USERNAMES_POOL_TTL_SECONDS = 86_400;

const REDIS_POOL_KEY = 'tools:v1:random-identities:pool';
/** Target upper bound for prefetched identities in Redis */
const POOL_MAX_ENTRIES = 1000;
/** randomuser.me allows large batches; keep payloads reasonable */
const RANDOMUSER_BATCH_SIZE = 100;
const RANDOMUSER_FETCH_TIMEOUT_MS = 15_000;

export type RandomUsernameEntry = {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
};

type RandomUserMeName = { first?: string; last?: string };
type RandomUserMeLogin = { username?: string };
type RandomUserMePerson = {
  name?: RandomUserMeName;
  email?: string;
  login?: RandomUserMeLogin;
};

type RandomUserMeResponse = { results?: RandomUserMePerson[] };

/** Fisher–Yates shuffle in place (uniform permutation). */
function shuffleInPlace<T>(items: T[]): void {
  for (let i = items.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [items[i], items[j]] = [items[j], items[i]];
  }
}

export class RandomUserFetchError extends Error {
  readonly status?: number;

  constructor(message: string, status?: number, cause?: unknown) {
    super(message, cause ? { cause } : undefined);
    this.name = 'RandomUserFetchError';
    this.status = status;
  }
}

export class RandomUsernamesRedisUnavailableError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'RandomUsernamesRedisUnavailableError';
  }
}

function slugPart(raw: string): string {
  return raw
    .normalize('NFKD')
    .replace(/\p{M}/gu, '')
    .toLowerCase()
    .replace(/[^a-z0-9]/g, '');
}

function buildUsername(
  first: string,
  last: string,
  loginUsername: string,
): string {
  const a = slugPart(first);
  const b = slugPart(last);
  const base = `${a}${b}`;
  if (base.length >= 3) {
    return `${base}${100 + Math.floor(Math.random() * 900)}`;
  }
  return loginUsername;
}

function mapPerson(p: RandomUserMePerson): RandomUsernameEntry | null {
  const first = p.name?.first?.trim() ?? '';
  const last = p.name?.last?.trim() ?? '';
  const email = p.email?.trim() ?? '';
  const loginUsername = p.login?.username?.trim() ?? '';
  if (!first || !last || !email) return null;
  const username = buildUsername(first, last, loginUsername || 'user');
  return { firstName: first, lastName: last, username, email };
}

async function fetchRandomUserBatch(
  count: number,
): Promise<RandomUsernameEntry[]> {
  const safeCount = Math.max(1, Math.min(count, 5000));
  const url = new URL('https://randomuser.me/api/');
  url.searchParams.set('results', String(safeCount));

  let res: Response;
  try {
    res = await fetch(url, {
      method: 'GET',
      headers: { Accept: 'application/json' },
      cache: 'no-store',
      signal: AbortSignal.timeout(RANDOMUSER_FETCH_TIMEOUT_MS),
    });
  } catch (cause) {
    throw new RandomUserFetchError(
      'Could not reach randomuser.me.',
      undefined,
      cause,
    );
  }

  let body: unknown;
  try {
    body = await res.json();
  } catch {
    throw new RandomUserFetchError(
      `randomuser.me returned non-JSON (status ${res.status}).`,
      res.status,
    );
  }

  if (!res.ok) {
    throw new RandomUserFetchError(
      `randomuser.me request failed (${res.status}).`,
      res.status,
    );
  }

  const parsed = body as RandomUserMeResponse;
  const results = Array.isArray(parsed.results) ? parsed.results : [];
  const out: RandomUsernameEntry[] = [];
  for (const person of results) {
    const row = mapPerson(person);
    if (row) out.push(row);
  }
  if (out.length === 0) {
    throw new RandomUserFetchError(
      'randomuser.me returned no usable users.',
      res.status,
    );
  }
  return out;
}

/**
 * Appends to the Redis LIST until it has at least `need` entries (capped by
 * POOL_MAX_ENTRIES). Called when the key is missing/empty (expired TTL) or when
 * `LLEN` is below the requested `limit`. Does not remove elements.
 */
async function ensureListCoversLimit(
  redis: NonNullable<ReturnType<typeof getRedisClient>>,
  need: number,
): Promise<void> {
  const target = Math.min(need, POOL_MAX_ENTRIES);

  for (;;) {
    const len = await redis.llen(REDIS_POOL_KEY);
    if (len >= target || len >= POOL_MAX_ENTRIES) {
      return;
    }

    const room = POOL_MAX_ENTRIES - len;
    const deficit = target - len;
    const batchCount = Math.min(
      RANDOMUSER_BATCH_SIZE,
      room,
      Math.max(deficit, 1),
    );

    const batch = await fetchRandomUserBatch(batchCount);
    shuffleInPlace(batch);
    const payloads = batch.map(entry => JSON.stringify(entry));
    if (payloads.length === 0) {
      throw new RandomUserFetchError('Batch mapping produced no entries.');
    }

    await redis.rpush(REDIS_POOL_KEY, ...payloads);
    await redis.expire(REDIS_POOL_KEY, RANDOM_USERNAMES_POOL_TTL_SECONDS);
  }
}

function parsePoolEntry(raw: unknown): RandomUsernameEntry | null {
  if (raw === null || raw === undefined) return null;
  let text: string;
  if (typeof raw === 'string') {
    text = raw;
  } else {
    try {
      text = JSON.stringify(raw);
    } catch {
      return null;
    }
  }
  try {
    const v = JSON.parse(text) as unknown;
    if (!v || typeof v !== 'object') return null;
    const o = v as Record<string, unknown>;
    const firstName = o.firstName;
    const lastName = o.lastName;
    const username = o.username;
    const email = o.email;
    if (
      typeof firstName !== 'string' ||
      typeof lastName !== 'string' ||
      typeof username !== 'string' ||
      typeof email !== 'string'
    ) {
      return null;
    }
    return { firstName, lastName, username, email };
  } catch {
    return null;
  }
}

/**
 * Parses `limit` from a query string value: positive integer, at most
 * POOL_MAX_ENTRIES (1000).
 */
export function parseUsernameLimitParam(raw: string | null):
  | {
      ok: true;
      limit: number;
    }
  | { ok: false; error: string } {
  if (raw === null || raw.trim() === '') {
    return { ok: false, error: 'Missing required query parameter limit.' };
  }
  const n = Number.parseInt(raw, 10);
  if (!Number.isFinite(n) || n < 1) {
    return { ok: false, error: 'limit must be a positive integer.' };
  }
  if (n > POOL_MAX_ENTRIES) {
    return {
      ok: false,
      error: `limit cannot exceed ${POOL_MAX_ENTRIES}.`,
    };
  }
  return { ok: true, limit: n };
}

/**
 * Ensures the Redis list has at least `limit` entries (fetch + RPUSH only when
 * empty/expired or list shorter than `limit`), then returns the first `limit`
 * rows via LRANGE without removing them. Entries expire only via key TTL.
 * Fetched batches are shuffled before RPUSH; the returned slice is shuffled
 * again so order is not tied to list head or API ordering.
 */
export async function takeRandomUsernamesFromPool(limit: number): Promise<{
  entries: RandomUsernameEntry[];
  poolSizeAfter: number;
}> {
  const redis = getRedisClient();
  if (!redis) {
    throw new RandomUsernamesRedisUnavailableError(
      'Upstash Redis is not configured.',
    );
  }

  const need = Math.min(limit, POOL_MAX_ENTRIES);
  await ensureListCoversLimit(redis, need);

  const rawSlice = await redis.lrange(REDIS_POOL_KEY, 0, need - 1);
  const entries: RandomUsernameEntry[] = [];
  for (const raw of rawSlice) {
    const entry = parsePoolEntry(raw);
    if (entry) entries.push(entry);
  }

  shuffleInPlace(entries);

  const poolSizeAfter = await redis.llen(REDIS_POOL_KEY);

  if (entries.length < need) {
    throw new RandomUserFetchError(
      'Cached list had fewer valid entries than requested after refill.',
    );
  }

  return { entries, poolSizeAfter };
}
