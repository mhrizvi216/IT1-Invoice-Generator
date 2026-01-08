import { DateFormatStyle } from "./types";

export function formatMoney(
  amountMinor: number,
  useDecimals: boolean
): string {
  const factor = useDecimals ? 100 : 1;
  const decimals = useDecimals ? 2 : 0;
  const value = amountMinor / factor;
  return value.toLocaleString("en-US", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals
  });
}

function getOrdinalSuffix(day: number): string {
  if (day >= 11 && day <= 13) return "th";
  switch (day % 10) {
    case 1:
      return "st";
    case 2:
      return "nd";
    case 3:
      return "rd";
    default:
      return "th";
  }
}

export function formatPayDate(dateIso: string, style: DateFormatStyle): string {
  const d = new Date(dateIso);
  if (Number.isNaN(d.getTime())) return "";

  const day = d.getDate();
  const monthShort = d.toLocaleString("en-US", { month: "short" });
  const yearShort = d.getFullYear().toString().slice(-2);

  if (style === "ordinal-short") {
    return `${day}${getOrdinalSuffix(day)}-${monthShort}-${yearShort}`;
  }

  const dayPadded = String(day).padStart(2, "0");
  const yearFull = d.getFullYear();
  return `${dayPadded}-${monthShort}-${yearFull}`;
}

export function formatTimestamp(date: Date): string {
  const d = date;
  const day = String(d.getDate()).padStart(2, "0");
  const monthShort = d.toLocaleString("en-US", { month: "short" }).toUpperCase();
  const yearFull = d.getFullYear();
  const hours = String(d.getHours()).padStart(2, "0");
  const minutes = String(d.getMinutes()).padStart(2, "0");

  return `${day}-${monthShort} ${yearFull}  ${hours}:${minutes}`;
}
