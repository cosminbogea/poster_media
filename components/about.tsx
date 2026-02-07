"use client";

import { useState, useEffect, useRef } from "react";
import { useTheme } from "@/components/theme-context";
import { aboutData } from "@/data/about";

interface NavPositions {
  posterMedia: number;
  works: number;
  about: number;
}

export function About() {
  const { colors } = useTheme();
  const [navPositions, setNavPositions] = useState<NavPositions | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const lineRefs = useRef<(HTMLDivElement | null)[]>([]);

  const lineWidth = 16;
  const lineCenter = lineWidth / 2;
  const containerPadding = 32; // px-8

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
  }, []);

  // Map nav positions to section titles
  const positionMap: Record<string, number> = {
    ABOUT: navPositions?.posterMedia ?? 0,
    SOCIAL: navPositions?.works ?? 0,
    CONTATTI: navPositions?.about ?? 0,
  };

  return (
    <div ref={containerRef} className="h-[calc(100vh-6rem-2rem)] relative">
      {aboutData.map((section, sectionIndex) => {
        const hasBottomSection = section.bottomTitle && section.bottomText;

        return (
          <div
            key={section.title}
            className="absolute"
            style={{
              left: positionMap[section.title],
              top: "15%",
              bottom: 0,
            }}
          >
            {/* Vertical line */}
            <div
              ref={(el) => { lineRefs.current[sectionIndex] = el; }}
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
              style={{ marginLeft: `${lineCenter}px` }}
            >
              <div>
                <h2
                  className="text-sm uppercase font-erbaum font-light pt-8"
                  style={{ color: colors.textColor }}
                >
                  {section.title}
                </h2>

                {section.text.map((text, i) => (
                  <p
                    key={i}
                    className="text-xs font-bold leading-tight max-w-xs"
                    style={{ color: colors.textColor }}
                  >
                    {text}
                  </p>
                ))}
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
  );
}
