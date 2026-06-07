import type { ImageLoaderProps } from "next/image";

/**
 * Custom Next.js image loader that injects Cloudinary transformation params
 * directly into the URL, bypassing the Next.js image optimization proxy.
 *
 * Result: browser fetches from Cloudinary CDN edge directly (1 hop instead of 2).
 * Cloudinary handles f_auto (AVIF/WebP negotiation), quality, and resizing.
 */
export function cloudinaryLoader({ src, width, quality }: ImageLoaderProps): string {
  const transforms = `f_auto,q_auto,w_${width}`;
  return src.replace("/image/upload/", `/image/upload/${transforms}/`);
}

export function cloudinaryVideoSrc(src: string): string {
  return src.replace("/video/upload/", "/video/upload/f_auto,q_auto,w_1280/");
}

// Returns the original uploaded file — no re-encoding, served directly from CDN.
// Only works correctly when the source was encoded with -movflags +faststart.
export function cloudinaryVideoSrcHD(src: string): string {
  return src;
}

// Derives a poster thumbnail from a Cloudinary video URL (first frame, JPEG)
export function cloudinaryVideoPosterSrc(src: string): string {
  return src
    .replace("/video/upload/", "/video/upload/f_auto,q_auto,w_1280,so_0/")
    .replace(/\.[^.]+$/, ".jpg");
}

export function cloudinaryPosterSrc(src: string): string {
  return src.replace("/image/upload/", "/image/upload/f_auto,q_auto,w_1200/");
}

export function cloudinaryImageSrc(src: string, width = 1920): string {
  return src.replace("/image/upload/", `/image/upload/f_auto,q_auto,w_${width}/`);
}
