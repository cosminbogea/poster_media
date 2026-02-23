"use client";
import { useTheme } from "@/components/theme-context";

interface ProjectVideoProps {
  src: string;
  poster?: string;
}

export function ProjectVideo({ src, poster }: ProjectVideoProps) {
  const { colors } = useTheme();
  return (
    <div className="w-full h-full" style={{ background: colors.background }}>
      <video
        className="w-full h-full object-cover object-top md:object-top"
        src={src}
        poster={poster}
        controls
        preload="metadata"
        playsInline
      />
    </div>
  );
}
