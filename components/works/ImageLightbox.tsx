"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { cloudinaryImageSrc } from "@/lib/cloudinaryLoader";

interface ImageLightboxProps {
  images: string[];
  initialIndex: number;
  alt: string;
  onClose: () => void;
}

export function ImageLightbox({
  images,
  initialIndex,
  alt,
  onClose,
}: ImageLightboxProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [direction, setDirection] = useState(0);
  const [mounted, setMounted] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = original;
    };
  }, []);

  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") navigate(1);
      if (e.key === "ArrowLeft") navigate(-1);
    }
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  });

  // Preload adjacent images so navigation feels instant
  useEffect(() => {
    const indices = [
      (currentIndex + 1) % images.length,
      (currentIndex - 1 + images.length) % images.length,
    ];
    indices.forEach((i) => {
      const img = new window.Image();
      img.src = cloudinaryImageSrc(images[i]);
    });
  }, [currentIndex, images]);

  function navigate(dir: number) {
    setDirection(dir);
    setCurrentIndex((prev) => (prev + dir + images.length) % images.length);
  }

  function handleTouchStart(e: React.TouchEvent) {
    setTouchStart(e.touches[0].clientX);
  }

  function handleTouchEnd(e: React.TouchEvent) {
    if (touchStart === null) return;
    const delta = touchStart - e.changedTouches[0].clientX;
    if (Math.abs(delta) > 50) navigate(delta > 0 ? 1 : -1);
    setTouchStart(null);
  }

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      <motion.div
        key="lightbox-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
        className="fixed inset-0 z-[9999] flex items-center justify-center bg-black"
        onClick={onClose}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {/* Image */}
        <AnimatePresence mode="wait" custom={direction}>
          <motion.img
            key={currentIndex}
            src={cloudinaryImageSrc(images[currentIndex])}
            alt={alt}
            custom={direction}
            initial={{ opacity: 0, scale: 0.96, x: direction * 40 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            exit={{ opacity: 0, scale: 0.96, x: direction * -40 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="max-h-full max-w-full object-contain"
            style={{ maxHeight: "90vh", maxWidth: "90vw" }}
            onClick={(e) => e.stopPropagation()}
          />
        </AnimatePresence>

        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white text-3xl leading-none opacity-70 hover:opacity-100 transition-opacity"
          aria-label="Close"
        >
          ×
        </button>

        {/* Counter */}
        {images.length > 1 && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white text-xs opacity-50 tabular-nums">
            {currentIndex + 1} / {images.length}
          </div>
        )}

        {/* Left arrow */}
        {images.length > 1 && (
          <button
            onClick={(e) => { e.stopPropagation(); navigate(-1); }}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-white text-3xl opacity-50 hover:opacity-100 transition-opacity hidden md:block"
            aria-label="Previous image"
          >
            ‹
          </button>
        )}

        {/* Right arrow */}
        {images.length > 1 && (
          <button
            onClick={(e) => { e.stopPropagation(); navigate(1); }}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-white text-3xl opacity-50 hover:opacity-100 transition-opacity hidden md:block"
            aria-label="Next image"
          >
            ›
          </button>
        )}
      </motion.div>
    </AnimatePresence>,
    document.body
  );
}
