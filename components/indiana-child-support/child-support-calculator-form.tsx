'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import { useFieldArray, useForm, useWatch } from 'react-hook-form';

import { ChildSupportChildrenSection } from '@/components/indiana-child-support/child-support-children-section';
import { ChildSupportIncomeSection } from '@/components/indiana-child-support/child-support-income-section';
import { ChildSupportResultsPanel } from '@/components/indiana-child-support/child-support-results-panel';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { Separator } from '@/components/ui/separator';
import type { IndianaChildSupportComputationResult } from '@/lib/indiana-child-support/compute-child-support';
import { CHILD_SUPPORT_FORM_DEFAULTS } from '@/lib/indiana-child-support/form-defaults';
import { roundShare } from '@/lib/indiana-child-support/form-helpers';
import {
  calculateChildSupport,
  transformFormData,
} from '@/lib/indiana-child-support/form-to-calculation';
import guidelineSchedule from '@/lib/indiana-child-support/schedule.json';
import type { GuidelineScheduleRow } from '@/lib/indiana-child-support/types';
import {
  childSupportCalculatorFormSchema,
  type ChildSupportFormValues,
} from '@/lib/schemas/indiana-child-support-schema';
import { cn } from '@/lib/utils';

const guidelineScheduleRows =
  guidelineSchedule as unknown as GuidelineScheduleRow[];

type ChildSupportCalculatorFormProps = {
  className?: string;
};

export function ChildSupportCalculatorForm({
  className,
}: ChildSupportCalculatorFormProps) {
  const [submission, setSubmission] = useState<{
    result: IndianaChildSupportComputationResult;
    form: ChildSupportFormValues;
  } | null>(null);

  const form = useForm<ChildSupportFormValues>({
    resolver: zodResolver(childSupportCalculatorFormSchema),
    defaultValues: CHILD_SUPPORT_FORM_DEFAULTS,
    mode: 'onChange',
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'children',
  });

  const watchedChildren = useWatch({ control: form.control, name: 'children' });

  useEffect(() => {
    void form.trigger();
  }, [form]);

  const setSharePair = (
    index: number,
    primary: 'parentOne' | 'parentTwo',
    value: number,
  ) => {
    const clamped = Math.min(100, Math.max(0, value));
    const rounded = roundShare(clamped);
    const complement = roundShare(100 - rounded);

    if (primary === 'parentOne') {
      form.setValue(`children.${index}.parentOneTime`, rounded, {
        shouldValidate: true,
        shouldDirty: true,
      });
      form.setValue(`children.${index}.parentTwoTime`, complement, {
        shouldValidate: true,
        shouldDirty: true,
      });
    } else {
      form.setValue(`children.${index}.parentTwoTime`, rounded, {
        shouldValidate: true,
        shouldDirty: true,
      });
      form.setValue(`children.${index}.parentOneTime`, complement, {
        shouldValidate: true,
        shouldDirty: true,
      });
    }
  };

  function handleSubmit(values: ChildSupportFormValues) {
    const normalized = transformFormData(values);
    const computed = calculateChildSupport(normalized, guidelineScheduleRows);
    setSubmission({ result: computed, form: values });
  }

  const submitDisabled = !form.formState.isValid || form.formState.isSubmitting;

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className={cn('mx-auto flex max-w-4xl flex-col gap-10', className)}
        noValidate>
        <ChildSupportIncomeSection
          control={form.control}
          errors={form.formState.errors}
        />

        <Separator />

        <ChildSupportChildrenSection
          control={form.control}
          fields={fields}
          watchedChildren={watchedChildren}
          append={append}
          remove={remove}
          onSetSharePair={setSharePair}
          getValues={form.getValues}
        />

        <div className='flex flex-col items-center gap-6 pb-2'>
          <Button
            type='submit'
            size='lg'
            className='min-w-[min(100%,280px)] shadow-md'
            disabled={submitDisabled}>
            Calculate Child Support
          </Button>

          {submission ? (
            <ChildSupportResultsPanel
              result={submission.result}
              formData={submission.form}
              className='w-full'
            />
          ) : null}
        </div>
      </form>
    </Form>
  );
}
