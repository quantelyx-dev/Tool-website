import type { ContributionFrequency } from '@/lib/daily-compound-interest/contribution-frequency';

const CONTRIBUTION_INTERVAL_DAYS: Record<ContributionFrequency, number> = {
  daily: 1,
  weekly: 7,
  biweekly: 14,
  monthly: 30,
  quarterly: 90,
};

/** ~30 simulated days per chart step — matches monthly contribution spacing in-engine. */
export const CHART_MONTH_DAYS = 30;

export type DailyCompoundComputeInput = {
  principal: number;
  annualRatePercent: number;
  rateBasis: 'nominal' | 'apy';
  simulationDays: number;
  contributionPerPeriod: number;
  contributionFrequency: ContributionFrequency;
  reinvestInterest: boolean;
};

export type DailyCompoundProjection = {
  finalBalance: number;
  totalDeposits: number;
  interestEarned: number;
  simulationDays: number;
};

/** One sample on the projection curve (~monthly, plus horizon end). */
export type MonthlySeriesPoint = {
  /** Cumulative simulated days at this snapshot (aligned with solver loop). */
  simulatedDay: number;
  /** simulatedDay ÷ {@link CHART_MONTH_DAYS} — x-axis for chart. */
  elapsedMonths: number;
  balance: number;
  cumulativeDeposits: number;
};

function isContributionDay(dayIndex: number, intervalDays: number): boolean {
  if (intervalDays <= 0) return false;
  return dayIndex > 0 && dayIndex % intervalDays === 0;
}

function shouldSampleMonthBoundary(day: number, totalDays: number): boolean {
  if (day <= 0) return false;
  if (day >= totalDays) return true;
  return day % CHART_MONTH_DAYS === 0;
}

export function effectiveDailyRate(
  annualPercent: number,
  basis: 'nominal' | 'apy',
): number {
  const annualFraction = annualPercent / 100;
  if (basis === 'nominal') return annualFraction / 365;
  return Math.pow(1 + annualFraction, 1 / 365) - 1;
}

export function computeDailyCompoundWithMonthlySeries(
  input: DailyCompoundComputeInput,
): { projection: DailyCompoundProjection; monthlySeries: MonthlySeriesPoint[] } {
  const {
    principal,
    annualRatePercent,
    rateBasis,
    simulationDays,
    contributionPerPeriod,
    contributionFrequency,
    reinvestInterest,
  } = input;

  const days = Math.max(0, Math.floor(simulationDays));
  const rDaily = effectiveDailyRate(annualRatePercent, rateBasis);
  const interval = CONTRIBUTION_INTERVAL_DAYS[contributionFrequency];
  const contrib = Math.max(0, contributionPerPeriod);

  const monthlySeries: MonthlySeriesPoint[] = [];

  const record = (simulatedDay: number, balance: number, cumulativeDeposits: number) => {
    monthlySeries.push({
      simulatedDay,
      elapsedMonths:
        simulatedDay === 0 ? 0 : simulatedDay / CHART_MONTH_DAYS,
      balance,
      cumulativeDeposits,
    });
  };

  if (days === 0) {
    record(0, principal, principal);
    return {
      projection: {
        finalBalance: principal,
        totalDeposits: principal,
        interestEarned: 0,
        simulationDays: 0,
      },
      monthlySeries,
    };
  }

  record(0, principal, principal);

  if (reinvestInterest) {
    let balance = principal;
    let totalDeposits = principal;

    for (let day = 1; day <= days; day++) {
      balance *= 1 + rDaily;
      if (contrib > 0 && isContributionDay(day, interval)) {
        balance += contrib;
        totalDeposits += contrib;
      }
      if (shouldSampleMonthBoundary(day, days)) {
        record(day, balance, totalDeposits);
      }
    }

    const interestEarned = balance - totalDeposits;

    return {
      projection: {
        finalBalance: balance,
        totalDeposits,
        interestEarned,
        simulationDays: days,
      },
      monthlySeries,
    };
  }

  let capital = principal;
  let interestAccrued = 0;
  let totalDeposits = principal;

  for (let day = 1; day <= days; day++) {
    interestAccrued += capital * rDaily;
    if (contrib > 0 && isContributionDay(day, interval)) {
      capital += contrib;
      totalDeposits += contrib;
    }
    if (shouldSampleMonthBoundary(day, days)) {
      const bal = capital + interestAccrued;
      record(day, bal, totalDeposits);
    }
  }

  const finalBalance = capital + interestAccrued;
  const interestEarned = finalBalance - totalDeposits;

  return {
    projection: {
      finalBalance,
      totalDeposits,
      interestEarned,
      simulationDays: days,
    },
    monthlySeries,
  };
}

export function computeDailyCompoundProjection(
  input: DailyCompoundComputeInput,
): DailyCompoundProjection {
  return computeDailyCompoundWithMonthlySeries(input).projection;
}
