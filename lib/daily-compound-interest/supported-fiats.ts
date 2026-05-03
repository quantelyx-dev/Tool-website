/**
 * Fiat currencies offered in the daily compound calculator UI.
 * Aligned with Frankfurter `/v1/latest?from=USD` crosses + PKR; API wiring may scope further later.
 */
export const SUPPORTED_FIAT_CODES = [
  'USD',
  'EUR',
  'GBP',
  'JPY',
  'CHF',
  'AUD',
  'CAD',
  'NZD',
  'SEK',
  'NOK',
  'DKK',
  'PLN',
  'CZK',
  'HUF',
  'RON',
  'TRY',
  'ZAR',
  'MXN',
  'BRL',
  'INR',
  'CNY',
  'KRW',
  'SGD',
  'HKD',
  'THB',
  'MYR',
  'PHP',
  'IDR',
  'PKR',
  'ILS',
  'ISK',
] as const;

export type SupportedFiatCurrencyCode = (typeof SUPPORTED_FIAT_CODES)[number];

export const SUPPORTED_FIAT_LABELS: Record<SupportedFiatCurrencyCode, string> = {
  USD: 'USD — US dollar',
  EUR: 'EUR — Euro',
  GBP: 'GBP — British pound',
  JPY: 'JPY — Japanese yen',
  CHF: 'CHF — Swiss franc',
  AUD: 'AUD — Australian dollar',
  CAD: 'CAD — Canadian dollar',
  NZD: 'NZD — New Zealand dollar',
  SEK: 'SEK — Swedish krona',
  NOK: 'NOK — Norwegian krone',
  DKK: 'DKK — Danish krone',
  PLN: 'PLN — Polish złoty',
  CZK: 'CZK — Czech koruna',
  HUF: 'HUF — Hungarian forint',
  RON: 'RON — Romanian leu',
  TRY: 'TRY — Turkish lira',
  ZAR: 'ZAR — South African rand',
  MXN: 'MXN — Mexican peso',
  BRL: 'BRL — Brazilian real',
  INR: 'INR — Indian rupee',
  CNY: 'CNY — Chinese yuan',
  KRW: 'KRW — South Korean won',
  SGD: 'SGD — Singapore dollar',
  HKD: 'HKD — Hong Kong dollar',
  THB: 'THB — Thai baht',
  MYR: 'MYR — Malaysian ringgit',
  PHP: 'PHP — Philippine peso',
  IDR: 'IDR — Indonesian rupiah',
  PKR: 'PKR — Pakistani rupee',
  ILS: 'ILS — Israeli new shekel',
  ISK: 'ISK — Icelandic króna',
};

/** Tuple form for {@link z.enum} */
export type SupportedFiatCodesTuple = readonly [
  SupportedFiatCurrencyCode,
  ...SupportedFiatCurrencyCode[],
];

export const SUPPORTED_FIAT_CODES_TUPLE: SupportedFiatCodesTuple =
  SUPPORTED_FIAT_CODES as unknown as SupportedFiatCodesTuple;

export const SUPPORTED_FIAT_OPTIONS = SUPPORTED_FIAT_CODES.map((code) => ({
  code,
  label: SUPPORTED_FIAT_LABELS[code],
}));
