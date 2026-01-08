import { readFileSync, writeFileSync, existsSync, mkdirSync } from "fs";
import { join } from "path";
import { PayslipCalculated, PayslipPayload } from "./types";
import { v4 as uuidv4 } from "uuid";

const DATA_DIR = join(process.cwd(), "data");
const PAYSLIPS_FILE = join(DATA_DIR, "payslips.json");

interface PayslipStore {
  payslips: PayslipCalculated[];
}

function ensureStore(): PayslipStore {
  if (!existsSync(DATA_DIR)) {
    mkdirSync(DATA_DIR, { recursive: true });
  }
  if (!existsSync(PAYSLIPS_FILE)) {
    const empty: PayslipStore = { payslips: [] };
    writeFileSync(PAYSLIPS_FILE, JSON.stringify(empty, null, 2), "utf8");
    return empty;
  }
  const raw = readFileSync(PAYSLIPS_FILE, "utf8");
  try {
    return JSON.parse(raw) as PayslipStore;
  } catch {
    const empty: PayslipStore = { payslips: [] };
    writeFileSync(PAYSLIPS_FILE, JSON.stringify(empty, null, 2), "utf8");
    return empty;
  }
}

function saveStore(store: PayslipStore) {
  writeFileSync(PAYSLIPS_FILE, JSON.stringify(store, null, 2), "utf8");
}

export function savePayslip(
  payload: PayslipPayload & { calculated: PayslipCalculated["calculated"] }
): PayslipCalculated {
  const id = uuidv4();
  const createdAt = new Date().toISOString();

  const record: PayslipCalculated = {
    ...payload,
    calculated: payload.calculated,
    createdAt,
    id
  };

  const store = ensureStore();
  store.payslips.push(record);
  saveStore(store);

  return record;
}

export function getPayslip(id: string): PayslipCalculated | null {
  const store = ensureStore();
  return store.payslips.find((p) => p.id === id) ?? null;
}
