"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Preloader from "./ui/Preloader";

gsap.registerPlugin(ScrollTrigger);

export interface SequenceConfig {
  frameCount: number;
  imagePathPrefix: string;
  imagePathSuffix: string;
}

interface CanvasSequenceProps {
  sequences: SequenceConfig[];
  onLoadProgress?: (progress: number) => void;
}

export default function CanvasSequence({ sequences, onLoadProgress }: CanvasSequenceProps) {
  const canvasRefs = useRef<(HTMLCanvasElement | null)[]>([]);
  const [images, setImages] = useState<HTMLImageElement[][]>([]);
  const [progress, setProgress] = useState(0);
  const [loadProgress, setLoadProgress] = useState(0);

  const currentFrame = (prefix: string, index: number, suffix: string) =>
    `${prefix}${index.toString().padStart(4, "0")}${suffix}`;

  // Preload images for all sequences
  useEffect(() => {
    if (sequences.length === 0) return;

    let totalLoaded = 0;
    const expectedTotal = sequences.reduce((sum, seq) => sum + seq.frameCount, 0);
    const loadedMatrix: HTMLImageElement[][] = sequences.map(() => []);

    sequences.forEach((seq, seqIndex) => {
      for (let i = 1; i <= seq.frameCount; i++) {
        const img = new Image();
        img.src = currentFrame(seq.imagePathPrefix, i, seq.imagePathSuffix);
        img.onload = () => {
          totalLoaded++;
          const percentage = (totalLoaded / expectedTotal) * 100;
          setLoadProgress(percentage);
          if (onLoadProgress) onLoadProgress(percentage);
          
          if (totalLoaded === expectedTotal) {
            setImages([...loadedMatrix]);
          }
        };
        loadedMatrix[seqIndex].push(img);
      }
    });
  }, [sequences]);

  // Render a frame to a specific canvas
  const renderFrame = (canvas: HTMLCanvasElement, img: HTMLImageElement) => {
    const ctx = canvas.getContext("2d");
    if (!ctx || !img || !img.complete) return;

    const cw = canvas.width;
    const ch = canvas.height;
    const iw = img.width;
    const ih = img.height;

    const ratio = Math.max(cw / iw, ch / ih);
    const w = iw * ratio;
    const h = ih * ratio;
    const x = (cw - w) / 2;
    const y = (ch - h) / 2;

    ctx.clearRect(0, 0, cw, ch);
    ctx.drawImage(img, x, y, w, h);
  };

  // Sync canvas size and render current state
  useEffect(() => {
    const resizeCanvas = () => {
      canvasRefs.current.forEach((canvas) => {
        if (canvas) {
          canvas.width = window.innerWidth;
          canvas.height = window.innerHeight;
        }
      });
      // Force an update to redraw based on new size
      setProgress((p) => p + 0.000001); 
    };

    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();
    return () => window.removeEventListener("resize", resizeCanvas);
  }, []);

  // Main render loop based on progress
  useEffect(() => {
    if (images.length !== sequences.length) return;

    const numSeqs = sequences.length;
    const segmentSize = 1 / numSeqs;
    const crossfadePadding = 0.02; // 2% overlap for crossfade

    for (let i = 0; i < numSeqs; i++) {
      const canvas = canvasRefs.current[i];
      const seq = sequences[i];
      const seqImages = images[i];
      if (!canvas || !seqImages || seqImages.length === 0) continue;

      const start = i * segmentSize;
      const end = (i + 1) * segmentSize;

      // Local progress clamped between 0 and 1
      let localProgress = (progress - start) / segmentSize;
      localProgress = Math.max(0, Math.min(1, localProgress));

      // Determine opacity
      let opacity = 0;
      if (progress >= start - crossfadePadding && progress <= end + crossfadePadding) {
        opacity = 1;
        // Crossfade in
        if (i > 0 && progress < start + crossfadePadding) {
          opacity = (progress - (start - crossfadePadding)) / (2 * crossfadePadding);
        }
        // Crossfade out
        if (i < numSeqs - 1 && progress > end - crossfadePadding) {
          opacity = 1 - (progress - (end - crossfadePadding)) / (2 * crossfadePadding);
        }
      }

      canvas.style.opacity = opacity.toString();
      
      if (opacity > 0) {
        const frameIndex = Math.floor(localProgress * (seq.frameCount - 1));
        if (seqImages[frameIndex]) {
          renderFrame(canvas, seqImages[frameIndex]);
        }
      }
    }
  }, [progress, images, sequences]);

  // GSAP ScrollTrigger
  useEffect(() => {
    const st = ScrollTrigger.create({
      trigger: "main",
      start: "top top",
      end: "bottom bottom",
      scrub: 0.5,
      onUpdate: (self) => {
        setProgress(self.progress);
      },
    });

    return () => {
      st.kill();
    };
  }, []);

  return (
    <>
      {sequences.map((_, index) => (
        <canvas
          key={index}
          ref={(el) => {
            canvasRefs.current[index] = el;
          }}
          className={`fixed top-0 left-0 w-full h-full object-cover pointer-events-none`}
          style={{ 
            opacity: index === 0 ? 1 : 0,
            zIndex: -20 + index 
          }}
        />
      ))}
    </>
  );
}
