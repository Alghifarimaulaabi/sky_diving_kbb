"use client";

import { Navbar } from "@/components/bac/navbar";
import { HeroSection } from "@/components/bac/hero-section";
import { LearningSection } from "@/components/bac/learning-section";
import { GearCatalog } from "@/components/bac/gear-catalog";
import { SafetySection } from "@/components/bac/safety-section";
import { CommunitySection } from "@/components/bac/community-section";
import { EventsSection } from "@/components/bac/events-section";
import { FaqSection } from "@/components/bac/faq-section";
import { Footer } from "@/components/bac/footer";
import { CartDrawer } from "@/components/bac/cart-drawer";
import {
  AscendTransition,
  DescendTransition,
  ScrollProgress,
} from "@/components/bac/dive-transitions";
import { CursorGlow } from "@/components/ocean/cursor-glow";

export default function Home() {
  return (
    <div className="min-h-screen bg-abyss-950">
      <ScrollProgress />
      <CursorGlow />
      <Navbar />

      <main>
        <HeroSection />
        <LearningSection />
        {/* ascend: dark → light, surface break before the gear shop */}
        <AscendTransition />
        <GearCatalog />
        {/* descend: light → deep, back into the blue */}
        <DescendTransition />
        <SafetySection />
        <CommunitySection />
        <EventsSection />
        <FaqSection />
      </main>

      <Footer />
      <CartDrawer />
    </div>
  );
}
