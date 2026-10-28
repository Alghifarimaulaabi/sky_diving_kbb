import { PHOTOS } from "@/data/images";

export interface SafetyPillar {
  id: string;
  title: string;
  description: string;
}

export const SAFETY_PILLARS: SafetyPillar[] = [
  {
    id: "equipment",
    title: "Equipment Inspection",
    description:
      "Every mask strap, O-ring and hose gets checked before it touches water. Rental gear is serviced on schedule — but you always double-check your own kit.",
  },
  {
    id: "buddy",
    title: "Buddy System",
    description:
      "No one dives alone, ever. You and your buddy agree on signals, turn pressures and lost-buddy procedures before every single dive.",
  },
  {
    id: "equalization",
    title: "Equalization & Buoyancy",
    description:
      "Equalize early and often on descent, and keep neutral buoyancy so you glide over reefs instead of touching them. Comfort is a safety skill.",
  },
  {
    id: "depth-time",
    title: "Depth & Time Awareness",
    description:
      "Know your limits, monitor your depth and bottom time, and respect no-decompression limits. The dive computer is your co-pilot — not a suggestion.",
  },
  {
    id: "planning",
    title: "Dive Planning",
    description:
      "Plan the dive, dive the plan. Max depth, direction, turnaround air and what to do if separated — agreed on the surface, executed below.",
  },
  {
    id: "environment",
    title: "Environmental Responsibility",
    description:
      "Perfect buoyancy protects coral. Nothing gets touched, fed or chased. We leave every dive site exactly as we found it — or cleaner.",
  },
];

export interface ChecklistItem {
  id: string;
  label: string;
  phase: "gear" | "body" | "plan";
}

export const PRE_DIVE_CHECKLIST: ChecklistItem[] = [
  { id: "c1", label: "Mask, fins & snorkel checked and fitted", phase: "gear" },
  { id: "c2", label: "BCD inflator & dumps working", phase: "gear" },
  { id: "c3", label: "Regulator breathes dry & easy", phase: "gear" },
  { id: "c4", label: "Tank pressure full, valve open", phase: "gear" },
  { id: "c5", label: "Weights & quick-release positioned", phase: "gear" },
  { id: "c6", label: "Well rested, hydrated, no alcohol", phase: "body" },
  { id: "c7", label: "Equalization feels normal", phase: "body" },
  { id: "c8", label: "No medication or health changes today", phase: "body" },
  { id: "c9", label: "Max depth & time agreed with buddy", phase: "plan" },
  { id: "c10", label: "Hand signals reviewed", phase: "plan" },
  { id: "c11", label: "Turn-around air pressure set", phase: "plan" },
  { id: "c12", label: "Lost-buddy & ascent procedure agreed", phase: "plan" },
];

export const SAFETY_STEPS = [
  {
    step: "01",
    title: "Check Your Gear",
    description: "A complete inspection with your buddy — straps, seals, air, weights. BWRAF-style, every dive.",
    image: PHOTOS.buddy,
  },
  {
    step: "02",
    title: "Plan Your Dive",
    description: "Depth, time, route and air turnarounds agreed before entry. No surprises underwater.",
    image: PHOTOS.surface,
  },
  {
    step: "03",
    title: "Stay With Your Buddy",
    description: "Within two fin kicks, always. Your buddy is your redundancy, your backup air and your second pair of eyes.",
    image: PHOTOS.reef1,
  },
  {
    step: "04",
    title: "Respect Marine Life",
    description: "Look, don't touch. Neutral buoyancy keeps you off the coral and keeps the reef alive for the next dive.",
    image: PHOTOS.turtle,
  },
];

export const SAFETY_NOTICE =
  "Diving involves real risks. This guide is an overview, not a substitute for proper training — always learn and dive with a competent instructor and follow recognized training standards.";
