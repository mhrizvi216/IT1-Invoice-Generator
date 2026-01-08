export type DeductionMode = "percent" | "fixed";

export interface Company {
  name: string;
  addressLines: string[];
  logoDataUrl?: string | null;
  watermarkDataUrl?: string | null;
  stampDataUrl?: string | null;
  themeColor: string; // hex color
}

export interface Employee {
  fullName: string;
  addressLines: string[];
  phone?: string;
  email?: string;
  bankName?: string;
  bankAccount?: string;
  employeeId?: string;
  title?: string;
  nationalId?: string; // CNIC or similar
}

export interface EarningsComponentInput {
  key: string;
  label: string;
  percentage: number; // must sum to 100 across all earnings
}

export interface EarningsComponent extends EarningsComponentInput {
  amountMinor: number; // integer in minor units
}

export interface DeductionComponentInput {
  key: string;
  label: string;
  mode: DeductionMode;
  value: number; // percent or fixed amount depending on mode
}

export interface DeductionComponent extends DeductionComponentInput {
  amountMinor: number; // integer in minor units
}

export type DateFormatStyle = "ordinal-short" | "alt";

export interface PayrollConfigInput {
  payDate: string; // ISO date string
  currency: string; // e.g. PKR
  netPay: number; // user-entered net pay (major units)
  useDecimals: boolean;
  dateFormatStyle: DateFormatStyle;
  earnings: EarningsComponentInput[];
  deductions: DeductionComponentInput[];
}

export interface PayrollCalculated {
  grossPayMinor: number;
  netPayMinor: number;
  totalDeductionsMinor: number;
  earnings: EarningsComponent[];
  deductions: DeductionComponent[];
}

export interface PayslipPayload {
  company: Company;
  employee: Employee;
  payroll: PayrollConfigInput;
}

export interface PayslipCalculated extends PayslipPayload {
  calculated: PayrollCalculated;
  createdAt: string; // ISO
  id: string;
}
