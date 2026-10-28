import { COURSE_PHOTOS } from "@/data/images";

export type CourseLevel = "Beginner" | "Advanced";

export interface Course {
  id: string;
  name: string;
  level: CourseLevel;
  duration: string;
  location: string;
  price: number;
  image: string;
  imageAlt: string;
  description: string;
  requirements: string[];
  skills: string[];
  /** Certification note — configurable content, not a verified claim. */
  certification: string;
  featured?: boolean;
}

export const COURSES: Course[] = [
  // ============ BEGINNER ============
  {
    id: "discover-scuba",
    image: COURSE_PHOTOS.beginner[0],
    name: "Discover Scuba Diving",
    level: "Beginner",
    duration: "1 day · 2 dives",
    location: "Training Lagoon & House Reef",
    price: 850000,
    imageAlt: "First-time diver breathing underwater in shallow turquoise water",
    description:
      "Your very first breath underwater — no experience needed. A guided introduction in shallow, calm water with a dedicated instructor beside you at every moment.",
    requirements: [
      "Minimum age 10 years",
      "Basic swimming ability",
      "Good health — complete a medical questionnaire",
    ],
    skills: [
      "Breathing with a regulator",
      "Equalizing your ears",
      "Clearing your mask",
      "Basic hand signals",
    ],
    certification: "Introductory experience — no certification, upgradeable to Open Water Diver.",
    featured: true,
  },
  {
    id: "open-water",
    image: COURSE_PHOTOS.beginner[1],
    name: "Open Water Diver",
    level: "Beginner",
    duration: "3 days · 4 dives",
    location: "Pool + Open Ocean",
    price: 3500000,
    imageAlt: "Open water student diver descending along a coral slope",
    description:
      "The world's most popular entry-level program. Learn the essential theory, master core skills in confined water, then complete four open ocean dives to earn your first license.",
    requirements: [
      "Minimum age 10 years",
      "Ability to swim 200 m",
      "Medical clearance if required",
    ],
    skills: [
      "Dive planning & buddy procedures",
      "Buoyancy control fundamentals",
      "Underwater communication",
      "Safe ascent & descent",
    ],
    certification: "Prepares you for an internationally recognized entry-level certification with our partner instructors.",
    featured: true,
  },
  {
    id: "beginner-pool",
    image: COURSE_PHOTOS.beginner[2],
    name: "Beginner Pool Session",
    level: "Beginner",
    duration: "Half day · pool only",
    location: "BAC Training Pool",
    price: 450000,
    imageAlt: "Student practicing mask skills in a calm swimming pool",
    description:
      "A relaxed, pressure-free introduction in the comfort of a swimming pool. Perfect to test the waters before committing to a full course — great for families and kids too.",
    requirements: [
      "Minimum age 8 years",
      "Comfortable in shallow water",
    ],
    skills: [
      "Gear familiarization",
      "First breaths underwater",
      "Floating & finning basics",
      "Fun underwater games",
    ],
    certification: "Experience session only — not a certification course.",
  },

  // ============ ADVANCED ============
  {
    id: "advanced-open-water",
    image: COURSE_PHOTOS.advanced[0],
    name: "Advanced Open Water",
    level: "Advanced",
    duration: "2 days · 5 dives",
    location: "Open Ocean · Multiple Sites",
    price: 3200000,
    imageAlt: "Advanced diver exploring deeper open water terrain",
    description:
      "Five adventure dives that build real confidence: deep dive, underwater navigation, plus three electives like night, wreck, or peak performance buoyancy. No exam — just diving and growing.",
    requirements: [
      "Entry-level certification (or equivalent)",
      "Minimum 12 logged dives recommended",
      "Medical fitness to dive",
    ],
    skills: [
      "Deep diving to 30 m",
      "Underwater navigation",
      "Advanced buoyancy techniques",
      "Night & limited visibility",
    ],
    certification: "Continuing-education level training aligned with international standards.",
    featured: true,
  },
  {
    id: "deep-specialty",
    image: COURSE_PHOTOS.advanced[1],
    name: "Deep Diving Specialty",
    level: "Advanced",
    duration: "2 days · 4 dives",
    location: "Deep Wall & Offshore Sites",
    price: 2800000,
    imageAlt: "Diver descending along a deep underwater wall",
    description:
      "Go deeper — safely and methodically. Learn the physiology, planning, gas management, and backup procedures that make depth diving disciplined rather than risky.",
    requirements: [
      "Advanced-level certification recommended",
      "Minimum 20 logged dives",
      "Deep diving experience reviewed by instructor",
    ],
    skills: [
      "Depth & narcosis management",
      "Gas planning & turnaround rules",
      "Emergency decompression skills",
      "Deep site briefing & navigation",
    ],
    certification: "Specialty training aligned with international deep diving standards.",
  },
  {
    id: "navigation-buoyancy",
    image: COURSE_PHOTOS.advanced[2],
    name: "Navigation & Buoyancy",
    level: "Advanced",
    duration: "1 day · 3 dives",
    location: "House Reef & Sandy Slope",
    price: 1900000,
    imageAlt: "Diver hovering motionless with perfect trim above the sand",
    description:
      "The two skills that separate good divers from great ones. Dial in effortless trim and master compass + natural navigation so you always know exactly where you are.",
    requirements: [
      "Entry-level certification",
      "10+ logged dives recommended",
    ],
    skills: [
      "Perfect trim & hovering",
      "Compass patterns",
      "Natural navigation cues",
      "Kick techniques (frog, modified flutter)",
    ],
    certification: "Includes two specialty modules aligned with international standards.",
  },
  {
    id: "rescue-diver",
    image: COURSE_PHOTOS.advanced[3],
    name: "Rescue Diver",
    level: "Advanced",
    duration: "3 days · pool + ocean",
    location: "Training Pool + Open Ocean",
    price: 4200000,
    imageAlt: "Rescue training exercise at the surface with two divers",
    description:
      "The most rewarding challenge in diving. Learn to prevent problems before they happen and manage emergencies with calm, structured responses — most divers call it their favourite course.",
    requirements: [
      "Advanced-level certification",
      "First aid & CPR training within 24 months",
      "Minimum 30 logged dives",
    ],
    skills: [
      "Self-rescue review",
      "Recognizing diver stress",
      "Surface & underwater rescues",
      "Exits & emergency procedures",
    ],
    certification: "Prepares you for internationally recognized rescue-level certification.",
  },
];
