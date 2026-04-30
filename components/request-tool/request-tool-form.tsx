'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { motion, useReducedMotion } from 'framer-motion';
import { Loader2Icon, SendIcon } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
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
import {
  requestToolFormSchema,
  type RequestToolFormValues,
} from '@/lib/schemas/request-tool-schema';
import { cn } from '@/lib/utils';
import {
  fadeUpVariants,
  staggerContainerVariants,
} from '@/lib/motion-variants';

type RequestToolFormProps = {
  className?: string;
};

export function RequestToolForm({ className }: RequestToolFormProps) {
  const reducedMotion = useReducedMotion();
  const [sent, setSent] = useState(false);
  const [isPending, setIsPending] = useState(false);

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

  async function onSubmit(values: RequestToolFormValues) {
    setIsPending(true);
    await new Promise(r => setTimeout(r, 650));
    setIsPending(false);
    setSent(true);
    void values;
  }

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
                onSubmit={form.handleSubmit(onSubmit)}
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
