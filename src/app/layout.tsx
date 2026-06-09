import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Navbar from "@/components/ui/Navbar";
import LenisProvider from "@/components/LenisProvider";
import AudioPlayer from "@/components/ui/AudioPlayer";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "L'Âme de l'Acier | Bushido",
  description: "Expérience interactive 3D sur l'art des samouraïs et la forge des katanas.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className="antialiased overflow-x-hidden bg-[#050505] text-[#EAEAEA]">
        <LenisProvider>
          <Navbar />
          {children}
          <AudioPlayer />
        </LenisProvider>
      </body>
    </html>
  );
}
