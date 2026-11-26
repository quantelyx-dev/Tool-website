/** Round to cents for worksheet-style currency amounts. */
export function roundMoney(n: number): number {
  return Math.round(n * 100) / 100;
}

/** Throws if `value` is not finite or is negative (common precondition for worksheet inputs). */
export function assertFiniteNonNegative(value: number, name: string): void {
  if (!Number.isFinite(value) || value < 0) {
    throw new RangeError(`${name} must be a finite non-negative number.`);
  }
}

const usdFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

export function formatUsd(amount: number): string {
  return usdFormatter.format(amount);
}
