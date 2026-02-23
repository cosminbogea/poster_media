"use client";

import { useState, useEffect, useRef } from "react";
import { useTheme } from "@/components/theme-context";
import { aboutData } from "@/data/about";

interface NavPositions {
  posterMedia: number;
  works: number;
  about: number;
}

interface MobileLinePositions {
  works: number;
  about: number;
}

export function About() {
  const { colors } = useTheme();
  const [navPositions, setNavPositions] = useState<NavPositions | null>(null);
  const [mobileLinePositions, setMobileLinePositions] =
    useState<MobileLinePositions>({ works: 0, about: 0 });
  const [isMobile, setIsMobile] = useState(false);
  const [isShortMobile, setIsShortMobile] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const mobileContainerRef = useRef<HTMLDivElement>(null);
  const lineRefs = useRef<(HTMLDivElement | null)[]>([]);

  const lineWidth = isMobile ? 12 : 16;
  const lineCenter = lineWidth / 2;
  const lineTextOffset = lineCenter + 16;
  const containerPadding = 32; // px-8

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 767px)");
    const updateIsMobile = () => setIsMobile(mediaQuery.matches);
    const updateShortMobile = () => setIsShortMobile(window.innerHeight <= 760);

    updateIsMobile();
    updateShortMobile();
    mediaQuery.addEventListener("change", updateIsMobile);
    window.addEventListener("resize", updateShortMobile);

    return () => {
      mediaQuery.removeEventListener("change", updateIsMobile);
      window.removeEventListener("resize", updateShortMobile);
    };
  }, []);

  // Interactive line displacement effect
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const RADIUS = 150;
    const MAX_DISPLACEMENT = 30;
    const LERP_SPEED = 0.1;

    const displacements = aboutData.map(() => 0);
    const targets = aboutData.map(() => 0);
    let mouseX: number | null = null;
    let mouseY: number | null = null;
    let rafId: number;

    const onMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;

      for (let i = 0; i < lineRefs.current.length; i++) {
        const lineEl = lineRefs.current[i];
        if (!lineEl) continue;
        const lineRect = lineEl.getBoundingClientRect();
        const lineCenterX = lineRect.left + lineRect.width / 2 - rect.left;
        const dx = Math.abs(lineCenterX - mouseX);

        if (dx < RADIUS) {
          const lineCenterY = lineRect.top + lineRect.height / 2 - rect.top;
          const dy = lineCenterY - mouseY!;
          const force = Math.pow((RADIUS - dx) / RADIUS, 0.7);
          targets[i] = Math.sign(dy) * force * MAX_DISPLACEMENT;
        } else {
          targets[i] = 0;
        }
      }
    };

    const onMouseLeave = () => {
      mouseX = null;
      for (let i = 0; i < targets.length; i++) targets[i] = 0;
    };

    const tick = () => {
      for (let i = 0; i < lineRefs.current.length; i++) {
        displacements[i] += (targets[i] - displacements[i]) * LERP_SPEED;
        const lineEl = lineRefs.current[i];
        if (lineEl) {
          lineEl.style.transform = `translateY(${displacements[i]}px)`;
        }
      }
      rafId = requestAnimationFrame(tick);
    };

    container.addEventListener("mousemove", onMouseMove);
    container.addEventListener("mouseleave", onMouseLeave);
    rafId = requestAnimationFrame(tick);

    return () => {
      container.removeEventListener("mousemove", onMouseMove);
      container.removeEventListener("mouseleave", onMouseLeave);
      cancelAnimationFrame(rafId);
    };
  }, []);

  useEffect(() => {
    if (isMobile) return;

    const measurePositions = () => {
      const posterMediaEl = document.querySelector('[data-nav="poster-media"]');
      const worksEl = document.querySelector('[data-nav="works"]');
      const aboutEl = document.querySelector('[data-nav="about"]');

      if (posterMediaEl && worksEl && aboutEl) {
        setNavPositions({
          posterMedia:
            posterMediaEl.getBoundingClientRect().left - containerPadding,
          works: worksEl.getBoundingClientRect().left - containerPadding,
          about: aboutEl.getBoundingClientRect().left - containerPadding,
        });
      }
    };

    measurePositions();
    window.addEventListener("resize", measurePositions);
    return () => window.removeEventListener("resize", measurePositions);
  }, [isMobile]);

  useEffect(() => {
    if (!isMobile) return;

    const measureMobileLinePositions = () => {
      const containerEl = mobileContainerRef.current;
      const worksEl = document.querySelector('header nav a[href="/works"]');
      const aboutEl = document.querySelector('header nav a[href="/about"]');

      if (!containerEl || !worksEl || !aboutEl) return;

      const containerRect = containerEl.getBoundingClientRect();
      const worksRect = worksEl.getBoundingClientRect();
      const aboutRect = aboutEl.getBoundingClientRect();

      const maxLeft = containerRect.width - lineWidth;
      const nextWorks = Math.min(
        Math.max(worksRect.left - containerRect.left, 0),
        maxLeft,
      );
      const nextAbout = Math.min(
        Math.max(aboutRect.left - containerRect.left, 0),
        maxLeft,
      );

      setMobileLinePositions({ works: nextWorks, about: nextAbout });
    };

    measureMobileLinePositions();
    window.addEventListener("resize", measureMobileLinePositions);

    return () =>
      window.removeEventListener("resize", measureMobileLinePositions);
  }, [isMobile]);

  // Map nav positions to section titles
  const positionMap: Record<string, number> = {
    ABOUT: navPositions?.posterMedia ?? 0,
    SOCIAL: navPositions?.works ?? 0,
    CONTATTI: navPositions?.about ?? 0,
  };

  const aboutSection = aboutData[0];
  const socialSection = aboutData[1];
  const contactsSection = aboutData[2];
  const mobileBottomInset = "max(1.5rem, env(safe-area-inset-bottom))";
  const mobileSecondaryLineTop = "43%";
  const mobileTitleClass = isShortMobile
    ? "font-erbaum font-light text-[1.02rem] uppercase leading-none"
    : "font-erbaum font-light text-[1.16rem] uppercase leading-none";
  const mobileBodyClass = isShortMobile
    ? "text-[0.625rem] font-bold leading-tight"
    : "text-[0.625rem] font-bold leading-tight";

  const getSectionLinkHref = (
    sectionTitle: string,
    text: string,
  ): string | null => {
    const value = text.trim();

    if (sectionTitle === "SOCIAL") {
      const lowerValue = value.toLowerCase();
      if (lowerValue === "instagram") return "https://www.instagram.com/postermedia_?igsh=YXl5NGVpYjJwcWR6&utm_source=qr";
      if (lowerValue === "linkedin") return "https://www.linkedin.com/company/poster-media-js";
      if (lowerValue === "vimeo") return "https://www.vimeo.com";
    }

    if (sectionTitle === "CONTATTI") {
      if (value.includes("@")) return `mailto:${value}`;
      if (value.includes("+")) return `tel:${value.replace(/\s+/g, "")}`;
    }

    return null;
  };

  return (
    <>
      <div
        ref={mobileContainerRef}
        className="relative h-[calc(100svh-8rem)] overflow-hidden md:hidden"
      >
        <section
          className="relative h-full"
          style={{
            paddingLeft: `${mobileLinePositions.works + lineTextOffset}px`,
          }}
        >
          <div
            className="absolute rounded-full"
            style={{
              left: mobileLinePositions.works,
              top: "3rem",
              bottom: mobileBottomInset,
              width: `${lineWidth}px`,
              backgroundColor: colors.lineColor,
            }}
          />

          <div className="pt-12">
            <h2
              className={mobileTitleClass}
              style={{ color: colors.textColor }}
            >
              {aboutSection.title}
            </h2>

            {aboutSection.text.map((text, index) => (
              <p
                key={index}
                className={`mt-1 pr-3 ${mobileBodyClass}`}
                style={{ color: colors.textColor }}
              >
                {text}
              </p>
            ))}
          </div>
        </section>

        <section className="absolute inset-0">
          <div
            className="absolute rounded-full"
            style={{
              left: mobileLinePositions.about,
              top: mobileSecondaryLineTop,
              bottom: mobileBottomInset,
              width: `${lineWidth}px`,
              backgroundColor: colors.lineColor,
            }}
          />

          <div
            className="absolute right-0"
            style={{
              left: `${mobileLinePositions.about + lineTextOffset}px`,
              top: mobileSecondaryLineTop,
              bottom: mobileBottomInset,
            }}
          >
            <div className="flex h-full flex-col justify-between pr-3">
              <div>
                <h2
                  className={mobileTitleClass}
                  style={{ color: colors.textColor }}
                >
                  {socialSection.title}
                </h2>
                <div className="mt-1 flex flex-col gap-1.5">
                  {socialSection.text.map((text, index) => {
                    const href = getSectionLinkHref(socialSection.title, text);

                    if (!href) {
                      return (
                        <p
                          key={index}
                          className={mobileBodyClass}
                          style={{ color: colors.textColor }}
                        >
                          {text}
                        </p>
                      );
                    }

                    return (
                      <a
                        key={index}
                        href={href}
                        target="_blank"
                        rel="noreferrer"
                        className={`${mobileBodyClass} inline-block py-0.5 underline underline-offset-2`}
                        style={{ color: colors.textColor }}
                      >
                        {text}
                      </a>
                    );
                  })}
                </div>
              </div>

              <div>
                <h2
                  className={mobileTitleClass}
                  style={{ color: colors.textColor }}
                >
                  {contactsSection.title}
                </h2>
                <div className="mt-1 flex flex-col gap-1.5">
                  {contactsSection.text.map((text, index) => {
                    const href = getSectionLinkHref(
                      contactsSection.title,
                      text,
                    );

                    if (!href) {
                      return (
                        <p
                          key={index}
                          className={mobileBodyClass}
                          style={{ color: colors.textColor }}
                        >
                          {text}
                        </p>
                      );
                    }

                    return (
                      <a
                        key={index}
                        href={href}
                        className={`${mobileBodyClass} block py-0.5`}
                        style={{ color: colors.textColor }}
                      >
                        {text}
                      </a>
                    );
                  })}
                </div>
              </div>

              {contactsSection.bottomTitle && contactsSection.bottomText ? (
                <div>
                  <h2
                    className={mobileTitleClass}
                    style={{ color: colors.textColor }}
                  >
                    {contactsSection.bottomTitle}
                  </h2>
                  <div className="mt-1 flex flex-col gap-1.5">
                    {contactsSection.bottomText.map((text, index) => (
                      <p
                        key={index}
                        className={mobileBodyClass}
                        style={{ color: colors.textColor }}
                      >
                        {text}
                      </p>
                    ))}
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        </section>
      </div>

      <div
        ref={containerRef}
        className="relative hidden h-[calc(100vh-2rem)] md:block "
      >
        {aboutData.map((section, sectionIndex) => {
          const hasBottomSection = section.bottomTitle && section.bottomText;

          return (
            <div
              key={section.title}
              className="absolute"
              style={{
                left: positionMap[section.title],
                top: "20%",
                bottom: 0,
              }}
            >
              {/* Vertical line */}
              <div
                ref={(el) => {
                  lineRefs.current[sectionIndex] = el;
                }}
                className="absolute left-0 rounded-full"
                style={{
                  backgroundColor: colors.lineColor,
                  width: `${lineWidth}px`,
                  top: 0,
                  bottom: 0,
                }}
              />

              {/* Content */}
              <div
                className={`relative z-10 ${hasBottomSection ? "h-full flex flex-col" : ""}`}
                style={{ marginLeft: `${lineTextOffset}px` }}
              >
                <div>
                  <h2
                    className="text-sm uppercase font-erbaum font-light pt-8"
                    style={{ color: colors.textColor }}
                  >
                    {section.title}
                  </h2>

                  {section.title === "SOCIAL" ? (
                    <div className="mt-1 flex flex-col gap-1.5">
                      {section.text.map((text, i) => {
                        const href = getSectionLinkHref(section.title, text);

                        if (!href) {
                          return (
                            <p
                              key={i}
                              className="text-xs font-bold leading-tight max-w-xs"
                              style={{ color: colors.textColor }}
                            >
                              {text}
                            </p>
                          );
                        }

                        return (
                          <a
                            key={i}
                            href={href}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-block py-0.5 text-xs font-bold leading-tight underline underline-offset-2"
                            style={{ color: colors.textColor }}
                          >
                            {text}
                          </a>
                        );
                      })}
                    </div>
                  ) : (
                    section.text.map((text, i) => {
                      const href = getSectionLinkHref(section.title, text);
                      const isDesktopPhoneInContacts =
                        section.title === "CONTATTI" &&
                        href?.startsWith("tel:");

                      if (!href || isDesktopPhoneInContacts) {
                        return (
                          <p
                            key={i}
                            className="text-xs font-bold leading-tight max-w-xs"
                            style={{ color: colors.textColor }}
                          >
                            {text}
                          </p>
                        );
                      }

                      return (
                        <a
                          key={i}
                          href={href}
                          className="block py-0.5 text-xs font-bold leading-tight"
                          style={{ color: colors.textColor }}
                        >
                          {text}
                        </a>
                      );
                    })
                  )}
                </div>

                {/* Bottom section (e.g., CREDITS) */}
                {section.bottomTitle && section.bottomText && (
                  <div className="mt-auto pb-8">
                    <h2
                      className="text-sm uppercase font-erbaum font-light mb-1"
                      style={{ color: colors.textColor }}
                    >
                      {section.bottomTitle}
                    </h2>
                    {section.bottomText.map((text, i) => (
                      <p
                        key={i}
                        className="text-xs font-bold leading-tight"
                        style={{ color: colors.textColor }}
                      >
                        {text}
                      </p>
                    ))}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
