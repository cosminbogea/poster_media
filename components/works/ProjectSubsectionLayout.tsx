"use client";

import { type Project } from "@/types/project";
import { useTheme } from "@/components/theme-context";
import { AnimatedWorkImage } from "./AnimatedWorkImage";
import { WorkMeta } from "./WorkMeta";
import { ProjectVideo } from "./ProjectVideo";


interface ProjectSubsectionLayoutProps {
  project: Project;
  onBack: () => void;
}

export function ProjectSubsectionLayout({
  project,
  onBack,
}: ProjectSubsectionLayoutProps) {
  const { colors, theme } = useTheme();
  const arrowSrc = theme === "black" ? "/white-arrow.svg" : "/black-arrow.svg";
  const detailRows = project.stills;
  const secondaryDescription = project.secondaryDescription ?? "";

  return (
    <div className="px-4 md:px-8 pb-10 md:pb-14">
      <button
        onClick={onBack}
        className="inline-flex items-center gap-2 text-xs font-bold leading-none transition-opacity hover:opacity-80"
        style={{ color: colors.textColor }}
      >
        <img src={arrowSrc} alt="" aria-hidden="true" className="w-4 h-4" />
        BACK TO WORKS
      </button>

      <div className="mt-6 space-y-8 md:hidden">
        <h2
          className="font-erbaum text-lg font-light leading-none"
          style={{ color: colors.textColor }}
        >
          {project.title}
        </h2>
        {project.subtitle ? (
          <p
            className="font-erbaum text-sm font-light leading-none"
            style={{ color: colors.textColor }}
          >
            &quot;{project.subtitle}&quot;
          </p>
        ) : null}

        <div className="space-y-4">
          <p
            className="text-[0.7rem] font-bold leading-tight opacity-85"
            style={{ color: colors.textColor }}
          >
            {project.description}
          </p>
          {project.secondaryDescription ? (
            <p
              className="text-[0.7rem] font-bold leading-tight opacity-85"
              style={{ color: colors.textColor }}
            >
              {project.secondaryDescription}
            </p>
          ) : null}
        </div>

        <div className="pt-2">
          <WorkMeta date={project.date} location={project.location} />
        </div>

        {project.stills.flat().map((src, i) => (
          <div key={`${project.slug}-mobile-still-${i}`} className="h-[52svh] w-full">
            <AnimatedWorkImage
              src={src}
              alt={project.title}
              slug={`${project.slug}-mobile-still-${i}`}
              className="h-full w-full"
            />
          </div>
        ))}

        {project.video && (
          <>
            <div className="h-[52svh] w-full">
              <ProjectVideo
                src={project.video.src}
                poster={project.video.poster}
              />
            </div>
            {project.video.fullFilmUrl && (
              <a
                href={project.video.fullFilmUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider transition-opacity hover:opacity-80"
                style={{ color: colors.textColor }}
              >
                WATCH THE FULL VIDEO
                <img
                  src={arrowSrc}
                  alt=""
                  aria-hidden="true"
                  className="w-3 h-3 rotate-180"
                />
              </a>
            )}
          </>
        )}
      </div>

      <div className="hidden md:flex md:flex-col md:gap-10">
        <section className="flex h-[50vh] flex-row">
          <div className="w-1/2 pr-20 flex justify-end items-end">
            <div className="text-left">
              <div className="relative">
                <div
                  className="absolute -left-4 w-[3px] rounded-full"
                  style={{ height: "4.2em", backgroundColor: colors.textColor }}
                />
                <h2
                  className="text-sm md:text-md font-erbaum font-light leading-none"
                  style={{ color: colors.textColor }}
                >
                  {project.title}
                </h2>
                {project.subtitle ? (
                  <p
                    className="text-sm md:text-md font-erbaum font-light leading-none"
                    style={{ color: colors.textColor }}
                  >
                    &quot;{project.subtitle}&quot;
                  </p>
                ) : null}
              </div>

              <p
                className="text-[11px] md:text-xs font-bold leading-tight max-w-xs mt-14 opacity-85"
                style={{ color: colors.textColor }}
              >
                {project.description}
              </p>

              <div className="mt-8">
                <WorkMeta date={project.date} location={project.location} />
              </div>
            </div>
          </div>

          <div className="w-1/2 h-full pr-8">
            <div className="flex h-full w-full gap-3">
              {detailRows[0].map((src, imgIndex) => (
                <div
                  key={`${project.slug}-hero-image-${imgIndex}`}
                  className="flex-1 min-w-0 h-full"
                >
                  <AnimatedWorkImage
                    src={src}
                    alt={project.title}
                    slug={`${project.slug}-hero-${imgIndex}`}
                    className="h-full w-full"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>

        {detailRows.slice(1).map((row, sectionIndex) => (
          <section
            key={`${project.slug}-detail-section-${sectionIndex}`}
            className="flex h-[50vh] flex-row"
          >
            <div className="w-1/2 pr-20 flex justify-end items-start">
              {sectionIndex === 0 ? (
                <p
                  className="text-[11px] md:text-xs font-bold leading-tight max-w-xs opacity-85"
                  style={{ color: colors.textColor }}
                >
                  {secondaryDescription}
                </p>
              ) : null}
            </div>

            <div className="w-1/2 h-full pr-8">
              <div className="flex h-full w-full gap-3">
                {row.map((src, imgIndex) => (
                  <div
                    key={`${project.slug}-detail-${sectionIndex}-image-${imgIndex}`}
                    className="flex-1 min-w-0 h-full"
                  >
                    <AnimatedWorkImage
                      src={src}
                      alt={project.title}
                      slug={`${project.slug}-detail-${sectionIndex}-${imgIndex}`}
                      className="h-full w-full"
                    />
                  </div>
                ))}
              </div>
            </div>
          </section>
        ))}

        {project.video && (
          <section className="flex h-[50vh] flex-row">
            <div className="w-1/2 pr-20 flex justify-end items-end">
              {project.video.fullFilmUrl && (
                <a
                  href={project.video.fullFilmUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider transition-opacity hover:opacity-80"
                  style={{ color: colors.textColor }}
                >
                  WATCH THE FULL VIDEO
                  <img
                    src={arrowSrc}
                    alt=""
                    aria-hidden="true"
                    className="w-3 h-3 rotate-180"
                  />
                </a>
              )}
            </div>
            <div className="w-1/2 h-full pr-8">
              <ProjectVideo
                src={project.video.src}
                poster={project.video.poster}
              />
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
