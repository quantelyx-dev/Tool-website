import { faker } from '@faker-js/faker';
import valid from 'card-validator';

export type SupportedCardIssuer =
  | 'Visa'
  | 'Mastercard'
  | 'Discover'
  | 'JCB'
  | 'American express';

export type NormalizedCardIssuer =
  | 'visa'
  | 'mastercard'
  | 'american-express'
  | 'discover'
  | 'jcb';

export type GeneratedFakeCreditCard = {
  holderName: string;
  issuer: NormalizedCardIssuer;
  number: string;
  cvv: string;
  expiryMonth: string;
  expiryYear: string;
  expiry: string;
};

export type CreditCardValidationResult = {
  isValid: boolean;
  luhnValid: boolean;
  issuerDetected: boolean;
  issuerMatches: boolean;
  cvvValid: boolean;
  expiryValid: boolean;
  detectedIssuer: string | null;
};

const SUPPORTED_ISSUERS: readonly NormalizedCardIssuer[] = [
  'visa',
  'mastercard',
  'american-express',
  'discover',
  'jcb',
];

function normalizeRequestedIssuer(
  issuer?: SupportedCardIssuer | NormalizedCardIssuer,
): NormalizedCardIssuer | null {
  if (!issuer) {
    return null;
  }

  const normalized = issuer.trim().toLowerCase();

  if (normalized === 'american express') {
    return 'american-express';
  }

  if (
    normalized === 'visa' ||
    normalized === 'mastercard' ||
    normalized === 'discover' ||
    normalized === 'jcb'
  ) {
    return normalized;
  }

  return null;
}

function randomExpiry(): { month: string; year: string } {
  const currentYear = new Date().getFullYear();
  const year = faker.number.int({ min: currentYear + 1, max: currentYear + 6 });
  const month = faker.number.int({ min: 1, max: 12 });

  return {
    month: String(month).padStart(2, '0'),
    year: String(year),
  };
}

function sanitizeCardNumber(value: string): string {
  return value.replace(/\D/g, '');
}

function generateNumberForIssuer(
  targetIssuer: NormalizedCardIssuer | null,
  maxAttempts: number,
): { number: string; issuer: NormalizedCardIssuer } {
  for (let attempt = 0; attempt < maxAttempts; attempt++) {
    const candidate = sanitizeCardNumber(faker.finance.creditCardNumber());
    const parsed = valid.number(candidate);
    const detectedIssuer = parsed.card?.type ?? null;

    if (!parsed.isValid || !detectedIssuer) {
      continue;
    }

    if (!SUPPORTED_ISSUERS.includes(detectedIssuer as NormalizedCardIssuer)) {
      continue;
    }

    if (targetIssuer && detectedIssuer !== targetIssuer) {
      continue;
    }

    return {
      number: candidate,
      issuer: detectedIssuer as NormalizedCardIssuer,
    };
  }

  if (targetIssuer) {
    throw new Error(`Could not generate a valid ${targetIssuer} card number`);
  }

  throw new Error('Could not generate a valid card number');
}

export function validateFakeCreditCard(
  card: Pick<
    GeneratedFakeCreditCard,
    'number' | 'cvv' | 'expiryMonth' | 'expiryYear'
  >,
  expectedIssuer?: SupportedCardIssuer | NormalizedCardIssuer,
): CreditCardValidationResult {
  const normalizedExpectedIssuer = normalizeRequestedIssuer(expectedIssuer);
  const parsedNumber = valid.number(sanitizeCardNumber(card.number));
  const detectedIssuer = parsedNumber.card?.type ?? null;
  const issuerDetected = detectedIssuer !== null;
  const issuerMatches = normalizedExpectedIssuer
    ? detectedIssuer === normalizedExpectedIssuer
    : issuerDetected;

  const cvvLength = parsedNumber.card?.code?.size ?? 3;
  const parsedCvv = valid.cvv(card.cvv, cvvLength);
  const parsedExpiry = valid.expirationDate({
    month: card.expiryMonth,
    year: card.expiryYear,
  });

  const luhnValid = parsedNumber.isValid;
  const cvvValid = parsedCvv.isValid;
  const expiryValid = parsedExpiry.isValid;
  const isValid = luhnValid && issuerMatches && cvvValid && expiryValid;

  return {
    isValid,
    luhnValid,
    issuerDetected,
    issuerMatches,
    cvvValid,
    expiryValid,
    detectedIssuer,
  };
}

export function generateFakeCreditCard(
  issuer?: SupportedCardIssuer,
  maxAttempts: number = 200,
): GeneratedFakeCreditCard {
  const normalizedIssuer = normalizeRequestedIssuer(issuer);
  const generated = generateNumberForIssuer(normalizedIssuer, maxAttempts);
  const expiry = randomExpiry();
  const cvvLength = valid.number(generated.number).card?.code?.size ?? 3;
  const cvv = faker.string.numeric({
    length: cvvLength,
    allowLeadingZeros: true,
  });

  const card: GeneratedFakeCreditCard = {
    holderName: faker.person.fullName(),
    issuer: generated.issuer,
    number: generated.number,
    cvv,
    expiryMonth: expiry.month,
    expiryYear: expiry.year,
    expiry: `${expiry.month}/${expiry.year}`,
  };

  const validation = validateFakeCreditCard(card, generated.issuer);

  if (!validation.isValid) {
    throw new Error('Generated card failed validation checks');
  }

  return card;
}

export function generateFakeCreditCards(
  count: number,
  issuer?: SupportedCardIssuer,
): GeneratedFakeCreditCard[] {
  if (count < 1) {
    return [];
  }

  return Array.from({ length: count }, () => generateFakeCreditCard(issuer));
}
