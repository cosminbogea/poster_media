/**
 * Cloudinary cache warming script.
 *
 * Reads all image URLs from data/projects.ts automatically,
 * then requests each one at every width Next.js will use —
 * so Cloudinary pre-generates and caches every variant before any visitor arrives.
 *
 * Run after adding a new project or deploying new images:
 *   node scripts/warm-cache.mjs
 */

import { readFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

// Widths Next.js requests (default deviceSizes)
const WIDTHS = [640, 828, 1080, 1200, 1920];

// Concurrency — how many requests to fire at once
const CONCURRENCY = 15;

// ─── Extract all Cloudinary image URLs from projects.ts ──────────────────────
const projectsFile = readFileSync(resolve(__dirname, "../data/projects.ts"), "utf-8");
const urlRegex = /https:\/\/res\.cloudinary\.com\/[^\s"']+\.(?:webp|jpg|png|jpeg)/g;
const images = [...new Set(projectsFile.match(urlRegex) ?? [])];

if (images.length === 0) {
  console.error("No Cloudinary image URLs found in data/projects.ts");
  process.exit(1);
}

// ─── Build all URLs with transforms ──────────────────────────────────────────
const allUrls = images.flatMap((src) =>
  WIDTHS.map((w) =>
    src.replace("/image/upload/", `/image/upload/f_auto,q_auto,w_${w}/`)
  )
);

// ─── Fetch in parallel batches ────────────────────────────────────────────────
async function fetchUrl(url) {
  try {
    const res = await fetch(url, { method: "HEAD" });
    return { url, ok: res.ok, status: res.status };
  } catch (err) {
    return { url, ok: false, status: err.message };
  }
}

async function runInBatches(urls, concurrency) {
  const results = [];
  let done = 0;
  for (let i = 0; i < urls.length; i += concurrency) {
    const batch = urls.slice(i, i + concurrency);
    const batchResults = await Promise.all(batch.map(fetchUrl));
    results.push(...batchResults);
    done += batch.length;
    process.stdout.write(`\r  Warming... ${done}/${urls.length}`);
  }
  return results;
}

console.log(
  `\nFound ${images.length} images × ${WIDTHS.length} widths = ${allUrls.length} URLs\n`
);

const results = await runInBatches(allUrls, CONCURRENCY);
const failed = results.filter((r) => !r.ok);

console.log(
  `\n\n  ✓ ${results.length - failed.length}/${results.length} cached successfully.`
);

if (failed.length > 0) {
  console.log(`\n  ✗ Failed (${failed.length}):`);
  failed.forEach((r) => console.log(`    [${r.status}] ${r.url}`));
}
