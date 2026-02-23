"use client";

import { Project } from "@/types/project";
import { WorkImage } from "./WorkImage";
import { WorkMeta } from "./WorkMeta";
import { useTheme } from "@/components/theme-context";

interface WorkDetailProps {
  project: Project;
}

export function WorkDetail({ project }: WorkDetailProps) {
  const { colors } = useTheme();

  return (
    <div className="flex flex-col gap-4 md:h-[50vh] md:flex-row">
      {/* Left: 50% of viewport, content aligned to right side, bottom-aligned with image */}
      <div className="order-2 md:order-1 md:w-1/2 md:flex md:justify-end md:items-end md:pr-24">
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
          </div>

          {/* Description */}
          <p
            className="text-[11px] md:text-xs font-bold leading-tight max-w-xs mt-8 opacity-85"
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
      <div className="order-1 md:order-2 w-full md:w-1/2 h-[58vh] md:h-full md:pr-8">
        <div className="w-full md:w-full h-full">
          <WorkImage
            src={project.stills[0][0]}
            alt={project.title}
          />
        </div>
      </div>
    </div>
  );
}
