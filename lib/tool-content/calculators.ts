import { INDIANA_SOURCES } from '@/lib/indiana-child-support/guideline-constants';
import type { ToolContent } from '@/lib/tool-content/types';

export const calculatorToolContent: ToolContent[] = [
  {
    link: '/tools/us-paycheck-calculator',
    disclaimer: 'estimate',
    about: [
      'This calculator estimates US take-home pay for 2026. You enter a salary or an hourly rate, a state, a filing status, and your deductions, and it shows how much of each paycheck goes to federal income tax, Social Security, Medicare, state income tax, retirement contributions, and benefits, and how much is left as net pay.',
    ],
    steps: [
      'Choose Salary or Hourly. For hourly pay, enter the rate, regular weekly hours, and any weekly overtime hours.',
      'Pick how often you are paid, your state, and your federal filing status.',
      'Add dependents, Form W-4 step 4 amounts, 401(k) percentages, and per-paycheck deductions if they apply.',
      'Read the breakdown, then switch between per-paycheck, weekly, monthly, and annual views or export it.',
    ],
    howItWorks: [
      'All figures are calculated annually and then divided into the period you view. The order matters because each tax uses a different wage base.',
    ],
    howItWorksList: [
      'Gross pay is the salary, or (rate × hours + 1.5 × rate × overtime hours) × 52.',
      'Health premiums, HSA, FSA, and other Section 125 deductions come out first. They lower both income tax and payroll tax wages.',
      'Social Security is 6.2% of those wages up to $184,500. Medicare is 1.45% with no cap, plus 0.9% above $200,000.',
      'Federal taxable income is gross pay minus traditional 401(k) and Section 125 amounts, plus W-4 other income, minus W-4 deductions and the standard deduction ($16,100 single, $32,200 married filing jointly, $24,150 head of household).',
      'The 2026 brackets apply, then $2,200 per qualifying child and $500 per other dependent are subtracted. Extra withholding is added last.',
      'State tax uses that state’s brackets, deductions, and credits. Roth 401(k) and other after-tax deductions come out at the end.',
    ],
    example: [
      'A single filer in Texas earns $75,000, is paid every two weeks, and has no other deductions. Federal taxable income is $75,000 − $16,100 = $58,900. Tax is $1,240 on the first $12,400, $4,560 on the next $38,000, and $1,870 on the last $8,500, for $7,670. Social Security is $4,650 and Medicare is $1,087.50. Texas has no wage income tax, so annual take-home pay is $61,592.50, or $2,368.94 per paycheck.',
      'With a 6% traditional 401(k) and a $100 health premium per paycheck, federal tax falls to $6,108 a year and each paycheck is $2,163.59.',
    ],
    limitations: [
      'This is an estimate, not your employer’s payroll. Results can differ because of exact W-4 entries, per-period rounding, supplemental rates on bonuses, state credits that are not modeled, and state disability or paid-leave deductions.',
      'City and county income taxes are not looked up. You can add a flat rate in the other state and local tax field. The calculator does not reduce the child and dependent credits above $200,000 of income ($400,000 for joint filers), where the IRS phases them out, and it uses the standard $32,500 limit for age 50 and over, not the higher catch-up for ages 60 to 63.',
    ],
    related: [
      '/tools/daily-compound-interest-calculator',
      '/tools/indiana-child-support-calculator',
    ],
    sources: [
      { label: 'IRS: federal income tax rates and brackets', href: 'https://www.irs.gov/filing/federal-income-tax-rates-and-brackets' },
      { label: 'Social Security Administration: contribution and benefit base', href: 'https://www.ssa.gov/oact/cola/cbb.html' },
    ],
  },
  {
    link: '/tools/daily-compound-interest-calculator',
    disclaimer: 'estimate',
    about: [
      'This calculator projects how a balance grows when interest is calculated every day. It handles a starting principal, an annual rate quoted as APR or APY, a timeline in years, months, and extra days, optional recurring deposits, and a choice between reinvesting interest or keeping it separate. Results include a growth chart and exportable reports.',
    ],
    steps: [
      'Enter the starting principal and choose the currency used to display amounts.',
      'Enter the annual rate and say whether it is a nominal (APR-style) or effective (APY) figure.',
      'Set the timeline. Add a contribution amount and frequency if you plan to keep depositing.',
      'Choose whether interest is reinvested, calculate, and export the results if you need them.',
    ],
    howItWorks: [
      'First the annual rate becomes a daily rate. For a nominal rate it is r ÷ 365. For an APY it is (1 + APY) raised to the power 1/365, minus 1, so that one full year returns exactly the APY.',
      'The calculator then simulates one day at a time. With reinvestment on, each day’s balance is multiplied by (1 + daily rate). A deposit due that day is added after interest, so it starts earning the next day. With reinvestment off, interest accrues only on principal and deposits and is totalled separately.',
      'Without deposits, the reinvested result matches the formula A = P × (1 + r/365)^d, where P is the principal, r the nominal annual rate as a decimal, and d the number of days.',
    ],
    howItWorksList: [
      'Deposit spacing is every 1, 7, 14, 30, or 90 days for daily, weekly, bi-weekly, monthly, and quarterly.',
      'In the timeline, a year counts as 365 days and a month as about 30 days.',
    ],
    example: [
      'Deposit $10,000 at a 5% nominal rate for 365 days. The daily rate is 0.05 ÷ 365, and the final balance is $10,512.67, so interest is $512.67. With reinvestment off, the same deposit earns $500.00.',
      'Add $200 every 30 days and there are 12 deposits in the year. Total money put in is $12,400, the final balance is $12,969.46, and interest is $569.46.',
    ],
    limitations: [
      'The rate is held constant for the whole period. Real savings rates change, and investments can lose value.',
      'Taxes, fees, inflation, and bank-specific rules such as 360-day years or minimum balances are not included. Because months are treated as about 30 days, long timelines and monthly deposits can differ slightly from a calendar-based bank statement. Changing the currency changes how amounts are shown, not the growth math.',
    ],
    related: ['/tools/us-paycheck-calculator', '/tools/indiana-child-support-calculator'],
  },
  {
    link: '/tools/indiana-child-support-calculator',
    disclaimer: 'estimate',
    about: [
      'This calculator works through Indiana’s Child Support Obligation Worksheet and Parenting Time Credit Worksheet. It combines both parents’ weekly adjusted income, looks up the basic obligation in the guideline schedule, adds child care and children’s health premiums, divides the total by each parent’s percentage share, and applies the paying parent’s credits. The result is the recommended weekly amount on line 8.',
    ],
    steps: [
      'Enter each parent’s gross income, before taxes, and the interval it is paid on.',
      'Open the adjustments panel for later-born children, prior-born support, maintenance paid, child care, and health premiums.',
      'Choose the paying parent and enter each child’s annual overnights with that parent.',
      'Calculate, then check each worksheet line and the credit breakdown.',
    ],
    howItWorks: ['The calculation follows the Guidelines as updated May 14, 2024.'],
    howItWorksList: [
      'Weekly adjusted income is weekly gross income minus the later-born child adjustment (6.5% for one child, 9.7% for two, rising to 17.3% for eight), prior-born support, and maintenance paid.',
      'Each share is that parent’s adjusted income divided by the combined figure.',
      'The basic obligation comes from the schedule using the nearest amount. Above $9,200 combined, it is 8.1% of combined income for one child, 11.4% for two, 13.1% for three, and up to 20.4% for eight.',
      'The parenting time credit starts at 52 overnights. It is the basic obligation × the table’s total factor, minus the paying parent’s share of the duplicated expenses. Different overnight counts are worked separately and the credits averaged.',
      'Line 8 is the paying parent’s share minus the child care and premiums they pay and the credit. If it is negative, the other parent pays.',
    ],
    example: [
      'Parent One earns $1,000 a week and Parent Two $800. Parent One pays and has two children for 98 overnights each. Combined income is $1,800 and Parent One’s share is 55.56%. The schedule gives $390 for two children, so Parent One’s share is $216.68. At 98 overnights the credit is $98.67 minus $34.24, or $64.43. The recommended amount is $216.68 − $64.43 = $152.25 a week.',
    ],
    limitations: [
      'Not covered: the post-secondary education worksheet, split custody (each parent having custody of different children), Social Security benefit credits, uninsured health expenses, and estimating potential income for an unemployed or underemployed parent. Courts can deviate from the guideline amount, and the Guidelines are revised periodically, so confirm the current version with the official sources below.',
    ],
    related: ['/tools/us-paycheck-calculator', '/tools/daily-compound-interest-calculator'],
    sources: INDIANA_SOURCES,
  },
  {
    link: '/tools/sun-moon-rising-calculator',
    about: [
      'This calculator finds your Sun sign, Moon sign, and Rising sign (Ascendant) in the tropical zodiac used by most Western astrology. It takes your birth date, birth time, and birth city, turns them into an exact moment and position on Earth, and computes where the Sun and Moon were and which part of the zodiac was rising on the eastern horizon.',
    ],
    steps: [
      'Enter your name, used only to label the result, then your date of birth.',
      'Enter the birth time as precisely as you can, ideally from a birth certificate.',
      'Enter the birth city. Adding the region and country avoids matching a different city with the same name.',
      'Calculate and read the three signs.',
    ],
    howItWorks: [
      'The city is sent to the OpenStreetMap Nominatim service to get latitude and longitude. The coordinates determine the time zone, and the local birth time is converted to UTC using that zone’s historical offsets, including daylight saving time.',
      'The server then calculates the Sun’s and Moon’s ecliptic longitudes with astronomical algorithms. The Ascendant is derived from local sidereal time, the tilt of Earth’s axis, and your latitude.',
      'Each longitude is a number from 0° to 360°. The zodiac divides that circle into twelve 30° signs, starting with Aries at 0°, so the sign is simply the 30° slice a longitude falls in.',
    ],
    example: [
      'For a birth on January 1, 2000 at 12:00 in London, England, the Sun is at about 280.4°. Capricorn runs from 270° to 300°, so the Sun sign is Capricorn. The Moon is at about 223.3°, which falls in Scorpio (210° to 240°). The Ascendant is about 24.0°, inside the first slice, so the Rising sign is Aries.',
      'The Ascendant moves through the whole zodiac about once a day, roughly one sign every two hours on average, and the speed varies with latitude. That is why the birth time matters much more for the Rising sign than for the Sun sign.',
    ],
    limitations: [
      'Results depend on the accuracy of the time and place you enter. If a value is near the edge of a sign, a few minutes can change the answer, especially for the Rising sign. Old local timekeeping records can be imperfect.',
      'The calculator uses the tropical zodiac, not the sidereal system, so results can differ from sidereal or Vedic charts. It reports only these three placements, not houses or planetary aspects. Astrology is not a scientific method of predicting personality or events, so treat the result as entertainment and reflection.',
    ],
    related: ['/tools/daily-compound-interest-calculator', '/tools/generate-random-names'],
  },
];
