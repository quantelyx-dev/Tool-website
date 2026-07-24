import { DateTime } from 'luxon';

import { base64ToBytes } from '@/lib/base64-tool/base64';

export type JwtClaimStatus = 'expired' | 'not-yet-valid' | 'valid' | 'unknown';

export type JwtParseResult =
  | {
      ok: true;
      header: unknown;
      payload: unknown;
      signature: string;
      status: JwtClaimStatus;
      expiresAt: string | null;
      issuedAt: string | null;
      notBefore: string | null;
    }
  | { ok: false; error: string };

function decodeSegment(segment: string): unknown {
  const decoded = base64ToBytes(segment);

  if (!decoded.ok) {
    throw new Error(decoded.error);
  }

  const text = new TextDecoder('utf-8', { fatal: true }).decode(decoded.bytes);
  return JSON.parse(text);
}

function formatClaimTimestamp(value: unknown): string | null {
  if (typeof value !== 'number') {
    return null;
  }

  return DateTime.fromSeconds(value, { zone: 'utc' }).toFormat(
    "yyyy-LL-dd 'at' HH:mm:ss 'UTC'",
  );
}

function getClaimStatus(payload: Record<string, unknown>): JwtClaimStatus {
  const now = DateTime.now().toSeconds();
  const exp = typeof payload.exp === 'number' ? payload.exp : null;
  const nbf = typeof payload.nbf === 'number' ? payload.nbf : null;

  if (exp !== null && now >= exp) {
    return 'expired';
  }

  if (nbf !== null && now < nbf) {
    return 'not-yet-valid';
  }

  if (exp !== null || nbf !== null) {
    return 'valid';
  }

  return 'unknown';
}

export function parseJwt(token: string): JwtParseResult {
  const parts = token.trim().split('.');

  if (parts.length !== 3) {
    return {
      ok: false,
      error:
        'A JWT must have three dot-separated segments (header.payload.signature).',
    };
  }

  const [headerSeg, payloadSeg, signatureSeg] = parts;

  try {
    const header = decodeSegment(headerSeg);
    const payload = decodeSegment(payloadSeg);
    const payloadRecord = (
      typeof payload === 'object' && payload !== null ? payload : {}
    ) as Record<string, unknown>;

    return {
      ok: true,
      header,
      payload,
      signature: signatureSeg,
      status: getClaimStatus(payloadRecord),
      expiresAt: formatClaimTimestamp(payloadRecord.exp),
      issuedAt: formatClaimTimestamp(payloadRecord.iat),
      notBefore: formatClaimTimestamp(payloadRecord.nbf),
    };
  } catch (err) {
    return {
      ok: false,
      error:
        err instanceof Error
          ? `Could not decode token segments: ${err.message}`
          : 'Could not decode token segments.',
    };
  }
}
