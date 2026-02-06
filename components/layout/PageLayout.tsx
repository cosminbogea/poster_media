"use client";

import { ReactNode } from "react";
import { Navigation } from "@/components/navigation/Navigation";
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
      <Navigation variant="subpage" />
      <main className="pt-24 pb-16 px-4 md:px-8">{children}</main>

      {/* ThemeSwitcher - same position as homepage footer */}
      <div className="fixed bottom-3 right-4 md:right-8 z-50">
        <ThemeSwitcher />
      </div>
    </div>
  );
}
