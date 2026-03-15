/**
 * Warms Cloudinary CDN cache by requesting every image at each width
 * that Next.js will request via the cloudinaryLoader.
 *
 * Run once before a demo or after deploying new images:
 *   node scripts/warm-cache.mjs
 */

const WIDTHS = [640, 828, 1080, 1200, 1920];
const QUALITY = 75;

const images = [
  // BRYAN
  "https://res.cloudinary.com/djhods3my/image/upload/v1773572266/still-01_nnsudo.webp",
  "https://res.cloudinary.com/djhods3my/image/upload/v1773572266/still-02_btkf5y.webp",
  "https://res.cloudinary.com/djhods3my/image/upload/v1773572267/still-03_tddbhv.webp",
  "https://res.cloudinary.com/djhods3my/image/upload/v1773572267/still-04_pecgig.webp",
  "https://res.cloudinary.com/djhods3my/image/upload/v1773572268/still-05_ac2j18.webp",
  // Q3
  "https://res.cloudinary.com/djhods3my/image/upload/v1773573317/still-01_rareue.webp",
  "https://res.cloudinary.com/djhods3my/image/upload/v1773573317/still-02_hvlteh.webp",
  "https://res.cloudinary.com/djhods3my/image/upload/v1773573318/still-03_b803lq.webp",
  "https://res.cloudinary.com/djhods3my/image/upload/v1773573318/still-04_zfe8rc.webp",
  "https://res.cloudinary.com/djhods3my/image/upload/v1773573318/still-05_dgogfb.webp",
  "https://res.cloudinary.com/djhods3my/image/upload/v1773573320/still-06_tddbpa.webp",
  "https://res.cloudinary.com/djhods3my/image/upload/v1773573321/still-07_ksotbd.webp",
  "https://res.cloudinary.com/djhods3my/image/upload/v1773573321/still-08_nrmzud.webp",
  "https://res.cloudinary.com/djhods3my/image/upload/v1773573322/still-09_txtazy.webp",
  "https://res.cloudinary.com/djhods3my/image/upload/v1773573323/still-10_ekyuq2.webp",
  "https://res.cloudinary.com/djhods3my/image/upload/v1773573324/still-11_ckvs1d.webp",
  "https://res.cloudinary.com/djhods3my/image/upload/v1773573325/still-12_fdqarg.webp",
  "https://res.cloudinary.com/djhods3my/image/upload/v1773573326/still-13_dnjzft.webp",
  // Q4
  "https://res.cloudinary.com/djhods3my/image/upload/v1773573341/still-01_trskoh.webp",
  "https://res.cloudinary.com/djhods3my/image/upload/v1773573341/still-02_elzo6z.webp",
  "https://res.cloudinary.com/djhods3my/image/upload/v1773573342/still-03_craqn0.webp",
  "https://res.cloudinary.com/djhods3my/image/upload/v1773573343/still-04_jeu83w.webp",
  "https://res.cloudinary.com/djhods3my/image/upload/v1773573344/still-05_ybuf0f.webp",
  "https://res.cloudinary.com/djhods3my/image/upload/v1773573345/still-06_czhey3.webp",
  // RBR
  "https://res.cloudinary.com/djhods3my/image/upload/v1773573362/still-01_dxt0s0.webp",
  "https://res.cloudinary.com/djhods3my/image/upload/v1773573363/still-02_gamwln.webp",
  "https://res.cloudinary.com/djhods3my/image/upload/v1773573364/still-03_lg1bho.webp",
  "https://res.cloudinary.com/djhods3my/image/upload/v1773573366/still-04_uumsdo.webp",
  "https://res.cloudinary.com/djhods3my/image/upload/v1773573367/still-05_etnc0n.webp",
  "https://res.cloudinary.com/djhods3my/image/upload/v1773573368/still-06_m7lnps.webp",
  "https://res.cloudinary.com/djhods3my/image/upload/v1773573369/still-07_codipn.webp",
  "https://res.cloudinary.com/djhods3my/image/upload/v1773573370/still-08_ozpz9j.webp",
  "https://res.cloudinary.com/djhods3my/image/upload/v1773573371/still-09_zof9iy.webp",
  // video poster
  "https://res.cloudinary.com/djhods3my/image/upload/v1771881675/locandina0_sapy7q.webp",
];

const total = images.length * WIDTHS.length;
console.log(`Warming ${images.length} images × ${WIDTHS.length} sizes = ${total} requests\n`);

let done = 0;
for (const src of images) {
  for (const w of WIDTHS) {
    const url = src.replace("/image/upload/", `/image/upload/f_auto,q_${QUALITY},w_${w}/`);
    const res = await fetch(url);
    done++;
    const name = src.split("/").pop();
    console.log(`[${String(done).padStart(3)}/${total}] ${res.status} w_${w}  ${name}`);
  }
}

console.log("\nDone — all variants cached at Cloudinary edge.");
