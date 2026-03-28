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
