"use client";

import { useEffect, useState } from "react";
import gsap from "gsap";

export default function Preloader({ progress }: { progress: number }) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (progress >= 100) {
      // Fade out when reaching 100%
      gsap.to(".preloader-wrapper", {
        opacity: 0,
        duration: 1,
        ease: "power2.inOut",
        onComplete: () => setIsVisible(false),
      });
    }
  }, [progress]);

  if (!isVisible) return null;

  return (
    <div className="preloader-wrapper fixed inset-0 z-[100] flex flex-col items-center justify-center bg-zinc-950 text-white">
      <div className="relative w-32 h-32 flex items-center justify-center mb-8">
        {/* Outer Ring */}
        <div className="absolute inset-0 border-t-2 border-r-2 border-red-600 rounded-full animate-spin [animation-duration:3s]"></div>
        
        {/* Inner Ring */}
        <div className="absolute inset-2 border-b-2 border-l-2 border-zinc-700 rounded-full animate-spin [animation-duration:2s] animation-direction-reverse"></div>
        
        {/* Text */}
        <span className="font-serif text-2xl font-light tracking-widest">{Math.round(progress)}%</span>
      </div>
      
      <p className="font-serif text-sm tracking-[0.3em] uppercase text-zinc-500 animate-pulse">
        Éveil de la lame
      </p>
    </div>
  );
}
