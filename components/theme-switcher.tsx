"use client";

import { useTheme, ThemeType } from "./theme-context";

const themes: { type: ThemeType; color: string; contourColor: string }[] = [
  { type: "main", color: "#cc405b", contourColor: "#1a1a1a" },   // main → black contour
  { type: "black", color: "#1a1a1a", contourColor: "#f5f5f5" },  // black → white contour
  { type: "white", color: "#f5f5f5", contourColor: "#cc405b" },  // white → main contour
];

export function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="flex items-center gap-[3px]">
      {themes.map(({ type, color, contourColor }) => (
        <button
          key={type}
          onClick={() => setTheme(type)}
          className="relative transition-all hover:opacity-80"
          aria-label={`Switch to ${type} theme`}
        >
          {/* Single vertical line per theme */}
          <span
            className="block w-[5px] h-5 rounded-full"
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
