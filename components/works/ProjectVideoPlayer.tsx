"use client";

import { useRef, useState } from "react";
import { Play, Pause, Volume2, VolumeX } from "lucide-react";
import { useTheme } from "@/components/theme-context";
import { cloudinaryVideoSrc } from "@/lib/cloudinaryLoader";

interface ProjectVideoPlayerProps {
  src: string;
  poster?: string;
}

export function ProjectVideoPlayer({ src, poster }: ProjectVideoPlayerProps) {
  const { colors } = useTheme();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);

  function togglePlay() {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
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

  return (
    <div
      className="relative w-full h-full overflow-hidden"
      style={{ background: colors.background }}
    >
      <video
        ref={videoRef}
        className="w-full h-full object-cover cursor-pointer"
        src={cloudinaryVideoSrc(src)}
        poster={poster}
        playsInline
        preload="metadata"
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
