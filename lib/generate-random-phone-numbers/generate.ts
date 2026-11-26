import { AsYouType, type CountryCode } from 'libphonenumber-js';

import { RESERVED_PHONE_COUNTRIES } from '@/lib/generate-random-phone-numbers/reserved-ranges';

type GeneratedPhoneNumber = {
  countryCode: CountryCode;
  callingCode: string;
  nationalNumber: string;
  international: string;
  e164: string;
};

function randomInteger(min: number, max: number): number {
  return min + Math.floor(Math.random() * (max - min + 1));
}

export function generateRandomPhoneNumber(
  countryCode: CountryCode,
): GeneratedPhoneNumber {
  const country = RESERVED_PHONE_COUNTRIES.find(c => c.iso2 === countryCode);

  if (!country) {
    throw new Error(`Unsupported country: ${countryCode}`);
  }

  const range = country.ranges[randomInteger(0, country.ranges.length - 1)]!;
  const suffix = String(randomInteger(range.min, range.max)).padStart(range.width, '0');
  const nationalNumber = `${range.prefix}${suffix}`;
  const e164 = `+${country.callingCode}${nationalNumber}`;

  return {
    countryCode,
    callingCode: country.callingCode,
    nationalNumber,
    // AsYouType formats reserved numbers too, which strict validation may reject.
    international: new AsYouType().input(e164),
    e164,
  };
}
