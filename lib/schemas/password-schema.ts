import { z } from 'zod';

export const PASSWORD_MODE_OPTIONS = ['single', 'bulk'] as const;
export const PASSWORD_BULK_COUNT_OPTIONS = ['10', '20', '50', '100'] as const;

export const passwordFormSchema = z
  .object({
    mode: z.enum(PASSWORD_MODE_OPTIONS, {
      error: 'Please select a valid mode.',
    }),
    bulkCount: z.enum(PASSWORD_BULK_COUNT_OPTIONS).optional(),
    length: z.number().int().min(8).max(64),
    includeUppercase: z.boolean(),
    includeLowercase: z.boolean(),
    includeNumbers: z.boolean(),
    includeSymbols: z.boolean(),
  })
  .superRefine((value, context) => {
    if (value.mode === 'bulk' && !value.bulkCount) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['bulkCount'],
        message: 'Please select a count for bulk mode.',
      });
    }

    if (
      !value.includeUppercase &&
      !value.includeLowercase &&
      !value.includeNumbers &&
      !value.includeSymbols
    ) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['charsets'],
        message: 'Select at least one character type.',
      });
    }
  });
