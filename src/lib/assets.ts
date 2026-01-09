import fs from "fs";
import path from "path";

/**
 * Helper to converting images to Base64 for embedding in PDFs.
 * This is critical for Vercel/Serverless environments where filesystem access to public assets
 * via URL or relative path is not reliable during puppeteer execution.
 */
export function imageToBase64(relativePath: string, mime = "image/png"): string {
  try {
    // In Vercel, process.cwd() is the root of the function
    const assetPath = path.join(process.cwd(), "public", relativePath);

    if (!fs.existsSync(assetPath)) {
      console.warn(`Asset not found at ${assetPath}`);
      return "";
    }

    const file = fs.readFileSync(assetPath);
    return `data:${mime};base64,${file.toString("base64")}`;
  } catch (error) {
    console.error(`Failed to read embedded asset at ${relativePath}:`, error);
    return "";
  }
}

// Convert assets to Base64 once (or on demand)
const LOGO_PATH = "it1-logo.png";
const STAMP_PATH = "IT1_Stamp.png";

function rawBase64(relativePath: string): string {
  try {
    const assetPath = path.join(process.cwd(), "public", relativePath);
    if (!fs.existsSync(assetPath)) return "";
    return fs.readFileSync(assetPath).toString("base64");
  } catch (e) {
    console.error(e);
    return "";
  }
}

export const DEFAULT_LOGO_B64 = rawBase64("it1-logo.png");
export const DEFAULT_STAMP_B64 = rawBase64("IT1_Stamp.png");

