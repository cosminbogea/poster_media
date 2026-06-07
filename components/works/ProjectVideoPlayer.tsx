"use client";

import { useRef, useState, useEffect, useId } from "react";
import { Play, Pause, Volume2, VolumeX } from "lucide-react";
import { useTheme } from "@/components/theme-context";
import { cloudinaryVideoSrc, cloudinaryVideoPosterSrc } from "@/lib/cloudinaryLoader";

interface ProjectVideoPlayerProps {
  src: string;
  poster?: string;
}

export function ProjectVideoPlayer({ src, poster }: ProjectVideoPlayerProps) {
  const { colors } = useTheme();
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const [isNearViewport, setIsNearViewport] = useState(false);
  const id = useId();

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsNearViewport(true);
          observer.disconnect();
        }
      },
      { rootMargin: "300px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    function onOtherVideoPlaying(e: Event) {
      const { id: activeId } = (e as CustomEvent<{ id: string }>).detail;
      if (activeId !== id) {
        const video = videoRef.current;
        if (video && !video.paused) {
          video.pause();
          setPlaying(false);
        }
      }
    }
    window.addEventListener("videoplay", onOtherVideoPlaying);
    return () => window.removeEventListener("videoplay", onOtherVideoPlaying);
  }, [id]);

  function togglePlay() {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      window.dispatchEvent(new CustomEvent("videoplay", { detail: { id } }));
      video.play();
      setPlaying(true);
    } else {
      video.pause();
      setPlaying(false);
    }
  }

  function toggleMute() {
    const video = videoRef.current;
    if (!video) return;
    video.muted = !video.muted;
    setMuted(video.muted);
  }

  const resolvedPoster = poster ?? cloudinaryVideoPosterSrc(src);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full overflow-hidden"
      style={{ background: colors.background }}
    >
      <video
        ref={videoRef}
        className="w-full h-full object-cover cursor-pointer"
        src={cloudinaryVideoSrc(src)}
        poster={resolvedPoster}
        playsInline
        preload={isNearViewport ? "metadata" : "none"}
        onClick={togglePlay}
        onEnded={() => setPlaying(false)}
      />

      {!playing && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div
            className="flex items-center justify-center w-16 h-16 rounded-full"
            style={{ backgroundColor: "rgba(0,0,0,0.45)" }}
          >
            <Play className="w-7 h-7 text-white fill-white translate-x-0.5" />
          </div>
        </div>
      )}

      <div className="absolute bottom-4 right-4 flex items-center gap-2">
        <button
          onClick={togglePlay}
          className="flex items-center justify-center w-9 h-9 rounded-full transition-opacity hover:opacity-80"
          style={{ backgroundColor: "rgba(0,0,0,0.45)" }}
          aria-label={playing ? "Pause" : "Play"}
        >
          {playing ? (
            <Pause className="w-4 h-4 text-white fill-white" />
          ) : (
            <Play className="w-4 h-4 text-white fill-white translate-x-px" />
          )}
        </button>

        <button
          onClick={toggleMute}
          className="flex items-center justify-center w-9 h-9 rounded-full transition-opacity hover:opacity-80"
          style={{ backgroundColor: "rgba(0,0,0,0.45)" }}
          aria-label={muted ? "Unmute" : "Mute"}
        >
          {muted ? (
            <VolumeX className="w-4 h-4 text-white" />
          ) : (
            <Volume2 className="w-4 h-4 text-white" />
          )}
        </button>
      </div>
    </div>
  );
}
