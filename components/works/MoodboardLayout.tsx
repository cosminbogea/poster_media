"use client";

import Image from "next/image";
import { Project } from "@/types/project";

interface MoodboardLayoutProps {
  projects: Project[];
  onImageClick?: (slug: string) => void;
}

export function MoodboardLayout({ projects, onImageClick }: MoodboardLayoutProps) {
  return (
    <div className="px-4 md:px-8 pb-8">
      <div className="columns-2 gap-2 md:columns-3 lg:columns-4">
        {projects.map((project, index) => {
          // Derive aspect ratio from image width: "100" = landscape, others = portrait
          const isLandscape = project.image.width === "100";
          const isHighPriority = index < 6;

          return (
            <div
              key={project.slug}
              className="mb-2 inline-block w-full break-inside-avoid align-top cursor-pointer overflow-hidden"
              onClick={() => onImageClick?.(project.slug)}
            >
              <Image
                src={project.image.src}
                alt={project.image.alt}
                width={isLandscape ? 1976 : 683}
                height={isLandscape ? 1112 : 1024}
                className="block h-auto w-full"
                sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                priority={isHighPriority}
                loading={isHighPriority ? "eager" : "lazy"}
                fetchPriority={isHighPriority ? "high" : "auto"}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
