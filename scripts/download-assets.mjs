/**
 * Downloads all original Cloudinary assets from data/projects.ts.
 *
 * Saves to assets/ with the original filename (e.g. still-01_ves5rj.jpg).
 * Run: node scripts/download-assets.mjs
 */

import { readFileSync, mkdirSync, writeFileSync, existsSync } from "fs";
import { resolve, dirname, basename } from "path";
import { fileURLToPath } from "url";

const __dir = dirname(fileURLToPath(import.meta.url));
const projectsFile = readFileSync(
  resolve(__dir, "../data/projects.ts"),
  "utf-8",
);
const outDir = resolve(__dir, "../assets");
mkdirSync(outDir, { recursive: true });

// Extract all Cloudinary URLs (images + videos)
const allUrls = [
  ...new Set(
    projectsFile.match(/https:\/\/res\.cloudinary\.com\/[^\s"']+/g) ?? [],
  ),
];

if (allUrls.length === 0) {
  console.error("No Cloudinary URLs found in data/projects.ts");
  process.exit(1);
}

console.log(`\nFound ${allUrls.length} assets to download.\n`);

async function downloadUrl(url) {
  console.log("lets see the url", url);
  const filename = basename(url.split("?")[0]);
  const outPath = resolve(outDir, filename);

  if (existsSync(outPath)) {
    return { url, filename, status: "skipped (already exists)" };
  }

  try {
    const res = await fetch(url);
    if (!res.ok) {
      return { url, filename, status: `FAILED (HTTP ${res.status})` };
    }
    const buffer = Buffer.from(await res.arrayBuffer());
    writeFileSync(outPath, buffer);
    return {
      url,
      filename,
      status: `ok (${(buffer.length / 1024).toFixed(0)} KB)`,
    };
  } catch (err) {
    return { url, filename, status: `FAILED (${err.message})` };
  }
}

// Run in batches of 8 parallel downloads
const CONCURRENCY = 8;
const results = [];
for (let i = 0; i < allUrls.length; i += CONCURRENCY) {
  const batch = allUrls.slice(i, i + CONCURRENCY);
  const batchResults = await Promise.all(batch.map(downloadUrl));
  results.push(...batchResults);
  process.stdout.write(`\r  ${results.length}/${allUrls.length} done...`);
}
process.stdout.write("\n\n");

const failed = results.filter((r) => r.status.startsWith("FAILED"));
const skipped = results.filter((r) => r.status.startsWith("skipped"));
const ok = results.filter((r) => r.status.startsWith("ok"));

console.log(`  ✓ Downloaded: ${ok.length}`);
if (skipped.length > 0)
  console.log(`  − Skipped (already exist): ${skipped.length}`);
if (failed.length > 0) {
  console.log(
    `\n  ✗ Failed (${failed.length}) — Cloudinary CDN may be blocked:`,
  );
  failed.forEach((r) => console.log(`    ${r.filename}  →  ${r.status}`));
  console.log(
    "\n  If all failed: put your original files manually into assets/ and skip this script.",
  );
} else {
  console.log("\n  All assets saved to assets/");
  console.log("  Next: node scripts/process-images.mjs");
}
