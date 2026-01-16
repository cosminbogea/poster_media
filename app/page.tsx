"use client";

import InteractiveLines from "@/components/interactive-lines";

export default function Home() {
  return (
    <main className="relative h-screen w-full overflow-hidden bg-[#c1465c]">
      {/* Interactive Lines Background */}
      <div className="absolute inset-0 z-0">
        <InteractiveLines lineColor="#ebebeb" />
      </div>
      {/* Navigation - centered vertically */}
      <nav className="absolute top-1/2 left-0 right-0 -translate-y-1/2 px-4 md:px-8 z-10">
        <ul className="flex flex-wrap items-center justify-between gap-4 md:gap-8">
          <li>
            <a
              href="#"
              className="text-xs md:text-base lg:text-lg font-medium tracking-wider text-black hover:opacity-80 transition-opacity"
            >
              POSTER MEDIA
            </a>
          </li>
          <li>
            <a
              href="#"
              className="text-xs md:text-base lg:text-lg font-medium tracking-wider text-black hover:opacity-80 transition-opacity"
            >
              WORKS
            </a>
          </li>
          <li>
            <a
              href="#"
              className="text-xs md:text-base lg:text-lg font-medium tracking-wider text-black hover:opacity-80 transition-opacity"
            >
              ABOUT
            </a>
          </li>
          <li>
            <a
              href="#"
              className="text-xs md:text-base lg:text-lg font-medium tracking-wider text-black hover:opacity-80 transition-opacity"
            >
              CONTACT US
            </a>
          </li>
        </ul>
      </nav>
    </main>
  );
}
