import {
  DeductionComponent,
  DeductionComponentInput,
  EarningsComponent,
  EarningsComponentInput,
  PayrollCalculated,
  PayrollConfigInput
} from "./types";

function toMinor(amount: number, useDecimals: boolean): number {
  const factor = useDecimals ? 100 : 1;
  return Math.round(amount * factor);
}

interface AllocationInput<T> {
  totalMinor: number;
  items: T[];
  getPercentage: (item: T) => number;
}

function allocateByPercentage<T>({
  totalMinor,
  items,
  getPercentage
}: AllocationInput<T>): number[] {
  const rawFractions: { index: number; fraction: number }[] = [];
  const baseAmounts: number[] = [];

  let sumBase = 0;

  items.forEach((item, index) => {
    const pct = getPercentage(item);
    const raw = (totalMinor * pct) / 100;
    const base = Math.floor(raw);
    const fraction = raw - base;
    baseAmounts[index] = base;
    sumBase += base;
    rawFractions.push({ index, fraction });
  });

  let remainder = totalMinor - sumBase;
  if (remainder > 0) {
    rawFractions.sort((a, b) => b.fraction - a.fraction);
    let i = 0;
    while (remainder > 0 && i < rawFractions.length) {
      baseAmounts[rawFractions[i].index] += 1;
      remainder -= 1;
      i = (i + 1) % rawFractions.length;
    }
  }

  return baseAmounts;
}

export interface CalculationError {
  field: string;
  message: string;
}

export interface CalculationResult {
  calculated?: PayrollCalculated;
  errors: CalculationError[];
}

export function calculatePayroll(input: PayrollConfigInput): CalculationResult {
  const errors: CalculationError[] = [];
  const { earnings, deductions, netPay, useDecimals } = input;

  if (!Number.isFinite(netPay) || netPay <= 0) {
    errors.push({ field: "netPay", message: "Net pay must be a positive number." });
  }

  const earningsPctTotal = earnings.reduce((sum, e) => sum + (e.percentage || 0), 0);
  if (Math.abs(earningsPctTotal - 100) > 0.0001) {
    errors.push({
      field: "earningsPercentages",
      message: "Earnings percentages must sum exactly to 100%."
    });
  }

  const percentDeductions = deductions.filter((d) => d.mode === "percent");
  const fixedDeductions = deductions.filter((d) => d.mode === "fixed");

  const totalPercent = percentDeductions.reduce((sum, d) => sum + (d.value || 0), 0);
  if (totalPercent >= 100) {
    errors.push({
      field: "deductionsPercentages",
      message: "Total percentage-based deductions must be less than 100%."
    });
  }

  if (errors.length > 0) {
    return { errors };
  }

  const netMinor = toMinor(netPay, useDecimals);
  const totalFixedMinor = fixedDeductions.reduce(
    (sum, d) => sum + toMinor(d.value || 0, useDecimals),
    0
  );

  let grossMinor: number;

  if (percentDeductions.length > 0) {
    const p = totalPercent / 100;
    const numerator = netMinor + totalFixedMinor;
    grossMinor = Math.round(numerator / (1 - p));
  } else {
    grossMinor = netMinor + totalFixedMinor;
  }

  const earningsAmountsMinor = allocateByPercentage<EarningsComponentInput>({
    totalMinor: grossMinor,
    items: earnings,
    getPercentage: (e) => e.percentage
  });

  const earningsWithAmounts: EarningsComponent[] = earnings.map((e, idx) => ({
    ...e,
    amountMinor: earningsAmountsMinor[idx]
  }));

  let percentDeductionAmountsMinor: number[] = [];
  let percentDeductionsWithAmounts: DeductionComponent[] = [];

  if (percentDeductions.length > 0) {
    percentDeductionAmountsMinor = allocateByPercentage<DeductionComponentInput>({
      totalMinor: Math.round((grossMinor * totalPercent) / 100),
      items: percentDeductions,
      getPercentage: (d) => d.value
    });

    percentDeductionsWithAmounts = percentDeductions.map((d, idx) => ({
      ...d,
      amountMinor: percentDeductionAmountsMinor[idx]
    }));
  }

  const fixedDeductionsWithAmounts: DeductionComponent[] = fixedDeductions.map((d) => ({
    ...d,
    amountMinor: toMinor(d.value || 0, useDecimals)
  }));

  const allDeductions: DeductionComponent[] = [
    ...percentDeductionsWithAmounts,
    ...fixedDeductionsWithAmounts
  ];

  const totalDeductionsMinor = allDeductions.reduce(
    (sum, d) => sum + d.amountMinor,
    0
  );

  const netComputedMinor = grossMinor - totalDeductionsMinor;

  const calculated: PayrollCalculated = {
    grossPayMinor: grossMinor,
    netPayMinor: netComputedMinor,
    totalDeductionsMinor,
    earnings: earningsWithAmounts,
    deductions: allDeductions
  };

  return { calculated, errors };
}
