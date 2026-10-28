/** Gear catalog data — products & packages. Local generated studio shots. */

export type GearCategory =
  | "Mask & Snorkel"
  | "Fins"
  | "Wetsuit"
  | "Regulators & BCD"
  | "Accessories";

export type GearLevel = "Beginner" | "Advanced";

export interface GearProduct {
  id: string;
  name: string;
  category: GearCategory;
  image: string;
  imageAlt: string;
  /** Outright purchase price (IDR). */
  buyPrice: number;
  /** Rental price per day (IDR) — null when rent-only not offered. */
  rentPricePerDay: number | null;
  /** Units available for buying / for renting (example data). */
  buyStock: number;
  rentStock: number;
  level: GearLevel;
  rating: number;
  reviews: number;
  /** Higher = more popular. Example data, replaceable. */
  popularity: number;
  description: string;
}

export interface GearPackage {
  id: string;
  name: string;
  tagline: string;
  image: string;
  imageAlt: string;
  items: string[];
  buyPrice: number;
  rentPricePerDay: number;
  /** Example availability count for rental. */
  rentStock: number;
  level: GearLevel;
  /** Suggested rental duration. */
  rentDurationNote: string;
  description: string;
  featured?: boolean;
}

const G = (f: string) => `/images/gear/${f}`;

export const GEAR_PRODUCTS: GearProduct[] = [
  {
    id: "mask",
    name: "Diving Mask",
    category: "Mask & Snorkel",
    image: G("mask.png"),
    imageAlt: "Diving mask with tempered glass lens and blue silicone skirt",
    buyPrice: 750000,
    rentPricePerDay: 60000,
    buyStock: 14,
    rentStock: 20,
    level: "Beginner",
    rating: 4.8,
    reviews: 132,
    popularity: 92,
    description:
      "Low-volume tempered-glass mask with a soft silicone skirt that seals comfortably on a wide range of faces. Your window into the blue.",
  },
  {
    id: "snorkel",
    name: "Snorkel",
    category: "Mask & Snorkel",
    image: G("snorkel.png"),
    imageAlt: "Snorkel with dry-top splash guard in blue and black",
    buyPrice: 320000,
    rentPricePerDay: 25000,
    buyStock: 22,
    rentStock: 24,
    level: "Beginner",
    rating: 4.6,
    reviews: 98,
    popularity: 80,
    description:
      "Dry-top snorkel that keeps spray out at the surface, with a purge valve for effortless clearing. The quiet companion for every surface interval.",
  },
  {
    id: "fins",
    name: "Fins",
    category: "Fins",
    image: G("fins.png"),
    imageAlt: "Open-heel diving fins with adjustable straps",
    buyPrice: 980000,
    rentPricePerDay: 70000,
    buyStock: 16,
    rentStock: 22,
    level: "Beginner",
    rating: 4.7,
    reviews: 114,
    popularity: 88,
    description:
      "Open-heel fins with an efficient, responsive blade — powerful enough for current, gentle on your ankles for long easy kicks.",
  },
  {
    id: "wetsuit",
    name: "Wetsuit 3mm",
    category: "Wetsuit",
    image: G("wetsuit.png"),
    imageAlt: "Full-length black 3mm wetsuit",
    buyPrice: 2400000,
    rentPricePerDay: 120000,
    buyStock: 10,
    rentStock: 18,
    level: "Beginner",
    rating: 4.9,
    reviews: 76,
    popularity: 84,
    description:
      "Stretchy 3 mm full suit with sealed seams — warm, flexible and quick-drying. Sizes from XS to XXL, rinsed and sanitized after every rental.",
  },
  {
    id: "bcd",
    name: "BCD — Buoyancy Control Device",
    category: "Regulators & BCD",
    image: G("bcd.png"),
    imageAlt: "Black buoyancy control device vest with corrugated hose",
    buyPrice: 4800000,
    rentPricePerDay: 150000,
    buyStock: 6,
    rentStock: 12,
    level: "Advanced",
    rating: 4.8,
    reviews: 64,
    popularity: 79,
    description:
      "Jacket-style BCD with weight-integration pockets and a rugged inflator. Trim-intermediate ideal for tropical and temperate water diving.",
  },
  {
    id: "regulator",
    name: "Regulator Set",
    category: "Regulators & BCD",
    image: G("regulator.png"),
    imageAlt: "Regulator set with pressure gauge console and octopus",
    buyPrice: 5200000,
    rentPricePerDay: 160000,
    buyStock: 6,
    rentStock: 12,
    level: "Advanced",
    rating: 4.9,
    reviews: 58,
    popularity: 82,
    description:
      "Balanced first stage, purge-friendly second stage, SPG console and octopus. Serviced on schedule — breathing you never have to think about.",
  },
  {
    id: "dive-computer",
    name: "Dive Computer",
    category: "Accessories",
    image: G("dive-computer.png"),
    imageAlt: "Wrist dive computer with digital display",
    buyPrice: 4100000,
    rentPricePerDay: 110000,
    buyStock: 8,
    rentStock: 10,
    level: "Advanced",
    rating: 4.9,
    reviews: 47,
    popularity: 74,
    description:
      "Nitrox-ready wrist computer with clear backlit display, audible alerts and log sync. Tracks depth, time and no-deco limits in real time.",
  },
  {
    id: "scuba-tank",
    name: "Scuba Tank 12L",
    category: "Regulators & BCD",
    image: G("tank.png"),
    imageAlt: "Aqua blue aluminum scuba tank with chrome valve",
    buyPrice: 3900000,
    rentPricePerDay: null,
    buyStock: 9,
    rentStock: 0,
    level: "Advanced",
    rating: 4.7,
    reviews: 39,
    popularity: 66,
    description:
      "Corrosion-resistant aluminum 12 L cylinder with K-valve, hydro-tested and visually inspected. Sale only — filled tanks available at every BAC trip.",
  },
  {
    id: "dive-torch",
    name: "Dive Torch",
    category: "Accessories",
    image: G("torch.png"),
    imageAlt: "Black aluminum dive torch with LED beam",
    buyPrice: 1100000,
    rentPricePerDay: 45000,
    buyStock: 12,
    rentStock: 14,
    level: "Advanced",
    rating: 4.6,
    reviews: 52,
    popularity: 61,
    description:
      "1200-lumen aluminum torch, 100 m rated, with a tight beam for signaling and a wide flood for night exploration. Batteries included.",
  },
  {
    id: "weight-belt",
    name: "Weight Belt",
    category: "Accessories",
    image: G("weight-belt.png"),
    imageAlt: "Diving weight belt with molded lead blocks",
    buyPrice: 480000,
    rentPricePerDay: 20000,
    buyStock: 18,
    rentStock: 25,
    level: "Beginner",
    rating: 4.4,
    reviews: 61,
    popularity: 55,
    description:
      "Classic nylon belt with quick-release buckle and molded weights from 1–2 kg. Dial in your buoyancy with exactly the trim you need.",
  },
  {
    id: "dry-bag",
    name: "Dry Bag 20L",
    category: "Accessories",
    image: G("dry-bag.png"),
    imageAlt: "Turquoise waterproof roll-top dry bag",
    buyPrice: 380000,
    rentPricePerDay: 15000,
    buyStock: 25,
    rentStock: 15,
    level: "Beginner",
    rating: 4.5,
    reviews: 87,
    popularity: 70,
    description:
      "Heavy-duty 20 L roll-top dry bag that keeps phones, towels and keys safely dry on any boat day. The unsung hero of every dive trip.",
  },
];

export const GEAR_PACKAGES: GearPackage[] = [
  {
    id: "essential-kit",
    name: "Essential Diver Kit",
    tagline: "Everything a first-timer needs",
    image: G("pkg-essential.png"),
    imageAlt: "Flat lay of essential diving gear: mask, snorkel and fins",
    items: ["Diving Mask", "Snorkel", "Open-heel Fins", "Mesh Gear Bag"],
    buyPrice: 1950000,
    rentPricePerDay: 145000,
    rentStock: 8,
    level: "Beginner",
    rentDurationNote: "Ideal for 1–3 day trips",
    description:
      "Your personal fit items in one convenient bundle — mask, snorkel and fins that match your face and feet, the three things every diver should own.",
    featured: true,
  },
  {
    id: "explorer-package",
    name: "Explorer Gear Package",
    tagline: "Full kit for dedicated divers",
    image: G("pkg-explorer.png"),
    imageAlt: "Flat lay of a full diving gear package with wetsuit and BCD",
    items: [
      "Wetsuit 3mm",
      "BCD",
      "Regulator Set",
      "Dive Computer",
      "Fins + Mask + Snorkel",
    ],
    buyPrice: 15900000,
    rentPricePerDay: 520000,
    rentStock: 5,
    level: "Beginner",
    rentDurationNote: "Ideal for 2–5 day trips",
    description:
      "Rent or own a complete, professionally-maintained setup. Perfect if you're committing to the sport before investing piece by piece.",
  },
  {
    id: "pro-package",
    name: "Pro Diver Package",
    tagline: "Advanced setup for serious diving",
    image: G("pkg-pro.png"),
    imageAlt: "Professional diving kit with regulator, computer and torch",
    items: [
      "Regulator Set (balanced)",
      "Dive Computer (nitrox-ready)",
      "Dive Torch 1200lm",
      "Surface Marker Buoy",
      "Wet Notes Slate",
    ],
    buyPrice: 12400000,
    rentPricePerDay: 410000,
    rentStock: 3,
    level: "Advanced",
    rentDurationNote: "Ideal for workshops & liveaboards",
    description:
      "The safety-and-precision stack: balanced breathing, real-time dive data and signalling tools for deeper, longer or night diving missions.",
  },
];

export const GEAR_CATEGORIES: GearCategory[] = [
  "Mask & Snorkel",
  "Fins",
  "Wetsuit",
  "Regulators & BCD",
  "Accessories",
];
