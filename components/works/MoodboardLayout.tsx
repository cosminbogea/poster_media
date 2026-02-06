"use client";

import { motion } from "framer-motion";
import { Project } from "@/types/project";
import { AnimatedWorkImage } from "./AnimatedWorkImage";

interface MoodboardLayoutProps {
  projects: Project[];
}

export function MoodboardLayout({ projects }: MoodboardLayoutProps) {
  // Vary heights for puzzle effect
  const heights = ["h-48", "h-64", "h-80", "h-96"];

  return (
    <motion.div
      className="px-4 md:px-8 pb-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3, delay: 0.2 }}
    >
      {/* Masonry grid layout */}
      <div className="columns-2 md:columns-3 lg:columns-4 gap-2">
        {projects.map((project, index) => {
          const heightClass = heights[index % heights.length];

          return (
            <div
              key={project.slug}
              className={`${heightClass} mb-2 overflow-hidden break-inside-avoid`}
            >
              <AnimatedWorkImage
                src={project.image.src}
                alt={project.image.alt}
                width={project.image.width}
                slug={project.slug}
                className="w-full h-full"
              />
            </div>
          );
        })}
      </div>
    </motion.div>
  );
}
