import { z } from 'zod';

const countryCodePattern = /^[A-Z]{2}$/;

export const generateRandomPhoneNumberFormSchema = z.object({
  countryCode: z
    .string()
    .trim()
    .min(2, {
      message: 'Please enter a valid country code (e.g., US).',
    })
    .max(2, {
      message: 'Country code must be exactly 2 characters.',
    })
    .regex(countryCodePattern, {
      message: 'Invalid country code format. Use uppercase letters only.',
    }),
});

export type GenerateRandomPhoneNumberFormValues = z.infer<
  typeof generateRandomPhoneNumberFormSchema
>;
