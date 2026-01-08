import { PayslipPayload } from "./types";

export const samplePreset: PayslipPayload = {
  company: {
    name: "ITI",
    addressLines: [
      "707, Charlie Trade Tower, Sindhi Muslim",
      "Cooperative Housing Society."
    ],
    themeColor: "#0088c8",
    logoDataUrl: undefined,
    watermarkDataUrl: undefined,
    stampDataUrl: undefined
  },
  employee: {
    fullName: "",
    addressLines: [""],
    phone: "",
    email: "",
    bankName: "",
    bankAccount: "",
    employeeId: "",
    title: "",
    nationalId: ""
  },
  payroll: {
    payDate: "2026-01-01",
    currency: "PKR",
    netPay: 0,
    useDecimals: false,
    dateFormatStyle: "ordinal-short",
    earnings: [
      { key: "medical", label: "Medical Allowance", percentage: 8.61 },
      { key: "housing", label: "Housing Allowance", percentage: 26.9 },
      { key: "travelling", label: "Travelling Allowance", percentage: 8.61 },
      { key: "car", label: "Car Allowance", percentage: 10.76 },
      { key: "basic", label: "Basic Salary", percentage: 40.35 },
      { key: "dearness", label: "Dearness Allowance", percentage: 4.77 }
    ],
    deductions: [
      { key: "provident", label: "Provident Fund", mode: "fixed", value: 7165 },
      { key: "eobi", label: "EOBI Fund", mode: "fixed", value: 370 },
      { key: "incomeTax", label: "Income Tax", mode: "fixed", value: 390 }
    ]
  }
};
