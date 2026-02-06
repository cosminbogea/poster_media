"use client";

import { motion } from "framer-motion";
import { Project } from "@/types/project";
import { AnimatedWorkImage } from "./AnimatedWorkImage";
import { WorkMeta } from "./WorkMeta";
import { useTheme } from "@/components/theme-context";

const imageWidthMap = {
  "30": "w-[30%]",
  "50": "w-[50%]",
  "100": "w-full",
};

interface WorksLayoutProps {
  projects: Project[];
}

export function WorksLayout({ projects }: WorksLayoutProps) {
  const { colors } = useTheme();

  return (
    <div className="flex flex-col gap-8">
      {projects.map((project) => {
        const imageWidthClass = imageWidthMap[project.image.width];

        return (
          <div key={project.slug} className="flex h-[50vh]">
            {/* Left: 50% of viewport, content aligned to right side, bottom-aligned with image */}
            <motion.div
              className="w-1/2 flex justify-end items-end pr-20"
              initial={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              {/* Text container - auto width based on content, text left-aligned inside */}
              <div className="text-left">
                {/* Title with vertical accent line */}
                <div className="relative">
                  {/* Line - positioned to the left of text */}
                  <div
                    className="absolute w-[3px] -left-4 rounded-full"
                    style={{
                      height: "4.5em",
                      backgroundColor: colors.textColor,
                    }}
                  />
                  <h2
                    className="text-md font-erbaum font-light leading-none"
                    style={{ color: colors.textColor }}
                  >
                    {project.title}
                  </h2>
                  {project.subtitle && (
                    <p
                      className="text-md font-erbaum font-light leading-none"
                      style={{ color: colors.textColor }}
                    >
                      &quot;{project.subtitle}&quot;
                    </p>
                  )}
                </div>

                {/* Description */}
                <p
                  className="text-xs font-bold leading-tight max-w-xs mt-14 opacity-85"
                  style={{ color: colors.textColor }}
                >
                  {project.description}
                </p>

                {/* Meta: Date and Location */}
                <div className="mt-8">
                  <WorkMeta date={project.date} location={project.location} />
                </div>
              </div>
            </motion.div>

            {/* Right: Image area - exactly 50% of viewport */}
            <div className="w-1/2 h-full pr-8">
              <div className={`${imageWidthClass} h-full`}>
                <AnimatedWorkImage
                  src={project.image.src}
                  alt={project.image.alt}
                  width={project.image.width}
                  slug={project.slug}
                  className="w-full h-full"
                />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
