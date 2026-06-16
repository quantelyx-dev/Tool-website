"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { SentConfirmation } from "@/components/contact/sent-confirmation";
import { ApiError } from "@/lib/http";
import {
  submitContactForm,
  type ContactApiFailureBody,
} from "@/lib/contact/api";
import {
  fadeUpVariants,
  staggerContainerVariants,
} from "@/lib/motion-variants";
import {
  contactFormSchema,
  type ContactFormValues,
} from "@/lib/schemas/contact-schema";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, useReducedMotion } from "framer-motion";
import { Loader2Icon, SendIcon } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

type ContactFormProps = {
  className?: string;
};

const CONTACT_RATE_LIMIT_TOAST = {
  title: "Daily message limit reached",
  description:
    "Thank you for reaching out. You have already sent the maximum of three messages allowed within a 24-hour period. Please wait until a full day has passed before trying again.",
} as const;

export function ContactForm({ className }: ContactFormProps) {
  const reducedMotion = useReducedMotion();
  const [sent, setSent] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const abortRef = useRef<AbortController | null>(null);

  useEffect(() => {
    return () => abortRef.current?.abort();
  }, []);

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
    mode: "onBlur",
  });

  const onSubmit = useCallback(
    async (values: ContactFormValues) => {
      abortRef.current?.abort();

      const controller = new AbortController();
      abortRef.current = controller;

      form.clearErrors();
      setIsPending(true);

      try {
        await submitContactForm(values, { signal: controller.signal });
        setSent(true);
      } catch (err) {
        const aborted =
          (err instanceof DOMException || err instanceof Error) &&
          err.name === "AbortError";

        if (aborted) return;

        if (err instanceof ApiError) {
          const body = err.body as Partial<ContactApiFailureBody> | null;

          if (err.status === 429 || body?.code === "rate_limit") {
            toast.error(CONTACT_RATE_LIMIT_TOAST.title, {
              description: CONTACT_RATE_LIMIT_TOAST.description,
              duration: 16_000,
            });
            return;
          }

          let mappedField = false;

          if (body?.fieldErrors) {
            for (const key of [
              "name",
              "email",
              "subject",
              "message",
            ] as const) {
              const msgs = body.fieldErrors[key];
              if (msgs?.[0]) {
                form.setError(key, { message: msgs[0] });
                mappedField = true;
              }
            }
          }

          if (!mappedField) {
            form.setError("root", {
              message:
                typeof body?.error === "string"
                  ? body.error
                  : "Something went wrong. Please try again.",
            });
          }
        } else {
          form.setError("root", {
            message: "Something went wrong. Please try again.",
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
      initial="hidden"
      animate="visible"
      variants={fadeUpVariants(reducedMotion)}
    >
      <Card
        className={cn(
          "overflow-hidden shadow-sm ring-1 ring-border/80",
          "transition-shadow duration-300 hover:shadow-md",
        )}
      >
        <CardHeader className="border-b border-border/80 bg-muted/30 pb-6">
          <CardTitle className="font-heading text-lg sm:text-xl">
            Send us a message
          </CardTitle>
          <CardDescription className="text-pretty">
            Have a question, suggestion, or just want to say hello? Fill out the
            form below and we&apos;ll get back to you.
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-8">
          {sent ? (
            <SentConfirmation
              reducedMotion={reducedMotion}
              onReset={handleSendAnother}
            />
          ) : (
            <Form {...form}>
              <form
                onSubmit={handleSubmit}
                className={cn("flex flex-col gap-6")}
                noValidate
              >
                <motion.div
                  className={cn("flex flex-col gap-6")}
                  variants={staggerContainerVariants(reducedMotion, 0.06)}
                  initial="hidden"
                  animate="visible"
                >
                  <motion.div variants={fadeUpVariants(reducedMotion)}>
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Name</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Alex Rivera"
                              autoComplete="name"
                              disabled={isPending}
                              {...field}
                            />
                          </FormControl>
                          <FormDescription>
                            How we&apos;ll address you in our reply.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </motion.div>

                  <motion.div variants={fadeUpVariants(reducedMotion)}>
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input
                              type="email"
                              inputMode="email"
                              placeholder="you@company.com"
                              autoComplete="email"
                              disabled={isPending}
                              {...field}
                            />
                          </FormControl>
                          <FormDescription>
                            We&apos;ll reply to this address.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </motion.div>

                  <motion.div variants={fadeUpVariants(reducedMotion)}>
                    <FormField
                      control={form.control}
                      name="subject"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Subject</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="e.g. Question about a tool, Feedback"
                              disabled={isPending}
                              {...field}
                            />
                          </FormControl>
                          <FormDescription>
                            A short summary of your message.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </motion.div>

                  <motion.div variants={fadeUpVariants(reducedMotion)}>
                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Message</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Tell us what's on your mind…"
                              className={cn("min-h-40 resize-y sm:min-h-42")}
                              disabled={isPending}
                              {...field}
                            />
                          </FormControl>
                          <FormDescription>
                            Minimum 20 characters. Max 4,000.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </motion.div>

                  <motion.div variants={fadeUpVariants(reducedMotion)}>
                    {form.formState.errors.root ? (
                      <p
                        role="alert"
                        className={cn("text-sm font-medium text-destructive")}
                      >
                        {form.formState.errors.root.message}
                      </p>
                    ) : null}
                    <Button
                      type="submit"
                      className={cn("w-full gap-2 sm:w-auto sm:min-w-40")}
                      disabled={isPending}
                    >
                      {isPending ? (
                        <>
                          <Loader2Icon
                            className={cn("size-4 animate-spin")}
                            aria-hidden
                          />
                          Sending…
                        </>
                      ) : (
                        <>
                          <SendIcon className={cn("size-4")} aria-hidden />
                          Send message
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
