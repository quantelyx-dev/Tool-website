import { z } from 'zod';

export const contactFormSchema = z.object({
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
  subject: z
    .string()
    .trim()
    .min(2, { message: 'Please enter a subject (at least 2 characters).' })
    .max(150, { message: 'Subject must be at most 150 characters.' }),
  message: z
    .string()
    .trim()
    .min(20, {
      message: 'Please write at least 20 characters so we can understand your message.',
    })
    .max(4000, { message: 'Message must be at most 4000 characters.' }),
});

export type ContactFormValues = z.infer<typeof contactFormSchema>;
