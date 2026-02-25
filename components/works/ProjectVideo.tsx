"use client";
import { useTheme } from "@/components/theme-context";

interface ProjectVideoProps {
  src: string;
}

export function ProjectVideo({ src }: ProjectVideoProps) {
  const { colors } = useTheme();
  return (
    <div className="w-full h-full" style={{ background: colors.background }}>
      <video
        className="w-full h-full object-cover "
        src={src}
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
      />
    </div>
  );
}
