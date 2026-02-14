"use client";

import { useTheme, ThemeType } from "./theme-context";

const themes: { type: ThemeType; color: string; contourColor: string }[] = [
  { type: "main", color: "#efdea3", contourColor: "#282828" },   // beige → black contour
  { type: "black", color: "#282828", contourColor: "#F3F2F3" },  // black → white contour
  { type: "white", color: "#F3F2F3", contourColor: "#282828" },  // white → black contour
];

export function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="flex items-center gap-2 md:gap-2">
      {themes.map(({ type, color, contourColor }) => (
        <button
          key={type}
          onClick={() => setTheme(type)}
          className="relative transition-all hover:opacity-80"
          aria-label={`Switch to ${type} theme`}
        >
          {/* Single vertical line per theme */}
          <span
            className="block h-[1.45rem] w-[0.44rem] rounded-full md:h-6 md:w-[7px] lg:h-7 lg:w-[9px]"
            style={{
              backgroundColor: color,
              boxShadow: theme === type ? `0 0 0 1.5px ${contourColor}` : "none",
            }}
          />
        </button>
      ))}
    </div>
  );
}
