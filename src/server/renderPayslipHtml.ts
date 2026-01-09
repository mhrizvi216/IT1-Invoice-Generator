import { PayslipCalculated } from "../lib/types";
import { formatMoney, formatPayDate, formatTimestamp } from "../lib/formatting";

const PAYSLIP_CSS = `
:root {
  --theme-color: #0088c8;
  --text-main: #111827;
  --text-muted: #6b7280;
  --border-color: #e5e7eb;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
  margin: 0;
  padding: 0;
}

.payslip-page {
  width: 210mm;
  height: auto;
  background-color: #ffffff;
  position: relative;
  color: var(--text-main);
}

.payslip-inner {
  padding: 8mm 15mm;
  display: flex;
  flex-direction: column;
  height: 100%;
  font-size: 11px;
  position: relative;
  z-index: 1;
}

.watermark-container {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 70%;
  max-width: 500px;
  z-index: 0;
  pointer-events: none;
  opacity: 0.08;
}

.watermark-image {
  width: 100%;
  height: auto;
  display: block;
}

.payslip-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 4mm;
}

.header-left {
  display: flex;
  align-items: center;
}

.company-logo-placeholder {
  font-size: 24px;
  font-weight: 700;
}

.header-right {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
}

.payslip-title-bar {
  background-color: var(--theme-color);
  color: #ffffff;
  padding: 8px 48px;
  font-weight: 700;
  letter-spacing: 0.05em;
  font-size: 14px;
  text-align: center;
  width: 100%;
  box-sizing: border-box;
}

.company-block {
  text-align: center;
  margin-top: 8px;
}

.company-name {
  font-weight: 700;
  margin-bottom: 2px;
  font-size: 14px;
  font-style: italic;
}

.company-logo-image {
  height: auto;
  width: 120px;
  object-fit: contain;
}

.company-address-line {
  color: var(--text-muted);
  font-size: 10px;
}

.info-section {
  display: grid;
  grid-template-columns: 1fr 1.2fr;
  gap: 10mm;
  margin-bottom: 4mm;
}

.employee-panel {
  border: none;
}

.panel-header {
  background-color: #f3f4f6;
  padding: 6px 8px;
  font-weight: 600;
  font-size: 10px;
  font-style: italic;
  color: var(--text-main);
  text-align: start;
}

.employee-name-bar {
  background-color: var(--theme-color);
  color: #ffffff;
  padding: 8px 10px;
  font-weight: 700;
  font-size: 13px;
}

.employee-details {
  padding: 8px 0;
  border-top: none;
}

.employee-details div {
  margin-bottom: 3px;
  font-style: italic;
  font-size: 10px;
  border-bottom: 1px solid #f3f4f6;
  padding-bottom: 2px;
}

.payroll-panel {
  border: none;
  font-size: 10px;
}

.payroll-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3mm 4mm;
}

.payroll-item {
  display: flex;
  flex-direction: column;
}

.py-label {
  background-color: #f3f4f6;
  color: #374151;
  text-align: center;
  padding: 6px 4px;
  font-size: 11px;
  font-weight: 600;
}

.py-value {
  background-color: var(--theme-color);
  color: #ffffff;
  text-align: center;
  padding: 8px 4px;
  font-weight: 600;
  font-size: 12px;
}

.tables-section {
  margin-top: 2mm;
}

.earnings-table-wrapper,
.deductions-table-wrapper {
  margin-bottom: 3mm;
}

.payslip-table {
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  font-size: 11px;
}

.payslip-table thead th {
  background-color: var(--theme-color);
  color: #ffffff;
  text-align: left;
  padding: 8px 12px;
  font-weight: 700;
}

.payslip-table thead th:first-child {
  border-right: 2px solid white;
}

.col-label {
  width: 60%;
}

.col-amount {
  width: 40%;
  text-align: right !important;
}

.payslip-table tbody td {
  border-bottom: 1px solid #e5e7eb;
  padding: 8px 12px;
  color: var(--text-main);
  font-weight: 500;
}

.amount-cell {
  text-align: right;
  font-weight: 600;
}

.total-row td {
  background-color: var(--theme-color);
  color: #ffffff;
  font-weight: 700;
  padding: 8px 12px;
  text-transform: uppercase;
  font-size: 12px;
}

.total-row td:first-child {
  border-right: 2px solid white;
}

.bottom-section {
  margin-top: auto;
  display: flex;
  justify-content: start;
  align-items: flex-end;
  margin-bottom: 2mm;
  margin-left: 20mm;
}

.stamp-area {
  width: 40mm;
  height: 40mm;
  display: flex;
  align-items: center;
  justify-content: center;
}

.stamp-image {
  height: 100%;
  width: 100%;
  transform: rotate(-16deg);
  object-fit: contain;
}

.stamp-placeholder {
  width: 36mm;
  height: 36mm;
  border: 2px dashed var(--theme-color);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 9px;
  color: var(--theme-color);
}

.netpay-box {
  background-color: var(--theme-color);
  color: #ffffff;
  padding: 12px 24px;
  width: 100%;
  max-width: 80mm;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.netpay-label {
  font-weight: 600;
  font-size: 14px;
}

.netpay-amount {
  font-size: 16px;
  font-weight: 700;
}

.payslip-footer {
  display: flex;
  justify-content: space-between;
  font-size: 9px;
  color: var(--text-muted);
}

@page {
  size: A4;
  margin: 0;
  padding: 0;
}
`;

export function renderPayslipHtml(record: PayslipCalculated): string {
  const { company, employee, payroll, calculated } = record;
  const useDecimals = payroll.useDecimals;
  const currency = payroll.currency;

  const earningsRows = calculated.earnings
    .map(
      (e) =>
        `<tr><td>${e.label}</td><td class="amount-cell">${currency} ${formatMoney(
          e.amountMinor,
          useDecimals
        )}</td></tr>`
    )
    .join("");

  const deductionsRows = calculated.deductions
    .map(
      (d) =>
        `<tr><td>${d.label}</td><td class="amount-cell">${currency} ${formatMoney(
          d.amountMinor,
          useDecimals
        )}</td></tr>`
    )
    .join("");

  const grossFormatted = `${currency} ${formatMoney(
    calculated.grossPayMinor,
    useDecimals
  )}`;
  const totalDeductionsFormatted = `${currency} ${formatMoney(
    calculated.totalDeductionsMinor,
    useDecimals
  )}`;
  const netFormatted = `${currency} ${formatMoney(
    calculated.netPayMinor,
    useDecimals
  )}`;
  const payDateFormatted = formatPayDate(
    payroll.payDate,
    payroll.dateFormatStyle
  );
  const timestampFormatted = formatTimestamp(new Date(record.createdAt));

  const addressCompany = company.addressLines
    .map((line) => `<div class="company-address-line">${line}</div>`)
    .join("");

  const employeeAddress = employee.addressLines
    .map((line) => `<div>${line}</div>`)
    .join("");

  const html = `<!DOCTYPE html>
<html>
  <head>
    <meta charSet="utf-8" />
    <title>Payslip-${employee.fullName}-${payDateFormatted}</title>
    <style>${PAYSLIP_CSS}</style>
  </head>
  <body>
    <div class="payslip-page" style="--theme-color: ${company.themeColor || "#0088c8"
    }">
      ${company.watermarkDataUrl
      ? `<div class="watermark-container"><img src="${company.watermarkDataUrl}" class="watermark-image" alt="Watermark" /></div>`
      : ""
    }
      <div class="payslip-inner">
        <header class="payslip-header">
          <div class="header-left">
            ${company.logoDataUrl
      ? `<img src="${company.logoDataUrl}" class="company-logo-image" alt="Logo" />`
      : `<div class="company-logo-placeholder">${company.name?.slice(0, 3) || "LOGO"}</div>`
    }
          </div>
          <div class="header-right">
            <div class="payslip-title-bar">
              ${payroll.salaryMonth
      ? `Payslip for the month of ${payroll.salaryMonth}`
      : "PAYSLIP"}
            </div>
            <div class="company-block">
              <div class="company-name">${company.name}</div>
              ${addressCompany}
            </div>
          </div>
        </header>

        <section class="info-section">
          <div class="employee-panel">
            <div class="panel-header">Employee Information</div>
            <div class="employee-name-bar">${employee.fullName}</div>
            <div class="employee-details">
              ${employeeAddress}
              ${employee.phone ? `<div>${employee.phone}</div>` : ""}
              ${employee.email ? `<div>${employee.email}</div>` : ""}
              ${employee.bankName || employee.bankAccount
      ? `<div>${employee.bankName || ""} / ${employee.bankAccount || ""
      }</div>`
      : ""
    }
            </div>
          </div>

          <div class="payroll-panel">
            <div class="payroll-grid">
              <div class="payroll-item">
                <div class="py-label">Pay Date</div>
                <div class="py-value">${payDateFormatted}</div>
              </div>
              <div class="payroll-item">
                <div class="py-label">Title</div>
                <div class="py-value">${employee.title || ""}</div>
              </div>
              <div class="payroll-item">
                <div class="py-label">ID #</div>
                <div class="py-value">${employee.employeeId || ""}</div>
              </div>
              <div class="payroll-item">
                <div class="py-label">CNIC #</div>
                <div class="py-value">${employee.nationalId || ""}</div>
              </div>
            </div>
          </div>
        </section>

        <section class="tables-section">
          <div class="earnings-table-wrapper">
            <table class="payslip-table">
              <thead>
                <tr>
                  <th class="col-label">Earnings</th>
                  <th class="col-amount">Amount</th>
                </tr>
              </thead>
              <tbody>
                ${earningsRows}
              </tbody>
              <tfoot>
                <tr class="total-row">
                  <td>Gross Pay</td>
                  <td class="amount-cell">${grossFormatted}</td>
                </tr>
              </tfoot>
            </table>
          </div>

          <div class="deductions-table-wrapper">
            <table class="payslip-table">
              <thead>
                <tr>
                  <th class="col-label">Deductions</th>
                  <th class="col-amount">Amount</th>
                </tr>
              </thead>
              <tbody>
                ${deductionsRows}
              </tbody>
              <tfoot>
                <tr class="total-row">
                  <td>Total Deductions</td>
                  <td class="amount-cell">${totalDeductionsFormatted}</td>
                </tr>
              </tfoot>
            </table>
          </div>
          <div class="netpay-box" style="margin-top: 4mm; margin-left: auto;">
            <div class="netpay-label">Net Pay</div>
            <div class="netpay-amount">${netFormatted}</div>
          </div>
        </section>

        <section class="bottom-section">
          <div class="stamp-area">
            ${company.stampDataUrl
      ? `<img src="${company.stampDataUrl}" class="stamp-image" alt="Stamp" />`
      : `<div class="stamp-placeholder">Stamp</div>`
    }
          </div>
        </section>

        <footer class="payslip-footer">
          <div class="disclaimer">
            Disclaimer: This is a system generated report and doesn&apos;t require any signature.
          </div>
          <div class="timestamp">${timestampFormatted}</div>
        </footer>
      </div>
    </div>
  </body>
</html>`;

  return html;
}
