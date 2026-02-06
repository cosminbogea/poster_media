"use client";

import { Footer } from "@/components/footer";
import InteractiveLines from "@/components/interactive-lines";
import { Navigation } from "@/components/navigation/Navigation";
import { useTheme } from "@/components/theme-context";

export default function Home() {
  const { colors } = useTheme();

  return (
    <main
      className="relative h-screen w-full overflow-hidden transition-colors duration-500"
      style={{ backgroundColor: colors.background }}
    >
      {/* Interactive Lines Background */}
      <div className="absolute inset-0 z-0">
        <InteractiveLines />
      </div>

      {/* Navigation - positioned at 35% height on homepage */}
      <Navigation variant="homepage" />

      <Footer />
    </main>
  );
}
