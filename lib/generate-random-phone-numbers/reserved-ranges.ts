import type { CountryCode } from 'libphonenumber-js';

/**
 * Only countries whose numbering regulator sets numbers aside for fiction are offered,
 * so a generated number cannot belong to a real subscriber.
 */
export type ReservedRange = {
  /** National digits before the random part, without the trunk prefix. */
  prefix: string;
  /** Suffixes run from `min` to `max`, zero-padded to `width` digits. */
  min: number;
  max: number;
  width: number;
};

export type ReservedPhoneCountry = {
  iso2: CountryCode;
  name: string;
  callingCode: string;
  /** Shown to users so they know where the numbers come from. */
  rangeLabel: string;
  ranges: readonly ReservedRange[];
};

/** NANPA keeps 555-0100 to 555-0199 for fictional use in every area code. */
function northAmericanRanges(areaCodes: readonly string[]): ReservedRange[] {
  return areaCodes.map(area => ({ prefix: `${area}55501`, min: 0, max: 99, width: 2 }));
}

/** Ofcom drama numbers: 1,000 per block. */
const UK_RANGES: ReservedRange[] = [
  // London, then 0113 to 0118, 0121, 0131, 0141, 0151, and 0161 city codes.
  '2079460',
  ...['113', '114', '115', '116', '117', '118', '121', '131', '141', '151', '161'].map(
    code => `${code}4960`,
  ),
  // Mobile drama range and the code-free 01632 range.
  '7700900',
  '1632960',
].map(prefix => ({ prefix, min: 0, max: 999, width: 3 }));

/** ACMA reserves 5550 xxxx in the 02, 03, 07, and 08 areas. Mobile numbers are not offered. */
const AU_RANGES: ReservedRange[] = ['2', '3', '7', '8'].map(area => ({
  prefix: `${area}5550`,
  min: 0,
  max: 9_999,
  width: 4,
}));

export const RESERVED_PHONE_COUNTRIES: readonly ReservedPhoneCountry[] = [
  {
    iso2: 'AU',
    name: 'Australia',
    callingCode: '61',
    rangeLabel: 'ACMA fiction landlines: (02), (03), (07), and (08) 5550 xxxx',
    ranges: AU_RANGES,
  },
  {
    iso2: 'CA',
    name: 'Canada',
    callingCode: '1',
    rangeLabel: 'North American fiction block: 555-0100 to 555-0199',
    ranges: northAmericanRanges(['204', '403', '416', '514', '604', '613', '902']),
  },
  {
    iso2: 'GB',
    name: 'United Kingdom',
    callingCode: '44',
    rangeLabel: 'Ofcom drama numbers, such as 020 7946 0xxx and 07700 900xxx',
    ranges: UK_RANGES,
  },
  {
    iso2: 'US',
    name: 'United States',
    callingCode: '1',
    rangeLabel: 'North American fiction block: 555-0100 to 555-0199',
    ranges: northAmericanRanges([
      '202', '206', '212', '213', '303', '305', '312', '404', '415', '503', '512', '617',
    ]),
  },
];
