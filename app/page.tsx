"use client";

import Link from "next/link";
import { Footer } from "@/components/footer";
import InteractiveLines from "@/components/interactive-lines";
import { MobileTopBar } from "@/components/navigation/MobileTopBar";
import { Navigation } from "@/components/navigation/Navigation";
import { useTheme } from "@/components/theme-context";

export default function Home() {
  const { colors } = useTheme();

  return (
    <main
      className="relative h-screen w-full overflow-hidden transition-colors duration-500"
      style={{ backgroundColor: colors.background }}
    >
      <MobileTopBar showLinks={false} />

      {/* Interactive Lines Background */}
      <div className="absolute inset-0 z-0">
        <InteractiveLines />
      </div>

      <nav className="absolute left-0 right-0 top-1/2 z-20 -translate-y-1/2 px-4 md:hidden">
        <div className="grid grid-cols-3 items-center">
          <Link
            href="/works"
            className="justify-self-start text-xs font-bold leading-none"
            style={{ color: colors.textColor }}
          >
            WORKS
          </Link>
          <Link
            href="/about"
            className="justify-self-center text-xs font-bold leading-none"
            style={{ color: colors.textColor }}
          >
            ABOUT
          </Link>
          <Link
            href="/contact"
            className="justify-self-end text-xs font-bold leading-none"
            style={{ color: colors.textColor }}
          >
            CONTACT US
          </Link>
        </div>
      </nav>

      <div
        className="absolute inset-x-0 z-20 px-4 md:hidden"
        style={{ bottom: "max(0.75rem, env(safe-area-inset-bottom))" }}
      >
        <p
          className="text-[7px] leading-tight font-bold"
          style={{ color: colors.textColor }}
        >
          Tutti i contenuti del sito (testi, immagini, logo, grafica e opere)
          sono di proprieta di Poster Media e protetti dal diritto d&apos;autore
          e proprieta intellettuale. E vietato copiare, riprodurre,
          redistribuire o pubblicare qualsiasi materiale senza autorizzazione
          esplicita dell&apos;autore.
        </p>
      </div>

      {/* Navigation - positioned at 35% height on homepage */}
      <Navigation variant="homepage" />

      <Footer />
    </main>
  );
}
