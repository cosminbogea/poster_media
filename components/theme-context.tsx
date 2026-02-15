"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export type ThemeType = "black" | "white";

interface ThemeColors {
  background: string;
  lineColor: string;
  textColor: string;
  inactiveNavColor: string;
}

const themeColors: Record<ThemeType, ThemeColors> = {
  black: {
    background: "#282828",
    lineColor: "#353535",
    textColor: "rgba(255, 255, 255, 0.8)",
    inactiveNavColor: "#6f6f6e",
  },
  white: {
    background: "#F3F2F3",
    lineColor: "#e8e8e8",
    textColor: "rgba(0, 0, 0, 0.8)",
    inactiveNavColor: "#d8d8d8",
  },
};

interface ThemeContextType {
  theme: ThemeType;
  setTheme: (theme: ThemeType) => void;
  colors: ThemeColors;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<ThemeType>("black");

  useEffect(() => {
    document.body.style.backgroundColor = themeColors[theme].background;
  }, [theme]);

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
