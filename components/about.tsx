"use client";

import { useState, useEffect } from "react";
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

  const lineWidth = 16;
  const lineCenter = lineWidth / 2;
  const containerPadding = 32; // px-8

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
    <div className="h-[calc(100vh-6rem-2rem)] relative">
      {aboutData.map((section) => {
        const hasBottomSection = section.bottomTitle && section.bottomText;

        return (
          <div
            key={section.title}
            className="absolute"
            style={{
              left: positionMap[section.title],
              top: "30%",
              bottom: 0,
            }}
          >
            {/* Vertical line */}
            <div
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
