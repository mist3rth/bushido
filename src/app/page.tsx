"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import CanvasSequence from "@/components/CanvasSequence";
import Preloader from "@/components/ui/Preloader";
import { Plus, X, Volume2, VolumeX, Mouse, Swords } from "lucide-react";
import { useLenis } from "@studio-freight/react-lenis";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const lenis = useLenis();
  const [loadProgress, setLoadProgress] = useState(0);
  const [tooltip, setTooltip] = useState<string | null>(null);
  const [globalFrame, setGlobalFrame] = useState(0);
  const [isMuted, setIsMuted] = useState(true);

  const audioRef = useRef<HTMLAudioElement>(null);
  const canvasWrapperRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);

  const titleRef = useRef<HTMLHeadingElement>(null);
  const slashRef = useRef<HTMLDivElement>(null);
  const nuagesRef = useRef<HTMLDivElement>(null);
  const samuraiRef = useRef<HTMLDivElement>(null);
  
  const kabutoRef = useRef<HTMLDivElement>(null);
  const doRef = useRef<HTMLDivElement>(null);

  const espritRef = useRef<HTMLDivElement>(null);
  const mushinRef = useRef<HTMLDivElement>(null);
  
  const sayaRef = useRef<HTMLDivElement>(null);
  const tamahaganeRef = useRef<HTMLDivElement>(null);
  const haRef = useRef<HTMLDivElement>(null);
  
  const sangRef = useRef<HTMLDivElement>(null);
  const oniRef = useRef<HTMLDivElement>(null);
  const outroRef = useRef<HTMLDivElement>(null);

  const hotspot1Ref = useRef<HTMLButtonElement>(null);
  const hotspot2Ref = useRef<HTMLButtonElement>(null);
  const hotspotForgeRef = useRef<HTMLButtonElement>(null);

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
      if (audioRef.current.paused) {
        audioRef.current.play().catch(e => console.log("Autoplay blocked", e));
      }
    }
  };

  useEffect(() => {
    // Helper pour convertir une frame en % pour ScrollTrigger
    const f2p = (frame: number) => (frame / 1800) * (1700 / 1800) * 100;

    // Debug Frame Counter
    ScrollTrigger.create({
      trigger: "#scroll-container",
      start: "top top",
      end: "bottom bottom",
      onUpdate: (self) => {
        setGlobalFrame(Math.floor(self.progress * 1800));
      }
    });

    // Scroll progress bar
    gsap.to(progressBarRef.current, { 
      scaleY: 1, 
      ease: "none",
      scrollTrigger: { trigger: "#scroll-container", start: "top top", end: "bottom bottom", scrub: true } 
    });

    // Darkside Canvas Glitch Effect
    gsap.fromTo(canvasWrapperRef.current, 
      { filter: "hue-rotate(0deg) contrast(100%) saturate(100%)" }, 
      { filter: "hue-rotate(-45deg) contrast(150%) saturate(150%)", 
        scrollTrigger: { trigger: "#scroll-container", start: "66.6% top", end: "83.3% top", scrub: true } 
      }
    );

    // Section 0 -> 1: Le titre
    gsap.to(titleRef.current, { opacity: 0, clipPath: "inset(0% 100% 0% 0%)", y: -50, scrollTrigger: { trigger: "#scroll-container", start: "top top", end: "2% top", scrub: true } });

    // Section 1: La Faille
    gsap.fromTo(slashRef.current, { opacity: 0, clipPath: "inset(0% 100% 0% 0%)", x: -50 }, { opacity: 1, clipPath: "inset(0% 0% 0% 0%)", x: 0, scrollTrigger: { trigger: "#scroll-container", start: "3% top", end: "5% top", scrub: true } });
    gsap.to(slashRef.current, { opacity: 0, clipPath: "inset(0% 0% 0% 100%)", scrollTrigger: { trigger: "#scroll-container", start: "6% top", end: "8% top", scrub: true } });

    // Section 1.5: Les Nuages d'Or
    gsap.fromTo(nuagesRef.current, { opacity: 0, clipPath: "inset(100% 0% 0% 0%)" }, { opacity: 1, clipPath: "inset(0% 0% 0% 0%)", scrollTrigger: { trigger: "#scroll-container", start: "9% top", end: "11% top", scrub: true } });
    gsap.to(nuagesRef.current, { opacity: 0, clipPath: "inset(0% 0% 100% 0%)", scrollTrigger: { trigger: "#scroll-container", start: "12% top", end: "14% top", scrub: true } });

    // Section 2: Le Gardien (Masque d'Oni - Frames 412 -> 500)
    gsap.fromTo(samuraiRef.current, { opacity: 0, x: 50 }, { opacity: 1, x: 0, scrollTrigger: { trigger: "#scroll-container", start: `${f2p(412)}% top`, end: `${f2p(425)}% top`, scrub: true } });
    gsap.to(samuraiRef.current, { opacity: 0, x: 50, scrollTrigger: { trigger: "#scroll-container", start: `${f2p(490)}% top`, end: `${f2p(500)}% top`, scrub: true } });

    // Section Armure A: Le Kabuto
    gsap.fromTo(kabutoRef.current, { opacity: 0, clipPath: "inset(0% 0% 100% 0%)" }, { opacity: 1, clipPath: "inset(0% 0% 0% 0%)", scrollTrigger: { trigger: "#scroll-container", start: "19% top", end: "21% top", scrub: true } });
    gsap.fromTo(hotspot1Ref.current, { autoAlpha: 0, scale: 0 }, { autoAlpha: 1, scale: 1, scrollTrigger: { trigger: "#scroll-container", start: "19% top", end: "21% top", scrub: true } });
    gsap.to(kabutoRef.current, { opacity: 0, scrollTrigger: { trigger: "#scroll-container", start: "23% top", end: "25% top", scrub: true } });
    gsap.to(hotspot1Ref.current, { autoAlpha: 0, scale: 0, scrollTrigger: { trigger: "#scroll-container", start: "23% top", end: "25% top", scrub: true } });

    // Section Armure B: Le Do (Plastron)
    gsap.fromTo(doRef.current, { opacity: 0, scale: 0.95 }, { opacity: 1, scale: 1, scrollTrigger: { trigger: "#scroll-container", start: "27% top", end: "29% top", scrub: true } });
    gsap.to(doRef.current, { opacity: 0, scale: 1.05, scrollTrigger: { trigger: "#scroll-container", start: "31% top", end: "33% top", scrub: true } });

    // Section 3: L'Esprit (Mizu no Kokoro)
    gsap.fromTo(espritRef.current, { opacity: 0, filter: "blur(10px)", scale: 0.95 }, { opacity: 1, filter: "blur(0px)", scale: 1, scrollTrigger: { trigger: "#scroll-container", start: "36% top", end: "38% top", scrub: true } });
    gsap.to(espritRef.current, { opacity: 0, filter: "blur(10px)", scrollTrigger: { trigger: "#scroll-container", start: "41% top", end: "43% top", scrub: true } });

    // Section 3b: Mushin
    gsap.fromTo(mushinRef.current, { opacity: 0, filter: "blur(10px)", scale: 0.95 }, { opacity: 1, filter: "blur(0px)", scale: 1, scrollTrigger: { trigger: "#scroll-container", start: "44% top", end: "46% top", scrub: true } });
    gsap.to(mushinRef.current, { opacity: 0, filter: "blur(10px)", scrollTrigger: { trigger: "#scroll-container", start: "48% top", end: "50% top", scrub: true } });

    // Hotspot Forge (Frames 845 -> 875)
    gsap.fromTo(hotspotForgeRef.current, { autoAlpha: 0, scale: 0 }, { autoAlpha: 1, scale: 1, scrollTrigger: { trigger: "#scroll-container", start: `${f2p(845)}% top`, end: `${f2p(850)}% top`, scrub: true } });
    gsap.to(hotspotForgeRef.current, { autoAlpha: 0, scale: 0, scrollTrigger: { trigger: "#scroll-container", start: `${f2p(870)}% top`, end: `${f2p(875)}% top`, scrub: true } });

    // Section 4a: Le Fourreau (Saya)
    gsap.fromTo(sayaRef.current, { opacity: 0, clipPath: "inset(0% 100% 0% 0%)" }, { opacity: 1, clipPath: "inset(0% 0% 0% 0%)", scrollTrigger: { trigger: "#scroll-container", start: "52% top", end: "54% top", scrub: true } });
    gsap.to(sayaRef.current, { opacity: 0, clipPath: "inset(0% 0% 0% 100%)", scrollTrigger: { trigger: "#scroll-container", start: "55% top", end: "57% top", scrub: true } });

    // Section 4b: L'Acier (Tamahagane)
    gsap.fromTo(tamahaganeRef.current, { opacity: 0, clipPath: "inset(0% 0% 100% 0%)" }, { opacity: 1, clipPath: "inset(0% 0% 0% 0%)", scrollTrigger: { trigger: "#scroll-container", start: "58% top", end: "60% top", scrub: true } });
    gsap.fromTo(hotspot2Ref.current, { autoAlpha: 0, scale: 0 }, { autoAlpha: 1, scale: 1, scrollTrigger: { trigger: "#scroll-container", start: "58% top", end: "60% top", scrub: true } });
    gsap.to(tamahaganeRef.current, { opacity: 0, scrollTrigger: { trigger: "#scroll-container", start: "61% top", end: "63% top", scrub: true } });
    gsap.to(hotspot2Ref.current, { autoAlpha: 0, scale: 0, scrollTrigger: { trigger: "#scroll-container", start: "61% top", end: "63% top", scrub: true } });

    // Section 4c: La Lame (Ha)
    gsap.fromTo(haRef.current, { opacity: 0, y: 50 }, { opacity: 1, y: 0, scrollTrigger: { trigger: "#scroll-container", start: "63.5% top", end: "64.5% top", scrub: true } });
    gsap.to(haRef.current, { opacity: 0, y: -50, scrollTrigger: { trigger: "#scroll-container", start: "65.5% top", end: "66.5% top", scrub: true } });

    // Section 5a: Darkside - Appel du Sang
    gsap.fromTo(sangRef.current, { opacity: 0, filter: "contrast(200%)", scale: 1.05 }, { opacity: 1, filter: "contrast(100%)", scale: 1, scrollTrigger: { trigger: "#scroll-container", start: "69% top", end: "71% top", scrub: true } });
    gsap.to(sangRef.current, { opacity: 0, y: 50, scrollTrigger: { trigger: "#scroll-container", start: "74% top", end: "76% top", scrub: true } });

    // Section 5b: Darkside - L'Éveil de l'Oni
    gsap.fromTo(oniRef.current, { opacity: 0, scale: 0.8 }, { opacity: 1, scale: 1, scrollTrigger: { trigger: "#scroll-container", start: "77% top", end: "79% top", scrub: true } });
    gsap.to(oniRef.current, { opacity: 0, scale: 1.2, scrollTrigger: { trigger: "#scroll-container", start: "81% top", end: "83% top", scrub: true } });

    // Section 6 : Le Monde Onirique (Outro)
    gsap.fromTo(outroRef.current, { opacity: 0, y: 50 }, { opacity: 1, y: 0, scrollTrigger: { trigger: "#scroll-container", start: "86% top", end: "88% top", scrub: true } });

  }, []);

  useEffect(() => {
    if (loadProgress >= 100 && audioRef.current) {
      const startAudio = () => {
        if (audioRef.current) {
          audioRef.current.muted = false;
          setIsMuted(false);
          audioRef.current.play().catch(err => console.log("Playback failed after interaction", err));
        }
      };

      // Try playing immediately
      audioRef.current.muted = false;
      setIsMuted(false);
      audioRef.current.play().catch(e => {
        console.log("Autoplay blocked, waiting for user interaction to play audio.", e);
        // Fallback: play on first interaction
        const playOnInteraction = () => {
          startAudio();
          window.removeEventListener("click", playOnInteraction);
          window.removeEventListener("scroll", playOnInteraction);
          window.removeEventListener("touchstart", playOnInteraction);
          window.removeEventListener("keydown", playOnInteraction);
        };
        window.addEventListener("click", playOnInteraction, { passive: true });
        window.addEventListener("scroll", playOnInteraction, { passive: true });
        window.addEventListener("touchstart", playOnInteraction, { passive: true });
        window.addEventListener("keydown", playOnInteraction, { passive: true });
      });
    }
  }, [loadProgress]);

  return (
    <main className="relative w-full">
      <Preloader progress={loadProgress} />

      {/* Barre de progression du scroll */}
      <div className="fixed right-0 top-0 h-screen w-1.5 bg-white/10 z-50 pointer-events-none">
        <div ref={progressBarRef} className="w-full bg-red-600 origin-top h-full scale-y-0" />
      </div>

      {/* Cinematic Overlay (Film Grain + Vignette) */}
      <div className="fixed inset-0 pointer-events-none z-[100] opacity-30 mix-blend-overlay" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
      }} />
      <div className="fixed inset-0 pointer-events-none z-[100] bg-[radial-gradient(circle,transparent_50%,rgba(0,0,0,0.8)_150%)]" />

      {/* Audio Element & Controls */}
      <audio ref={audioRef} src="/son.mp3" loop muted={isMuted} />
      {loadProgress >= 100 && (
        <button 
          onClick={toggleMute}
          className="fixed bottom-8 right-8 z-[150] w-12 h-12 flex items-center justify-center rounded-full bg-black/50 border border-white/10 text-white/80 hover:text-white hover:bg-black/80 backdrop-blur-md transition-all cursor-pointer hover:scale-110 animate-in fade-in duration-500"
        >
          {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
        </button>
      )}

      {/* Scroll Indicator */}
      <div className={`fixed bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/60 transition-opacity duration-500 z-[150] pointer-events-none ${globalFrame > 20 ? 'opacity-0' : 'opacity-100 animate-bounce'}`}>
        <Mouse size={24} />
        <span className="text-xs uppercase tracking-[0.3em] font-sans">Scroll</span>
      </div>

      {/* Tooltip Modal */}
      {tooltip && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-6 bg-black/80 backdrop-blur-sm transition-all duration-300">
          <div className="relative max-w-lg bg-zinc-900 border border-white/10 p-8 rounded-sm shadow-[0_0_40px_rgba(220,38,38,0.2)] animate-in fade-in zoom-in duration-300">
            <button onClick={() => setTooltip(null)} className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors cursor-pointer">
              <X size={24} />
            </button>
            <h3 className="text-2xl font-serif text-[var(--color-primary)] mb-4 uppercase tracking-widest">
              {tooltip === 'kabuto' ? "Le Secret du Kabuto" : 
               tooltip === 'forge' ? "La Trempe de l'Acier" :
               "La Forge du Tamahagane"}
            </h3>
            <p className="text-gray-300 font-sans leading-relaxed">
              {tooltip === 'kabuto' 
                ? "Le Kabuto n'était pas seulement protecteur, il était l'identité du clan. Certains heaumes portaient des crinières de démons ou des cornes dorées pour terrifier l'adversaire avant même le premier coup." 
                : tooltip === 'forge'
                ? "La courbure parfaite de la lame ne vient pas de la frappe du marteau, mais de l'instant du refroidissement. En appliquant une fine couche d'argile sur le tranchant et une couche épaisse sur le dos, la lame se courbe naturellement lors de son plongeon dans l'eau glacée, créant une ligne de trempe (Hamon) unique."
                : "Le Tamahagane est fondu dans un fourneau d'argile à usage unique appelé Tatara. Il faut trois jours et trois nuits de feu ininterrompu pour créer ce minerai pur, trié à la main selon son taux de carbone."}
            </p>
          </div>
        </div>
      )}

      {/* Conteneur de scroll de 1800vh pour 6 vidéos. */}
      <div id="scroll-container" className="relative h-[1800vh] w-full">
        {/* Wrapper sticky : reste collé en haut pendant les 1800vh */}
        <div className="sticky top-0 h-screen w-full overflow-hidden bg-black">
          <div ref={canvasWrapperRef} className="w-full h-full transition-all duration-500">
            <CanvasSequence
              onLoadProgress={setLoadProgress}
              sequences={[
                { frameCount: 300, imagePathPrefix: "/frames/frame_", imagePathSuffix: ".webp" },
                { frameCount: 300, imagePathPrefix: "/frames_armure/frame_", imagePathSuffix: ".webp" },
                { frameCount: 300, imagePathPrefix: "/frames_esprit/frame_", imagePathSuffix: ".webp" },
                { frameCount: 300, imagePathPrefix: "/frames_lame/frame_", imagePathSuffix: ".webp" },
                { frameCount: 300, imagePathPrefix: "/frames_dark/frame_", imagePathSuffix: ".webp" },
                { frameCount: 300, imagePathPrefix: "/frames_end/frame_", imagePathSuffix: ".webp" }
              ]}
            />
          </div>

          {/* Contenu Narratif en surimpression */}
          <div className="absolute inset-0 pointer-events-none flex flex-col justify-center items-center">
            
            {/* Section 0 : L'Obscurité */}
            <div ref={titleRef} className="absolute text-center" style={{ clipPath: "inset(0% 0% 0% 0%)" }}>
              <h1 className="text-6xl md:text-8xl font-serif text-[var(--color-foreground)] tracking-widest text-shadow-sm">
                L'ÂME DE L'ACIER
              </h1>
              <p className="mt-8 text-[var(--color-primary)] font-sans tracking-widest uppercase text-sm animate-pulse">
                Scroll pour fendre l'obscurité
              </p>
            </div>

            {/* Section 1 : La Faille */}
            <div ref={slashRef} className="absolute text-center max-w-2xl px-6 opacity-0" style={{ clipPath: "inset(0% 100% 0% 0%)" }}>
              <h2 className="text-4xl md:text-6xl font-serif text-white mb-6">
                L'Éclat de la Rupture
              </h2>
              <p className="text-lg md:text-xl font-sans text-gray-300 leading-relaxed">
                D'un seul geste, le voile se déchire. La lame révèle la vérité cachée
                derrière les illusions du monde flottant.
              </p>
            </div>

            {/* Section 1.5 : Les Nuages (Le Royaume Flottant) */}
            <div ref={nuagesRef} className="absolute top-1/4 right-8 md:right-24 max-w-md opacity-0 text-right" style={{ clipPath: "inset(100% 0% 0% 0%)" }}>
              <h2 className="text-3xl md:text-5xl font-serif text-[var(--color-primary)] mb-4">
                Par-delà les Cieux
              </h2>
              <p className="text-base md:text-lg font-sans text-gray-200 leading-relaxed">
                Où les temples flottent sur une mer de nuages dorés. Dans ce royaume onirique, 
                les pétales de cerisier dansent au rythme d'un temps suspendu.
              </p>
            </div>

            {/* Section 2 : Le Gardien */}
            <div ref={samuraiRef} className="absolute right-8 md:right-24 top-24 max-w-md opacity-0 text-right">
              <h2 className="text-3xl md:text-5xl font-serif text-[var(--color-primary)] mb-4">
                Masque d'Oni, <br />Esprit de Gardien
              </h2>
              <p className="text-base md:text-lg font-sans text-gray-200 leading-relaxed">
                Derrière l'armure noire et or se cache un esprit façonné par la discipline.
                Le samouraï n'est pas qu'un guerrier, il est l'incarnation d'une perfection immobile.
              </p>
            </div>

            {/* Section ARMURE A : Kabuto */}
            <div ref={kabutoRef} className="absolute top-1/3 left-8 md:left-24 max-w-sm opacity-0 text-left" style={{ clipPath: "inset(0% 0% 100% 0%)" }}>
              <h2 className="text-4xl md:text-5xl font-serif text-white mb-4">
                Le Heaume (Kabuto)
              </h2>
              <p className="text-lg font-sans text-[var(--color-primary)] leading-relaxed italic mb-4">
                La couronne du guerrier. Chaque plaque de fer est forgée non seulement pour 
                dévier la mort, mais pour imposer le respect à l'adversaire.
              </p>
            </div>
            {/* Hotspot Kabuto */}
            <button 
              ref={hotspot1Ref}
              onClick={() => setTooltip('kabuto')}
              className="absolute top-[25%] left-8 md:left-[750px] opacity-0 pointer-events-auto z-50 p-2 bg-red-600/80 hover:bg-red-600 rounded-full text-white backdrop-blur-sm transition-all duration-300 hover:scale-110 shadow-[0_0_15px_rgba(220,38,38,0.5)] animate-pulse"
            >
              <Plus size={20} />
            </button>

            {/* Section ARMURE B : Do */}
            <div ref={doRef} className="absolute bottom-1/3 right-8 md:right-24 max-w-sm opacity-0 text-right">
              <h2 className="text-4xl md:text-5xl font-serif text-white mb-4">
                Le Plastron (Dō)
              </h2>
              <p className="text-lg font-sans text-gray-300 leading-relaxed">
                Le berceau du cœur. Liées par la soie et la laque, ces écailles noires 
                encaissent les chocs sans se briser. L'armure est une seconde peau protectrice.
              </p>
            </div>

            {/* Section 3 : L'Esprit (Mizu no Kokoro) */}
            <div ref={espritRef} className="absolute right-8 md:right-24 top-1/3 max-w-lg opacity-0 text-right">
              <h2 className="text-4xl md:text-6xl font-serif text-white mb-6">
                Mizu no Kokoro
              </h2>
              <h3 className="text-2xl text-[var(--color-primary)] mb-4 font-serif italic">
                L'Esprit comme l'Eau
              </h3>
              <p className="text-lg md:text-xl font-sans text-gray-300 leading-relaxed">
                Le véritable tranchant ne réside pas dans l'acier, mais dans l'esprit qui le guide. 
                Face au chaos, le samouraï devient un miroir immobile, reflétant l'intention de son adversaire 
                sans jamais en être troublé.
              </p>
            </div>

            {/* Section 3b : Mushin */}
            <div ref={mushinRef} className="absolute left-8 md:left-24 bottom-1/4 max-w-lg opacity-0 text-left">
              <h2 className="text-4xl md:text-6xl font-serif text-white mb-6">
                Mushin
              </h2>
              <h3 className="text-2xl text-[var(--color-primary)] mb-4 font-serif italic">
                L'Esprit Vide
              </h3>
              <p className="text-lg md:text-xl font-sans text-gray-300 leading-relaxed">
                La maîtrise absolue s'atteint lorsque le corps agit de lui-même. 
                Libéré de la peur et de l'anticipation, le sabre frappe avant même 
                que la décision ne soit consciente.
              </p>
            </div>

            {/* Hotspot Forge */}
            <button 
              ref={hotspotForgeRef}
              onClick={() => setTooltip('forge')}
              className="absolute bottom-16 left-1/2 -translate-x-1/2 opacity-0 pointer-events-auto z-50 p-2 bg-red-600/80 hover:bg-red-600 rounded-full text-white backdrop-blur-sm transition-all duration-300 hover:scale-110 shadow-[0_0_15px_rgba(220,38,38,0.5)] animate-pulse"
            >
              <Plus size={20} />
            </button>

            {/* Section 4a : Le Fourreau (Saya) */}
            <div ref={sayaRef} className="absolute right-8 md:right-24 top-1/4 max-w-sm opacity-0 text-right" style={{ clipPath: "inset(0% 100% 0% 0%)" }}>
              <h2 className="text-3xl md:text-5xl font-serif text-[var(--color-primary)] mb-4">
                Le Fourreau (Saya)
              </h2>
              <p className="text-base md:text-lg font-sans text-gray-200 leading-relaxed">
                Le Repos du Dragon. Avant que la lame ne chante, elle repose dans le silence. 
                Le véritable maître sait qu'une arme non dégainée est la plus redoutable.
              </p>
            </div>

            {/* Section 4b : L'Acier (Tamahagane) */}
            <div ref={tamahaganeRef} className="absolute left-8 md:left-24 bottom-1/3 max-w-sm opacity-0 text-left" style={{ clipPath: "inset(0% 0% 100% 0%)" }}>
              <h2 className="text-3xl md:text-5xl font-serif text-white mb-4">
                L'Acier (Tamahagane)
              </h2>
              <p className="text-base md:text-lg font-sans text-gray-300 leading-relaxed mb-4">
                Plié mille fois. Né du feu et du fer, l'acier précieux se superpose en couches 
                infinies pour offrir à la lame sa force et sa souplesse.
              </p>
            </div>
            {/* Hotspot Tamahagane */}
            <button 
              ref={hotspot2Ref}
              onClick={() => setTooltip('tamahagane')}
              className="absolute bottom-[45%] right-8 md:right-[20%] opacity-0 pointer-events-auto z-50 p-2 bg-red-600/80 hover:bg-red-600 rounded-full text-white backdrop-blur-sm transition-all duration-300 hover:scale-110 shadow-[0_0_15px_rgba(220,38,38,0.5)] animate-pulse"
            >
              <Plus size={20} />
            </button>

            {/* Section 4c : La Lame (Ha) */}
            <div ref={haRef} className="absolute right-8 md:right-24 bottom-24 max-w-sm opacity-0 text-right">
              <h2 className="text-3xl md:text-5xl font-serif text-white mb-4">
                Le Tranchant (Ha)
              </h2>
              <p className="text-base md:text-lg font-sans text-[var(--color-primary)] leading-relaxed italic">
                Là où l'acier pur rencontre l'air, naît une arête capable de fendre 
                aussi bien la soie que l'armure. Le reflet de l'âme tranchante.
              </p>
            </div>

            {/* Section 5a : Darkside - Appel du Sang */}
            <div ref={sangRef} className="absolute left-8 md:left-24 top-1/3 max-w-md opacity-0 text-left">
              <h2 className="text-4xl md:text-6xl font-serif text-red-600 mb-6 drop-shadow-[0_0_15px_rgba(220,38,38,0.5)]">
                L'Appel du Sang
              </h2>
              <p className="text-lg md:text-xl font-sans text-gray-300 leading-relaxed">
                La lame a soif. Derrière la discipline stricte du Bushido rôde toujours la tentation 
                de s'abandonner à la violence pure. La véritable épreuve commence quand l'arme commande le bras.
              </p>
            </div>

            {/* Section 5b : Darkside - L'Éveil de l'Oni */}
            <div ref={oniRef} className="absolute right-8 md:right-24 bottom-1/4 max-w-md opacity-0 text-right">
              <h2 className="text-4xl md:text-6xl font-serif text-white mb-6">
                L'Éveil de l'Oni
              </h2>
              <p className="text-lg md:text-xl font-sans text-red-500 leading-relaxed italic">
                Quand le masque devient le visage. La véritable guerre ne se déroule pas sur le champ 
                de bataille, mais dans les ténèbres de l'esprit.
              </p>
            </div>

            {/* Section 6 : Le Monde Onirique */}
            <div ref={outroRef} className="absolute w-full h-full flex flex-col justify-center items-center opacity-0 pointer-events-auto">
              <h2 className="text-4xl md:text-7xl font-serif text-white text-center mb-8 drop-shadow-2xl">
                La Voie du Bushido
              </h2>
              <p className="text-lg md:text-xl font-sans text-gray-300 leading-relaxed text-center max-w-xl mb-12">
                Le voyage s'achève, mais la pratique est éternelle. L'harmonie parfaite naît de l'équilibre 
                entre la rigueur de l'acier et la paix de l'esprit.
              </p>
              <a 
                href="https://mist3rth.github.io/presentMe/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="px-8 py-4 bg-red-600 text-white hover:bg-red-700 font-sans uppercase tracking-widest font-semibold transition-colors duration-300 cursor-pointer shadow-[0_0_20px_rgba(220,38,38,0.4)]"
              >
                Découvrir le Créateur
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <footer className="w-full bg-neutral-950 pt-24 pb-12 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12 text-gray-400">
          <div>
            <button 
              onClick={() => lenis?.scrollTo(0)}
              className="flex items-center gap-3 cursor-pointer group bg-transparent border-none p-0 outline-none mb-6"
            >
              <div className="text-[var(--color-primary)] transition-transform duration-500 group-hover:rotate-45">
                <Swords size={28} strokeWidth={1.5} />
              </div>
              <h3 className="font-serif text-2xl tracking-[0.2em] text-white font-light uppercase">
                Bushido
              </h3>
            </button>
            <p className="font-sans text-sm leading-relaxed">
              Une expérience interactive plongeant au cœur de l'âme du guerrier. 
              Entre l'acier, l'esprit et les ténèbres.
            </p>
          </div>
          <div>
            <h4 className="font-sans text-sm font-semibold text-gray-200 tracking-widest uppercase mb-6">Chapitres</h4>
            <ul className="space-y-4 font-sans text-sm">
              <li><button onClick={() => lenis?.scrollTo(0)} className="hover:text-[var(--color-primary)] transition-colors cursor-pointer">La Voie</button></li>
              <li><button onClick={() => lenis?.scrollTo(3 * window.innerHeight)} className="hover:text-[var(--color-primary)] transition-colors cursor-pointer">L'Armure</button></li>
              <li><button onClick={() => lenis?.scrollTo(6 * window.innerHeight)} className="hover:text-[var(--color-primary)] transition-colors cursor-pointer">L'Esprit</button></li>
              <li><button onClick={() => lenis?.scrollTo(9 * window.innerHeight)} className="hover:text-[var(--color-primary)] transition-colors cursor-pointer">La Lame</button></li>
              <li><button onClick={() => lenis?.scrollTo(12 * window.innerHeight)} className="hover:text-red-500 transition-colors cursor-pointer">Darkside</button></li>
            </ul>
          </div>
          <div>
            <h4 className="font-sans text-sm font-semibold text-gray-200 tracking-widest uppercase mb-6">Social</h4>
            <ul className="space-y-4 font-sans text-sm">
              <li><a href="https://mist3rth.github.io/presentMe/" target="_blank" rel="noopener noreferrer" className="hover:text-red-500 transition-colors flex items-center gap-2 font-bold text-white">Mon Site / Portfolio</a></li>
              <li><a href="https://www.linkedin.com/in/thierry-thiesson-7887501" target="_blank" rel="noopener noreferrer" className="hover:text-[#0a66c2] transition-colors flex items-center gap-2">LinkedIn</a></li>
              <li><a href="https://www.facebook.com/thiesson.thierry.1?locale=fr_FR" target="_blank" rel="noopener noreferrer" className="hover:text-[#1877f2] transition-colors flex items-center gap-2">Facebook</a></li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-6 mt-16 pt-8 border-t border-white/5 text-xs font-sans flex flex-col md:flex-row justify-between items-center opacity-50">
          <p>© 2026 Bushido Experience. Un projet de <a href="https://mist3rth.github.io/presentMe/" target="_blank" rel="noopener noreferrer" className="text-white hover:text-red-500 transition-colors underline">T.THIESSON</a>.</p>
        </div>
      </footer>
    </main>
  );
}
