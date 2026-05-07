import { z } from 'zod';
import { SupportedCardIssuer } from '../generate-random-credit-cards/generate';

export const ISSUER_OPTIONS: SupportedCardIssuer[] = [
  'Visa',
  'Mastercard',
  'Discover',
  'JCB',
  'American express',
];

export const creditCardformSchema = z.object({
  issuer: z.enum(ISSUER_OPTIONS, {
    error: 'Please select a valid issuer.',
  }),
});
