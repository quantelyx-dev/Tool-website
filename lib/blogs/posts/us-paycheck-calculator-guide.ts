import { callout, h2, h3, ol, p, toolCta, ul } from "@/lib/blogs/post-helpers";
import type { BlogPost } from "@/lib/blogs/types";
import { paycheckCalculatorFaqs } from "@/lib/tool-faqs";

export const usPaycheckCalculatorPost: BlogPost = {
  slug: "us-paycheck-calculator-guide",
  title: "US Paycheck Calculator Guide: How Take-Home Pay Works (2026)",
  excerpt:
    "See exactly how gross pay becomes take-home pay in 2026: federal income tax, Social Security, Medicare, state tax, 401(k), and other deductions explained with a free paycheck calculator.",
  keywords: [
    "us paycheck calculator",
    "paycheck calculator 2026",
    "take home pay calculator",
    "salary after tax calculator",
    "hourly paycheck calculator",
    "federal withholding 2026",
    "paycheck calculator by state",
    "net pay calculator",
  ],
  toolLink: "/tools/us-paycheck-calculator",
  toolName: "US paycheck calculator",
  publishedAt: "2026-10-25",
  updatedAt: "2026-10-25",
  readTimeMinutes: 11,
  relatedSlugs: [
    "daily-compound-interest-calculator-guide",
    "indiana-child-support-calculator-guide",
    "fake-ssn-generator-for-testing-guide",
  ],
  sections: [
    p(
      "Your offer letter says $75,000 a year, but your bank account tells a different story. The gap between gross pay and take-home pay is where federal income tax, Social Security, Medicare, state tax, and benefit deductions live. A US paycheck calculator shows that gap before your first pay stub does, so you can compare job offers, plan a budget, or decide how much to put into a 401(k).",
    ),
    p(
      "This guide walks through every step of the calculation using 2026 rules, explains what each line on your pay stub means, and shows how to get a reliable estimate for salaried and hourly work in any US state.",
    ),
    h2("How gross pay becomes take-home pay"),
    p(
      "Every paycheck follows the same order of operations. Knowing the order explains why a $100 pre-tax deduction costs you less than $100 in take-home pay, while a post-tax deduction costs you the full amount.",
    ),
    ol([
      "Start with gross pay for the pay period (salary divided by pay periods, or hours times rate).",
      "Subtract pre-tax deductions such as traditional 401(k), health insurance premiums, HSA, and FSA contributions.",
      "Calculate Social Security and Medicare on wages after Section 125 benefits.",
      "Calculate federal income tax withholding on wages after the standard deduction and your W-4 choices.",
      "Calculate state (and sometimes local) income tax.",
      "Subtract post-tax deductions such as Roth 401(k) contributions or union dues.",
      "What remains is your net pay, the amount deposited into your account.",
    ]),
    toolCta(),
    h2("Federal income tax in 2026"),
    p(
      "The United States uses progressive brackets: only the income inside each bracket is taxed at that bracket's rate. A single filer's first $12,400 of taxable income is taxed at 10%, income from $12,401 to $50,400 at 12%, and so on up to 37% above $640,600. Married couples filing jointly have brackets roughly twice as wide.",
    ),
    h3("The standard deduction"),
    p(
      "Before brackets apply, the standard deduction removes a slice of income from tax entirely. For 2026 it is $16,100 for single filers, $32,200 for married couples filing jointly, and $24,150 for heads of household. A single worker earning $75,000 therefore owes federal income tax on about $58,900, not the full $75,000.",
    ),
    h3("Your Form W-4"),
    p(
      "Your W-4 tells your employer how much to withhold. Claiming children under 17 reduces withholding by $2,200 each in 2026, and other dependents by $500 each. Step 4 lets you add other income, extra deductions, or a fixed extra amount per paycheck. If you owe tax every April, raising step 4(c) is the simplest fix.",
    ),
    h2("Social Security and Medicare (FICA)"),
    p(
      "FICA taxes fund Social Security and Medicare and apply to nearly every paycheck, regardless of your filing status or deductions on Form W-4.",
    ),
    ul([
      "Social Security: 6.2% of wages up to the 2026 wage base of $184,500 (a maximum of $11,439 per year).",
      "Medicare: 1.45% of all wages with no cap.",
      "Additional Medicare tax: an extra 0.9% on wages above $200,000, withheld by your employer.",
    ]),
    p(
      "Your employer pays a matching share of Social Security and Medicare on top of your wages, so you only see your half on the pay stub. Traditional 401(k) contributions do not reduce FICA wages, but health insurance, HSA, and FSA contributions made through your employer's cafeteria plan do.",
    ),
    h2("State and local income tax"),
    p(
      "State taxes create the biggest difference between two people with identical salaries. Nine states do not tax wages: Alaska, Florida, Nevada, New Hampshire, South Dakota, Tennessee, Texas, Washington, and Wyoming. Fourteen or so states use a single flat rate, and the rest use progressive brackets with top rates ranging from about 4% to more than 13%.",
    ),
    callout(
      "Local taxes matter too. Cities and counties in states such as Ohio, Pennsylvania, Maryland, and New York can add 1% to 4% on top of state tax. Enter that rate under the other state and local payroll tax field to get a closer estimate.",
    ),
    h3("State payroll programs"),
    p(
      "Several states fund disability insurance or paid family leave through small payroll deductions, including California, New Jersey, New York, and Washington. These appear as separate lines on your pay stub. They are usually a fraction of a percent of pay, and you can add them using the same other-tax field.",
    ),
    h2("Pre-tax and post-tax deductions"),
    h3("Traditional 401(k)"),
    p(
      "Traditional 401(k) contributions come out before federal and most state income tax, which lowers your tax bill today. In 2026 the employee limit is $24,500, or $32,500 if you are 50 or older. Pennsylvania and New Jersey are the notable exceptions: they still tax 401(k) contributions at the state level.",
    ),
    h3("Roth 401(k)"),
    p(
      "Roth contributions are taken after tax, so take-home pay drops by the full contribution. In exchange, qualified withdrawals in retirement are tax free. Traditional and Roth contributions share the same annual limit.",
    ),
    h3("Health insurance, HSA, and FSA"),
    p(
      "Premiums and contributions deducted through an employer cafeteria plan avoid both income tax and FICA. The 2026 HSA limit is $4,400 for self-only coverage and $8,750 for family coverage, and the health FSA limit is $3,400.",
    ),
    h2("Salary versus hourly paychecks"),
    p(
      "Salaried employees receive the same gross amount each period. Hourly employees earn rate times hours, and overtime hours are paid at 1.5 times the regular rate. Because withholding is calculated as if each paycheck repeated all year, a week with heavy overtime can be withheld at a higher rate than your true annual tax, which you recover when you file your return.",
    ),
    h2("Weekly, biweekly, semi-monthly, or monthly"),
    p(
      "Pay frequency changes the size of each check but not your annual take-home pay. Biweekly pay has 26 checks a year and weekly pay has 52, while semi-monthly pay has 24 and monthly pay has 12. If you are paid biweekly, two months each year contain three paychecks, which is a good opportunity to build savings.",
    ),
    toolCta(),
    h2("Ways to increase your take-home pay"),
    ul([
      "Review your W-4 so withholding matches your real tax situation instead of overpaying all year.",
      "Use an HSA or FSA for medical costs you already expect to pay.",
      "Contribute enough to your 401(k) to capture the full employer match before anything else.",
      "Claim every dependent credit you qualify for on your W-4.",
      "Compare job offers by net pay in your state, not just by gross salary.",
    ]),
    h2("Why your pay stub may differ from an estimate"),
    p(
      "No online calculator can see every detail of your payroll. Bonuses are often withheld at a flat 22% supplemental rate, employers may round differently, and local taxes, garnishments, or state credits can change the result. Treat the estimate as a planning tool, and rely on your pay stub for the exact numbers.",
    ),
    callout(
      "This calculator is for educational and planning purposes only. It is not tax, legal, or financial advice and is not affiliated with the IRS or any state agency. Consult a qualified tax professional for guidance on your situation.",
    ),
    h2("Free US paycheck calculator"),
    p(
      "Enter your salary or hourly rate, pay frequency, state, and deductions to see take-home pay per paycheck, weekly, monthly, and annually, along with a full tax breakdown. It is free, requires no sign-up, and runs entirely in your browser.",
    ),
  ],
  faqs: paycheckCalculatorFaqs,
};
