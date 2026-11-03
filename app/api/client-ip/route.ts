import { NextResponse } from 'next/server';

import { getClientIp } from '@/lib/server/request-ip';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const REPORTED_HEADERS = [
  'x-forwarded-for',
  'x-real-ip',
  'cf-connecting-ip',
  'true-client-ip',
  'forwarded',
] as const;

/**
 * Temporary diagnostic for choosing `CLIENT_IP_HEADER` / `TRUSTED_PROXY_HOPS` on a new
 * host. Disabled (404) unless `ENABLE_CLIENT_IP_DEBUG=1`; turn it off again afterwards.
 * It only reflects the caller's own request metadata.
 */
export async function GET(request: Request) {
  if (process.env.ENABLE_CLIENT_IP_DEBUG !== '1') {
    return new NextResponse(null, { status: 404 });
  }

  return NextResponse.json(
    {
      resolvedIp: getClientIp(request),
      clientIpHeader: process.env.CLIENT_IP_HEADER?.trim() || null,
      trustedProxyHops: process.env.TRUSTED_PROXY_HOPS?.trim() || null,
      headers: Object.fromEntries(
        REPORTED_HEADERS.map(name => [name, request.headers.get(name)]),
      ),
    },
    { headers: { 'Cache-Control': 'no-store' } },
  );
}
