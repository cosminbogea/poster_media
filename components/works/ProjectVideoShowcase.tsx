"use client";

import { useRef, useState, useEffect } from "react";
import { Play, X } from "lucide-react";
import { cloudinaryVideoSrc, cloudinaryVideoSrcHD, cloudinaryVideoPosterSrc } from "@/lib/cloudinaryLoader";
import { ProjectVideoPlayer } from "./ProjectVideoPlayer";

interface ProjectVideoShowcaseProps {
  src: string;
  poster?: string;
}

export function ProjectVideoShowcase({ src, poster }: ProjectVideoShowcaseProps) {
  const containerRef  = useRef<HTMLDivElement>(null);
  const bgVideoRef    = useRef<HTMLVideoElement>(null);
  const modalVideoRef = useRef<HTMLVideoElement>(null);
  const savedTimeRef  = useRef(0);

  const [isVisible, setIsVisible] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  // Lazy-load when near viewport
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setIsVisible(true); obs.disconnect(); } },
      { rootMargin: "300px" }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  // Pause / resume bg loop when any showcase modal opens or closes
  useEffect(() => {
    function onOpen()  { bgVideoRef.current?.pause(); }
    function onClose() { bgVideoRef.current?.play().catch(() => {}); }
    window.addEventListener("showcase:modalopen",  onOpen);
    window.addEventListener("showcase:modalclose", onClose);
    return () => {
      window.removeEventListener("showcase:modalopen",  onOpen);
      window.removeEventListener("showcase:modalclose", onClose);
    };
  }, []);

  // ESC + scroll lock
  useEffect(() => {
    if (!modalOpen) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") closeModal(); };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [modalOpen]); // eslint-disable-line react-hooks/exhaustive-deps

  function openModal() {
    window.dispatchEvent(new Event("showcase:modalopen"));
    setModalOpen(true);
    const v = modalVideoRef.current;
    if (v) {
      v.currentTime = savedTimeRef.current;
      v.play().catch(() => {});
    }
  }

  function closeModal() {
    const v = modalVideoRef.current;
    if (v) { savedTimeRef.current = v.currentTime; v.pause(); }
    window.dispatchEvent(new Event("showcase:modalclose"));
    setModalOpen(false);
  }

  const resolvedPoster = poster ?? cloudinaryVideoPosterSrc(src);

  return (
    <>
      {/* Desktop: silent loop + watch button */}
      <div ref={containerRef} className="relative w-full h-full hidden md:block overflow-hidden">
        <video
          ref={bgVideoRef}
          className="w-full h-full object-cover"
          src={isVisible ? cloudinaryVideoSrc(src) : undefined}
          poster={resolvedPoster}
          autoPlay loop muted playsInline preload="none"
        />
        <button
          onClick={openModal}
          className="absolute bottom-5 right-5 flex items-center gap-3 pl-2 pr-5 py-2 rounded-2xl backdrop-blur-xl transition-opacity hover:opacity-80 cursor-pointer"
          style={{ backgroundColor: "rgba(255,255,255,0.18)" }}
          aria-label="Watch full video"
        >
          <div className="flex items-center justify-center w-10 h-10 rounded-full bg-white shrink-0">
            <Play className="w-4 h-4 fill-black text-black translate-x-0.5" />
          </div>
          <span className="text-sm font-medium text-white leading-tight">Watch full video</span>
        </button>
      </div>

      {/* Mobile: standard interactive player */}
      <div className="md:hidden w-full h-full">
        <ProjectVideoPlayer src={src} poster={poster} />
      </div>

      {/* Fullscreen modal — always in DOM so metadata preloads */}
      <div
        className={`fixed inset-0 z-50 flex items-center justify-center bg-black transition-opacity duration-200 ${
          modalOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        aria-hidden={!modalOpen}
        onClick={(e) => { if (e.target === e.currentTarget) closeModal(); }}
      >
        <video
          ref={modalVideoRef}
          className="max-w-[92vw] max-h-[92vh] object-contain rounded-lg"
          src={isVisible ? cloudinaryVideoSrcHD(src) : undefined}
          poster={resolvedPoster}
          controls
          playsInline
          preload={isVisible ? "metadata" : "none"}
          disablePictureInPicture
          onEnded={() => { savedTimeRef.current = 0; }}
          onClick={(e) => e.stopPropagation()}
        />

        <button
          onClick={closeModal}
          className="absolute top-5 right-5 flex items-center justify-center w-10 h-10 rounded-full bg-white/15 text-white hover:bg-white/30 transition-colors cursor-pointer"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>
      </div>
    </>
  );
}
