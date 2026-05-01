'use client';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { ApiError } from '@/lib/http';
import {
  submitRequestToolForm,
  type RequestToolApiFailureBody,
} from '@/lib/request-tool/api';
import {
  fadeUpVariants,
  staggerContainerVariants,
} from '@/lib/motion-variants';
import {
  requestToolFormSchema,
  type RequestToolFormValues,
} from '@/lib/schemas/request-tool-schema';
import { cn } from '@/lib/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion, useReducedMotion } from 'framer-motion';
import { Loader2Icon, SendIcon } from 'lucide-react';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

type RequestToolFormProps = {
  className?: string;
};

const REQUEST_TOOL_RATE_LIMIT_TOAST = {
  title: 'Daily request limit reached',
  description:
    'Thank you for sharing your ideas with us. You have already sent the maximum of two tool requests allowed within a 24-hour period. To help our team review every message thoughtfully, we ask that you wait until a full day has passed since your earliest submission before trying again. We appreciate your understanding.',
} as const;

export function RequestToolForm({ className }: RequestToolFormProps) {
  const reducedMotion = useReducedMotion();
  const [sent, setSent] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const abortRef = useRef<AbortController | null>(null);

  useEffect(() => {
    return () => abortRef.current?.abort();
  }, []);

  const form = useForm<RequestToolFormValues>({
    resolver: zodResolver(requestToolFormSchema),
    defaultValues: {
      name: '',
      email: '',
      toolName: '',
      message: '',
    },
    mode: 'onBlur',
  });

  const onSubmit = useCallback(
    async (values: RequestToolFormValues) => {
      abortRef.current?.abort();

      const controller = new AbortController();
      abortRef.current = controller;

      form.clearErrors();
      setIsPending(true);

      try {
        await submitRequestToolForm(values, {
          signal: controller.signal,
        });

        setSent(true);
      } catch (err) {
        const aborted =
          (err instanceof DOMException || err instanceof Error) &&
          err.name === 'AbortError';

        if (aborted) {
          return;
        }

        if (err instanceof ApiError) {
          const body = err.body as Partial<RequestToolApiFailureBody> | null;

          if (err.status === 429 || body?.code === 'rate_limit') {
            toast.error(REQUEST_TOOL_RATE_LIMIT_TOAST.title, {
              description: REQUEST_TOOL_RATE_LIMIT_TOAST.description,
              duration: 16_000,
            });

            return;
          }

          let mappedField = false;

          if (body?.fieldErrors) {
            for (const key of [
              'name',
              'email',
              'toolName',
              'message',
            ] as const) {
              const msgs = body.fieldErrors[key];

              if (msgs?.[0]) {
                form.setError(key, {
                  message: msgs[0],
                });

                mappedField = true;
              }
            }
          }

          if (!mappedField) {
            form.setError('root', {
              message:
                typeof body?.error === 'string'
                  ? body.error
                  : 'Something went wrong. Please try again.',
            });
          }
        } else {
          form.setError('root', {
            message: 'Something went wrong. Please try again.',
          });
        }
      } finally {
        setIsPending(false);
      }
    },
    [form],
  );

  const handleSubmit = useCallback(
    (e: React.SubmitEvent<HTMLFormElement>) => {
      e.preventDefault();
      void form.handleSubmit(onSubmit)(e);
    },
    [form, onSubmit],
  );

  function handleSendAnother() {
    setSent(false);
    form.reset();
  }

  return (
    <motion.div
      className={cn(className)}
      initial='hidden'
      animate='visible'
      variants={fadeUpVariants(reducedMotion)}>
      <Card
        className={cn(
          'overflow-hidden shadow-sm ring-1 ring-border/80',
          'transition-shadow duration-300 hover:shadow-md',
        )}>
        <CardHeader className='border-b border-border/80 bg-muted/30 pb-6'>
          <CardTitle className='font-heading text-lg sm:text-xl'>
            Tell us what to build next
          </CardTitle>
          <CardDescription className='text-pretty'>
            Share as much detail as you like—use case, inputs and outputs,
            examples, or links. We read every request.
          </CardDescription>
        </CardHeader>
        <CardContent className='pt-8'>
          {sent ? (
            <SentConfirmation
              reducedMotion={reducedMotion}
              onReset={handleSendAnother}
            />
          ) : (
            <Form {...form}>
              <form
                onSubmit={handleSubmit}
                className={cn('flex flex-col gap-6')}
                noValidate>
                <motion.div
                  className={cn('flex flex-col gap-6')}
                  variants={staggerContainerVariants(reducedMotion, 0.06)}
                  initial='hidden'
                  animate='visible'>
                  <motion.div variants={fadeUpVariants(reducedMotion)}>
                    <FormField
                      control={form.control}
                      name='name'
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Name</FormLabel>
                          <FormControl>
                            <Input
                              placeholder='Alex Rivera'
                              autoComplete='name'
                              disabled={isPending}
                              {...field}
                            />
                          </FormControl>
                          <FormDescription>
                            How we&apos;ll address you if we follow up.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </motion.div>

                  <motion.div variants={fadeUpVariants(reducedMotion)}>
                    <FormField
                      control={form.control}
                      name='email'
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input
                              type='email'
                              inputMode='email'
                              placeholder='you@company.com'
                              autoComplete='email'
                              disabled={isPending}
                              {...field}
                            />
                          </FormControl>
                          <FormDescription>
                            We&apos;ll only use this to reply about your idea.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </motion.div>

                  <motion.div variants={fadeUpVariants(reducedMotion)}>
                    <FormField
                      control={form.control}
                      name='toolName'
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Requested tool</FormLabel>
                          <FormControl>
                            <Input
                              placeholder='e.g. JWT debugger, CSV ↔ JSON'
                              disabled={isPending}
                              {...field}
                            />
                          </FormControl>
                          <FormDescription>
                            A short title for the utility you have in mind.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </motion.div>

                  <motion.div variants={fadeUpVariants(reducedMotion)}>
                    <FormField
                      control={form.control}
                      name='message'
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Details</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder='What problem does this solve? Who is it for? Any must-have behavior or constraints?'
                              className={cn(
                                'min-h-[140px] resize-y sm:min-h-[168px]',
                              )}
                              disabled={isPending}
                              {...field}
                            />
                          </FormControl>
                          <FormDescription>
                            Minimum 30 characters. Max 4,000.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </motion.div>

                  <motion.div variants={fadeUpVariants(reducedMotion)}>
                    {form.formState.errors.root ? (
                      <p
                        role='alert'
                        className={cn('text-destructive text-sm font-medium')}>
                        {form.formState.errors.root.message}
                      </p>
                    ) : null}
                    <Button
                      type='submit'
                      className={cn('w-full gap-2 sm:w-auto sm:min-w-[160px]')}
                      disabled={isPending}>
                      {isPending ? (
                        <>
                          <Loader2Icon
                            className={cn('size-4 animate-spin')}
                            aria-hidden
                          />
                          Sending…
                        </>
                      ) : (
                        <>
                          <SendIcon className={cn('size-4')} aria-hidden />
                          Send request
                        </>
                      )}
                    </Button>
                  </motion.div>
                </motion.div>
              </form>
            </Form>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}

type SentConfirmationProps = {
  reducedMotion: boolean | null;
  onReset: () => void;
};

function SentConfirmation({ reducedMotion, onReset }: SentConfirmationProps) {
  return (
    <motion.div
      className={cn('flex flex-col gap-6')}
      initial={reducedMotion ? false : { opacity: 0, scale: 0.98 }}
      animate={reducedMotion ? {} : { opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}>
      <div
        className={cn(
          'rounded-xl border border-indigo-500/20 bg-gradient-to-br',
          'from-indigo-500/[0.07] to-transparent px-5 py-6 dark:from-indigo-500/12',
        )}>
        <p className={cn('font-heading text-lg font-semibold text-foreground')}>
          Thanks—we received your request.
        </p>
        <p className={cn('mt-2 text-sm leading-relaxed text-muted-foreground')}>
          Submissions are reviewed regularly. When we add something inspired by
          your idea, you may hear from us at the email you provided.
        </p>
      </div>
      <Button type='button' variant='outline' onClick={onReset}>
        Send another idea
      </Button>
    </motion.div>
  );
}
