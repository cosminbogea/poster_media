"use client";

import { createContext, useContext, useState, ReactNode } from "react";

export type ThemeType = "main" | "black" | "white";

interface ThemeColors {
  background: string;
  lineColor: string;
  textColor: string;
}

const themeColors: Record<ThemeType, ThemeColors> = {
  main: {
    background: "#cc405b",
    lineColor: "rgba(210, 120, 140, 0.85)",
    textColor: "rgba(0, 0, 0, 0.8)",
  },
  black: {
    background: "#282828",
    lineColor: "rgba(60, 60, 60, 0.85)",
    textColor: "rgba(255, 255, 255, 0.8)",
  },
  white: {
    background: "#F3F2F3",
    lineColor: "rgba(200, 200, 200, 0.85)",
    textColor: "rgba(0, 0, 0, 0.8)",
  },
};

interface ThemeContextType {
  theme: ThemeType;
  setTheme: (theme: ThemeType) => void;
  colors: ThemeColors;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<ThemeType>("main");

  return (
    <ThemeContext.Provider
      value={{
        theme,
        setTheme,
        colors: themeColors[theme],
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
