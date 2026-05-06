import type { RandomNameType } from '@/lib/generate-random-names/api-response';
import {
  parseUsernameLimitParam,
  RandomUserFetchError,
  RandomUsernamesRedisUnavailableError,
  takeRandomUsernamesFromPool,
  type RandomUsernameEntry,
} from '@/lib/upstash-redis/random-usernames-pool';

export {
  RandomUserFetchError,
  RandomUsernamesRedisUnavailableError,
};

/** Same bounds as other identity tools: positive integer, at most 1000. */
export const parseNameLimitParam = parseUsernameLimitParam;

export function parseNameTypeParam(raw: string | null):
  | { ok: true; nameType: RandomNameType }
  | { ok: false; error: string } {
  if (raw === null || raw.trim() === '') {
    return {
      ok: false,
      error: 'Missing required query parameter type.',
    };
  }
  const t = raw.trim();
  if (t === 'firstName' || t === 'lastName' || t === 'fullName') {
    return { ok: true, nameType: t };
  }
  return {
    ok: false,
    error:
      'type must be one of: firstName, lastName, fullName.',
  };
}

function entryToName(entry: RandomUsernameEntry, nameType: RandomNameType): string {
  if (nameType === 'firstName') {
    return entry.firstName;
  }
  if (nameType === 'lastName') {
    return entry.lastName;
  }
  return `${entry.firstName} ${entry.lastName}`;
}

/**
 * Names come from the same Redis-backed identity pool as usernames and emails
 * (randomuser.me), with order shuffled in the pool layer.
 */
export async function takeRandomNamesFromPool(
  limit: number,
  nameType: RandomNameType,
): Promise<{
  names: string[];
  poolSizeAfter: number;
}> {
  const { entries, poolSizeAfter } = await takeRandomUsernamesFromPool(limit);
  const names = entries.map(entry => entryToName(entry, nameType));
  return { names, poolSizeAfter };
}
