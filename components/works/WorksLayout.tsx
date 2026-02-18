"use client";

import { type KeyboardEvent, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Project } from "@/types/project";
import { AnimatedWorkImage } from "./AnimatedWorkImage";
import { WorkMeta } from "./WorkMeta";
import { useTheme } from "@/components/theme-context";

const imageRepeatCountMap = {
  "30": 3,
  "50": 2,
  "100": 1,
};

interface WorksLayoutProps {
  projects: Project[];
  scrollToSlug?: string | null;
  onScrollComplete?: () => void;
  onProjectClick?: (slug: string) => void;
}

export function WorksLayout({
  projects,
  scrollToSlug,
  onScrollComplete,
  onProjectClick,
}: WorksLayoutProps) {
  const { colors } = useTheme();
  const [isShortMobile, setIsShortMobile] = useState(false);

  useEffect(() => {
    const updateShortMobileState = () => setIsShortMobile(window.innerHeight <= 760);

    updateShortMobileState();
    window.addEventListener("resize", updateShortMobileState);

    return () => window.removeEventListener("resize", updateShortMobileState);
  }, []);

  const mobileBodyClass = isShortMobile
    ? "text-[0.625rem] font-bold leading-tight"
    : "text-[0.625rem] font-bold leading-tight";

  // When switching from moodboard, jump directly to the clicked project (no visible scroll)
  useEffect(() => {
    if (!scrollToSlug) return;

    // Use requestAnimationFrame to ensure DOM is painted before scrolling
    requestAnimationFrame(() => {
      const element = document.getElementById(scrollToSlug);
      if (element) {
        element.scrollIntoView({ behavior: "instant", block: "center" });
      }
      onScrollComplete?.();
    });
  }, [scrollToSlug, onScrollComplete]);

  return (
    <div className="flex flex-col gap-10 md:gap-8">
      {projects.map((project) => {
        const imageRepeatCount = imageRepeatCountMap[project.image.width];
        const isClickable = typeof onProjectClick === "function";

        const handleProjectOpen = () => {
          onProjectClick?.(project.slug);
        };

        const handleProjectKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
          if (!isClickable) return;
          if (event.key !== "Enter" && event.key !== " ") return;

          event.preventDefault();
          handleProjectOpen();
        };

        const interactiveProps = isClickable
          ? {
              onClick: handleProjectOpen,
              onKeyDown: handleProjectKeyDown,
              role: "button" as const,
              tabIndex: 0,
              "aria-label": `Open ${project.title}`,
            }
          : {};

        return (
          <div
            key={project.slug}
            id={project.slug}
            className="grid min-h-[calc(100svh-8rem)] grid-rows-[1fr_auto] gap-3 px-4 md:flex md:min-h-0 md:px-0 md:h-[50vh] md:flex-row"
          >
            {/* Left: 50% of viewport, content aligned to right side, bottom-aligned with image */}
            <motion.div
              className="order-2 md:order-1 md:w-1/2 md:flex md:justify-end md:items-end md:pr-20"
              initial={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <div
                className={`w-full md:hidden text-left ${isClickable ? "cursor-pointer" : ""}`}
                {...interactiveProps}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-2 min-w-0">
                    <div
                      className="w-[3px] rounded-full shrink-0"
                      style={{
                        height: "2.1em",
                        backgroundColor: colors.textColor,
                      }}
                    />
                    <div className="min-w-0">
                      <h2
                        className="text-sm font-erbaum font-light leading-none"
                        style={{ color: colors.textColor }}
                      >
                        {project.title}
                      </h2>
                      {project.subtitle && (
                        <p
                          className="text-sm font-erbaum font-light leading-none"
                          style={{ color: colors.textColor }}
                        >
                          &quot;{project.subtitle}&quot;
                        </p>
                      )}
                    </div>
                  </div>

                  <div
                    className={`flex shrink-0 flex-col items-end ${mobileBodyClass}`}
                    style={{ color: colors.textColor }}
                  >
                    <span>{project.date}</span>
                    <span>{project.location}</span>
                  </div>
                </div>

                <p
                  className={`mx-auto mt-3 max-w-[92%] text-left opacity-85 ${mobileBodyClass}`}
                  style={{ color: colors.textColor }}
                >
                  {project.description}
                </p>
              </div>

              {/* Text container - auto width based on content, text left-aligned inside */}
              <div
                className={`hidden md:block text-left ${isClickable ? "cursor-pointer" : ""}`}
                {...interactiveProps}
              >
                {/* Title with vertical accent line */}
                <div className="relative">
                  {/* Line - positioned to the left of text */}
                  <div
                    className="absolute w-[3px] -left-3 md:-left-4 rounded-full"
                    style={{
                      height: "4.2em",
                      backgroundColor: colors.textColor,
                    }}
                  />
                  <h2
                    className="text-sm md:text-md font-erbaum font-light leading-none"
                    style={{ color: colors.textColor }}
                  >
                    {project.title}
                  </h2>
                  {project.subtitle && (
                    <p
                      className="text-sm md:text-md font-erbaum font-light leading-none"
                      style={{ color: colors.textColor }}
                    >
                      &quot;{project.subtitle}&quot;
                    </p>
                  )}
                </div>

                {/* Description */}
                <p
                  className="text-[11px] md:text-xs font-bold leading-tight max-w-xs mt-8 md:mt-14 opacity-85"
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
            <div
              className={`order-1 md:order-2 w-full md:w-1/2 h-full min-h-[18rem] md:h-full md:pr-8 ${isClickable ? "cursor-pointer" : ""}`}
              {...interactiveProps}
            >
              <div className="h-full w-full md:hidden">
                <AnimatedWorkImage
                  src={project.image.src}
                  alt={project.image.alt}
                  width={project.image.width}
                  slug={`${project.slug}-mobile`}
                  className="h-full w-full"
                />
              </div>

              <div className="hidden h-full w-full gap-3 md:flex">
                {Array.from({ length: imageRepeatCount }).map((_, imageIndex) => (
                  <AnimatedWorkImage
                    key={`${project.slug}-image-${imageIndex}`}
                    src={project.image.src}
                    alt={project.image.alt}
                    width={project.image.width}
                    slug={project.slug}
                    className="h-full w-full"
                  />
                ))}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
