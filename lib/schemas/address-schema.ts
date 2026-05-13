import { z } from 'zod';

export const ADDRESS_MODE_OPTIONS = ['single', 'bulk'] as const;
export const ADDRESS_BULK_COUNT_OPTIONS = ['10', '50', '100', '200'] as const;

export const addressFormSchema = z
  .object({
    mode: z.enum(ADDRESS_MODE_OPTIONS, {
      error: 'Please select a valid mode.',
    }),
    bulkCount: z.enum(ADDRESS_BULK_COUNT_OPTIONS).optional(),
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
