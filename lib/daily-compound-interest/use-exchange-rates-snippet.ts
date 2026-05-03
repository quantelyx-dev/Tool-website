'use client';

import { useEffect, useState } from 'react';

type ExchangeRatesOkBody = {
  ok: true;
  baseCurrencyResolved: string;
  data: Record<string, number>;
};

export type ExchangeRateQuoteRow = {
  base: string;
  rate: number;
};

/** Cached FX snapshot for optional UI copy (projection math ignores this). */
export function useExchangeRatesSnippet(): {
  base: string;
  rates: Record<string, number>;
} | null {
  const [state, setState] = useState<{
    base: string;
    rates: Record<string, number>;
  } | null>(null);

  useEffect(() => {
    let cancelled = false;
    void (async () => {
      try {
        const res = await fetch('/api/exchange-rates');
        const json: unknown = await res.json();
        if (
          cancelled ||
          !res.ok ||
          typeof json !== 'object' ||
          json === null ||
          !('ok' in json) ||
          (json as { ok: unknown }).ok !== true
        ) {
          return;
        }
        const body = json as ExchangeRatesOkBody;
        const data = body.data;
        setState({
          base: body.baseCurrencyResolved,
          rates: typeof data === 'object' && data !== null ? data : {},
        });
      } catch {
        /* optional UI only */
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  return state;
}

export function exchangeRateQuoteForTarget(
  snapshot: { base: string; rates: Record<string, number> } | null,
  targetCurrency: string,
): ExchangeRateQuoteRow | null {
  if (!snapshot) return null;
  if (snapshot.base === targetCurrency) {
    return { base: snapshot.base, rate: 1 };
  }
  const rate = snapshot.rates[targetCurrency];
  if (typeof rate !== 'number' || !Number.isFinite(rate)) return null;
  return { base: snapshot.base, rate };
}
