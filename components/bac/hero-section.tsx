"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, MapPin, ChevronDown } from "lucide-react";
import { PHOTOS } from "@/data/images";
import { Bubbles } from "@/components/ocean/bubbles";
import { Caustics, GodRays } from "@/components/ocean/caustics";
import { MarineParticles } from "@/components/ocean/marine-particles";
import { letterBlur } from "@/lib/motion";

function AnimatedWords({
  text,
  className = "",
  offset = 0,
}: {
  text: string;
  className?: string;
  offset?: number;
}) {
  const words = text.split(" ");
  return (
    <span className={className}>
      {words.map((word, i) => (
        <span key={i} className="inline-block whitespace-nowrap">
          <motion.span
            className="inline-block"
            variants={letterBlur}
            custom={offset + i}
          >
            {word}
          </motion.span>
          {i < words.length - 1 && <span className="inline-block">&nbsp;</span>}
        </span>
      ))}
    </span>
  );
}

export function HeroSection() {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // Depth layers move at different speeds — background slowest
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "22%"]);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1.08, 1.22]);
  const midY = useTransform(scrollYProgress, [0, 1], ["0%", "55%"]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "38%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);
  const hazeOpacity = useTransform(scrollYProgress, [0, 1], [0.35, 0.85]);

  return (
    <section
      ref={ref}
      id="home"
      className="relative flex min-h-[100svh] items-center overflow-hidden"
      aria-label="Blue Abyss Club — enter the blue"
    >
      {/* ── Layer 1: cinematic photo, slowest ── */}
      <motion.div
        style={reduced ? undefined : { y: bgY, scale: bgScale }}
        className="absolute inset-0 will-change-transform"
      >
        <Image
          src={PHOTOS.hero}
          alt={PHOTOS.heroAlt}
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
      </motion.div>

      {/* ── Layer 2: underwater grading & vignette ── */}
      <div className="absolute inset-0 bg-gradient-to-b from-abyss-950/72 via-abyss-950/28 to-abyss-950" />
      <div className="absolute inset-0 bg-gradient-to-r from-abyss-950/72 via-transparent to-abyss-900/30" />
      <motion.div
        style={reduced ? { opacity: 0.5 } : { opacity: hazeOpacity }}
        className="absolute inset-0 bg-gradient-to-t from-abyss-950 via-transparent to-ocean-500/10"
      />

      {/* ── Layer 3: light & life ── */}
      <GodRays />
      <Caustics intensity={0.8} />
      <Bubbles count={18} seed={7} />
      <MarineParticles density={46} />

      {/* ── Layer 4: content, fastest parallax ── */}
      <motion.div
        style={reduced ? undefined : { y: midY }}
        className="pointer-events-none absolute inset-0"
      >
        {/* oversized ghost word, editorial depth */}
        <motion.span
          aria-hidden="true"
          initial={{ opacity: 0, x: 80 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1.4, duration: 1.6, ease: "easeOut" }}
          className="font-display absolute -right-6 top-[16%] select-none text-[22vw] font-bold leading-none tracking-tighter text-stroke-foam opacity-[0.07] lg:text-[17vw]"
        >
          ABYSS
        </motion.span>
      </motion.div>

      <motion.div
        style={
          reduced
            ? undefined
            : { y: contentY, opacity: contentOpacity }
        }
        className="relative z-10 mx-auto w-full max-w-7xl px-5 pb-28 pt-36 lg:px-8"
      >
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{ visible: { transition: { staggerChildren: 0.05 } } }}
          className="max-w-3xl"
        >
          {/* Eyebrow */}
          <motion.p
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { delay: 0.35, duration: 0.7 },
              },
            }}
            className="mb-6 flex items-center gap-3 text-[11px] font-bold tracking-[0.42em] text-lagoon-300 sm:text-xs"
          >
            <span className="h-px w-10 bg-lagoon-300/70" />
            EXPLORE BEYOND THE SURFACE
          </motion.p>

          {/* Heading */}
          <h1 className="font-display text-[13.5vw] font-bold leading-[0.98] tracking-tight text-foam-50 sm:text-7xl lg:text-[86px]">
            <AnimatedWords text="THE OCEAN" offset={2} />
            <br />
            <span className="text-gradient-lagoon animate-[gradient-pan_7s_ease-in-out_infinite]">
              <AnimatedWords text="IS CALLING." offset={4} />
            </span>
          </h1>

          {/* Description */}
          <motion.p
            variants={{
              hidden: { opacity: 0, y: 24 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { delay: 1.15, duration: 0.8 },
              },
            }}
            className="mt-7 max-w-xl text-base leading-relaxed text-foam-100/80 sm:text-lg"
          >
            Discover a different world beneath the surface. Learn to dive, find
            your gear, and become part of a community that lives for the ocean.
          </motion.p>

          {/* CTAs */}
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 24 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { delay: 1.4, duration: 0.8 },
              },
            }}
            className="mt-10 flex flex-wrap items-center gap-4"
          >
            <Link
              href="#learn"
              className="group inline-flex items-center gap-2.5 rounded-full bg-lagoon-400 px-7 py-4 text-sm font-bold text-abyss-950 transition-all duration-300 hover:bg-lagoon-300 hover:shadow-[0_0_40px_-8px_rgba(45,217,199,0.65)]"
            >
              Explore Diving Courses
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
            <Link
              href="#gear"
              className="inline-flex items-center gap-2.5 rounded-full border border-foam-50/25 px-7 py-4 text-sm font-bold text-foam-50 backdrop-blur-sm transition-all duration-300 hover:border-lagoon-300/60 hover:bg-foam-50/5 hover:text-lagoon-300"
            >
              Discover Gear
            </Link>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Floating expedition card — depth accent */}
      <motion.aside
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.8, duration: 1, ease: [0.21, 0.65, 0.26, 0.99] }}
        style={reduced ? undefined : { y: midY }}
        className="absolute bottom-28 right-5 z-10 hidden md:right-8 lg:block"
      >
        <div className="animate-float-slow glass-subtle w-72 rounded-2xl p-5 shadow-2xl shadow-abyss-950/60">
          <div className="flex items-center gap-2 text-[10px] font-bold tracking-[0.28em] text-lagoon-300">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-lagoon-400 opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-lagoon-400" />
            </span>
            NEXT EXPEDITION
          </div>
          <p className="mt-3 font-display text-lg font-bold leading-snug text-foam-50">
            Reef Exploration Trip
          </p>
          <p className="mt-1.5 flex items-center gap-1.5 text-xs text-foam-100/65">
            <MapPin className="h-3.5 w-3.5 text-lagoon-300/80" />
            Coral Gardens · Dec 5–6
          </p>
          <Link
            href="#events"
            className="mt-4 inline-flex items-center gap-1.5 text-xs font-bold text-lagoon-300 transition-colors hover:text-lagoon-200"
          >
            Reserve a spot
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </motion.aside>

      {/* Scroll indicator */}
      <motion.a
        href="#learn"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2, duration: 1 }}
        className="absolute bottom-7 left-1/2 z-10 -translate-x-1/2"
        aria-label="Scroll down to courses"
      >
        <span className="flex flex-col items-center gap-2.5 text-foam-100/60 transition-colors hover:text-lagoon-300">
          <span className="text-[10px] font-bold tracking-[0.4em]">DIVE IN</span>
          <span className="relative h-12 w-6 overflow-hidden rounded-full border border-foam-50/30">
            <span className="absolute left-1/2 top-2 h-1.5 w-1.5 -translate-x-1/2 animate-scroll-dot rounded-full bg-lagoon-300" />
          </span>
          <ChevronDown className="h-3.5 w-3.5 animate-bounce" />
        </span>
      </motion.a>
    </section>
  );
}
