"use client";

import { Swords, Menu, X } from "lucide-react";
import { useLenis } from "@studio-freight/react-lenis";
import { useState } from "react";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [lenis, setLenis] = useState<any>(null);
  
  useLenis((lenisInstance) => {
    if (!lenis) {
      setLenis(lenisInstance);
    }
  });

  const handleNavClick = (index: number) => {
    const vh = window.innerHeight;
    lenis?.scrollTo(index * 3 * vh);
    setIsMenuOpen(false);
  };

  return (
    <>
      <nav className="fixed top-0 left-0 w-full z-50 px-6 py-4 bg-black/70 backdrop-blur-md border-b border-white/5 transition-all duration-300">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          {/* Logo */}
          <button 
            onClick={() => {
              lenis?.scrollTo(0);
              setIsMenuOpen(false);
            }}
            className="flex items-center gap-3 cursor-pointer group bg-transparent border-none p-0 outline-none z-50"
          >
            <div className="text-[var(--color-primary)] transition-transform duration-500 group-hover:rotate-45">
              <Swords size={28} strokeWidth={1.5} />
            </div>
            <span className="font-serif text-xl tracking-[0.2em] text-white font-light uppercase">
              Bushido
            </span>
          </button>

          {/* Desktop Links */}
          <div className="hidden md:flex gap-12 items-center">
            {["La Voie", "L'Armure", "L'Esprit", "La Lame", "Darkside"].map((item, index) => (
              <button
                key={item}
                onClick={() => handleNavClick(index)}
                className="text-sm font-sans tracking-widest text-gray-300 hover:text-[var(--color-primary)] transition-colors duration-300 uppercase relative group bg-transparent border-none p-0 outline-none cursor-pointer"
              >
                {item}
                <span className="absolute -bottom-2 left-0 w-0 h-[1px] bg-[var(--color-primary)] transition-all duration-300 group-hover:w-full" />
              </button>
            ))}
          </div>

          {/* Burger Menu Button */}
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-white hover:text-[var(--color-primary)] transition-colors duration-300 z-50 cursor-pointer bg-transparent border-none p-0"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={28} strokeWidth={1.5} /> : <Menu size={28} strokeWidth={1.5} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div 
        className={`fixed inset-0 z-40 bg-black/95 backdrop-blur-2xl flex flex-col justify-center items-center gap-8 md:hidden transition-all duration-500 ${
          isMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="flex flex-col items-center gap-8">
          {["La Voie", "L'Armure", "L'Esprit", "La Lame", "Darkside"].map((item, index) => (
            <button
              key={item}
              onClick={() => handleNavClick(index)}
              className={`text-2xl font-serif tracking-[0.2em] uppercase transition-all duration-500 delay-[${index * 100}ms] bg-transparent border-none cursor-pointer outline-none ${
                isMenuOpen ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
              } ${
                item === "Darkside" 
                  ? "text-red-500 hover:text-red-400 hover:scale-110 drop-shadow-[0_0_10px_rgba(239,68,68,0.3)]" 
                  : "text-gray-300 hover:text-[var(--color-primary)] hover:scale-110"
              }`}
            >
              {item}
            </button>
          ))}
        </div>
        
        {/* Subtle Decorative Swords under links */}
        <div className={`mt-8 text-white/10 transition-all duration-700 delay-500 ${isMenuOpen ? "scale-100 opacity-100" : "scale-75 opacity-0"}`}>
          <Swords size={48} strokeWidth={1} />
        </div>
      </div>
    </>
  );
}


