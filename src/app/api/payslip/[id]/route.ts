import { NextRequest } from "next/server";
import puppeteer from "puppeteer";
import { getPayslip } from "../../../../lib/db";
import { renderPayslipHtml } from "../../../../server/renderPayslipHtml";

export const runtime = "nodejs";

interface Params {
  params: { id: string };
}

export async function GET(_req: NextRequest, { params }: Params) {
  const { id } = params;
  const record = getPayslip(id);

  if (!record) {
    return new Response("Not found", { status: 404 });
  }

  const html = renderPayslipHtml(record);

  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.setContent(html, { waitUntil: "networkidle0" });

  const pdfBuffer = await page.pdf({
    printBackground: true,
    preferCSSPageSize: true
  });

  await browser.close();

  return new Response(pdfBuffer as unknown as BodyInit, {
    status: 200,
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="payslip-${record.id}.pdf"`
    }
  });
}
