"use client";

import { useState } from "react";
import { type Project } from "@/types/project";
import { useTheme } from "@/components/theme-context";
import { AnimatedWorkImage } from "./AnimatedWorkImage";
import { ImageLightbox } from "./ImageLightbox";
import { WorkMeta } from "./WorkMeta";
import { ProjectVideo } from "./ProjectVideo";
import { ProjectVideoShowcase } from "./ProjectVideoShowcase";


interface ProjectSubsectionLayoutProps {
  project: Project;
  onBack: () => void;
}

function AdaptiveMobileStill({
  src,
  alt,
  slug,
  sharedRatio,
  onRatioReady,
}: {
  src: string;
  alt: string;
  slug: string;
  sharedRatio?: number;
  onRatioReady?: (ratio: number) => void;
}) {
  const [ratio, setRatio] = useState("16/9");
  const aspectRatio = sharedRatio ? String(sharedRatio) : ratio;

  return (
    <div className="relative w-full" style={{ aspectRatio }}>
      <AnimatedWorkImage
        src={src}
        alt={alt}
        slug={slug}
        className="h-full w-full"
        onLoad={(w, h) => {
          const nextRatio = w / h;
          onRatioReady?.(nextRatio);
          if (!sharedRatio) {
            setRatio(`${w}/${h}`);
          }
        }}
      />
    </div>
  );
}

function AdaptiveMobilePair({
  leftSrc,
  rightSrc,
  alt,
  leftSlug,
  rightSlug,
  onClickLeft,
  onClickRight,
}: {
  leftSrc: string;
  rightSrc: string;
  alt: string;
  leftSlug: string;
  rightSlug: string;
  onClickLeft?: () => void;
  onClickRight?: () => void;
}) {
  const [leftRatio, setLeftRatio] = useState<number | null>(null);
  const [rightRatio, setRightRatio] = useState<number | null>(null);

  const sharedRatio =
    leftRatio && rightRatio
      ? Math.sqrt(leftRatio * rightRatio)
      : leftRatio || rightRatio || 1;

  return (
    <>
      <button className="cursor-pointer" onClick={onClickLeft}>
        <AdaptiveMobileStill
          src={leftSrc}
          alt={alt}
          slug={leftSlug}
          sharedRatio={sharedRatio}
          onRatioReady={setLeftRatio}
        />
      </button>
      <button className="cursor-pointer" onClick={onClickRight}>
        <AdaptiveMobileStill
          src={rightSrc}
          alt={alt}
          slug={rightSlug}
          sharedRatio={sharedRatio}
          onRatioReady={setRightRatio}
        />
      </button>
    </>
  );
}

export function ProjectSubsectionLayout({
  project,
  onBack,
}: ProjectSubsectionLayoutProps) {
  const { colors, theme } = useTheme();
  const arrowSrc = theme === "black" ? "/white-arrow.svg" : "/black-arrow.svg";
  const detailRows = project.stills;
  const secondaryDescription = project.secondaryDescription ?? "";
  const allImages = project.stills.flat();
  const [lightbox, setLightbox] = useState<{ images: string[]; index: number } | null>(null);

  function videosAfterRow(rowIndex: number) {
    return (project.videos ?? []).filter((v) => v.afterRow === rowIndex);
  }

  function openLightbox(src: string) {
    const index = allImages.indexOf(src);
    setLightbox({ images: allImages, index: index >= 0 ? index : 0 });
  }

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

        {project.videosOnly ? (
          <div className="space-y-4">
            {(project.videos ?? []).map((v) => (
              <div key={v.src} className={`w-full ${v.interactive ? "aspect-[9/16]" : "aspect-[4/5] sm:aspect-[3/4]"}`}>
                {v.interactive ? (
                  <ProjectVideoShowcase src={v.src} poster={v.poster} />
                ) : (
                  <ProjectVideo src={v.src} />
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-2">
            {project.stills.map((row, rowIndex) => (
              <div key={`${project.slug}-mobile-row-${rowIndex}`} className="contents">
                {row.length >= 2 ? (
                  <AdaptiveMobilePair
                    leftSrc={row[0]}
                    rightSrc={row[1]}
                    alt={project.title}
                    leftSlug={`${project.slug}-mobile-${rowIndex}-0`}
                    rightSlug={`${project.slug}-mobile-${rowIndex}-1`}
                    onClickLeft={() => openLightbox(row[0])}
                    onClickRight={() => openLightbox(row[1])}
                  />
                ) : row.length === 1 ? (
                  <button className="col-span-2 cursor-pointer" onClick={() => openLightbox(row[0])}>
                    <AdaptiveMobileStill
                      src={row[0]}
                      alt={project.title}
                      slug={`${project.slug}-mobile-${rowIndex}-0`}
                    />
                  </button>
                ) : null}

                {row.slice(2).map((src, imgIndex) => (
                  <button
                    key={`${project.slug}-mobile-${rowIndex}-extra-${imgIndex}`}
                    className="col-span-2 cursor-pointer"
                    onClick={() => openLightbox(src)}
                  >
                    <AdaptiveMobileStill
                      src={src}
                      alt={project.title}
                      slug={`${project.slug}-mobile-${rowIndex}-extra-${imgIndex}`}
                    />
                  </button>
                ))}

                {videosAfterRow(rowIndex).map((v) => (
                  <div key={`mobile-video-after-${rowIndex}-${v.src}`} className={`col-span-2 w-full ${v.interactive ? "aspect-[9/16]" : "aspect-[4/5] sm:aspect-[3/4]"}`}>
                    {v.interactive ? (
                      <ProjectVideoShowcase src={v.src} poster={v.poster} />
                    ) : (
                      <ProjectVideo src={v.src} />
                    )}
                  </div>
                ))}
              </div>
            ))}
          </div>
        )}

        {project.video && (
          <>
            <div className="w-full aspect-[4/5] sm:aspect-[3/4]">
              <ProjectVideo
                src={project.video.src}
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
        <section className="flex h-[70vh] flex-row">
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

          {detailRows[0]?.length > 0 && (
            <div className="w-1/2 h-full pr-8">
              <div className="flex h-full w-full gap-3">
                {detailRows[0].map((src, imgIndex) => {
                  return (
                  <button
                    key={`${project.slug}-hero-image-${imgIndex}`}
                    className="flex-1 min-w-0 h-full cursor-pointer"
                    onClick={() => openLightbox(src)}
                  >
                    <AnimatedWorkImage
                      src={src}
                      alt={project.title}
                      slug={`${project.slug}-hero-${imgIndex}`}
                      className="h-full w-full"
                      priority={true}
                      sizes="(max-width: 768px) 50vw, 100vw"
                    />
                  </button>
                  );
                })}
              </div>
            </div>
          )}
        </section>

        {videosAfterRow(0).map((v) => (
          <section key={`desktop-video-after-0-${v.src}`} className={`flex flex-row ${v.interactive ? "h-[81vh]" : "h-[70vh]"}`}>
            <div className="w-1/2 pr-20 flex justify-end items-end" />
            <div className="w-1/2 h-full pr-8">
              {v.interactive ? (
                <ProjectVideoShowcase src={v.src} />
              ) : (
                <ProjectVideo src={v.src} />
              )}
            </div>
          </section>
        ))}

        {!project.videosOnly && detailRows.slice(1).map((row, sectionIndex) => (
          <div key={`${project.slug}-detail-group-${sectionIndex}`} className="contents">
            <section
              key={`${project.slug}-detail-section-${sectionIndex}`}
              className="flex h-[70vh] flex-row"
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
                  {row.map((src, imgIndex) => {
                    const mobilevw = row.length === 1 ? 100 : 50;
                    return (
                    <button
                      key={`${project.slug}-detail-${sectionIndex}-image-${imgIndex}`}
                      className="flex-1 min-w-0 h-full cursor-pointer"
                      onClick={() => openLightbox(src)}
                    >
                      <AnimatedWorkImage
                        src={src}
                        alt={project.title}
                        slug={`${project.slug}-detail-${sectionIndex}-${imgIndex}`}
                        className="h-full w-full"
                        sizes={`(max-width: 768px) ${mobilevw}vw, 100vw`}
                      />
                    </button>
                    );
                  })}
                </div>
              </div>
            </section>

            {videosAfterRow(sectionIndex + 1).map((v) => (
              <section key={`desktop-video-after-${sectionIndex + 1}-${v.src}`} className={`flex flex-row ${v.interactive ? "h-[81vh]" : "h-[70vh]"}`}>
                <div className="w-1/2 pr-20 flex justify-end items-end" />
                <div className="w-1/2 h-full pr-8">
                  {v.interactive ? (
                    <ProjectVideoShowcase src={v.src} poster={v.poster} />
                  ) : (
                    <ProjectVideo src={v.src} />
                  )}
                </div>
              </section>
            ))}
          </div>
        ))}

        {project.video && (
          <section className="flex h-[70vh] flex-row">
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
              />
            </div>
          </section>
        )}
      </div>

      {lightbox && (
        <ImageLightbox
          images={lightbox.images}
          initialIndex={lightbox.index}
          alt={project.title}
          onClose={() => setLightbox(null)}
        />
      )}
    </div>
  );
}
