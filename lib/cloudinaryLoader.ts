import type { ImageLoaderProps } from "next/image";

// Snaps to the nearest pre-generated variant width.
// Next.js deviceSizes includes 750, 2048, 3840 which we didn't generate —
// snapping avoids 404s and always serves the best available variant.
const WIDTHS = [640, 828, 1080, 1200, 1920];

export function cloudinaryLoader({ src, width }: ImageLoaderProps): string {
  const w = WIDTHS.find((w) => w >= width) ?? 1920;
  return `${src}-${w}.webp`;
}

// Videos are served as-is from R2 (MP4).
export function cloudinaryVideoSrc(src: string): string {
  return src;
}

export function cloudinaryVideoSrcHD(src: string): string {
  return src;
}

// Derives a poster from a video URL: video-01.mp4 → video-01-poster.jpg
export function cloudinaryVideoPosterSrc(src: string): string {
  return src.replace(/\.mp4$/i, "-poster.jpg");
}

// Constructs a 1200px WebP from an image base URL (used for video poster= attr).
export function cloudinaryPosterSrc(src: string): string {
  return `${src}-1200.webp`;
}

// Full-res image for lightbox — defaults to 1920px.
export function cloudinaryImageSrc(src: string, width = 1920): string {
  return `${src}-${width}.webp`;
}
