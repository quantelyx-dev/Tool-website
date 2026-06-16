import { getClientIp } from '@/lib/server/request-ip';

/** Max successful submissions per rolling 24h window, per IP and per submitter email. */
export const CONTACT_RATE_LIMIT_MAX = 3;

export const CONTACT_RATE_LIMIT_WINDOW_MS = 86_400_000;

export function contactRateLimitKeys(
  request: Request,
  emailNormalized: string,
) {
  const ip = getClientIp(request);
  return [`contact:ip:${ip}`, `contact:email:${emailNormalized}`] as const;
}
