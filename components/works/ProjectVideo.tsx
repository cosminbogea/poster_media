"use client";
import { useRef, useEffect, useState } from "react";
import { useTheme } from "@/components/theme-context";
import { cloudinaryVideoSrc, cloudinaryVideoPosterSrc } from "@/lib/cloudinaryLoader";

interface ProjectVideoProps {
  src: string;
}

export function ProjectVideo({ src }: ProjectVideoProps) {
  const { colors } = useTheme();
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: "300px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef} className="w-full h-full" style={{ background: colors.background }}>
      <video
        className="w-full h-full object-cover"
        src={isVisible ? cloudinaryVideoSrc(src) : undefined}
        poster={cloudinaryVideoPosterSrc(src)}
        autoPlay
        loop
        muted
        playsInline
        preload="none"
      />
    </div>
  );
}
