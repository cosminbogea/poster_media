"use client";

import { useTheme } from "./theme-context";
import { ThemeSwitcher } from "./theme-switcher";

export function Footer() {
  const { colors } = useTheme();

  return (
    <footer className="absolute bottom-3 left-0 right-0 px-4 md:px-8 z-10">
      <div className="flex">
        {/* Empty left half */}
        <div className="hidden md:block w-1/2" />
        {/* Content starting at middle with space-between */}
        <div className="w-full md:w-1/2 flex flex-col md:flex-row md:items-end justify-between gap-2">
          <p
            className="max-w-[520px] text-[7px] md:text-[8px] lg:text-[9px] leading-tight text-left font-bold"
            style={{ color: colors.textColor }}
          >
            Tutti i contenuti del sito (testi, immagini, logo, grafica e opere)
            sono di proprieta di Poster Media
            <br />
            e protetti dal diritto d&apos;autore e proprieta intellettuale. E
            vietato copiare, riprodurre, redistribuire
            <br />o pubblicare qualsiasi materiale senza autorizzazione esplicita
            dell&apos;autore.
          </p>
          <div
            className="flex items-center gap-6 text-[8px] md:text-[9px] font-bold shrink-0"
            style={{ color: colors.textColor }}
          >
            <span>COPYRIGHT 2026 - ALL RIGHTS RESERVED.</span>
            <ThemeSwitcher />
          </div>
        </div>
      </div>
    </footer>
  );
}
