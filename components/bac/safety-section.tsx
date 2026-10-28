"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  ArrowRight,
  BookOpenCheck,
  Check,
  ShieldCheck,
  TriangleAlert,
} from "lucide-react";
import {
  PRE_DIVE_CHECKLIST,
  SAFETY_NOTICE,
  SAFETY_PILLARS,
  SAFETY_STEPS,
} from "@/data/safety";
import { fadeUp, staggerParent } from "@/lib/motion";
import { Reveal, RevealGroup, RevealItem } from "@/components/ocean/reveal";
import { Caustics } from "@/components/ocean/caustics";
import { PHOTOS } from "@/data/images";

function PreDiveChecklist() {
  const [checked, setChecked] = useState<Set<string>>(new Set());
  const total = PRE_DIVE_CHECKLIST.length;
  const done = checked.size;
  const pct = Math.round((done / total) * 100);

  const toggle = (id: string) => {
    setChecked((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const phases = useMemo(
    () => [
      { key: "gear", label: "GEAR" },
      { key: "body", label: "BODY & MIND" },
      { key: "plan", label: "THE PLAN" },
    ] as const,
    []
  );

  return (
    <div className="relative overflow-hidden rounded-3xl border border-foam-50/10 bg-abyss-850/80 p-6 sm:p-8">
      <div className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full bg-lagoon-400/10 blur-3xl" />
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h3 className="flex items-center gap-2.5 font-display text-2xl font-bold text-foam-50">
            <ShieldCheck className="h-6 w-6 text-lagoon-300" />
            Pre-Dive Checklist
          </h3>
          <p className="mt-1.5 text-sm text-foam-100/60">
            Tap each item as you prepare — make it a ritual, every dive.
          </p>
        </div>
        <div className="text-right">
          <span className="font-display text-3xl font-bold text-lagoon-300 tabular-nums">
            {done}
            <span className="text-lg text-foam-100/50">/{total}</span>
          </span>
          <div className="mt-1.5 h-1.5 w-36 overflow-hidden rounded-full bg-foam-50/10">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-ocean-400 to-lagoon-300"
              animate={{ width: `${pct}%` }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            />
          </div>
        </div>
      </div>

      {done === total && (
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-4 rounded-xl border border-lagoon-300/30 bg-lagoon-400/10 px-4 py-3 text-center text-sm font-bold text-lagoon-200"
        >
          All clear — you&rsquo;re ready to dive. Have a great one!
        </motion.p>
      )}

      <div className="mt-6 grid gap-x-8 gap-y-5 sm:grid-cols-3">
        {phases.map((phase) => (
          <div key={phase.key}>
            <p className="mb-2.5 text-[10px] font-bold tracking-[0.28em] text-ocean-300">
              {phase.label}
            </p>
            <ul className="space-y-1">
              {PRE_DIVE_CHECKLIST.filter((c) => c.phase === phase.key).map(
                (item) => {
                  const isChecked = checked.has(item.id);
                  return (
                    <li key={item.id}>
                      <button
                        onClick={() => toggle(item.id)}
                        aria-pressed={isChecked}
                        className={`group flex w-full items-start gap-2.5 rounded-xl px-2.5 py-2 text-left text-[12.5px] leading-snug transition-all duration-300 ${
                          isChecked
                            ? "text-foam-100/45"
                            : "text-foam-100/85 hover:bg-foam-50/5"
                        }`}
                      >
                        <span
                          className={`mt-0.5 grid h-4.5 w-4.5 shrink-0 place-items-center rounded-md border transition-all duration-300 ${
                            isChecked
                              ? "border-lagoon-300 bg-lagoon-400 text-abyss-950"
                              : "border-foam-50/25 group-hover:border-lagoon-300/60"
                          }`}
                        >
                          {isChecked && <Check className="h-3 w-3" strokeWidth={3} />}
                        </span>
                        <span className={isChecked ? "line-through" : ""}>
                          {item.label}
                        </span>
                      </button>
                    </li>
                  );
                }
              )}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

export function SafetySection() {
  return (
    <section
      id="safety"
      className="grain relative overflow-hidden bg-abyss-950 py-24 sm:py-32"
      aria-label="Dive safety"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-foam-50/0 via-abyss-950 to-abyss-900" />
      <Caustics intensity={0.5} />

      <div className="relative z-10 mx-auto max-w-7xl px-5 lg:px-8">
        {/* Editorial split header */}
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal variants={fadeUp}>
            <p className="mb-4 flex items-center gap-3 text-[11px] font-bold tracking-[0.42em] text-lagoon-300">
              <span className="h-px w-10 bg-lagoon-300/70" />
              SAFETY
            </p>
            <h2 className="font-display text-4xl font-bold leading-[1.04] tracking-tight text-foam-50 sm:text-5xl lg:text-6xl">
              Dive smart.
              <br />
              <span className="text-gradient-lagoon">Dive safe.</span>
            </h2>
            <p className="mt-5 max-w-lg text-base leading-relaxed text-foam-100/70">
              Great divers aren&rsquo;t lucky — they&rsquo;re disciplined. These
              are the six habits we drill on every course and every trip, the
              same ones our instructors live by below the surface.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a
                href="#faq"
                className="group inline-flex items-center gap-2 rounded-full bg-lagoon-400 px-6 py-3.5 text-sm font-bold text-abyss-950 transition-all hover:bg-lagoon-300 hover:shadow-[0_0_30px_-8px_rgba(45,217,199,0.6)]"
              >
                <BookOpenCheck className="h-4 w-4" />
                Explore Safety Guide
              </a>
              <span className="text-xs text-foam-100/50">
                Full guide given on every course
              </span>
            </div>
          </Reveal>

          <Reveal className="relative">
            <div className="img-haze relative overflow-hidden rounded-3xl">
              <Image
                src={PHOTOS.buddy}
                alt="Two divers performing a buddy check before entering the water"
                width={1344}
                height={768}
                className="h-auto w-full object-cover"
              />
            </div>
            <motion.div
              initial={{ opacity: 0, y: 20, x: "-50%" }}
              whileInView={{ opacity: 1, y: 0, x: "-50%" }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="glass-subtle absolute -bottom-6 left-1/2 flex w-[88%] max-w-sm -translate-x-1/2 items-center gap-3 rounded-2xl p-4 shadow-2xl"
            >
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-lagoon-400/15 text-lagoon-300">
                <ShieldCheck className="h-5 w-5" />
              </span>
              <p className="text-[12.5px] font-semibold leading-snug text-foam-100/90">
                Every BAC dive starts with a full buddy check — no exceptions,
                no matter your certification level.
              </p>
            </motion.div>
          </Reveal>
        </div>

        {/* 4-step process */}
        <RevealGroup
          className="mt-24 grid gap-5 sm:grid-cols-2 xl:grid-cols-4"
          variants={staggerParent(0.1)}
        >
          {SAFETY_STEPS.map((step) => (
            <RevealItem
              key={step.step}
              className="group relative overflow-hidden rounded-3xl border border-foam-50/10 bg-abyss-850/60"
            >
              <div className="relative h-40 overflow-hidden">
                <Image
                  src={step.image}
                  alt={step.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 25vw"
                  className="object-cover transition-transform duration-[1.2s] group-hover:scale-108"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-abyss-850 via-abyss-850/30 to-transparent" />
                <span className="font-display absolute left-5 top-4 text-4xl font-bold text-foam-50/25">
                  {step.step}
                </span>
              </div>
              <div className="p-5">
                <h3 className="font-display text-lg font-bold text-foam-50">
                  {step.title}
                </h3>
                <p className="mt-1.5 text-[13px] leading-relaxed text-foam-100/65">
                  {step.description}
                </p>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>

        {/* Pillars + checklist */}
        <div className="mt-20 grid gap-6 lg:grid-cols-5">
          <RevealGroup
            className="grid gap-4 sm:grid-cols-2 lg:col-span-3"
            variants={staggerParent(0.08)}
          >
            {SAFETY_PILLARS.map((pillar, i) => (
              <RevealItem
                key={pillar.id}
                className="rounded-2xl border border-foam-50/10 bg-abyss-850/50 p-5 transition-colors duration-300 hover:border-lagoon-300/30"
              >
                <span className="font-display text-[11px] font-bold tracking-widest text-lagoon-300/80">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-1 font-display text-base font-bold text-foam-50">
                  {pillar.title}
                </h3>
                <p className="mt-1.5 text-[12.5px] leading-relaxed text-foam-100/65">
                  {pillar.description}
                </p>
              </RevealItem>
            ))}
          </RevealGroup>
          <Reveal className="lg:col-span-2" delay={0.1}>
            <PreDiveChecklist />
          </Reveal>
        </div>

        {/* Safety notice */}
        <Reveal className="mt-10">
          <p className="mx-auto flex max-w-3xl items-start gap-3 rounded-2xl border border-reef-500/25 bg-reef-500/8 px-5 py-4 text-[13px] leading-relaxed text-reef-200/90">
            <TriangleAlert className="mt-0.5 h-4.5 w-4.5 shrink-0 text-reef-400" />
            {SAFETY_NOTICE}
          </p>
          <p className="mt-6 text-center text-sm text-foam-100/50">
            Ready to learn properly?{" "}
            <a
              href="#learn"
              className="group inline-flex items-center gap-1 font-bold text-lagoon-300 hover:text-lagoon-200"
            >
              Start with a course
              <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
            </a>
          </p>
        </Reveal>
      </div>
    </section>
  );
}
