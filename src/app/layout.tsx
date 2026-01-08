import type { Metadata } from "next";
import "../styles/global.css";

export const metadata: Metadata = {
  title: "Payslip Generator",
  description: "Generate company payslips as PDF with a live preview."
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
