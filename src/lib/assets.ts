import fs from "fs";
import path from "path";

/**
 * Default embedded assets as Base64 strings used by the PDF generator.
 *
 * These are loaded once at module initialization time from the project root
 * text files generated at build-time (`logo.txt`, `stamp.txt`). This keeps the
 * API route fully self-contained at runtime – it never needs to read from
 * user-specific or ephemeral file system locations.
 */

function readBase64Asset(relativePath: string): string {
  try {
    const assetPath = path.join(process.cwd(), relativePath);
    const content = fs.readFileSync(assetPath, "utf8");
    return content.trim();
  } catch (error) {
    console.error(`Failed to read embedded asset at ${relativePath}:`, error);
    return "";
  }
}

export const DEFAULT_LOGO_B64 = readBase64Asset("logo.txt");
export const DEFAULT_STAMP_B64 = readBase64Asset("stamp.txt");
