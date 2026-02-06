"use client";

import Image from "next/image";
import { ImageWidth } from "@/types/project";

interface WorkImageProps {
  src: string;
  alt: string;
  width: ImageWidth;
}

export function WorkImage({ src, alt, width }: WorkImageProps) {
  return (
    <div className="relative w-full h-full bg-gray-200">
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
