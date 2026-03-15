"use client";

import Image from "next/image";
import { cloudinaryLoader } from "@/lib/cloudinaryLoader";

interface WorkImageProps {
  src: string;
  alt: string;
  sizes?: string;
}

export function WorkImage({ src, alt, sizes = "(max-width: 768px) 100vw, 50vw" }: WorkImageProps) {
  return (
    <div className="relative w-full h-full bg-gray-200">
      <Image
        loader={cloudinaryLoader}
        src={src}
        alt={alt}
        fill
        className="object-cover"
        sizes={sizes}
      />
    </div>
  );
}
