const DECIMAL_MONEY_REGEX = /^-?\d+(\.\d+)?$/;

/**
 * Trimmed numeric string with optional commas/spaces stripped; rejects negative
 * or invalid decimals.
 */
export function parseNonNegativeMoneyString(raw: string): number | null {
  const s = raw.trim().replace(/,/g, '').replace(/\s+/g, '');
  if (!s || !DECIMAL_MONEY_REGEX.test(s)) return null;
  const n = Number(s);
  if (!Number.isFinite(n)) return null;
  return n >= 0 ? n : null;
}

export function parsePrincipalAmount(raw: string): number | null {
  return parseUnsignedDecimalMoneyBounded(raw, true, Number.MAX_SAFE_INTEGER);
}

export function parseAnnualRatePercentForValidation(
  raw: string,
  bounds: { maxExclusive: number },
): number | null {
  const n = parseUnsignedDecimal(raw);
  if (n === null || n <= 0 || n >= bounds.maxExclusive) return null;
  return n;
}

export function parseOptionalContribution(raw: string): number {
  if (!raw.trim()) return 0;
  const n = parseUnsignedDecimalMoneyBounded(raw, false, Number.MAX_SAFE_INTEGER);
  return n ?? 0;
}

export function approximateHorizonDays(
  timelineYears: string,
  timelineMonths: string,
  timelineExtraDays: string,
): number | null {
  const y = Number(timelineYears);
  const mo = Number(timelineMonths);
  const d = Number(timelineExtraDays);
  if (![y, mo, d].every((x) => Number.isInteger(x) && x >= 0))
    return null;
  return y * 365 + mo * 30 + d;
}

function parseUnsignedDecimal(raw: string): number | null {
  return parseNonNegativeMoneyString(raw);
}

function parseUnsignedDecimalMoneyBounded(
  raw: string,
  strictlyPositive: boolean,
  maxInclusive: number,
): number | null {
  const n = parseUnsignedDecimal(raw);
  if (n === null) return null;
  if (strictlyPositive && n <= 0) return null;
  if (n > maxInclusive) return null;
  return n;
}
