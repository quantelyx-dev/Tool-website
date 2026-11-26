import { callout, h2, h3, ol, p, toolCta, ul } from "@/lib/blogs/post-helpers";
import type { BlogPost } from "@/lib/blogs/types";
import { childSupportFaqs } from "@/lib/tool-faqs";

export const indianaChildSupportPost: BlogPost = {
  slug: "indiana-child-support-calculator-guide",
  title: "Indiana Child Support Calculator Guide",
  excerpt:
    "How Indiana child support is worked out: weekly gross income, the guideline schedule, income shares, and the parenting time credit, with a worked example.",
  keywords: [
    "indiana child support calculator",
    "IN child support calculator",
    "indiana child support 2026",
    "income shares model indiana",
    "indiana parenting time credit",
    "indiana alimony calculator",
    "indiana spousal support calculator",
    "child support worksheet indiana",
  ],
  toolLink: "/tools/indiana-child-support-calculator",
  toolName: "Indiana child support calculator",
  publishedAt: "2026-06-10",
  updatedAt: "2026-11-26",
  readTimeMinutes: 6,
  relatedSlugs: [
    "us-paycheck-calculator-guide",
    "daily-compound-interest-calculator-guide",
  ],
  sections: [
    p(
      "Indiana calculates child support with the Income Shares Model. The idea is that children should receive the same share of their parents’ income that they would have received if the parents lived together. The Indiana Supreme Court’s Child Support Guidelines turn that idea into a worksheet.",
    ),
    p(
      "This guide walks through the worksheet under the Guidelines updated May 14, 2024. It is general information, not legal advice. Check the current official Guidelines before relying on any figure.",
    ),
    h2("Step 1: weekly gross income"),
    p(
      "Indiana starts from weekly gross income, before taxes, not take-home pay. It covers wages, salary, commissions, bonuses, overtime, and many other sources. A court may use potential income for a parent who is unemployed or underemployed. Means-tested public assistance is among the exclusions.",
    ),
    h2("Step 2: weekly adjusted income"),
    ul([
      "A deduction for children born or adopted after those in the order: 6.5% of gross income for one child, 9.7% for two, up to 17.3% for eight",
      "Court-ordered support for prior-born children",
      "Support actually paid for prior-born children where there is no order",
      "Spousal maintenance or alimony paid under a court order",
    ]),
    p(
      "Adding both parents’ adjusted incomes gives combined weekly adjusted income. Each parent’s percentage share is their adjusted income divided by that combined figure.",
    ),
    toolCta(),
    h2("Step 3: the guideline schedule"),
    p(
      "The Guideline Schedules for Weekly Support Payments list a basic obligation by combined income and number of children. When income falls between two listed amounts, the nearest amount is used. Above $9,200 a week, the schedule uses a percentage of combined income instead, from 8.1% for one child to 20.4% for eight. Below $100 a week, the court decides case by case.",
    ),
    h2("Step 4: additions and shares"),
    p(
      "Work-related child care and the weekly cost of the children’s health insurance premiums are added to the basic obligation. The total is then multiplied by each parent’s percentage share. The paying parent receives credit for the child care and premiums they pay themselves.",
    ),
    h2("Step 5: parenting time credit"),
    p(
      "The Parenting Time Table begins at 52 overnights a year. For each band of overnights it gives a total factor and a duplicated-expense factor. The credit is the basic obligation times the total factor, minus the paying parent’s income share of the duplicated amount. Equal time is 181 to 183 overnights. In that case the court names one parent to pay controlled expenses, such as school costs and clothing, and the other parent receives the credit.",
    ),
    p(
      "When children have different overnight counts, the Guidelines work out the credit for each different count and average those amounts.",
    ),
    h2("Worked example"),
    ol([
      "Parent One earns $1,000 a week and Parent Two earns $800, for $1,800 combined.",
      "Parent One’s share is 55.56%. Parent One pays and has both children 98 overnights a year.",
      "The schedule shows $390 for two children, so Parent One’s share is $216.68.",
      "At 98 overnights the factors are 0.253 and 0.158. That gives $98.67 in total expenses and $61.62 duplicated.",
      "Parent One’s share of the duplicated amount is $34.24, so the credit is $64.43.",
      "The recommended obligation is $216.68 minus $64.43, or $152.25 a week.",
    ]),
    callout(
      "If the paying parent’s adjustments are larger than their share, the result becomes negative and the payment runs the other way. This is most likely with near-equal time when the paying parent earns much less.",
    ),
    toolCta(),
    h2("What the calculator does not cover"),
    ul([
      "The Post-Secondary Education Worksheet",
      "Split custody, where each parent has custody of different children",
      "Credits for Social Security benefits",
      "Uninsured health care and extraordinary expenses",
      "Estimating potential income",
    ]),
    p(
      "A judge may also deviate from the guideline amount with written reasons, and the Guidelines are reviewed periodically.",
    ),
    h3("Official sources"),
    p(
      "Read the Indiana Child Support Rules and Guidelines on the Indiana Judicial Branch website, along with the Guideline Schedules for Weekly Support Payments (in.gov/courts/files/schedule.pdf) and the Child Support Obligation Worksheet (in.gov/judiciary/files/csow.pdf).",
    ),
    h2("Indiana alimony and spousal support"),
    p(
      "The child support worksheet does not calculate spousal maintenance, and Indiana Code 31-15-7-2 provides no schedule or formula for it. A court may order maintenance only in limited situations, such as physical or mental incapacity, caring for a child with a disability, or rehabilitative maintenance for up to three years. Ask a licensed Indiana family law attorney how these apply to you.",
    ),
  ],
  faqs: childSupportFaqs,
};
