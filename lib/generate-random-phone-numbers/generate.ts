import {
  parsePhoneNumberFromString,
  getCountryCallingCode,
  CountryCode,
  MetadataJson,
} from 'libphonenumber-js/max';

import metadata from 'libphonenumber-js/metadata.full.json';

type GeneratedPhoneNumber = {
  countryCode: CountryCode;
  callingCode: string;
  nationalNumber: string;
  international: string;
  e164: string;
};

const typedMetadata = metadata as MetadataJson;

function randomDigits(length: number): string {
  let result = '';

  // first digit should not be 0
  result += String(Math.floor(Math.random() * 9) + 1);

  for (let i = 1; i < length; i++) {
    result += String(Math.floor(Math.random() * 10));
  }

  return result;
}

export function generateRandomPhoneNumber(
  countryCode: CountryCode,
  maxAttempts: number = 100,
): GeneratedPhoneNumber {
  const countryMetadata = typedMetadata.countries[countryCode];

  if (!countryMetadata) {
    throw new Error(`Unsupported country: ${countryCode}`);
  }

  const possibleLengths = countryMetadata[3];

  if (!possibleLengths?.length) {
    throw new Error(
      `No possible phone number lengths found for ${countryCode}`,
    );
  }

  const callingCode = getCountryCallingCode(countryCode);

  for (let attempt = 0; attempt < maxAttempts; attempt++) {
    const randomIndex = Math.floor(Math.random() * possibleLengths.length);

    const length = possibleLengths[randomIndex];

    const nationalNumber = randomDigits(length);

    const fullNumber = `+${callingCode}${nationalNumber}`;

    const parsed = parsePhoneNumberFromString(fullNumber, countryCode);

    if (parsed?.isValid()) {
      return {
        countryCode,
        callingCode,
        nationalNumber,
        international: parsed.formatInternational(),
        e164: parsed.number,
      };
    }
  }

  throw new Error(`Could not generate a valid phone number for ${countryCode}`);
}
