"use client";

import { Swords, Menu } from "lucide-react";

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 w-full z-50 px-6 py-4 bg-black/70 backdrop-blur-md border-b border-white/5 transition-all duration-300">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <button 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="flex items-center gap-3 cursor-pointer group bg-transparent border-none p-0 outline-none"
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
              onClick={() => {
                const vh = window.innerHeight;
                // Chaque vidéo dure 300vh (25% de 1200vh)
                window.scrollTo({ top: index * 3 * vh, behavior: 'smooth' });
              }}
              className="text-sm font-sans tracking-widest text-gray-300 hover:text-[var(--color-primary)] transition-colors duration-300 uppercase relative group bg-transparent border-none p-0 outline-none cursor-pointer"
            >
              {item}
              <span className="absolute -bottom-2 left-0 w-0 h-[1px] bg-[var(--color-primary)] transition-all duration-300 group-hover:w-full" />
            </button>
          ))}
        </div>

        {/* Mobile Menu */}
        <button className="md:hidden text-white hover:text-[var(--color-primary)] transition-colors duration-300">
          <Menu size={28} strokeWidth={1.5} />
        </button>
      </div>
    </nav>
  );
}
