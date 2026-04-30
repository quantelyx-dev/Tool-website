import { DateTime } from 'luxon';
import { z } from 'zod';

import {
  currentCalendarYear,
  isIsoCalendarDateOnOrBeforeToday,
  isValidIsoDateOnly,
  isValidWallClockTimeHm,
} from '@/lib/datetime';

export const sunMoonRisingFormSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, { message: 'Please enter your name (at least 2 characters).' })
    .max(100, { message: 'Name must be at most 100 characters.' }),
  dateOfBirth: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, { message: 'Choose a complete birth date.' })
    .refine((value) => isValidIsoDateOnly(value), {
      message: 'That date is not valid.',
    })
    .refine((value) => {
      const dt = DateTime.fromISO(value);
      const currentYear = currentCalendarYear();
      return dt.year >= 1900 && dt.year <= currentYear;
    }, {
      message: 'Birth year must be between 1900 and this year.',
    })
    .refine((value) => isIsoCalendarDateOnOrBeforeToday(value), {
      message: 'Birth date cannot be in the future.',
    }),
  timeOfBirth: z
    .string()
    .trim()
    .min(1, { message: 'Enter your time of birth.' })
    .refine((value) => isValidWallClockTimeHm(value), {
      message: 'Use a valid birth time (hours and minutes).',
    }),
  birthCity: z
    .string()
    .trim()
    .min(2, {
      message:
        'Enter a city (and region or country if helpful), at least 2 characters.',
    })
    .max(160, { message: 'Location must be at most 160 characters.' }),
});

export type SunMoonRisingFormValues = z.infer<typeof sunMoonRisingFormSchema>;
