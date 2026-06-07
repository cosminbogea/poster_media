/**
 * Cloudinary cache warming script.
 *
 * Reads all image and video URLs from data/projects.ts automatically,
 * requests each transformed variant so Cloudinary pre-generates and caches
 * them before any visitor arrives.
 *
 * Run once after adding new media or changing transformation params:
 *   node scripts/warm-cache.mjs
 */

import { readFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dir = dirname(fileURLToPath(import.meta.url));
const projectsFile = readFileSync(resolve(__dir, "../data/projects.ts"), "utf-8");

// ─── Image URLs ───────────────────────────────────────────────────────────────
// Widths Next.js will actually request based on our sizes attributes
const IMAGE_WIDTHS = [640, 828, 1080, 1200, 1920];

const imageUrls = [
  ...new Set(
    (projectsFile.match(/https:\/\/res\.cloudinary\.com\/[^\s"']+\.(?:webp|jpg|png|jpeg)/g) ?? [])
  ),
];

const allImageVariants = imageUrls.flatMap((src) =>
  IMAGE_WIDTHS.map((w) =>
    src.replace("/image/upload/", `/image/upload/f_auto,q_auto,w_${w}/`)
  )
);

// ─── Video URLs ───────────────────────────────────────────────────────────────
const videoUrls = [
  ...new Set(
    (projectsFile.match(/https:\/\/res\.cloudinary\.com\/[^\s"']+\.mp4/g) ?? [])
  ),
];

const allVideoVariants = videoUrls.map((src) =>
  src.replace("/video/upload/", "/video/upload/q_auto,w_1280/")
);

// ─── Fetch helpers ─────────────────────────────────────────────────────────────
// Use Range: bytes=0-0 instead of HEAD — forces Cloudinary to actually generate
// the transformation, not just check if it exists.
async function warmUrl(url, label) {
  try {
    const res = await fetch(url, {
      headers: { Range: "bytes=0-0" },
    });
    const ok = res.ok || res.status === 206; // 206 = Partial Content, expected for range requests
    return { url, ok, label };
  } catch (err) {
    return { url, ok: false, label, error: err.message };
  }
}

async function runBatches(items, concurrency = 12) {
  const results = [];
  for (let i = 0; i < items.length; i += concurrency) {
    const batch = items.slice(i, i + concurrency);
    results.push(...(await Promise.all(batch.map(({ url, label }) => warmUrl(url, label)))));
    process.stdout.write(`\r  ${results.length}/${items.length} done...`);
  }
  process.stdout.write("\n");
  return results;
}

// ─── Run ───────────────────────────────────────────────────────────────────────
const imageItems = allImageVariants.map((url) => ({ url, label: "image" }));
const videoItems = allVideoVariants.map((url) => ({ url, label: "video" }));
const all = [...imageItems, ...videoItems];

console.log(`\nFound:`);
console.log(`  ${imageUrls.length} images × ${IMAGE_WIDTHS.length} widths = ${allImageVariants.length} image variants`);
console.log(`  ${videoUrls.length} videos × 1 variant each = ${allVideoVariants.length} video variants`);
console.log(`  Total: ${all.length} requests\n`);

const results = await runBatches(all);

const failed  = results.filter((r) => !r.ok);
const success = results.length - failed.length;

console.log(`\n  ✓ ${success}/${results.length} cached successfully.`);

if (failed.length > 0) {
  console.log(`\n  ✗ Failed (${failed.length}):`);
  failed.forEach((r) => console.log(`    ${r.url}  →  ${r.error ?? "non-ok response"}`));
}

console.log("\n  Done. All variants are now cached on Cloudinary's CDN.\n");
