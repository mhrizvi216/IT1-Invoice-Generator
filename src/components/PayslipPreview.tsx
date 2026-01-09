import React from "react";
import { Company, Employee, EarningsComponent, DeductionComponent, PayrollConfigInput } from "../lib/types";
import "../styles/payslip.css";

interface PreviewProps {
  company: Company;
  employee: Employee;
  payroll: PayrollConfigInput;
  earnings: (EarningsComponent & { formattedAmount: string })[];
  deductions: (DeductionComponent & { formattedAmount: string })[];
  grossFormatted: string;
  totalDeductionsFormatted: string;
  netFormatted: string;
  payDateFormatted: string;
  timestampFormatted: string;
}

const PayslipPreview: React.FC<PreviewProps> = ({
  company,
  employee,
  payroll,
  earnings,
  deductions,
  grossFormatted,
  totalDeductionsFormatted,
  netFormatted,
  payDateFormatted,
  timestampFormatted
}) => {
  const themeColor = company.themeColor || "#0088c8";

  return (
    <div className="payslip-page" style={{ ["--theme-color" as any]: themeColor }}>
      <div className="watermark-container">
        <img
          src={company.watermarkDataUrl || "/it1-logo.png"}
          alt="Watermark"
          className="watermark-image"
        />
      </div>
      <div className="payslip-inner">
        <header className="payslip-header">
          <div className="header-left">
            {company.logoDataUrl ? (
              <img
                src={company.logoDataUrl}
                alt={company.name || "Company logo"}
                className="company-logo-image"
              />
            ) : (
              <img
                src="/it1-logo.png"
                alt={company.name || "Company logo"}
                className="company-logo-image"
              />
            )}
          </div>
          <div className="header-right">
            <div className="payslip-title-bar">
              {payroll.salaryMonth
                ? `Payslip for the month of ${payroll.salaryMonth}`
                : "PAYSLIP"}
            </div>
            <div className="company-block">
              <div className="company-name">{company.name}</div>
              {company.addressLines.map((line, idx) => (
                <div key={idx} className="company-address-line">
                  {line}
                </div>
              ))}
            </div>
          </div>
        </header>

        <section className="info-section">
          <div className="employee-panel">
            <div className="panel-header">Employee Information</div>
            <div className="employee-name-bar">{employee.fullName}</div>
            <div className="employee-details">
              {employee.addressLines.map((line, idx) => (
                <div key={idx}>{line}</div>
              ))}
              {employee.phone && <div>{employee.phone}</div>}
              {employee.email && <div>{employee.email}</div>}
              {(employee.bankName || employee.bankAccount) && (
                <div>
                  {employee.bankName} / {employee.bankAccount}
                </div>
              )}
            </div>
          </div>

          <div className="payroll-panel">
            <div className="payroll-grid">
              <div className="payroll-item">
                <div className="py-label">Pay Date</div>
                <div className="py-value">{payDateFormatted}</div>
              </div>
              <div className="payroll-item">
                <div className="py-label">Title</div>
                <div className="py-value">{employee.title}</div>
              </div>
              <div className="payroll-item">
                <div className="py-label">ID #</div>
                <div className="py-value">{employee.employeeId}</div>
              </div>
              <div className="payroll-item">
                <div className="py-label">CNIC #</div>
                <div className="py-value">{employee.nationalId}</div>
              </div>
            </div>
          </div>
        </section>

        <section className="tables-section">
          <div className="earnings-table-wrapper">
            <table className="payslip-table">
              <thead>
                <tr>
                  <th className="col-label">Earnings</th>
                  <th className="col-amount">Amount</th>
                </tr>
              </thead>
              <tbody>
                {earnings.map((e) => (
                  <tr key={e.key}>
                    <td>{e.label}</td>
                    <td className="amount-cell">{e.formattedAmount}</td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="total-row">
                  <td>Gross Pay</td>
                  <td className="amount-cell">{grossFormatted}</td>
                </tr>
              </tfoot>
            </table>
          </div>

          <div className="deductions-table-wrapper">
            <table className="payslip-table">
              <thead>
                <tr>
                  <th className="col-label">Deductions</th>
                  <th className="col-amount">Amount</th>
                </tr>
              </thead>
              <tbody>
                {deductions.map((d) => (
                  <tr key={d.key}>
                    <td>{d.label}</td>
                    <td className="amount-cell">{d.formattedAmount}</td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="total-row">
                  <td>Total Deductions</td>
                  <td className="amount-cell">{totalDeductionsFormatted}</td>
                </tr>
              </tfoot>
            </table>
          </div>
          <div className="netpay-box" style={{ marginTop: "4mm", marginLeft: "auto" }}>
            <div className="netpay-label">Net Pay</div>
            <div className="netpay-amount">{netFormatted}</div>
          </div>
        </section>

        <section className="bottom-section">
          <div className="stamp-area">
            {company.stampDataUrl ? (
              <img
                src={company.stampDataUrl}
                alt="Stamp"
                className="stamp-image"
                style={{ height: "100%", width: "100%", objectFit: "contain" }}
              />
            ) : (
              <img
                src="/IT1_Stamp.png"
                alt="Stamp"
                className="stamp-image"
                style={{ height: "100%", width: "100%", objectFit: "contain" }}
              />
            )}
          </div>
        </section>

        <footer className="payslip-footer">
          <div className="disclaimer">
            Disclaimer: This is a system generated report and doesn&apos;t require any signature.
          </div>
          <div className="timestamp" suppressHydrationWarning>{timestampFormatted}</div>
        </footer>
      </div>
    </div>
  );
};

export default PayslipPreview;
