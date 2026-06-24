"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Project } from "@/types/project";
import { cloudinaryLoader } from "@/lib/cloudinaryLoader";

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

const ASPECT_RATIO = 1112 / 1976;
const SSR_PRIORITY_DEFAULT = 8;

export function MoodboardLayout({ projects, onImageClick }: MoodboardLayoutProps) {
  const allStills = interleaveStills(projects);
  const [priorityCount, setPriorityCount] = useState(SSR_PRIORITY_DEFAULT);

  useEffect(() => {
    const w = window.innerWidth;
    const h = window.innerHeight;
    const cols = w >= 1024 ? 4 : w >= 768 ? 3 : 2;
    const imgHeight = (w / cols) * ASPECT_RATIO;
    const rows = Math.ceil(h / imgHeight) + 1;
    setPriorityCount(rows * cols);
  }, []);

  return (
    <div className="px-4 md:px-8 pb-8">
      <div className="columns-2 gap-2 md:columns-3 lg:columns-4">
        {allStills.map(({ src, slug, title }, index) => {
          const isHighPriority = index < priorityCount;

          return (
            <div
              key={`${slug}-${index}`}
              className="mb-2 break-inside-avoid cursor-pointer overflow-hidden"
              onClick={() => onImageClick?.(slug)}
            >
              <Image
                loader={cloudinaryLoader}
                src={src}
                alt={title}
                width={1976}
                height={1112}
                className="block h-auto w-full"
                sizes="(max-width: 768px) 50vw, 50vw"
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
