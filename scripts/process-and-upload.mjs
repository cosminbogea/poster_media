/**
 * Processes all media assets from public/poster_media_assets/ and uploads to R2.
 *
 * Images  → 5 WebP variants at 640/828/1080/1200/1920px via sharp
 * Videos  → uploaded as-is (MP4) + poster frame extracted via ffmpeg
 * MOV     → converted to MP4 via ffmpeg first
 *
 * Requires in .env.local:
 *   R2_ACCOUNT_ID, R2_BUCKET, R2_ACCESS_KEY_ID, R2_SECRET_ACCESS_KEY, R2_PUBLIC_URL
 *
 * Run: node scripts/process-and-upload.mjs
 */

import { readFileSync, writeFileSync, mkdirSync, existsSync, rmSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";
import { execSync } from "child_process";
import sharp from "sharp";
import { S3Client, PutObjectCommand, HeadObjectCommand } from "@aws-sdk/client-s3";

const __dir = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dir, "..");
const ASSETS = resolve(ROOT, "public/poster_media_assets");
const TMP = resolve(ROOT, "tmp-upload");

// ─── Load .env.local ──────────────────────────────────────────────────────────
const envLines = readFileSync(resolve(ROOT, ".env.local"), "utf-8").split("\n");
for (const line of envLines) {
  const m = line.match(/^([^=#\s][^=]*)=(.*)$/);
  if (m) process.env[m[1].trim()] = m[2].trim().replace(/^["']|["']$/g, "");
}
const { R2_ACCOUNT_ID, R2_BUCKET, R2_ACCESS_KEY_ID, R2_SECRET_ACCESS_KEY, R2_PUBLIC_URL } = process.env;
if (!R2_ACCOUNT_ID || !R2_BUCKET || !R2_ACCESS_KEY_ID || !R2_SECRET_ACCESS_KEY || !R2_PUBLIC_URL) {
  console.error("Missing R2 env vars. Add to .env.local: R2_ACCOUNT_ID, R2_BUCKET, R2_ACCESS_KEY_ID, R2_SECRET_ACCESS_KEY, R2_PUBLIC_URL");
  process.exit(1);
}

// ─── File mapping: source path → R2 key prefix ───────────────────────────────
// type "image" → generates 5 WebP variants: {key}-{width}.webp
// type "video" → uploads {key}.mp4 + extracts {key}-poster.jpg
// type "cover" → image used as a video poster (same as "image")

const FILE_MAP = [
  // JUSTIN (21 stills)
  { src: "jjh/JSP04742.jpg",  key: "justin/still-01", type: "image" },
  { src: "jjh/JSP04796.jpg",  key: "justin/still-02", type: "image" },
  { src: "jjh/JSP04851.jpg",  key: "justin/still-03", type: "image" },
  { src: "jjh/JSP04859.jpg",  key: "justin/still-04", type: "image" },
  { src: "jjh/JSP04920.jpg",  key: "justin/still-05", type: "image" },
  { src: "jjh/JSP04958.jpg",  key: "justin/still-06", type: "image" },
  { src: "jjh/JSP05089.jpg",  key: "justin/still-07", type: "image" },
  { src: "jjh/JSP05104.jpg",  key: "justin/still-08", type: "image" },
  { src: "jjh/JSP05123.jpg",  key: "justin/still-09", type: "image" },
  { src: "jjh/JSP05152.jpg",  key: "justin/still-10", type: "image" },
  { src: "jjh/JSP05158.jpg",  key: "justin/still-11", type: "image" },
  { src: "jjh/JSP05206.jpg",  key: "justin/still-12", type: "image" },
  { src: "jjh/JSP05211.jpg",  key: "justin/still-13", type: "image" },
  { src: "jjh/JSP05220.jpg",  key: "justin/still-14", type: "image" },
  { src: "jjh/JSP05227.jpg",  key: "justin/still-15", type: "image" },
  { src: "jjh/JSP05247.jpg",  key: "justin/still-16", type: "image" },
  { src: "jjh/JSP05251.jpg",  key: "justin/still-17", type: "image" },
  { src: "jjh/JSP05254.jpg",  key: "justin/still-18", type: "image" },
  { src: "jjh/JSP05255.jpg",  key: "justin/still-19", type: "image" },
  { src: "jjh/JSP05258.jpg",  key: "justin/still-20", type: "image" },
  { src: "jjh/JSP05348.jpg",  key: "justin/still-21", type: "image" },

  // BRYAN (4 stills + locandina + 1 video)
  { src: "bryan/DSC01361.jpg",    key: "bryan/still-01", type: "image" },
  { src: "bryan/P6_04600.jpg",    key: "bryan/still-02", type: "image" },
  { src: "bryan/P6_05593.jpg",    key: "bryan/still-03", type: "image" },
  { src: "bryan/P6_06414.jpg",    key: "bryan/still-04", type: "image" },
  { src: "bryan/locandina0.png",  key: "bryan/still-05", type: "image" },
  { src: "bryan/output.mp4",      key: "bryan/video-01", type: "video" },

  // Q3 (13 stills)
  { src: "q3/@Bigdedo.ph_03.jpg",         key: "q3/still-01", type: "image" },
  { src: "q3/@Bigdedo.ph_05.jpg",         key: "q3/still-02", type: "image" },
  { src: "q3/@Bigdedo.ph_06.jpg",         key: "q3/still-03", type: "image" },
  { src: "q3/@Bigdedo.ph_34.jpg",         key: "q3/still-04", type: "image" },
  { src: "q3/@Bigdedo.ph_37.jpg",         key: "q3/still-05", type: "image" },
  { src: "q3/017_lucaballe98_audiQ3.jpg", key: "q3/still-06", type: "image" },
  { src: "q3/018_lucaballe98_audiQ3.jpg", key: "q3/still-07", type: "image" },
  { src: "q3/JSP00790.jpg",               key: "q3/still-08", type: "image" },
  { src: "q3/JSP00816.jpg",               key: "q3/still-09", type: "image" },
  { src: "q3/JSP00822.jpg",               key: "q3/still-10", type: "image" },
  { src: "q3/JSP00853.jpg",               key: "q3/still-11", type: "image" },
  { src: "q3/JSP00902.jpg",               key: "q3/still-12", type: "image" },
  { src: "q3/JSP00940.jpg",               key: "q3/still-13", type: "image" },

  // Q4 (6 stills)
  { src: "q4/DSC04075.jpg", key: "q4/still-01", type: "image" },
  { src: "q4/DSC04077.jpg", key: "q4/still-02", type: "image" },
  { src: "q4/DSC04093.jpg", key: "q4/still-03", type: "image" },
  { src: "q4/DSC04228.jpg", key: "q4/still-04", type: "image" },
  { src: "q4/DSC04253.jpg", key: "q4/still-05", type: "image" },
  { src: "q4/DSC04341.jpg", key: "q4/still-06", type: "image" },

  // RBR (9 stills + 1 video)
  { src: "rbr/output.mp4",   key: "rbr/video-01", type: "video" },
  { src: "rbr/JSP07645.jpg", key: "rbr/still-01", type: "image" },
  { src: "rbr/JSP07677.jpg", key: "rbr/still-02", type: "image" },
  { src: "rbr/JSP07683.jpg", key: "rbr/still-03", type: "image" },
  { src: "rbr/JSP07749.jpg", key: "rbr/still-04", type: "image" },
  { src: "rbr/JSP07764.jpg", key: "rbr/still-05", type: "image" },
  { src: "rbr/JSP07796.jpg", key: "rbr/still-06", type: "image" },
  { src: "rbr/JSP07800.jpg", key: "rbr/still-07", type: "image" },
  { src: "rbr/JSP07821.jpg", key: "rbr/still-08", type: "image" },
  { src: "rbr/JSP08018.jpg", key: "rbr/still-09", type: "image" },

  // RBRDOCS (3 covers + 3 videos — one MOV needs conversion)
  { src: "rbrd/copertine/IMG_9387.jpg",                   key: "rbrdocs/cover-01", type: "image" },
  { src: "rbrd/copertine/IMG_9429.jpg",                   key: "rbrdocs/cover-02", type: "image" },
  { src: "rbrd/copertine/IMG_9763.jpg",                   key: "rbrdocs/cover-03", type: "image" },
  { src: "rbrd/Captions_5843CD.MP4",                      key: "rbrdocs/video-01", type: "video" },
  { src: "rbrd/Captions_CBE54B.MP4",                      key: "rbrdocs/video-02", type: "video" },
  { src: "rbrd/6dd71b2557b84301b6c89668db502dd6.MOV",     key: "rbrdocs/video-03", type: "video" },

  // SMADONNATA (9 stills + 3 videos, 3 sub-brands)
  { src: "smadonnata/audi/JSP04273.jpg", key: "smadonnata/audi-still-01", type: "image" },
  { src: "smadonnata/audi/JSP04284.jpg", key: "smadonnata/audi-still-02", type: "image" },
  { src: "smadonnata/audi/JSP04301.jpg", key: "smadonnata/audi-still-03", type: "image" },
  { src: "smadonnata/audi/a6.mp4",       key: "smadonnata/audi-video",    type: "video" },
  { src: "smadonnata/skoda/JSP04343.jpg",  key: "smadonnata/skoda-still-01", type: "image" },
  { src: "smadonnata/skoda/JSP04358.jpg",  key: "smadonnata/skoda-still-02", type: "image" },
  { src: "smadonnata/skoda/JSP04383.jpg",  key: "smadonnata/skoda-still-03", type: "image" },
  { src: "smadonnata/skoda/elroq_2.mp4",   key: "smadonnata/skoda-video",    type: "video" },
  { src: "smadonnata/vw/JSP04395.jpg", key: "smadonnata/vw-still-01", type: "image" },
  { src: "smadonnata/vw/JSP04401.jpg", key: "smadonnata/vw-still-02", type: "image" },
  { src: "smadonnata/vw/JSP04421.jpg", key: "smadonnata/vw-still-03", type: "image" },
  { src: "smadonnata/vw/id3_2.mp4",    key: "smadonnata/vw-video",    type: "video" },
];

const IMAGE_WIDTHS = [640, 828, 1080, 1200, 1920];

// ─── R2 client ────────────────────────────────────────────────────────────────
const s3 = new S3Client({
  region: "auto",
  endpoint: `https://${R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: { accessKeyId: R2_ACCESS_KEY_ID, secretAccessKey: R2_SECRET_ACCESS_KEY },
});

// ─── Helpers ──────────────────────────────────────────────────────────────────
function run(cmd) {
  execSync(cmd, { stdio: "pipe" });
}

async function existsOnR2(key) {
  try {
    await s3.send(new HeadObjectCommand({ Bucket: R2_BUCKET, Key: key }));
    return true;
  } catch {
    return false;
  }
}

async function uploadFile(key, filePath, contentType) {
  if (await existsOnR2(key)) {
    return "skipped";
  }
  const body = readFileSync(filePath);
  await s3.send(new PutObjectCommand({
    Bucket: R2_BUCKET,
    Key: key,
    Body: body,
    ContentType: contentType,
    CacheControl: "public, max-age=31536000, immutable",
  }));
  return "uploaded";
}

function mimeType(filename) {
  if (filename.endsWith(".webp")) return "image/webp";
  if (filename.endsWith(".jpg") || filename.endsWith(".jpeg")) return "image/jpeg";
  if (filename.endsWith(".mp4")) return "video/mp4";
  return "application/octet-stream";
}

// ─── Main ─────────────────────────────────────────────────────────────────────
mkdirSync(TMP, { recursive: true });

let uploaded = 0, skipped = 0, errors = 0;
const total = FILE_MAP.length;

console.log(`\nProcessing ${total} assets...\n`);

for (let i = 0; i < FILE_MAP.length; i++) {
  const { src, key, type } = FILE_MAP[i];
  const srcPath = resolve(ASSETS, src);
  const label = `[${i + 1}/${total}] ${key}`;

  if (!existsSync(srcPath)) {
    console.error(`  ✗ ${label} — source not found: ${src}`);
    errors++;
    continue;
  }

  try {
    if (type === "image") {
      // Generate 5 WebP variants
      for (const width of IMAGE_WIDTHS) {
        const outKey = `${key}-${width}.webp`;
        const tmpFile = resolve(TMP, outKey.replace(/\//g, "_"));
        mkdirSync(dirname(tmpFile), { recursive: true });

        await sharp(srcPath)
          .resize(width, null, { withoutEnlargement: true })
          .webp({ quality: 82 })
          .toFile(tmpFile);

        const result = await uploadFile(outKey, tmpFile, "image/webp");
        if (result === "uploaded") uploaded++;
        else skipped++;
      }
      console.log(`  ✓ ${label} — ${IMAGE_WIDTHS.length} WebP variants`);

    } else if (type === "video") {
      // Convert MOV → MP4 if needed
      let mp4Path = srcPath;
      const isConversion = /\.(mov|MOV)$/.test(src);
      if (isConversion) {
        mp4Path = resolve(TMP, key.replace(/\//g, "_") + ".mp4");
        console.log(`  ↻ ${label} — converting MOV → MP4...`);
        run(`ffmpeg -y -i "${srcPath}" -c:v libx264 -crf 23 -preset medium -c:a aac -b:a 128k -movflags +faststart "${mp4Path}" 2>/dev/null`);
      }

      // Upload video
      const videoKey = `${key}.mp4`;
      const vResult = await uploadFile(videoKey, mp4Path, "video/mp4");
      if (vResult === "uploaded") uploaded++;
      else skipped++;

      // Extract poster frame
      const posterKey = `${key}-poster.jpg`;
      const posterTmp = resolve(TMP, posterKey.replace(/\//g, "_"));
      run(`ffmpeg -y -i "${mp4Path}" -ss 0 -frames:v 1 -q:v 3 "${posterTmp}" 2>/dev/null`);
      const pResult = await uploadFile(posterKey, posterTmp, "image/jpeg");
      if (pResult === "uploaded") uploaded++;
      else skipped++;

      console.log(`  ✓ ${label} — video + poster${isConversion ? " (converted from MOV)" : ""}`);
    }
  } catch (err) {
    console.error(`  ✗ ${label} — ${err.message}`);
    errors++;
  }
}

// Cleanup tmp
rmSync(TMP, { recursive: true, force: true });

console.log(`\n─────────────────────────────────────────`);
console.log(`  ✓ Uploaded: ${uploaded}`);
console.log(`  − Skipped (already on R2): ${skipped}`);
if (errors > 0) console.log(`  ✗ Errors: ${errors}`);
console.log(`\n  Base URL: ${R2_PUBLIC_URL}`);
console.log(`\n  Next: update data/projects.ts with the new URLs.`);
console.log(`  Example: ${R2_PUBLIC_URL}/justin/still-01 → serves as still-01-828.webp\n`);
