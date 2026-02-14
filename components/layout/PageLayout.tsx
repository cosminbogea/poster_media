"use client";

import { ReactNode, useEffect } from "react";
import { Navigation } from "@/components/navigation/Navigation";
import { MobileTopBar } from "@/components/navigation/MobileTopBar";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { useTheme } from "@/components/theme-context";

interface PageLayoutProps {
  children: ReactNode;
  lockViewport?: boolean;
}

export function PageLayout({ children, lockViewport = false }: PageLayoutProps) {
  const { colors } = useTheme();

  useEffect(() => {
    if (!lockViewport) return;

    const previousHtmlOverflow = document.documentElement.style.overflow;
    const previousBodyOverflow = document.body.style.overflow;

    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";

    return () => {
      document.documentElement.style.overflow = previousHtmlOverflow;
      document.body.style.overflow = previousBodyOverflow;
    };
  }, [lockViewport]);

  return (
    <div
      className={`${lockViewport ? "h-svh" : "min-h-screen"} transition-colors duration-500`}
      style={{ backgroundColor: colors.background }}
    >
      <MobileTopBar />
      <Navigation variant="subpage" />
      <main
        className="pt-4 px-4 md:px-8"
        style={{
          paddingBottom: lockViewport
            ? "0"
            : "max(4rem, env(safe-area-inset-bottom))",
        }}
      >
        {children}
      </main>

      {/* ThemeSwitcher - same position as homepage footer */}
      <div className="fixed bottom-3 right-4 md:right-8 z-50 hidden md:block">
        <ThemeSwitcher />
      </div>
    </div>
  );
}
