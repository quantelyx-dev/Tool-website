import { isIP } from 'node:net';

/**
 * Client IP for rate limiting.
 *
 * `X-Forwarded-For` is a list: the client can send any values, and each proxy then
 * appends the address it saw. Only the entries added by *our own* proxies (the right
 * end of the list) are trustworthy, so the address is picked by counting from the right.
 *
 * Configure per host (see `.env.example`):
 * - `CLIENT_IP_HEADER`: a single-IP header your platform sets and clients cannot forge
 *   (for example `cf-connecting-ip` behind Cloudflare). Takes priority when present.
 * - `TRUSTED_PROXY_HOPS`: how many proxies sit in front of the app (default 1). The
 *   client IP is the entry that many positions from the right.
 */

let warnedUnconfigured = false;

function parseHops(raw: string | undefined): number {
  const hops = Number.parseInt(raw ?? '', 10);
  return Number.isInteger(hops) && hops >= 1 && hops <= 10 ? hops : 1;
}

function warnIfUnconfigured(): void {
  if (
    warnedUnconfigured ||
    process.env.NODE_ENV !== 'production' ||
    process.env.CLIENT_IP_HEADER?.trim() ||
    process.env.TRUSTED_PROXY_HOPS?.trim()
  ) {
    return;
  }
  warnedUnconfigured = true;
  console.warn(
    '[request-ip] Neither CLIENT_IP_HEADER nor TRUSTED_PROXY_HOPS is set; assuming one trusted proxy hop. Verify this on your host or IP-based limits may be wrong.',
  );
}

/** The address the platform reports, or `unknown` when none can be trusted. */
export function getClientIp(request: Request): string {
  warnIfUnconfigured();

  const headerName = process.env.CLIENT_IP_HEADER?.trim().toLowerCase();
  if (headerName) {
    const value = request.headers.get(headerName)?.trim();
    if (value && isIP(value)) return value;
  }

  const forwarded = request.headers.get('x-forwarded-for');
  if (forwarded) {
    const entries = forwarded
      .split(',')
      .map(entry => entry.trim())
      .filter(Boolean);
    const hops = parseHops(process.env.TRUSTED_PROXY_HOPS);
    const candidate = entries[entries.length - hops];
    if (candidate && isIP(candidate)) return candidate;
  }

  const realIp = request.headers.get('x-real-ip')?.trim();
  if (realIp && isIP(realIp)) return realIp;

  return 'unknown';
}
