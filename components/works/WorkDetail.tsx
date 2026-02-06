"use client";

import { Project } from "@/types/project";
import { WorkImage } from "./WorkImage";
import { WorkMeta } from "./WorkMeta";
import { useTheme } from "@/components/theme-context";

interface WorkDetailProps {
  project: Project;
}

// Image width as percentage of the right column
const imageWidthMap = {
  "30": "w-[30%]",
  "50": "w-[50%]",
  "100": "w-full",
};

export function WorkDetail({ project }: WorkDetailProps) {
  const { colors } = useTheme();
  const imageWidthClass = imageWidthMap[project.image.width];

  return (
    <div className="flex h-[50vh]">
      {/* Left: 50% of viewport, content aligned to right side, bottom-aligned with image */}
      <div className="w-1/2 flex justify-end items-end pr-24">
        {/* Text container - auto width based on content, text left-aligned inside */}
        <div className="text-left">
          {/* Title with vertical accent line */}
          <div className="flex gap-2">
            {/* Line - height is 2x the title+subtitle */}
            <div
              className="w-1 self-start"
              style={{ height: "4em", backgroundColor: colors.textColor }}
            />
            <div>
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
          </div>

          {/* Description */}
          <p
            className="text-xs font-bold leading-tight max-w-xs mt-8 opacity-85"
            style={{ color: colors.textColor }}
          >
            {project.description}
          </p>

          {/* Meta: Date and Location - gap-8 matches gap between projects */}
          <div className="mt-8">
            <WorkMeta date={project.date} location={project.location} />
          </div>
        </div>
      </div>

      {/* Right: Image area - exactly 50% of viewport, with right padding matching gap */}
      <div className="w-1/2 h-full pr-8">
        <div className={`${imageWidthClass} h-full`}>
          <WorkImage
            src={project.image.src}
            alt={project.image.alt}
            width={project.image.width}
          />
        </div>
      </div>
    </div>
  );
}
