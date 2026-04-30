import { getClientIp } from '@/lib/server/request-ip';

/** Max successful submissions per rolling 24h window, per IP and per submitter email. */
export const REQUEST_TOOL_RATE_LIMIT_MAX = 2;

export const REQUEST_TOOL_RATE_LIMIT_WINDOW_MS = 86_400_000;

export function requestToolRateLimitKeys(
  request: Request,
  emailNormalized: string,
) {
  const ip = getClientIp(request);
  return [`request-tool:ip:${ip}`, `request-tool:email:${emailNormalized}`] as const;
}
