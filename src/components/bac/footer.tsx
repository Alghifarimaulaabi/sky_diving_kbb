"use client";

import { useState } from "react";
import {
  CheckCircle2,
  Facebook,
  Instagram,
  Mail,
  MapPin,
  Phone,
  Send,
  Youtube,
  Waves,
} from "lucide-react";
import { CONTACT, NAV_LINKS } from "@/data/site";
import { toast } from "sonner";
import { Bubbles } from "@/components/ocean/bubbles";

function Newsletter() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "done">("idle");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!/.+@.+\..+/.test(email)) {
      toast.error("That email doesn't look right", {
        description: "Double-check and try again.",
      });
      return;
    }
    setStatus("sending");
    setTimeout(() => {
      setStatus("done");
      setEmail("");
      toast.success("Subscribed — demo", {
        description: "No data was sent. In production you'd get monthly tide tables & trip drops.",
      });
      setTimeout(() => setStatus("idle"), 3500);
    }, 900);
  };

  return (
    <form onSubmit={submit} className="mt-4">
      {status === "done" ? (
        <p className="flex items-center gap-2 rounded-full border border-lagoon-300/30 bg-lagoon-400/10 px-4 py-3 text-sm font-semibold text-lagoon-200">
          <CheckCircle2 className="h-4.5 w-4.5" />
          You&rsquo;re in. See you at the surface.
        </p>
      ) : (
        <div className="flex overflow-hidden rounded-full border border-foam-50/15 bg-abyss-850/80 p-1.5 backdrop-blur focus-within:border-lagoon-300/50">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Your email for trip drops"
            aria-label="Email for newsletter"
            className="min-w-0 flex-1 bg-transparent px-4 text-sm text-foam-50 placeholder:text-foam-100/35 focus:outline-none"
          />
          <button
            type="submit"
            disabled={status === "sending"}
            className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-lagoon-400 text-abyss-950 transition-all hover:bg-lagoon-300 disabled:opacity-60"
            aria-label="Subscribe to newsletter"
          >
            {status === "sending" ? (
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-abyss-950/30 border-t-abyss-950" />
            ) : (
              <Send className="h-4 w-4" />
            )}
          </button>
        </div>
      )}
    </form>
  );
}

const SOCIAL_ICONS: Record<string, typeof Instagram> = {
  instagram: Instagram,
  youtube: Youtube,
  facebook: Facebook,
  music: Send,
};

export function Footer() {
  return (
    <footer className="relative mt-auto overflow-hidden bg-abyss-950">
      {/* wave transition from the section above */}
      <div className="pointer-events-none absolute inset-x-0 top-0 text-abyss-900" aria-hidden="true">
        <svg
          viewBox="0 0 1440 80"
          preserveAspectRatio="none"
          className="h-12 w-[calc(100%+2px)] -translate-x-px fill-abyss-900 sm:h-16"
        >
          <path d="M0,48 C240,88 480,8 720,32 C960,56 1200,88 1440,40 L1440,0 L0,0 Z" />
        </svg>
      </div>

      <Bubbles count={8} seed={99} className="opacity-40" />
      <div className="pointer-events-none absolute -bottom-32 left-1/2 h-72 w-[80%] -translate-x-1/2 rounded-full bg-ocean-600/15 blur-[110px]" />

      <div className="relative z-10 mx-auto max-w-7xl px-5 pb-10 pt-28 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-12">
          {/* Brand */}
          <div className="lg:col-span-4">
            <div className="flex items-center gap-2.5">
              <span className="grid h-10 w-10 place-items-center rounded-full border border-lagoon-300/40 bg-lagoon-400/10 text-lagoon-300">
                <Waves className="h-5 w-5" strokeWidth={1.8} />
              </span>
              <span className="font-display leading-none">
                <span className="block text-base font-bold tracking-[0.22em] text-foam-50">
                  BLUE ABYSS
                </span>
                <span className="mt-1 block text-[9px] font-semibold tracking-[0.5em] text-lagoon-300/90">
                  CLUB · BAC
                </span>
              </span>
            </div>
            <p className="mt-5 font-display text-xl font-bold leading-snug text-foam-50">
              Find your depth.
              <br />
              <span className="text-lagoon-300">Protect the blue.</span>
            </p>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-foam-100/60">
              A diving community for beginners and ocean veterans — courses,
              gear and expeditions, all built around safety and conservation.
            </p>
            <div className="mt-6">
              <p className="text-[10px] font-bold tracking-[0.28em] text-foam-100/45">
                NEWSLETTER
              </p>
              <Newsletter />
            </div>
          </div>

          {/* Link columns */}
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:col-span-5">
            <nav aria-label="Explore">
              <p className="text-[10px] font-bold tracking-[0.28em] text-lagoon-300">
                EXPLORE
              </p>
              <ul className="mt-4 space-y-2.5">
                {NAV_LINKS.map((l) => (
                  <li key={l.href}>
                    <a
                      href={l.href}
                      className="text-sm text-foam-100/65 transition-colors hover:text-lagoon-300"
                    >
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
            <nav aria-label="Courses and gear">
              <p className="text-[10px] font-bold tracking-[0.28em] text-lagoon-300">
                LEARN & GEAR
              </p>
              <ul className="mt-4 space-y-2.5">
                {[
                  { label: "Discover Scuba", href: "#learn" },
                  { label: "Open Water Diver", href: "#learn" },
                  { label: "Advanced Courses", href: "#learn" },
                  { label: "Gear Packages", href: "#gear" },
                  { label: "Rent Gear", href: "#gear" },
                  { label: "Safety Guide", href: "#safety" },
                ].map((l) => (
                  <li key={l.label}>
                    <a
                      href={l.href}
                      className="text-sm text-foam-100/65 transition-colors hover:text-lagoon-300"
                    >
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
            <nav aria-label="Contact">
              <p className="text-[10px] font-bold tracking-[0.28em] text-lagoon-300">
                CONTACT
              </p>
              <ul className="mt-4 space-y-3 text-sm text-foam-100/65">
                <li className="flex items-start gap-2.5">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-lagoon-300/70" />
                  <span>{CONTACT.address}</span>
                </li>
                <li>
                  <a
                    href={`mailto:${CONTACT.email}`}
                    className="flex items-start gap-2.5 transition-colors hover:text-lagoon-300"
                  >
                    <Mail className="mt-0.5 h-4 w-4 shrink-0 text-lagoon-300/70" />
                    {CONTACT.email}
                  </a>
                </li>
                <li>
                  <a
                    href={`tel:${CONTACT.phone.replace(/\s/g, "")}`}
                    className="flex items-start gap-2.5 transition-colors hover:text-lagoon-300"
                  >
                    <Phone className="mt-0.5 h-4 w-4 shrink-0 text-lagoon-300/70" />
                    {CONTACT.phone}
                  </a>
                </li>
              </ul>
              <div className="mt-5 flex gap-2">
                {[
                  { icon: Instagram, label: "Instagram" },
                  { icon: Youtube, label: "YouTube" },
                  { icon: Facebook, label: "Facebook" },
                ].map((s) => (
                  <a
                    key={s.label}
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      toast(`${s.label} — demo link`, {
                        description: "Social profiles are placeholders in this demo.",
                      });
                    }}
                    aria-label={s.label}
                    className="grid h-9 w-9 place-items-center rounded-full border border-foam-50/12 text-foam-100/60 transition-all hover:border-lagoon-300/50 hover:text-lagoon-300"
                  >
                    <s.icon className="h-4 w-4" />
                  </a>
                ))}
              </div>
            </nav>
          </div>

          {/* Dive in card */}
          <div className="lg:col-span-3">
            <div className="relative overflow-hidden rounded-3xl border border-lagoon-300/20 bg-gradient-to-b from-abyss-850 to-abyss-900 p-6">
              <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-lagoon-400/10 blur-2xl" />
              <p className="font-display text-lg font-bold text-foam-50">
                Ready to breathe underwater?
              </p>
              <p className="mt-2 text-[13px] leading-relaxed text-foam-100/60">
                Your first course starts with one conversation. No pressure, no
                jargon — just the ocean, waiting.
              </p>
              <a
                href="#learn"
                className="mt-4 inline-flex items-center gap-2 rounded-full bg-lagoon-400 px-5 py-2.5 text-xs font-bold text-abyss-950 transition-all hover:bg-lagoon-300"
              >
                Start Your Dive
              </a>
            </div>
          </div>
        </div>

        {/* bottom bar */}
        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-foam-50/8 pt-7 sm:flex-row">
          <p className="text-xs text-foam-100/45">
            © {new Date().getFullYear()} Blue Abyss Club. Demo website — courses,
            prices, events and stock are example data.
          </p>
          <div className="flex items-center gap-6 text-xs">
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                toast("Privacy Policy — placeholder", { description: "Demo page." });
              }}
              className="text-foam-100/45 transition-colors hover:text-lagoon-300"
            >
              Privacy Policy
            </a>
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                toast("Terms & Conditions — placeholder", { description: "Demo page." });
              }}
              className="text-foam-100/45 transition-colors hover:text-lagoon-300"
            >
              Terms & Conditions
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
