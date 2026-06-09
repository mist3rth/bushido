"use client";

import { useEffect, useState, useRef } from "react";
import { Volume2, VolumeX } from "lucide-react";

export default function AudioPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    audioRef.current = new Audio("/son.mp3");
    audioRef.current.loop = true;
    audioRef.current.volume = 0.5;

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const togglePlay = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch((e) => console.error("Audio play blocked", e));
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <button
      onClick={togglePlay}
      className="fixed bottom-6 right-6 z-50 p-3 bg-black/50 backdrop-blur-md border border-white/20 rounded-full text-white hover:bg-white/10 hover:scale-110 transition-all duration-300"
      aria-label="Toggle sound"
    >
      {isPlaying ? <Volume2 size={24} /> : <VolumeX size={24} />}
    </button>
  );
}
