import { z } from 'zod';

export const requestToolFormSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, { message: 'Please enter your name (at least 2 characters).' })
    .max(100, { message: 'Name must be at most 100 characters.' }),
  email: z
    .string()
    .trim()
    .email({ message: 'Enter a valid email address.' })
    .max(254, { message: 'Email is too long.' }),
  toolName: z
    .string()
    .trim()
    .min(2, {
      message: 'Give the tool a short working title (at least 2 characters).',
    })
    .max(120, { message: 'Tool title must be at most 120 characters.' }),
  message: z
    .string()
    .trim()
    .min(30, {
      message:
        'Describe what you need in at least 30 characters so we can understand it.',
    })
    .max(4000, { message: 'Message must be at most 4000 characters.' }),
});

export type RequestToolFormValues = z.infer<typeof requestToolFormSchema>;
