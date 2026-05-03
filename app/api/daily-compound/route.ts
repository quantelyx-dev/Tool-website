import { NextResponse } from 'next/server';
import { z } from 'zod';

import { computeDailyCompoundWithMonthlySeries } from '@/lib/daily-compound-interest/compute';
import {
  approximateHorizonDays,
  parseAnnualRatePercentForValidation,
  parseOptionalContribution,
  parsePrincipalAmount,
} from '@/lib/daily-compound-interest/form-parsing';
import {
  DAILY_COMPOUND_LIMITS,
  dailyCompoundCalculatorFormSchema,
} from '@/lib/schemas/daily-compound-schema';

export const runtime = 'nodejs';

export async function POST(request: Request) {
  let json: unknown;
  try {
    json = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false as const, error: 'Invalid JSON body' },
      { status: 400 },
    );
  }

  const parsed = dailyCompoundCalculatorFormSchema.safeParse(json);
  if (!parsed.success) {
    const { errors, properties } = z.treeifyError(parsed.error);
    return NextResponse.json(
      {
        ok: false as const,
        error: errors[0] ?? 'Validation failed',
        fieldErrors: Object.fromEntries(
          Object.entries(properties ?? {}).map(([key, value]) => [
            key,
            value?.errors ?? [],
          ]),
        ),
      },
      { status: 422 },
    );
  }

  const data = parsed.data;

  const principal = parsePrincipalAmount(data.principal);
  const rate = parseAnnualRatePercentForValidation(data.annualRatePercent, {
    maxExclusive: DAILY_COMPOUND_LIMITS.maxAnnualRatePercentExclusive,
  });
  const approxDays = approximateHorizonDays(
    data.timelineYears,
    data.timelineMonths,
    data.timelineExtraDays,
  );
  const contributionPerPeriod = parseOptionalContribution(
    data.contributionAmount,
  );

  if (
    principal === null ||
    rate === null ||
    approxDays === null ||
    approxDays < DAILY_COMPOUND_LIMITS.minTotalHorizonApproxDaysInclusive
  ) {
    return NextResponse.json(
      {
        ok: false as const,
        error: 'Inputs could not be converted for calculation.',
      },
      { status: 422 },
    );
  }

  const { projection, monthlySeries } = computeDailyCompoundWithMonthlySeries({
    principal,
    annualRatePercent: rate,
    rateBasis: data.rateBasis,
    simulationDays: approxDays,
    contributionPerPeriod,
    contributionFrequency: data.contributionFrequency,
    reinvestInterest: data.reinvestInterest,
  });

  return NextResponse.json({
    ok: true as const,
    currency: data.currency,
    projection: {
      finalBalance: projection.finalBalance,
      totalDeposits: projection.totalDeposits,
      interestEarned: projection.interestEarned,
      simulationDays: projection.simulationDays,
    },
    monthlySeries,
  });
}
