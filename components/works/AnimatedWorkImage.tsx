"use client";

import Image from "next/image";
import { cloudinaryLoader } from "@/lib/cloudinaryLoader";

interface AnimatedWorkImageProps {
  src: string;
  alt: string;
  slug: string;
  className?: string;
  priority?: boolean;
  sizes?: string;
  onLoad?: (naturalWidth: number, naturalHeight: number) => void;
}

export function AnimatedWorkImage({
  src,
  alt,
  className = "",
  priority = false,
  sizes = "(max-width: 768px) 100vw, 50vw",
  onLoad,
}: AnimatedWorkImageProps) {
  return (
    <div className={`relative bg-gray-200 ${className}`}>
      <Image
        loader={cloudinaryLoader}
        src={src}
        alt={alt}
        fill
        className="object-cover md:object-top"
        sizes={sizes}
        priority={priority}
        loading={priority ? "eager" : "lazy"}
        onLoad={
          onLoad
            ? (e) =>
                onLoad(
                  e.currentTarget.naturalWidth,
                  e.currentTarget.naturalHeight,
                )
            : undefined
        }
      />
    </div>
  );
}
