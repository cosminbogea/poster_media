"use client";

import { useTheme } from "./theme-context";
import { ThemeSwitcher } from "./theme-switcher";

export function Footer() {
  const { colors } = useTheme();

  return (
    <footer className="absolute bottom-3 left-0 right-0 hidden md:block px-4 md:px-8 z-10">
      <div className="flex">
        {/* Empty left half */}
        <div className="hidden md:block w-1/2" />
        {/* Content with 3 elements and equal spacing */}
        <div className="w-full md:w-1/2 flex flex-col md:flex-row items-end justify-between">
          {/* Element 1: Info */}
          <p
            className="max-w-[520px] text-[7px] md:text-[8px] lg:text-[9px] leading-tight text-left font-bold self-end"
            style={{ color: colors.textColor }}
          >
            All website content (texts, images, logo, graphics, and works) is the property of Poster Media and is protected by copyright and intellectual property laws.
            <br />
            It is prohibited to copy, reproduce, redistribute, or publish any material without the explicit authorization of the author.
          </p>
          {/* Element 2: Copyright */}
          <span
            className="text-[8px] md:text-[9px] font-bold shrink-0 self-end"
            style={{ color: colors.textColor }}
          >
            COPYRIGHT © 2026 - ALL RIGHTS RESERVED.
          </span>
          {/* Element 3: Theme Switcher */}
          <div className="self-end">
            <ThemeSwitcher />
          </div>
        </div>
      </div>
    </footer>
  );
}
