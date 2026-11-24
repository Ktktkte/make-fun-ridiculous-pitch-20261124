// Ridiculous at First Glance, Real by the Second — v1 entry.
// Writes the one-sentence startup pitch from entry.txt to /output/entry.txt.
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const text = readFileSync(join(here, "entry.txt"), "utf8").trim();
if (text.length < 1 || text.length > 200) {
  throw new Error(`entry must be 1-200 chars, got ${text.length}`);
}
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
const outPath = join(outDir, "entry.txt");
writeFileSync(outPath, text, "utf8");
// Read back and confirm the output matches the entry byte for byte.
const written = readFileSync(outPath, "utf8");
if (written !== text) {
  throw new Error("output does not match entry.txt");
}
