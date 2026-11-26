"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";

import { ChildSupportChildrenSection } from "@/components/indiana-child-support/child-support-children-section";
import { ChildSupportIncomeSection } from "@/components/indiana-child-support/child-support-income-section";
import { ChildSupportResultsPanel } from "@/components/indiana-child-support/child-support-results-panel";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Separator } from "@/components/ui/separator";
import type { IndianaChildSupportComputationResult } from "@/lib/indiana-child-support/compute-child-support";
import { CHILD_SUPPORT_FORM_DEFAULTS } from "@/lib/indiana-child-support/form-defaults";
import { calculateChildSupport } from "@/lib/indiana-child-support/form-to-calculation";
import guidelineSchedule from "@/lib/indiana-child-support/schedule.json";
import type { GuidelineScheduleRow } from "@/lib/indiana-child-support/types";
import {
  childSupportCalculatorFormSchema,
  type ChildSupportFormValues,
} from "@/lib/schemas/indiana-child-support-schema";
import { cn } from "@/lib/utils";
import { useAnalytics } from "@/hooks/use-analytics";

const guidelineScheduleRows =
  guidelineSchedule as unknown as GuidelineScheduleRow[];

type ChildSupportCalculatorFormProps = {
  className?: string;
};

export function ChildSupportCalculatorForm({
  className,
}: ChildSupportCalculatorFormProps) {
  const { onUse, onResult, onReset } = useAnalytics("indiana-child-support");
  const [submission, setSubmission] = useState<{
    result: IndianaChildSupportComputationResult;
    form: ChildSupportFormValues;
  } | null>(null);

  const form = useForm<ChildSupportFormValues>({
    resolver: zodResolver(childSupportCalculatorFormSchema),
    defaultValues: CHILD_SUPPORT_FORM_DEFAULTS,
    mode: "onChange",
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "children",
  });

  function handleSubmit(values: ChildSupportFormValues) {
    onUse({ child_count: values.children.length });
    const computed = calculateChildSupport(values, guidelineScheduleRows);
    setSubmission({ result: computed, form: values });
    onResult({ child_count: values.children.length });
  }

  function handleReset() {
    onReset();
    form.reset(CHILD_SUPPORT_FORM_DEFAULTS);
    setSubmission(null);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className={cn("mx-auto flex max-w-4xl flex-col gap-10", className)}
        noValidate
      >
        <ChildSupportIncomeSection control={form.control} />

        <Separator />

        <ChildSupportChildrenSection
          control={form.control}
          fields={fields}
          append={append}
          remove={remove}
        />

        <div className="flex flex-col items-center gap-6 pb-2">
          <div className="flex flex-wrap justify-center gap-3">
            <Button
              type="submit"
              size="lg"
              className="min-w-[min(100%,280px)] shadow-md"
              disabled={form.formState.isSubmitting}
            >
              Calculate Child Support
            </Button>
            <Button type="button" size="lg" variant="outline" onClick={handleReset}>
              Reset
            </Button>
          </div>

          {submission ? (
            <ChildSupportResultsPanel
              result={submission.result}
              formData={submission.form}
              className="w-full"
            />
          ) : null}
        </div>
      </form>
    </Form>
  );
}
