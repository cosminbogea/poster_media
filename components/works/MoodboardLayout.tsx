"use client";

import Image from "next/image";
import { Project } from "@/types/project";

interface MoodboardLayoutProps {
  projects: Project[];
  onImageClick?: (slug: string) => void;
}

function interleaveStills(projects: Project[]) {
  const queues = projects.map((p) =>
    p.stills.flat().map((src) => ({ src, slug: p.slug, title: p.title }))
  );
  const result: { src: string; slug: string; title: string }[] = [];
  let anyLeft = true;
  while (anyLeft) {
    anyLeft = false;
    for (const queue of queues) {
      const item = queue.shift();
      if (item) { result.push(item); anyLeft = true; }
    }
  }
  return result;
}

export function MoodboardLayout({ projects, onImageClick }: MoodboardLayoutProps) {
  const allStills = interleaveStills(projects);

  return (
    <div className="px-4 md:px-8 pb-8">
      <div className="grid grid-cols-2 gap-2 md:grid-cols-3 lg:grid-cols-4">
        {allStills.map(({ src, slug, title }, index) => {
          const isHighPriority = index < 6;
          const isFullWidth = index % 5 === 0;

          return (
            <div
              key={src}
              className={`cursor-pointer overflow-hidden${isFullWidth ? " col-span-2 md:col-span-1" : ""}`}
              onClick={() => onImageClick?.(slug)}
            >
              <Image
                src={src}
                alt={title}
                width={1976}
                height={1112}
                className="block h-auto w-full"
                sizes={
                  isFullWidth
                    ? "(max-width: 768px) 100vw, (max-width: 1024px) 33vw, 25vw"
                    : "(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                }
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
