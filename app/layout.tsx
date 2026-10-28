import type { Metadata, Viewport } from "next";
import { Space_Grotesk, Manrope } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "BLUE ABYSS CLUB — Explore Beyond the Surface",
  description:
    "Learn to dive, find your gear, and become part of a community that lives for the ocean. Premium scuba diving courses, gear sales & rental, expeditions and marine conservation by Blue Abyss Club.",
  keywords: [
    "scuba diving",
    "diving course",
    "dive gear",
    "rent diving equipment",
    "diving community",
    "Blue Abyss Club",
    "open water diver",
  ],
  authors: [{ name: "Blue Abyss Club" }],
  openGraph: {
    title: "BLUE ABYSS CLUB — The Ocean Is Calling",
    description:
      "Learn to dive, find your gear, and become part of a community that lives for the ocean.",
    siteName: "Blue Abyss Club",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "BLUE ABYSS CLUB — The Ocean Is Calling",
    description:
      "Learn to dive, find your gear, and become part of a community that lives for the ocean.",
  },
};

export const viewport: Viewport = {
  themeColor: "#020a12",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="dark">
      <body
        className={`${spaceGrotesk.variable} ${manrope.variable} font-body antialiased bg-abyss-950 text-foam-50 min-h-screen flex flex-col`}
      >
        {children}
        <Toaster position="bottom-right" richColors={false} />
      </body>
    </html>
  );
}
