"use client";

import { type Project } from "@/types/project";
import { useTheme } from "@/components/theme-context";
import { AnimatedWorkImage } from "./AnimatedWorkImage";
import { WorkMeta } from "./WorkMeta";

const imageRepeatCountMap = {
  "30": 3,
  "50": 2,
  "100": 1,
};

function buildDetailParagraphs(description: string) {
  return [
    description,
    "Questo progetto approfondisce il rapporto tra direzione artistica, ritmo narrativo e costruzione visiva, mantenendo un linguaggio coerente in ogni frame.",
    "La selezione delle immagini, delle superfici e delle inquadrature e pensata per restituire un racconto pulito ma evocativo, con attenzione a dettagli e atmosfera.",
  ];
}

interface ProjectSubsectionLayoutProps {
  project: Project;
  onBack: () => void;
}

export function ProjectSubsectionLayout({ project, onBack }: ProjectSubsectionLayoutProps) {
  const { colors } = useTheme();
  const imageRepeatCount = imageRepeatCountMap[project.image.width];
  const detailParagraphs = buildDetailParagraphs(project.description);

  return (
    <div className="px-4 md:px-8 pb-10 md:pb-14">
      <button
        onClick={onBack}
        className="inline-flex items-center gap-2 text-xs font-bold leading-none transition-opacity hover:opacity-80"
        style={{ color: colors.textColor }}
      >
        <span aria-hidden="true">&lt;</span>
        BACK TO WORKS
      </button>

      <div className="mt-6 space-y-8 md:hidden">
        <div className="h-[52svh] w-full">
          <AnimatedWorkImage
            src={project.image.src}
            alt={project.image.alt}
            width={project.image.width}
            slug={`${project.slug}-mobile-hero`}
            className="h-full w-full"
          />
        </div>

        <h2 className="font-erbaum text-lg font-light leading-none" style={{ color: colors.textColor }}>
          {project.title}
        </h2>
        {project.subtitle ? (
          <p className="font-erbaum text-sm font-light leading-none" style={{ color: colors.textColor }}>
            &quot;{project.subtitle}&quot;
          </p>
        ) : null}

        <div className="space-y-4">
          {detailParagraphs.map((paragraph, index) => (
            <p
              key={`${project.slug}-mobile-paragraph-${index}`}
              className="text-[0.7rem] font-bold leading-tight opacity-85"
              style={{ color: colors.textColor }}
            >
              {paragraph}
            </p>
          ))}
        </div>

        <div className="pt-2">
          <WorkMeta date={project.date} location={project.location} />
        </div>
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
                {detailParagraphs[0]}
              </p>

              <div className="mt-8">
                <WorkMeta date={project.date} location={project.location} />
              </div>
            </div>
          </div>

          <div className="w-1/2 h-full pr-8">
            <div className="flex h-full w-full gap-3">
              {Array.from({ length: imageRepeatCount }).map((_, imageIndex) => (
                <AnimatedWorkImage
                  key={`${project.slug}-hero-image-${imageIndex}`}
                  src={project.image.src}
                  alt={project.image.alt}
                  width={project.image.width}
                  slug={`${project.slug}-hero-${imageIndex}`}
                  className="h-full w-full"
                />
              ))}
            </div>
          </div>
        </section>

        {detailParagraphs.slice(1).map((paragraph, sectionIndex) => (
          <section key={`${project.slug}-detail-section-${sectionIndex}`} className="flex h-[50vh] flex-row">
            <div className="w-1/2 pr-20 flex justify-end items-end">
              <p
                className="text-[11px] md:text-xs font-bold leading-tight max-w-xs opacity-85"
                style={{ color: colors.textColor }}
              >
                {paragraph}
              </p>
            </div>

            <div className="w-1/2 h-full pr-8">
              <div className="flex h-full w-full gap-3">
                {Array.from({ length: imageRepeatCount }).map((_, imageIndex) => (
                  <AnimatedWorkImage
                    key={`${project.slug}-detail-${sectionIndex}-image-${imageIndex}`}
                    src={project.image.src}
                    alt={project.image.alt}
                    width={project.image.width}
                    slug={`${project.slug}-detail-${sectionIndex}-${imageIndex}`}
                    className="h-full w-full"
                  />
                ))}
              </div>
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
