import { faker } from '@faker-js/faker';

export type GeneratedAddress = {
  streetAddress: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  formattedAddress: string;
};

export function generateFictionalAddress(): GeneratedAddress {
  const streetAddress = faker.location.streetAddress();
  const city = faker.location.city();
  const state = faker.location.state();
  const postalCode = faker.location.zipCode();
  const country = faker.location.country();
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
