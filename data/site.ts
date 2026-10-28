/** Global site config — nav, contact, socials. */

export interface NavLink {
  label: string;
  href: string;
}

export const NAV_LINKS: NavLink[] = [
  { label: "Home", href: "#home" },
  { label: "Learn", href: "#learn" },
  { label: "Gear", href: "#gear" },
  { label: "Safety", href: "#safety" },
  { label: "Community", href: "#community" },
  { label: "Events", href: "#events" },
  { label: "FAQ", href: "#faq" },
];

export const CONTACT = {
  email: "hello@blueabyss.club",
  phone: "+62 812 0000 8888",
  address: "Jl. Pantai Selatan 08, Blue Harbor, Indonesia",
  whatsapp: "+62 812 0000 8888",
};

export const SOCIALS: { label: string; href: string; icon: string }[] = [
  { label: "Instagram", href: "#", icon: "instagram" },
  { label: "YouTube", href: "#", icon: "youtube" },
  { label: "Facebook", href: "#", icon: "facebook" },
  { label: "TikTok", href: "#", icon: "music" },
];

export const STATS = [
  { value: 2400, suffix: "+", label: "Divers trained" },
  { value: 38, suffix: "", label: "Dive sites explored" },
  { value: 4.9, suffix: "/5", label: "Average rating", decimals: 1 },
  { value: 120, suffix: "+", label: "Ocean cleanups joined" },
];
