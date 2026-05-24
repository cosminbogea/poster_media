"use client";
import { useTheme } from "@/components/theme-context";
import { cloudinaryVideoSrc } from "@/lib/cloudinaryLoader";

interface ProjectVideoProps {
  src: string;
}

export function ProjectVideo({ src }: ProjectVideoProps) {
  const { colors } = useTheme();
  return (
    <div className="w-full h-full" style={{ background: colors.background }}>
      <video
        className="w-full h-full object-cover "
        src={cloudinaryVideoSrc(src)}
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
      />
    </div>
  );
}
