/**
 * In-memory sliding-window rate limiter for Route Handlers.
 * Works per Node.js runtime instance; for multi-instance production deployments,
 * replace with Redis / Upstash or similar.
 */

const buckets = new Map<string, number[]>();

function pruneAndSortTimestamps(key: string, cutoffMs: number): number[] {
  const raw = buckets.get(key) ?? [];
  const next = raw.filter((t) => t > cutoffMs);
  next.sort((a, b) => a - b);
  return next;
}

/** Returns whether every key is strictly under the limit (peek only — does not record). */
export function peekSlidingWindow(
  keys: readonly string[],
  limit: number,
  windowMs: number,
): { ok: true } | { ok: false; retryAfterSeconds: number } {
  const now = Date.now();
  const cutoff = now - windowMs;
  let retryAfterSeconds = 0;

  for (const key of keys) {
    const timestamps = pruneAndSortTimestamps(key, cutoff);
    if (timestamps.length >= limit) {
      const oldest = timestamps[0]!;
      const retryMs = oldest + windowMs - now;
      retryAfterSeconds = Math.max(
        retryAfterSeconds,
        Math.max(1, Math.ceil(retryMs / 1000)),
      );
    }
  }

  if (retryAfterSeconds > 0) {
    return { ok: false, retryAfterSeconds };
  }

  return { ok: true };
}

/** Records one successful event against all keys (call after the guarded action succeeds). */
export function recordSlidingWindowEvent(
  keys: readonly string[],
  windowMs: number,
): void {
  const now = Date.now();
  const cutoff = now - windowMs;

  for (const key of keys) {
    const timestamps = pruneAndSortTimestamps(key, cutoff);
    timestamps.push(now);
    timestamps.sort((a, b) => a - b);
    buckets.set(key, timestamps);
  }
}
