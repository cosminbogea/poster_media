"use client";

import { useState } from "react";
import InteractiveLines from "@/components/interactive-lines";

export default function Home() {
  const [blackMood, setBlackMood] = useState(true);

  return (
    <main className="relative h-screen w-full overflow-hidden">
      {/* Interactive Lines Background */}
      <div className="absolute inset-0 z-0">
        <InteractiveLines
          lineColor="rgb(186, 186, 186)"
          backgroundColor="#1a1a1a"
        />
      </div>
      {/* Navigation - centered vertically */}
      <nav className="absolute top-1/2 left-0 right-0 -translate-y-1/2 px-4 md:px-8 z-10">
        <ul className="flex flex-wrap items-center justify-between gap-4 md:gap-8">
          <li>
            <a
              href="#"
              className="text-xs md:text-sm font-medium tracking-wider text-[#c94b4b] hover:opacity-80 transition-opacity"
            >
              POSTER MEDIA
            </a>
          </li>
          <li>
            <a
              href="#"
              className="text-xs md:text-sm font-medium tracking-wider text-[#c94b4b] hover:opacity-80 transition-opacity"
            >
              VIDEO
            </a>
          </li>
          <li>
            <a
              href="#"
              className="text-xs md:text-sm font-medium tracking-wider text-[#c94b4b] hover:opacity-80 transition-opacity"
            >
              FOTO
            </a>
          </li>
          <li>
            <a
              href="#"
              className="text-xs md:text-sm font-medium tracking-wider text-[#c94b4b] hover:opacity-80 transition-opacity"
            >
              OVERVIEW
            </a>
          </li>
          <li>
            <a
              href="#"
              className="text-xs md:text-sm font-medium tracking-wider text-[#c94b4b] hover:opacity-80 transition-opacity"
            >
              ABOUT
            </a>
          </li>
          <li>
            <button
              onClick={() => setBlackMood(!blackMood)}
              className="text-xs md:text-sm font-medium tracking-wider text-[#c94b4b] hover:opacity-80 transition-opacity"
            >
              BLACK MOOD: {blackMood ? "ON" : "OFF"}
            </button>
          </li>
        </ul>
      </nav>
    </main>
  );
}
