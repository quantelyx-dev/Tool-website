import { z } from "zod";

export const INCOME_INTERVAL_VALUES = [
  "weekly",
  "bi-weekly",
  "semi-monthly",
  "monthly",
  "annual",
] as const;

export type IncomeInterval = (typeof INCOME_INTERVAL_VALUES)[number];

const shareTolerance = 0.015;

const childRowSchema = z
  .object({
    parentOneManual: z.boolean(),
    parentOneTime: z
      .number({ message: "Enter parenting time for Parent One." })
      .min(0, { message: "Cannot be negative." })
      .max(100, { message: "Cannot exceed 100%." }),
    parentTwoManual: z.boolean(),
    parentTwoTime: z
      .number({ message: "Enter parenting time for Parent Two." })
      .min(0, { message: "Cannot be negative." })
      .max(100, { message: "Cannot exceed 100%." }),
  })
  .superRefine((row, ctx) => {
    const sum = row.parentOneTime + row.parentTwoTime;
    if (Math.abs(sum - 100) > shareTolerance) {
      ctx.addIssue({
        code: "custom",
        message: "Parent time shares must add up to 100%.",
        path: ["parentTwoTime"],
      });
    }
  });

export const childSupportCalculatorFormSchema = z.object({
  parentOneIncomeInterval: z.enum(INCOME_INTERVAL_VALUES, {
    message: "Choose an income interval for Parent One.",
  }),
  parentOneNetIncome: z
    .number({ message: "Enter net income for Parent One." })
    .positive({ message: "Net income must be greater than zero." }),
  parentTwoIncomeInterval: z.enum(INCOME_INTERVAL_VALUES, {
    message: "Choose an income interval for Parent Two.",
  }),
  parentTwoNetIncome: z
    .number({ message: "Enter net income for Parent Two." })
    .positive({ message: "Net income must be greater than zero." }),
  children: z
    .array(childRowSchema)
    .min(1, { message: "Add at least one child." }),
});

export type ChildSupportFormValues = z.infer<
  typeof childSupportCalculatorFormSchema
>;
export type ChildSupportChildRowValues = z.infer<typeof childRowSchema>;
