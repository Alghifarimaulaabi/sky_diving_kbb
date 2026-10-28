"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, CheckCircle2, Heart, Users, X } from "lucide-react";
import { STATS } from "@/data/site";
import { COMMUNITY_PHOTOS, PHOTOS } from "@/data/images";
import { StatCounter } from "@/components/ocean/stat-counter";
import { Reveal, RevealGroup, RevealItem } from "@/components/ocean/reveal";
import { fadeUp, staggerParent } from "@/lib/motion";
import { toast } from "sonner";
import { useEscapeKey } from "@/lib/use-escape-key";
import { Bubbles } from "@/components/ocean/bubbles";

const MISSIONS = [
  {
    title: "Make diving education more accessible",
    desc: "Affordable entry programs, flexible schedules and courses in three languages — the ocean shouldn't have a door fee.",
  },
  {
    title: "Build a supportive community of divers",
    desc: "From first-timers to instructors, everyone finds dive buddies, mentors and friends here.",
  },
  {
    title: "Promote safe and responsible diving",
    desc: "Training that respects standards, briefings that respect conditions, and a culture where safety is cool.",
  },
  {
    title: "Encourage marine conservation",
    desc: "Cleanups, coral nurseries and citizen-science surveys baked into our trip calendar, not bolted on.",
  },
];

function JoinDialog({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [form, setForm] = useState({ name: "", email: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");
  useEscapeKey(onClose, open);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !/.+@.+\..+/.test(form.email)) {
      toast.error("Almost there", {
        description: "Please fill in your name and a valid email.",
      });
      return;
    }
    setStatus("sending");
    setTimeout(() => setStatus("sent"), 1100);
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[80] bg-abyss-950/80 backdrop-blur-md"
            onClick={onClose}
            aria-hidden="true"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 16 }}
            className="fixed inset-x-4 top-1/2 z-[90] mx-auto max-w-md -translate-y-1/2 rounded-3xl border border-foam-50/12 bg-abyss-900 p-7"
            role="dialog"
            aria-modal="true"
            aria-label="Join the community"
          >
            <button
              onClick={onClose}
              className="absolute right-4 top-4 grid h-9 w-9 place-items-center rounded-full text-foam-100/60 transition-colors hover:bg-foam-50/10 hover:text-foam-50"
              aria-label="Close"
            >
              <X className="h-4.5 w-4.5" />
            </button>

            {status === "sent" ? (
              <div className="py-4 text-center">
                <CheckCircle2 className="mx-auto h-12 w-12 text-lagoon-300" />
                <h3 className="mt-3 font-display text-2xl font-bold text-foam-50">
                  Welcome aboard!
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-foam-100/70">
                  This demo doesn&rsquo;t send data anywhere — but in the real
                  club you&rsquo;d get a welcome email and an invite to the next
                  monthly meetup, {form.name.split(" ")[0]}.
                </p>
                <button
                  onClick={onClose}
                  className="mt-5 rounded-full bg-lagoon-400 px-6 py-3 text-sm font-bold text-abyss-950 hover:bg-lagoon-300"
                >
                  Dive on
                </button>
              </div>
            ) : (
              <>
                <h3 className="font-display text-2xl font-bold text-foam-50">
                  Join Blue Abyss Club
                </h3>
                <p className="mt-1.5 text-sm text-foam-100/65">
                  Free membership. Monthly meetups, trip discounts, conservation
                  days and a crew that always has room on the boat.
                </p>
                <form onSubmit={submit} className="mt-5 space-y-3">
                  <input
                    value={form.name}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, name: e.target.value }))
                    }
                    placeholder="Your name"
                    className="w-full rounded-xl border border-foam-50/15 bg-abyss-850 px-4 py-3 text-sm text-foam-50 placeholder:text-foam-100/35 focus:border-lagoon-300/60 focus:outline-none"
                    aria-label="Your name"
                  />
                  <input
                    value={form.email}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, email: e.target.value }))
                    }
                    placeholder="Email address"
                    type="email"
                    className="w-full rounded-xl border border-foam-50/15 bg-abyss-850 px-4 py-3 text-sm text-foam-50 placeholder:text-foam-100/35 focus:border-lagoon-300/60 focus:outline-none"
                    aria-label="Email address"
                  />
                  <button
                    type="submit"
                    disabled={status === "sending"}
                    className="flex w-full items-center justify-center gap-2 rounded-full bg-lagoon-400 py-3.5 text-sm font-bold text-abyss-950 transition-all hover:bg-lagoon-300 disabled:opacity-70"
                  >
                    {status === "sending" ? (
                      <>
                        <span className="h-4 w-4 animate-spin rounded-full border-2 border-abyss-950/30 border-t-abyss-950" />
                        Joining…
                      </>
                    ) : (
                      <>
                        <Heart className="h-4 w-4" />
                        Join the Community
                      </>
                    )}
                  </button>
                </form>
              </>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

export function CommunitySection() {
  const [joinOpen, setJoinOpen] = useState(false);

  return (
    <section
      id="community"
      className="grain relative overflow-hidden bg-abyss-900 py-24 sm:py-32"
      aria-label="Blue Abyss Club community"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-abyss-950 via-abyss-900 to-abyss-950" />
      <Bubbles count={9} seed={55} className="opacity-50" />

      <div className="relative z-10 mx-auto max-w-7xl px-5 lg:px-8">
        <div className="grid gap-14 lg:grid-cols-2 lg:gap-20">
          {/* Story + photo collage */}
          <div>
            <Reveal>
              <p className="mb-4 flex items-center gap-3 text-[11px] font-bold tracking-[0.42em] text-lagoon-300">
                <span className="h-px w-10 bg-lagoon-300/70" />
                BLUE ABYSS CLUB
              </p>
              <h2 className="font-display text-4xl font-bold leading-[1.04] tracking-tight text-foam-50 sm:text-5xl">
                More than
                <br />
                <span className="text-gradient-lagoon">a dive.</span>
              </h2>
            </Reveal>

            <Reveal className="mt-7 space-y-4 leading-relaxed text-foam-100/75">
              <p>
                BAC started with a simple frustration: getting into diving felt
                complicated, expensive and intimidating. We believed the ocean
                should feel like a welcome, not a test. So we built the club we
                wished existed — gear that&rsquo;s ready when you are,
                instructors who teach with patience, and a community that
                saves you a seat on the boat.
              </p>
              <p>
                Today, Blue Abyss Club is a home for beginners taking their
                first pool breath and seasoned divers chasing deep walls and
                night encounters. What ties us together is simple: we explore
                responsibly, we look after each other, and we leave the ocean
                better than we found it.
              </p>
            </Reveal>

            {/* Vision */}
            <Reveal className="mt-8">
              <blockquote className="relative rounded-2xl border-l-2 border-lagoon-400 bg-abyss-850/60 py-5 pl-6 pr-5">
                <p className="text-lg font-semibold italic leading-relaxed text-foam-50">
                  &ldquo;To inspire a world that explores the ocean responsibly
                  and protects its beauty for generations to come.&rdquo;
                </p>
                <footer className="mt-2 text-[11px] font-bold tracking-[0.28em] text-lagoon-300">
                  OUR VISION
                </footer>
              </blockquote>
            </Reveal>

            {/* Mission */}
            <RevealGroup
              className="mt-8 grid gap-4 sm:grid-cols-2"
              variants={staggerParent(0.08)}
            >
              {MISSIONS.map((m) => (
                <RevealItem
                  key={m.title}
                  className="rounded-2xl border border-foam-50/10 bg-abyss-850/50 p-4"
                >
                  <h3 className="flex items-start gap-2 font-display text-[14px] font-bold leading-snug text-foam-50">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-lagoon-300" />
                    {m.title}
                  </h3>
                  <p className="mt-1.5 text-[12px] leading-relaxed text-foam-100/60">
                    {m.desc}
                  </p>
                </RevealItem>
              ))}
            </RevealGroup>
          </div>

          {/* Photo collage */}
          <div className="relative">
            <Reveal className="relative z-10 overflow-hidden rounded-3xl">
              <Image
                src={PHOTOS.community1}
                alt="BAC divers laughing together on the boat after a dive"
                width={1344}
                height={768}
                className="h-auto w-full object-cover"
              />
            </Reveal>
            <Reveal
              delay={0.15}
              className="relative z-20 -mt-16 ml-auto w-[72%] overflow-hidden rounded-3xl border-4 border-abyss-900 shadow-2xl shadow-abyss-950/80"
            >
              <Image
                src={COMMUNITY_PHOTOS[1]}
                alt="Divers in full gear preparing to backroll off the boat"
                width={864}
                height={1152}
                className="h-auto w-full object-cover"
              />
            </Reveal>
            <Reveal
              delay={0.25}
              className="relative z-30 -mt-24 mr-auto w-[46%] overflow-hidden rounded-2xl border-4 border-abyss-900 shadow-2xl shadow-abyss-950/80"
            >
              <Image
                src={PHOTOS.turtle}
                alt="A BAC diver sharing a calm moment with a sea turtle"
                width={1344}
                height={768}
                className="h-auto w-full object-cover"
              />
            </Reveal>
            <div className="pointer-events-none absolute -left-24 top-1/2 h-72 w-72 rounded-full bg-ocean-500/15 blur-[100px]" />
          </div>
        </div>

        {/* Stats */}
        <RevealGroup
          className="mt-24 grid grid-cols-2 gap-px overflow-hidden rounded-3xl border border-foam-50/10 bg-foam-50/5 lg:grid-cols-4"
          variants={staggerParent(0.08)}
        >
          {STATS.map((stat) => (
            <RevealItem
              key={stat.label}
              className="bg-abyss-900/90 px-6 py-8 text-center"
            >
              <p className="font-display text-4xl font-bold text-lagoon-300 sm:text-5xl">
                <StatCounter
                  value={stat.value}
                  suffix={stat.suffix}
                  decimals={stat.decimals ?? 0}
                />
              </p>
              <p className="mt-2 text-[11px] font-bold tracking-[0.22em] text-foam-100/55">
                {stat.label.toUpperCase()}
              </p>
            </RevealItem>
          ))}
        </RevealGroup>

        {/* CTA */}
        <Reveal className="relative mt-24 overflow-hidden rounded-[2.5rem]">
          <div className="absolute inset-0">
            <Image
              src={PHOTOS.reef1}
              alt=""
              fill
              sizes="100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-abyss-950/92 via-abyss-950/75 to-ocean-600/40" />
          </div>
          <div className="relative z-10 px-7 py-16 sm:px-14 sm:py-20">
            <p className="flex items-center gap-2 text-[11px] font-bold tracking-[0.32em] text-lagoon-300">
              <Users className="h-4 w-4" />
              JOIN THE CLUB
            </p>
            <h3 className="mt-4 max-w-2xl font-display text-4xl font-bold leading-[1.05] tracking-tight text-foam-50 sm:text-5xl">
              Your next adventure{" "}
              <span className="text-gradient-lagoon">starts below.</span>
            </h3>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-foam-100/75">
              Meet your dive buddies, learn new skills, and discover a world
              waiting beneath the surface.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <button
                onClick={() => setJoinOpen(true)}
                className="group inline-flex items-center gap-2 rounded-full bg-lagoon-400 px-7 py-4 text-sm font-bold text-abyss-950 transition-all hover:bg-lagoon-300 hover:shadow-[0_0_40px_-8px_rgba(45,217,199,0.65)]"
              >
                Join the Community
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </button>
              <a
                href="#events"
                className="inline-flex items-center gap-2 rounded-full border border-foam-50/25 px-7 py-4 text-sm font-bold text-foam-50 backdrop-blur-sm transition-all hover:border-lagoon-300/60 hover:text-lagoon-300"
              >
                Explore Upcoming Events
              </a>
            </div>
          </div>
        </Reveal>
      </div>

      <JoinDialog open={joinOpen} onClose={() => setJoinOpen(false)} />
    </section>
  );
}
