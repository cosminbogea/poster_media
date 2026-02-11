"use client";

import Image from "next/image";
import { ImageWidth } from "@/types/project";

interface AnimatedWorkImageProps {
  src: string;
  alt: string;
  width: ImageWidth;
  slug: string;
  className?: string;
}

export function AnimatedWorkImage({
  src,
  alt,
  width,
  className = "",
}: AnimatedWorkImageProps) {
  return (
    <div className={`relative bg-gray-200 ${className}`}>
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover"
        sizes={
          width === "100"
            ? "50vw"
            : width === "50"
            ? "25vw"
            : "15vw"
        }
      />
    </div>
  );
}
