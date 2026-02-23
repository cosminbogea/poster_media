"use client";

import Image from "next/image";

interface WorkImageProps {
  src: string;
  alt: string;
}

export function WorkImage({ src, alt }: WorkImageProps) {
  return (
    <div className="relative w-full h-full bg-gray-200">
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover"
        sizes="50vw"
      />
    </div>
  );
}
