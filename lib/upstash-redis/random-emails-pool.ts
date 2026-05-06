import {
  parseUsernameLimitParam,
  RandomUserFetchError,
  RandomUsernamesRedisUnavailableError,
  takeRandomUsernamesFromPool,
} from '@/lib/upstash-redis/random-usernames-pool';

export {
  RandomUserFetchError,
  RandomUsernamesRedisUnavailableError,
};

/** Same bounds as usernames: positive integer, at most 1000. */
export const parseEmailLimitParam = parseUsernameLimitParam;

/**
 * Emails are sourced from the same Redis-backed identity pool as usernames
 * (randomuser.me), with order shuffled in the pool layer.
 */
export async function takeRandomEmailsFromPool(limit: number): Promise<{
  emails: string[];
  poolSizeAfter: number;
}> {
  const { entries, poolSizeAfter } = await takeRandomUsernamesFromPool(limit);
  const emails = entries.map(entry => entry.email);
  return { emails, poolSizeAfter };
}
