"use client";

import { ReactNode } from "react";
import { Navigation } from "@/components/navigation/Navigation";
import { MobileTopBar } from "@/components/navigation/MobileTopBar";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { useTheme } from "@/components/theme-context";

interface PageLayoutProps {
  children: ReactNode;
}

export function PageLayout({ children }: PageLayoutProps) {
  const { colors } = useTheme();

  return (
    <div
      className="min-h-screen transition-colors duration-500"
      style={{ backgroundColor: colors.background }}
    >
      <MobileTopBar />
      <Navigation variant="subpage" />
      <main
        className="pt-4 px-4 md:px-8"
        style={{ paddingBottom: "max(4rem, env(safe-area-inset-bottom))" }}
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
