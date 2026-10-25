import type { FilingStatus, TaxBracket } from '@/lib/us-paycheck/federal-tax-data';

/** `[single/head/separate, married filing jointly]` */
type StatusPair = readonly [number, number];

export type StateTaxRule = {
  code: string;
  name: string;
  /** Omitted for states with no broad-based tax on wages. */
  brackets?: { single: readonly TaxBracket[]; married: readonly TaxBracket[] };
  standardDeduction?: StatusPair;
  personalExemption?: StatusPair;
  /** Flat, non-refundable credits applied after bracket tax. */
  credit?: StatusPair;
  /** Credit shrinks by `rate` per $1 of income above `start`. */
  creditPhaseOut?: { rate: number; start: StatusPair };
  /** Exemption shrinks $1 per $1 of income above `start`. */
  exemptionPhaseOutStart?: StatusPair;
  /** 401(k) deferrals are still taxable wages for state purposes. */
  taxes401k?: boolean;
  /** Local income or wage taxes commonly apply on top of the state tax. */
  localTaxesMayApply?: boolean;
};

const flat = (rate: number): readonly TaxBracket[] => [[0, rate]];

const NO_TAX = (code: string, name: string): StateTaxRule => ({ code, name });

export const STATE_TAX_RULES: readonly StateTaxRule[] = [
  {
    code: 'AL',
    name: 'Alabama',
    brackets: {
      single: [[0, 0.02], [500, 0.04], [3_000, 0.05]],
      married: [[0, 0.02], [1_000, 0.04], [6_000, 0.05]],
    },
    standardDeduction: [3_000, 8_500],
    personalExemption: [1_500, 3_000],
    localTaxesMayApply: true,
  },
  NO_TAX('AK', 'Alaska'),
  {
    code: 'AZ',
    name: 'Arizona',
    brackets: { single: flat(0.025), married: flat(0.025) },
    standardDeduction: [8_350, 16_700],
  },
  {
    code: 'AR',
    name: 'Arkansas',
    brackets: {
      single: [[0, 0.02], [4_600, 0.039]],
      married: [[0, 0.02], [4_600, 0.039]],
    },
    standardDeduction: [2_470, 4_940],
    credit: [29, 58],
  },
  {
    code: 'CA',
    name: 'California',
    brackets: {
      single: [
        [0, 0.01], [11_079, 0.02], [26_264, 0.04], [41_452, 0.06],
        [57_542, 0.08], [72_724, 0.093], [371_479, 0.103],
        [445_771, 0.113], [742_953, 0.123], [1_000_000, 0.133],
      ],
      married: [
        [0, 0.01], [22_158, 0.02], [52_528, 0.04], [82_904, 0.06],
        [115_084, 0.08], [145_448, 0.093], [742_958, 0.103],
        [891_542, 0.113], [1_000_000, 0.123], [1_485_906, 0.133],
      ],
    },
    standardDeduction: [5_540, 11_080],
    credit: [153, 306],
  },
  {
    code: 'CO',
    name: 'Colorado',
    brackets: { single: flat(0.044), married: flat(0.044) },
    standardDeduction: [16_100, 32_200],
    localTaxesMayApply: true,
  },
  {
    code: 'CT',
    name: 'Connecticut',
    brackets: {
      single: [
        [0, 0.02], [10_000, 0.045], [50_000, 0.055], [100_000, 0.06],
        [200_000, 0.065], [250_000, 0.069], [500_000, 0.0699],
      ],
      married: [
        [0, 0.02], [20_000, 0.045], [100_000, 0.055], [200_000, 0.06],
        [400_000, 0.065], [500_000, 0.069], [1_000_000, 0.0699],
      ],
    },
    personalExemption: [15_000, 24_000],
    exemptionPhaseOutStart: [30_000, 48_000],
  },
  {
    code: 'DE',
    name: 'Delaware',
    brackets: {
      single: [
        [0, 0], [2_000, 0.022], [5_000, 0.039], [10_000, 0.048],
        [20_000, 0.052], [25_000, 0.0555], [60_000, 0.066],
      ],
      married: [
        [0, 0], [2_000, 0.022], [5_000, 0.039], [10_000, 0.048],
        [20_000, 0.052], [25_000, 0.0555], [60_000, 0.066],
      ],
    },
    standardDeduction: [3_250, 6_500],
    credit: [110, 220],
    localTaxesMayApply: true,
  },
  {
    code: 'DC',
    name: 'District of Columbia',
    brackets: {
      single: [
        [0, 0.04], [10_000, 0.06], [40_000, 0.065], [60_000, 0.085],
        [250_000, 0.0925], [500_000, 0.0975], [1_000_000, 0.1075],
      ],
      married: [
        [0, 0.04], [10_000, 0.06], [40_000, 0.065], [60_000, 0.085],
        [250_000, 0.0925], [500_000, 0.0975], [1_000_000, 0.1075],
      ],
    },
    standardDeduction: [16_100, 32_200],
  },
  NO_TAX('FL', 'Florida'),
  {
    code: 'GA',
    name: 'Georgia',
    brackets: { single: flat(0.0519), married: flat(0.0519) },
    standardDeduction: [12_000, 24_000],
  },
  {
    code: 'HI',
    name: 'Hawaii',
    brackets: {
      single: [
        [0, 0.014], [9_600, 0.032], [14_400, 0.055], [19_200, 0.064],
        [24_000, 0.068], [36_000, 0.072], [48_000, 0.076], [125_000, 0.079],
        [175_000, 0.0825], [225_000, 0.09], [275_000, 0.1], [325_000, 0.11],
      ],
      married: [
        [0, 0.014], [19_200, 0.032], [28_800, 0.055], [38_400, 0.064],
        [48_000, 0.068], [72_000, 0.072], [96_000, 0.076], [250_000, 0.079],
        [350_000, 0.0825], [450_000, 0.09], [550_000, 0.1], [650_000, 0.11],
      ],
    },
    standardDeduction: [4_400, 8_800],
    personalExemption: [1_144, 2_288],
  },
  {
    code: 'ID',
    name: 'Idaho',
    brackets: {
      single: [[0, 0], [4_811, 0.053]],
      married: [[0, 0], [9_622, 0.053]],
    },
    standardDeduction: [16_100, 32_200],
  },
  {
    code: 'IL',
    name: 'Illinois',
    brackets: { single: flat(0.0495), married: flat(0.0495) },
    personalExemption: [2_925, 5_850],
  },
  {
    code: 'IN',
    name: 'Indiana',
    brackets: { single: flat(0.0295), married: flat(0.0295) },
    personalExemption: [1_000, 2_000],
    localTaxesMayApply: true,
  },
  {
    code: 'IA',
    name: 'Iowa',
    brackets: { single: flat(0.038), married: flat(0.038) },
    standardDeduction: [16_100, 32_200],
    credit: [40, 80],
    localTaxesMayApply: true,
  },
  {
    code: 'KS',
    name: 'Kansas',
    brackets: {
      single: [[0, 0.052], [23_000, 0.0558]],
      married: [[0, 0.052], [46_000, 0.0558]],
    },
    standardDeduction: [3_605, 8_240],
    personalExemption: [9_160, 18_320],
  },
  {
    code: 'KY',
    name: 'Kentucky',
    brackets: { single: flat(0.035), married: flat(0.035) },
    standardDeduction: [3_360, 3_360],
    localTaxesMayApply: true,
  },
  {
    code: 'LA',
    name: 'Louisiana',
    brackets: { single: flat(0.03), married: flat(0.03) },
    standardDeduction: [12_875, 25_750],
  },
  {
    code: 'ME',
    name: 'Maine',
    brackets: {
      single: [[0, 0.058], [27_399, 0.0675], [64_849, 0.0715]],
      married: [[0, 0.058], [54_849, 0.0675], [129_749, 0.0715]],
    },
    standardDeduction: [8_350, 16_700],
    personalExemption: [5_300, 10_600],
  },
  {
    code: 'MD',
    name: 'Maryland',
    brackets: {
      single: [
        [0, 0.02], [1_000, 0.03], [2_000, 0.04], [3_000, 0.0475],
        [100_000, 0.05], [125_000, 0.0525], [150_000, 0.055],
        [250_000, 0.0575], [500_000, 0.0625], [1_000_000, 0.065],
      ],
      married: [
        [0, 0.02], [1_000, 0.03], [2_000, 0.04], [3_000, 0.0475],
        [150_000, 0.05], [175_000, 0.0525], [225_000, 0.055],
        [300_000, 0.0575], [600_000, 0.0625], [1_200_000, 0.065],
      ],
    },
    standardDeduction: [3_350, 6_700],
    personalExemption: [3_200, 6_400],
    localTaxesMayApply: true,
  },
  {
    code: 'MA',
    name: 'Massachusetts',
    brackets: {
      single: [[0, 0.05], [1_083_150, 0.09]],
      married: [[0, 0.05], [1_083_150, 0.09]],
    },
    personalExemption: [4_400, 8_800],
  },
  {
    code: 'MI',
    name: 'Michigan',
    brackets: { single: flat(0.0425), married: flat(0.0425) },
    personalExemption: [5_900, 11_800],
    localTaxesMayApply: true,
  },
  {
    code: 'MN',
    name: 'Minnesota',
    brackets: {
      single: [[0, 0.0535], [33_310, 0.068], [109_430, 0.0785], [203_150, 0.0985]],
      married: [[0, 0.0535], [48_700, 0.068], [193_480, 0.0785], [337_930, 0.0985]],
    },
    standardDeduction: [15_300, 30_600],
  },
  {
    code: 'MS',
    name: 'Mississippi',
    brackets: { single: [[0, 0], [10_000, 0.04]], married: [[0, 0], [10_000, 0.04]] },
    standardDeduction: [2_300, 4_600],
    personalExemption: [6_000, 12_000],
  },
  {
    code: 'MO',
    name: 'Missouri',
    brackets: {
      single: [
        [0, 0], [1_348, 0.02], [2_696, 0.025], [4_044, 0.03], [5_392, 0.035],
        [6_740, 0.04], [8_088, 0.045], [9_436, 0.047],
      ],
      married: [
        [0, 0], [1_348, 0.02], [2_696, 0.025], [4_044, 0.03], [5_392, 0.035],
        [6_740, 0.04], [8_088, 0.045], [9_436, 0.047],
      ],
    },
    standardDeduction: [16_100, 32_200],
    localTaxesMayApply: true,
  },
  {
    code: 'MT',
    name: 'Montana',
    brackets: {
      single: [[0, 0.047], [47_500, 0.0565]],
      married: [[0, 0.047], [95_000, 0.0565]],
    },
    standardDeduction: [16_100, 32_200],
  },
  {
    code: 'NE',
    name: 'Nebraska',
    brackets: {
      single: [[0, 0.0246], [4_130, 0.0351], [24_760, 0.0455]],
      married: [[0, 0.0246], [8_250, 0.0351], [49_530, 0.0455]],
    },
    standardDeduction: [8_850, 17_700],
    credit: [176, 352],
  },
  NO_TAX('NV', 'Nevada'),
  NO_TAX('NH', 'New Hampshire'),
  {
    code: 'NJ',
    name: 'New Jersey',
    brackets: {
      single: [
        [0, 0.014], [20_000, 0.0175], [35_000, 0.035], [40_000, 0.0553],
        [75_000, 0.0637], [500_000, 0.0897], [1_000_000, 0.1075],
      ],
      married: [
        [0, 0.014], [20_000, 0.0175], [50_000, 0.0245], [70_000, 0.035],
        [80_000, 0.0553], [150_000, 0.0637], [500_000, 0.0897],
        [1_000_000, 0.1075],
      ],
    },
    personalExemption: [1_000, 2_000],
    taxes401k: true,
  },
  {
    code: 'NM',
    name: 'New Mexico',
    brackets: {
      single: [
        [0, 0.015], [5_500, 0.032], [16_500, 0.043], [33_500, 0.047],
        [66_500, 0.049], [210_000, 0.059],
      ],
      married: [
        [0, 0.015], [8_000, 0.032], [25_000, 0.043], [50_000, 0.047],
        [100_000, 0.049], [315_000, 0.059],
      ],
    },
    standardDeduction: [16_100, 32_200],
  },
  {
    code: 'NY',
    name: 'New York',
    brackets: {
      single: [
        [0, 0.039], [8_500, 0.044], [11_700, 0.0515], [13_900, 0.054],
        [80_650, 0.059], [215_400, 0.0685], [1_077_550, 0.0965],
        [5_000_000, 0.103], [25_000_000, 0.109],
      ],
      married: [
        [0, 0.039], [17_150, 0.044], [23_600, 0.0515], [27_900, 0.054],
        [161_550, 0.059], [323_200, 0.0685], [2_155_350, 0.0965],
        [5_000_000, 0.103], [25_000_000, 0.109],
      ],
    },
    standardDeduction: [8_000, 16_050],
    localTaxesMayApply: true,
  },
  {
    code: 'NC',
    name: 'North Carolina',
    brackets: { single: flat(0.0399), married: flat(0.0399) },
    standardDeduction: [12_750, 25_500],
  },
  {
    code: 'ND',
    name: 'North Dakota',
    brackets: {
      single: [[0, 0], [48_475, 0.0195], [244_825, 0.025]],
      married: [[0, 0], [80_975, 0.0195], [298_075, 0.025]],
    },
    standardDeduction: [16_100, 32_200],
  },
  {
    code: 'OH',
    name: 'Ohio',
    brackets: { single: [[0, 0], [26_050, 0.0275]], married: [[0, 0], [26_050, 0.0275]] },
    personalExemption: [2_400, 4_800],
    localTaxesMayApply: true,
  },
  {
    code: 'OK',
    name: 'Oklahoma',
    brackets: {
      single: [[0, 0], [3_750, 0.025], [4_900, 0.035], [7_200, 0.045]],
      married: [[0, 0], [7_500, 0.025], [9_800, 0.035], [14_400, 0.045]],
    },
    standardDeduction: [6_350, 12_700],
    personalExemption: [1_000, 2_000],
  },
  {
    code: 'OR',
    name: 'Oregon',
    brackets: {
      single: [[0, 0.0475], [4_550, 0.0675], [11_400, 0.0875], [125_000, 0.099]],
      married: [[0, 0.0475], [9_100, 0.0675], [22_800, 0.0875], [250_000, 0.099]],
    },
    standardDeduction: [2_910, 5_820],
    credit: [256, 512],
    localTaxesMayApply: true,
  },
  {
    code: 'PA',
    name: 'Pennsylvania',
    brackets: { single: flat(0.0307), married: flat(0.0307) },
    taxes401k: true,
    localTaxesMayApply: true,
  },
  {
    code: 'RI',
    name: 'Rhode Island',
    brackets: {
      single: [[0, 0.0375], [82_050, 0.0475], [186_450, 0.0599]],
      married: [[0, 0.0375], [82_050, 0.0475], [186_450, 0.0599]],
    },
    standardDeduction: [11_200, 22_400],
    personalExemption: [5_250, 10_500],
  },
  {
    code: 'SC',
    name: 'South Carolina',
    brackets: {
      single: [[0, 0], [3_640, 0.03], [18_230, 0.06]],
      married: [[0, 0], [3_640, 0.03], [18_230, 0.06]],
    },
    standardDeduction: [8_350, 16_700],
  },
  NO_TAX('SD', 'South Dakota'),
  NO_TAX('TN', 'Tennessee'),
  NO_TAX('TX', 'Texas'),
  {
    code: 'UT',
    name: 'Utah',
    brackets: { single: flat(0.045), married: flat(0.045) },
    credit: [966, 1_932],
    creditPhaseOut: { rate: 0.013, start: [18_213, 36_426] },
  },
  {
    code: 'VT',
    name: 'Vermont',
    brackets: {
      single: [[0, 0.0335], [49_400, 0.066], [119_700, 0.076], [249_700, 0.0875]],
      married: [[0, 0.0335], [82_500, 0.066], [199_450, 0.076], [304_000, 0.0875]],
    },
    standardDeduction: [7_650, 15_300],
    personalExemption: [5_300, 10_600],
  },
  {
    code: 'VA',
    name: 'Virginia',
    brackets: {
      single: [[0, 0.02], [3_000, 0.03], [5_000, 0.05], [17_000, 0.0575]],
      married: [[0, 0.02], [3_000, 0.03], [5_000, 0.05], [17_000, 0.0575]],
    },
    standardDeduction: [8_750, 17_500],
    personalExemption: [930, 1_860],
  },
  NO_TAX('WA', 'Washington'),
  {
    code: 'WV',
    name: 'West Virginia',
    brackets: {
      single: [
        [0, 0.0222], [10_000, 0.0296], [25_000, 0.0333], [40_000, 0.0444],
        [60_000, 0.0482],
      ],
      married: [
        [0, 0.0222], [10_000, 0.0296], [25_000, 0.0333], [40_000, 0.0444],
        [60_000, 0.0482],
      ],
    },
    personalExemption: [2_000, 4_000],
  },
  {
    code: 'WI',
    name: 'Wisconsin',
    brackets: {
      single: [[0, 0.035], [15_110, 0.044], [51_950, 0.053], [332_720, 0.0765]],
      married: [[0, 0.035], [20_150, 0.044], [69_260, 0.053], [443_630, 0.0765]],
    },
    standardDeduction: [13_960, 25_840],
    personalExemption: [700, 1_400],
  },
  NO_TAX('WY', 'Wyoming'),
];

const STATE_RULES_BY_CODE = new Map(
  STATE_TAX_RULES.map(rule => [rule.code, rule] as const),
);

export const STATE_CODES = STATE_TAX_RULES.map(rule => rule.code) as [
  string,
  ...string[],
];

export function getStateRule(code: string): StateTaxRule {
  const rule = STATE_RULES_BY_CODE.get(code);
  if (!rule) {
    throw new RangeError(`Unknown state code: ${code}`);
  }
  return rule;
}

export function statusIndex(filingStatus: FilingStatus): 0 | 1 {
  return filingStatus === 'married' ? 1 : 0;
}
