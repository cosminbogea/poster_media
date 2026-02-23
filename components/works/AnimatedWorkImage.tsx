"use client";

import Image from "next/image";

interface AnimatedWorkImageProps {
  src: string;
  alt: string;
  slug: string;
  className?: string;
  onLoad?: (naturalWidth: number, naturalHeight: number) => void;
}

export function AnimatedWorkImage({
  src,
  alt,
  className = "",
  onLoad,
}: AnimatedWorkImageProps) {
  return (
    <div className={`relative bg-gray-200 ${className}`}>
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover"
        sizes="50vw"
        onLoad={onLoad ? (e) => onLoad(e.currentTarget.naturalWidth, e.currentTarget.naturalHeight) : undefined}
      />
    </div>
  );
}
