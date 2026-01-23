"use client";

import { Footer } from "@/components/footer";
import InteractiveLines from "@/components/interactive-lines";
import { ThemeProvider, useTheme } from "@/components/theme-context";

function HomeContent() {
  const { colors } = useTheme();

  return (
    <main
      className="relative h-screen w-full overflow-hidden transition-colors duration-500"
      style={{ backgroundColor: colors.background }}
    >
      {/* Interactive Lines Background */}
      <div className="absolute inset-0 z-0">
        <InteractiveLines
          lineColor={colors.lineColor}
          backgroundColor={colors.background}
        />
      </div>
      {/* Navigation - positioned at 35% height */}
      <nav className="absolute top-[35%] left-0 right-0 px-4 md:px-8 z-10">
        <div className="flex items-center">
          {/* POSTER MEDIA - left aligned */}
          <a
            href="#"
            className="text-xs md:text-base lg:text-lg font-bold hover:opacity-80 transition-opacity"
            style={{ color: colors.textColor }}
          >
            POSTER MEDIA
          </a>

          {/* WORKS, ABOUT, CONTACT US - starting from center with equal spacing */}
          <div className="absolute left-1/2 right-4 md:right-8 flex justify-between">
            <a
              href="#"
              className="text-xs md:text-base lg:text-lg font-bold hover:opacity-80 transition-opacity"
              style={{ color: colors.textColor }}
            >
              WORKS
            </a>
            <a
              href="#"
              className="text-xs md:text-base lg:text-lg font-bold hover:opacity-80 transition-opacity"
              style={{ color: colors.textColor }}
            >
              ABOUT
            </a>
            <a
              href="#"
              className="text-xs md:text-base lg:text-lg font-bold hover:opacity-80 transition-opacity"
              style={{ color: colors.textColor }}
            >
              CONTACT US
            </a>
          </div>
        </div>
      </nav>

      <Footer />
    </main>
  );
}

export default function Home() {
  return (
    <ThemeProvider>
      <HomeContent />
    </ThemeProvider>
  );
}
