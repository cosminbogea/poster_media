"use client";

import { useState, useEffect } from "react";
import { useTheme } from "@/components/theme-context";

interface NavPositions {
  posterMedia: number;
  works: number;
  about: number;
}

export function Contact() {
  const { colors } = useTheme();
  const [navPositions, setNavPositions] = useState<NavPositions | null>(null);

  const lineWidth = 16;
  const lineCenter = lineWidth / 2;
  const containerPadding = 32;

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

  const sections = [
    {
      title: "CONTACT",
      left: navPositions?.posterMedia ?? 0,
      text: ["Get in touch with us"],
    },
    {
      title: "EMAIL",
      left: navPositions?.works ?? 0,
      text: ["jacopo@poster-media.com"],
    },
    {
      title: "PHONE",
      left: navPositions?.about ?? 0,
      text: ["+39 3311425252"],
    },
  ];

  return (
    <div className="h-[calc(100vh-6rem-2rem)] relative">
      {sections.map((section) => (
        <div
          key={section.title}
          className="absolute"
          style={{
            left: section.left,
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
            className="relative z-10"
            style={{ marginLeft: `${lineCenter}px` }}
          >
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
        </div>
      ))}
    </div>
  );
}
