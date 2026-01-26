"use client";

import { Footer } from "@/components/footer";
import InteractiveLines from "@/components/interactive-lines";
import NavLink from "@/components/NavLink";
import { ThemeProvider, useTheme } from "@/components/theme-context";

const navLinks = [
  { href: "#", label: "WORKS" },
  { href: "#", label: "ABOUT" },
  { href: "#", label: "CONTACT US" },
];

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
          <NavLink href="#" style={{ color: colors.textColor }}>
            POSTER MEDIA
          </NavLink>

          {/* WORKS, ABOUT, CONTACT US - starting from center with equal spacing */}
          <div className="absolute left-1/2 right-4 md:right-8 flex justify-between">
            {navLinks.map((link, index) => (
              <NavLink
                key={index}
                href={link.href}
                style={{ color: colors.textColor }}
              >
                {link.label}
              </NavLink>
            ))}
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
