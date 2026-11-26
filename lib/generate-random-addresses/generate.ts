import { fakerEN_US as faker } from '@faker-js/faker';

export type GeneratedAddress = {
  streetAddress: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  formattedAddress: string;
};

/** Faker's data holds a single New York ZIP code, so New York's main range is set here. */
const NEW_YORK_ZIP_RANGE = { min: 10_001, max: 14_925 };

function zipCodeForState(state: string): string {
  if (state === 'NY') {
    return String(faker.number.int(NEW_YORK_ZIP_RANGE));
  }
  return faker.location.zipCode({ state });
}

export function generateFictionalAddress(): GeneratedAddress {
  const streetAddress = faker.location.streetAddress();
  const city = faker.location.city();
  const state = faker.location.state({ abbreviated: true });
  // The ZIP code is drawn from the chosen state's range, so the two agree.
  const postalCode = zipCodeForState(state);
  const country = 'United States';
  const formattedAddress =
    `${streetAddress}, ${city}, ${state} ${postalCode}, ${country}`;

  return {
    streetAddress,
    city,
    state,
    postalCode,
    country,
    formattedAddress,
  };
}

export function generateFictionalAddresses(count: number): GeneratedAddress[] {
  if (count < 1) {
    return [];
  }

  return Array.from({ length: count }, () => generateFictionalAddress());
}
