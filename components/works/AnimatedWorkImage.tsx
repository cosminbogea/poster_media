"use client";

import Image from "next/image";

interface AnimatedWorkImageProps {
  src: string;
  alt: string;
  slug: string;
  className?: string;
}

export function AnimatedWorkImage({
  src,
  alt,
  className = "",
}: AnimatedWorkImageProps) {
  return (
    <div className={`relative bg-gray-200 ${className}`}>
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
