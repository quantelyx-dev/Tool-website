export function formatCurrencyAmount(
  currencyCode: string,
  amount: number,
  locale?: string,
): string {
  try {
    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency: currencyCode,
      maximumFractionDigits: 2,
    }).format(amount);
  } catch {
    return `${amount.toFixed(2)} ${currencyCode}`;
  }
}

export function formatCompactNumber(value: number, locale?: string): string {
  return new Intl.NumberFormat(locale, { maximumFractionDigits: 0 }).format(
    value,
  );
}

/** Compact axis / legend labels (e.g. $125K). */
export function formatCompactCurrency(
  currencyCode: string,
  amount: number,
  locale?: string,
): string {
  try {
    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency: currencyCode,
      notation: 'compact',
      compactDisplay: 'short',
      maximumFractionDigits: 2,
    }).format(amount);
  } catch {
    return `${formatCompactNumber(amount, locale)} ${currencyCode}`;
  }
}
