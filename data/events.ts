import { EVENT_PHOTOS } from "@/data/images";

export type EventLevel = "Beginner" | "Advanced" | "All Levels";
export type EventCategory =
  | "Discovery"
  | "Exploration"
  | "Training"
  | "Conservation";

export interface DiveEvent {
  id: string;
  name: string;
  image: string;
  imageAlt: string;
  /** ISO date of the (example) schedule. */
  date: string;
  endDate?: string;
  location: string;
  level: EventLevel;
  category: EventCategory;
  duration: string;
  /** Price in IDR; null = free event. */
  price: number | null;
  spotsLeft: number;
  spotsTotal: number;
  description: string;
  highlights: string[];
}

/** Example data — dates, locations and quotas are placeholders meant to be updated. */
export const EVENTS: DiveEvent[] = [
  {
    id: "weekend-discover-scuba",
    name: "Weekend Discover Scuba",
    image: EVENT_PHOTOS[0],
    imageAlt: "Beginner divers enjoying shallow reef on a weekend trip",
    date: "2026-11-14",
    endDate: "2026-11-15",
    location: "Blue Lagoon Bay",
    level: "Beginner",
    category: "Discovery",
    duration: "2 days · 1 night",
    price: 650000,
    spotsLeft: 6,
    spotsTotal: 12,
    description:
      "A gentle two-day introduction to the underwater world designed for complete beginners. Pool briefing on day one, two shallow reef dives on day two — with instructors who stay by your side the entire time.",
    highlights: [
      "No experience required",
      "All gear provided & fitted",
      "2 guided shallow dives",
      "Beachside briefing & BBQ",
    ],
  },
  {
    id: "reef-exploration-trip",
    name: "Reef Exploration Trip",
    image: EVENT_PHOTOS[1],
    imageAlt: "Divers exploring a vibrant coral reef slope",
    date: "2026-12-05",
    endDate: "2026-12-06",
    location: "Coral Gardens Marine Park",
    level: "All Levels",
    category: "Exploration",
    duration: "2 days · 4 dives",
    price: 1850000,
    spotsLeft: 4,
    spotsTotal: 10,
    description:
      "Two days drifting over some of the healthiest reefs in the region. Four dives across different sites — walls, gardens and a cleaning station where mantas regularly pass through.",
    highlights: [
      "4 dives across 3 sites",
      "Manta cleaning station (seasonal)",
      "Boat accommodation",
      "Underwater photo session",
    ],
  },
  {
    id: "beginner-camp",
    name: "Beginner Diving Camp",
    image: EVENT_PHOTOS[2],
    imageAlt: "Group of student divers at a poolside training camp",
    date: "2027-01-09",
    endDate: "2027-01-11",
    location: "BAC Training Center",
    level: "Beginner",
    category: "Training",
    duration: "3 days · 2 nights",
    price: 4900000,
    spotsLeft: 8,
    spotsTotal: 12,
    description:
      "An immersive three-day camp that takes you from zero to certified-entry level. Mornings in the pool, afternoons in the classroom, evenings around the fire with the BAC community.",
    highlights: [
      "Full entry-level curriculum",
      "Pool + 4 ocean dives",
      "Gear rental included",
      "Community campfire night",
    ],
  },
  {
    id: "deep-dive-workshop",
    name: "Advanced Deep Dive Workshop",
    image: EVENT_PHOTOS[3],
    imageAlt: "Advanced divers descending a deep underwater wall",
    date: "2027-02-06",
    endDate: "2027-02-07",
    location: "The Deep Wall",
    level: "Advanced",
    category: "Training",
    duration: "2 days · 4 dives",
    price: 3400000,
    spotsLeft: 3,
    spotsTotal: 8,
    description:
      "A focused workshop for certified advanced divers: deep protocols, gas management drills and staged descents on a genuine 40 m wall, coached by BAC's most experienced instructors.",
    highlights: [
      "4 deep dives to 30–40 m",
      "Gas planning workshop",
      "SMB & ascent drills",
      "Video debrief each evening",
    ],
  },
  {
    id: "ocean-cleanup",
    name: "Ocean Cleanup & Conservation",
    image: EVENT_PHOTOS[4],
    imageAlt: "Volunteer divers collecting debris during an underwater cleanup",
    date: "2026-12-19",
    location: "House Reef & Jetty Area",
    level: "All Levels",
    category: "Conservation",
    duration: "1 day · 2 dives",
    price: null,
    spotsLeft: 15,
    spotsTotal: 20,
    description:
      "Dive with a purpose. Two cleanup dives at our house reef plus a coral-fragment nursery session. Free for all certified divers — gear rental available at half price for participants.",
    highlights: [
      "2 cleanup dives",
      "Coral nursery session",
      "Debris data survey (DAO style)",
      "Free lunch & gear wash",
    ],
  },
];

export const EVENT_CATEGORIES: EventCategory[] = [
  "Discovery",
  "Exploration",
  "Training",
  "Conservation",
];
