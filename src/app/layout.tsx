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
  metadataBase: new URL("https://3dsscroll.vercel.app"),
  title: "L'Âme de l'Acier | Bushido",
  description: "Expérience interactive 3D sur l'art des samouraïs et la forge des katanas.",
  openGraph: {
    title: "L'Âme de l'Acier | Bushido",
    description: "Expérience interactive 3D sur l'art des samouraïs et la forge des katanas.",
    url: "https://3dsscroll.vercel.app",
    siteName: "Bushido Experience",
    images: [
      {
        url: "/globe.svg",
        width: 1200,
        height: 630,
        alt: "L'Âme de l'Acier - Bushido Experience",
      },
    ],
    locale: "fr_FR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "L'Âme de l'Acier | Bushido",
    description: "Expérience interactive 3D sur l'art des samouraïs et la forge des katanas.",
    images: ["/globe.svg"],
  },
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
