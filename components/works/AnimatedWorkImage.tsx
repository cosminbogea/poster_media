"use client";

import Image from "next/image";
import { motion } from "framer-motion";
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
  slug,
  className = "",
}: AnimatedWorkImageProps) {
  return (
    <motion.div
      layoutId={`image-${slug}`}
      className={`relative bg-gray-200 ${className}`}
      transition={{ duration: 0.6, ease: "easeInOut" }}
    >
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
    </motion.div>
  );
}
