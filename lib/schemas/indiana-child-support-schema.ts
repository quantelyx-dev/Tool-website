import { z } from "zod";

import {
  MAX_CHILDREN,
  MAX_PAYOR_OVERNIGHTS,
} from "@/lib/indiana-child-support/guideline-constants";

export const INCOME_INTERVAL_VALUES = [
  "weekly",
  "bi-weekly",
  "semi-monthly",
  "monthly",
  "annual",
] as const;

export type IncomeInterval = (typeof INCOME_INTERVAL_VALUES)[number];

export const PARENT_IDS = ["parentOne", "parentTwo"] as const;

const weeklyAmount = (label: string) =>
  z
    .number({ message: `Enter ${label}, or 0.` })
    .min(0, { message: "Cannot be negative." });

const parentSchema = z.object({
  incomeInterval: z.enum(INCOME_INTERVAL_VALUES, {
    message: "Choose an income interval.",
  }),
  grossIncome: weeklyAmount("gross income"),
  subsequentChildren: z
    .number({ message: "Enter a number of children, or 0." })
    .int({ message: "Use a whole number." })
    .min(0, { message: "Cannot be negative." })
    .max(MAX_CHILDREN, { message: `Cannot exceed ${MAX_CHILDREN}.` }),
  priorBornOrderedSupport: weeklyAmount("the weekly amount"),
  priorBornSupportWithoutOrder: weeklyAmount("the weekly amount"),
  maintenancePaid: weeklyAmount("the weekly amount"),
  childCare: weeklyAmount("the weekly amount"),
  healthInsurance: weeklyAmount("the weekly amount"),
});

const childRowSchema = z.object({
  payorOvernights: z
    .number({ message: "Enter annual overnights." })
    .int({ message: "Use a whole number of overnights." })
    .min(0, { message: "Cannot be negative." })
    .max(MAX_PAYOR_OVERNIGHTS, {
      message: `The paying parent has at most ${MAX_PAYOR_OVERNIGHTS}. If they have more, choose the other parent as payer.`,
    }),
});

export const childSupportCalculatorFormSchema = z
  .object({
    parentOne: parentSchema,
    parentTwo: parentSchema,
    payor: z.enum(PARENT_IDS, { message: "Choose the paying parent." }),
    children: z
      .array(childRowSchema)
      .min(1, { message: "Add at least one child." })
      .max(MAX_CHILDREN, {
        message: `The schedule covers up to ${MAX_CHILDREN} children.`,
      }),
  })
  .superRefine((values, ctx) => {
    if (values.parentOne.grossIncome + values.parentTwo.grossIncome <= 0) {
      ctx.addIssue({
        code: "custom",
        message: "Enter income for at least one parent.",
        path: ["parentTwo", "grossIncome"],
      });
    }
  });

export type ChildSupportFormValues = z.infer<
  typeof childSupportCalculatorFormSchema
>;
export type ChildSupportParentValues = z.infer<typeof parentSchema>;
