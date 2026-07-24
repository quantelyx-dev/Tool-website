import { z } from 'zod';

export const IP_VERSION_OPTIONS = ['v4', 'v6'] as const;
export const IP_MODE_OPTIONS = ['single', 'bulk'] as const;
export const IP_BULK_COUNT_OPTIONS = ['10', '50', '100', '200'] as const;

export const ipGeneratorFormSchema = z
  .object({
    version: z.enum(IP_VERSION_OPTIONS, {
      error: 'Please select a valid IP version.',
    }),
    mode: z.enum(IP_MODE_OPTIONS, {
      error: 'Please select a valid mode.',
    }),
    bulkCount: z.enum(IP_BULK_COUNT_OPTIONS).optional(),
  })
  .superRefine((value, context) => {
    if (value.mode === 'bulk' && !value.bulkCount) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['bulkCount'],
        message: 'Please select a count for bulk mode.',
      });
    }
  });
