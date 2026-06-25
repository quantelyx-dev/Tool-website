import { callout, h2, h3, ol, p, toolCta, ul } from "@/lib/blogs/post-helpers";
import type { BlogPost } from "@/lib/blogs/types";
import { childSupportFaqs } from "@/lib/tool-faqs";

export const indianaChildSupportPost: BlogPost = {
  slug: "indiana-child-support-calculator-guide",
  title: "Indiana Child Support Calculator Guide (2026)",
  excerpt:
    "Understand Indiana's Income Shares Model, parenting time credits, and weekly gross income inputs. Estimate child support before consulting an attorney.",
  keywords: [
    "indiana child support calculator",
    "IN child support calculator",
    "indiana child support 2026",
    "income shares model indiana",
    "indiana parenting time credit",
  ],
  toolLink: "/tools/indiana-child-support-calculator",
  toolName: "Indiana Child support calculator",
  publishedAt: "2026-06-10",
  updatedAt: "2026-06-25",
  readTimeMinutes: 13,
  relatedSlugs: [
    "daily-compound-interest-calculator-guide",
    "sun-moon-rising-sign-calculator-guide",
    "fake-address-generator-guide",
  ],
  sections: [
    p(
      "Child support in Indiana follows the Income Shares Model — a method that calculates support based on what parents would have spent on children if the household had stayed together, proportional to each parent's income. Whether you are preparing for mediation, comparing scenarios before hiring an attorney, or simply trying to understand a proposed order, an Indiana child support calculator translates weekly gross incomes and parenting time into an estimated obligation.",
    ),
    p(
      "This guide explains how Indiana calculates child support, what inputs you need, how parenting time credits adjust payments, and important limitations — this is an educational tool, not legal advice or an official state calculator.",
    ),
    h2("How Indiana calculates child support"),
    p(
      "Indiana Child Support Guidelines use combined weekly adjusted gross income to look up a base support obligation from state schedules. Each parent's share is proportional to their percentage of that combined income. Adjustments apply for parenting time, childcare costs, health insurance premiums, and other ordered expenses. The result is a guideline amount courts typically start from — though judges may deviate with documented reasons.",
    ),
    ul([
      "Combined weekly gross income of both parents",
      "Number of children covered by the order",
      "Each parent's annual overnight parenting time",
      "Work-related childcare costs",
      "Children's health insurance premiums paid by each parent",
      "Other court-ordered child-related expenses",
    ]),
    toolCta(),
    h2("The Income Shares Model explained"),
    p(
      "Before Income Shares, many states used percentage-of-obligor models that ignored the custodial parent's income. Indiana's model recognizes that both parents contribute financially to raising children. Higher earners pay a larger share; lower earners pay less. The model aims for equitable distribution relative to earning capacity, not equal dollar amounts regardless of income disparity.",
    ),
    h3("Gross vs net income"),
    p(
      "Indiana guidelines typically use weekly gross income — before taxes and most deductions — though certain pre-tax items and adjustments may apply in specific cases. Self-employed parents may need to normalize business income. Calculators ask for gross figures to match worksheet conventions; consult an attorney if your income includes bonuses, commissions, or irregular self-employment revenue.",
    ),
    h2("Parenting time credit"),
    p(
      "Indiana awards a parenting time credit when the noncustodial parent exercises substantial overnights. More overnights mean a larger credit, reducing net support owed — reflecting that the parent incurs direct child-rearing costs during their time. Accurate overnight counts matter; estimates skew results. Track overnights across school years, holidays, and summer blocks for realistic inputs.",
    ),
    callout(
      "This calculator provides estimates for planning only. It is not affiliated with the State of Indiana, Indiana Child Support Bureau, or any court. Final orders are determined by judges and may differ from guideline calculations.",
    ),
    h2("Information to gather before calculating"),
    ol([
      "Recent pay stubs showing weekly gross wages for both parents",
      "Documentation of self-employment income if applicable",
      "Count of overnights per parent per year under expected or current schedule",
      "Receipts or estimates for work-related childcare",
      "Health insurance premium amounts attributable to covered children",
      "Existing court orders affecting support or custody",
    ]),
    toolCta(),
    h2("Common scenarios"),
    h3("Mediation preparation"),
    p(
      "Run multiple scenarios — different overnight splits, income changes after job transitions — to enter mediation with realistic ranges rather than single-point expectations. Understanding the worksheet builds productive negotiation.",
    ),
    h3("Modification reviews"),
    p(
      "Indiana allows support modifications when circumstances change substantially. Recalculate when either parent's income shifts significantly, parenting time orders update, or childcare costs change.",
    ),
    h3("Multi-child households"),
    p(
      "Support schedules increase with additional children but not linearly — marginal obligation per child typically decreases. Enter the correct child count; do not run separate one-child calculations and multiply.",
    ),
    h2("What calculators cannot do"),
    p(
      "Judges may deviate from guidelines for high-income cases, special needs expenses, educational costs, or agreed-upon settlements. Calculators do not capture every statutory adjustment, imputation of income for voluntarily unemployed parents, or multi-state jurisdictional issues. Always verify results with a licensed Indiana family law attorney before relying on them in legal proceedings.",
    ),
    h2("Indiana Child Support Bureau resources"),
    p(
      "The Indiana Child Support Bureau administers collection and enforcement. Official forms and worksheets exist on state websites — use them alongside independent calculators to cross-check. Payment processing, wage garnishment, and interstate cases involve bureau procedures beyond any online estimator.",
    ),
    h2("Free Indiana child support calculator"),
    p(
      "Enter parental incomes, parenting time, and child count to estimate guideline support. Free, instant, no sign-up — a starting point for informed conversations with legal professionals.",
    ),
  ],
  faqs: childSupportFaqs,
};
