"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowUpRight,
  CalendarDays,
  CheckCircle2,
  Clock,
  Flame,
  MapPin,
  Sparkles,
  Users,
  X,
} from "lucide-react";
import {
  EVENTS,
  EVENT_CATEGORIES,
  type DiveEvent,
  type EventCategory,
  type EventLevel,
} from "@/data/events";
import { formatIDR, formatDateLabel } from "@/lib/format";
import { fadeUp, staggerParent, EASE_OUT } from "@/lib/motion";
import { Reveal } from "@/components/ocean/reveal";
import { toast } from "sonner";
import { useEscapeKey } from "@/lib/use-escape-key";

type LevelFilter = "All" | "Beginner" | "Advanced";

function LevelBadge({ level }: { level: EventLevel }) {
  const style =
    level === "Beginner"
      ? "bg-lagoon-400/15 text-lagoon-300 ring-lagoon-300/30"
      : level === "Advanced"
        ? "bg-reef-500/15 text-reef-300 ring-reef-500/30"
        : "bg-ocean-400/15 text-ocean-300 ring-ocean-300/30";
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[10px] font-bold tracking-wider ring-1 ${style}`}
    >
      <Sparkles className="h-3 w-3" />
      {level.toUpperCase()}
    </span>
  );
}

function QuotaBar({ event }: { event: DiveEvent }) {
  const taken = event.spotsTotal - event.spotsLeft;
  const pct = Math.round((taken / event.spotsTotal) * 100);
  const hot = pct >= 60;
  return (
    <div>
      <div className="flex items-center justify-between text-[11px] font-semibold">
        <span
          className={`flex items-center gap-1 ${
            hot ? "text-reef-300" : "text-foam-100/60"
          }`}
        >
          {hot && <Flame className="h-3.5 w-3.5" />}
          {event.spotsLeft} of {event.spotsTotal} spots left
        </span>
        <span className="text-foam-100/40">example data</span>
      </div>
      <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-foam-50/10">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${pct}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
          className={`h-full rounded-full ${
            hot
              ? "bg-gradient-to-r from-reef-500 to-reef-300"
              : "bg-gradient-to-r from-ocean-400 to-lagoon-300"
          }`}
        />
      </div>
    </div>
  );
}

function EventDialog({
  event,
  onClose,
  onRegistered,
  registered,
}: {
  event: DiveEvent | null;
  onClose: () => void;
  onRegistered: (id: string) => void;
  registered: Set<string>;
}) {
  const [form, setForm] = useState({ name: "", email: "", people: 1 });
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");
  useEscapeKey(onClose, !!event);
  const isRegistered = event ? registered.has(event.id) : false;

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !/.+@.+\..+/.test(form.email)) {
      toast.error("Please complete the form", {
        description: "Name and a valid email are required to register.",
      });
      return;
    }
    setStatus("sending");
    // Simulated registration — no backend (honest demo).
    setTimeout(() => {
      setStatus("sent");
      if (event) onRegistered(event.id);
    }, 1200);
  };

  return (
    <AnimatePresence>
      {event && (
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
            initial={{ opacity: 0, y: 44, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 28, scale: 0.98 }}
            transition={{ duration: 0.4, ease: EASE_OUT }}
            className="fixed inset-x-0 bottom-0 top-[3vh] z-[90] mx-auto max-w-2xl overflow-hidden rounded-t-3xl border border-foam-50/12 bg-abyss-900 sm:bottom-auto sm:top-1/2 sm:-translate-y-1/2 sm:rounded-3xl"
            role="dialog"
            aria-modal="true"
            aria-label={`Event details: ${event.name}`}
          >
            <button
              onClick={onClose}
              className="absolute right-4 top-4 z-20 grid h-10 w-10 place-items-center rounded-full bg-abyss-950/60 text-foam-50 backdrop-blur transition-colors hover:bg-abyss-950/95"
              aria-label="Close event details"
            >
              <X className="h-5 w-5" />
            </button>
            <div className="max-h-[94vh] overflow-y-auto">
              <div className="relative h-60 sm:h-72">
                <Image
                  src={event.image}
                  alt={event.imageAlt}
                  fill
                  sizes="(max-width: 640px) 100vw, 672px"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-abyss-900 via-abyss-900/30 to-transparent" />
                <div className="absolute bottom-5 left-6 right-6">
                  <div className="flex flex-wrap items-center gap-2">
                    <LevelBadge level={event.level} />
                    <span className="rounded-full bg-abyss-950/60 px-2.5 py-1 text-[10px] font-bold tracking-wider text-foam-100/80 backdrop-blur">
                      {event.category.toUpperCase()}
                    </span>
                  </div>
                  <h3 className="mt-2 font-display text-3xl font-bold text-foam-50">
                    {event.name}
                  </h3>
                </div>
              </div>

              <div className="px-6 py-6 sm:px-8">
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                  {[
                    {
                      icon: CalendarDays,
                      label: "DATE",
                      value: formatDateLabel(event.date),
                    },
                    {
                      icon: MapPin,
                      label: "LOCATION",
                      value: event.location,
                    },
                    { icon: Clock, label: "DURATION", value: event.duration },
                    {
                      icon: Users,
                      label: "PRICE",
                      value: event.price === null ? "Free" : formatIDR(event.price),
                    },
                  ].map((f) => (
                    <div
                      key={f.label}
                      className="rounded-xl bg-abyss-850/70 px-3 py-2.5"
                    >
                      <p className="flex items-center gap-1 text-[9px] font-bold tracking-widest text-foam-100/45">
                        <f.icon className="h-3 w-3" /> {f.label}
                      </p>
                      <p className="mt-1 truncate text-[13px] font-bold text-foam-50">
                        {f.value}
                      </p>
                    </div>
                  ))}
                </div>

                <p className="mt-5 leading-relaxed text-foam-100/75">
                  {event.description}
                </p>

                <h4 className="mt-5 text-[11px] font-bold tracking-[0.24em] text-lagoon-300">
                  TRIP HIGHLIGHTS
                </h4>
                <ul className="mt-2.5 grid gap-1.5 sm:grid-cols-2">
                  {event.highlights.map((h) => (
                    <li
                      key={h}
                      className="flex items-center gap-2 text-[13px] text-foam-100/75"
                    >
                      <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-lagoon-300" />
                      {h}
                    </li>
                  ))}
                </ul>

                <div className="mt-5">
                  <QuotaBar event={event} />
                </div>

                {status === "sent" || isRegistered ? (
                  <div className="mt-6 rounded-2xl border border-lagoon-300/30 bg-lagoon-400/10 p-5 text-center">
                    <CheckCircle2 className="mx-auto h-9 w-9 text-lagoon-300" />
                    <h4 className="mt-2 font-display text-xl font-bold text-foam-50">
                      You&rsquo;re on the list!
                    </h4>
                    <p className="mx-auto mt-1.5 max-w-sm text-[13px] leading-relaxed text-foam-100/70">
                      Demo only — no data was sent. Our crew would normally
                      confirm your spot and send the trip briefing by email.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={submit} className="mt-6">
                    <p className="mb-3 text-[11px] font-bold tracking-[0.24em] text-foam-100/60">
                      REGISTER FOR THIS EVENT — DEMO
                    </p>
                    <div className="grid gap-2.5 sm:grid-cols-[1fr_1fr_120px]">
                      <input
                        value={form.name}
                        onChange={(e) =>
                          setForm((f) => ({ ...f, name: e.target.value }))
                        }
                        placeholder="Full name"
                        className="rounded-xl border border-foam-50/15 bg-abyss-850 px-3.5 py-3 text-sm text-foam-50 placeholder:text-foam-100/35 focus:border-lagoon-300/60 focus:outline-none"
                        aria-label="Full name"
                      />
                      <input
                        value={form.email}
                        onChange={(e) =>
                          setForm((f) => ({ ...f, email: e.target.value }))
                        }
                        placeholder="Email"
                        type="email"
                        className="rounded-xl border border-foam-50/15 bg-abyss-850 px-3.5 py-3 text-sm text-foam-50 placeholder:text-foam-100/35 focus:border-lagoon-300/60 focus:outline-none"
                        aria-label="Email address"
                      />
                      <select
                        value={form.people}
                        onChange={(e) =>
                          setForm((f) => ({
                            ...f,
                            people: Number(e.target.value),
                          }))
                        }
                        className="rounded-xl border border-foam-50/15 bg-abyss-850 px-3 py-3 text-sm text-foam-50 focus:border-lagoon-300/60 focus:outline-none"
                        aria-label="Number of participants"
                      >
                        {[1, 2, 3, 4].map((n) => (
                          <option key={n} value={n}>
                            {n} {n === 1 ? "person" : "people"}
                          </option>
                        ))}
                      </select>
                    </div>
                    <button
                      type="submit"
                      disabled={status === "sending"}
                      className="mt-3.5 flex w-full items-center justify-center gap-2 rounded-full bg-lagoon-400 py-3.5 text-sm font-bold text-abyss-950 transition-all hover:bg-lagoon-300 disabled:opacity-70"
                    >
                      {status === "sending" ? (
                        <>
                          <span className="h-4 w-4 animate-spin rounded-full border-2 border-abyss-950/30 border-t-abyss-950" />
                          Registering…
                        </>
                      ) : (
                        "Register now"
                      )}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

export function EventsSection() {
  const [level, setLevel] = useState<LevelFilter>("All");
  const [category, setCategory] = useState<"All" | EventCategory>("All");
  const [detail, setDetail] = useState<DiveEvent | null>(null);
  const [registered, setRegistered] = useState<Set<string>>(new Set());

  const filtered = useMemo(
    () =>
      EVENTS.filter(
        (e) =>
          (level === "All" || e.level === level || e.level === "All Levels") &&
          (category === "All" || e.category === category)
      ),
    [level, category]
  );

  return (
    <section
      id="events"
      className="grain relative overflow-hidden bg-abyss-950 py-24 sm:py-32"
      aria-label="Upcoming expeditions and events"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-abyss-900 via-abyss-950 to-abyss-900" />

      <div className="relative z-10 mx-auto max-w-7xl px-5 lg:px-8">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <Reveal className="max-w-2xl">
            <p className="mb-4 flex items-center gap-3 text-[11px] font-bold tracking-[0.42em] text-lagoon-300">
              <span className="h-px w-10 bg-lagoon-300/70" />
              EVENTS
            </p>
            <h2 className="font-display text-4xl font-bold leading-[1.04] tracking-tight text-foam-50 sm:text-5xl lg:text-6xl">
              Upcoming
              <br />
              <span className="text-gradient-lagoon">expeditions.</span>
            </h2>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-foam-100/70">
              Trips, camps and conservation days worth surfacing for. Dates and
              quotas below are example data — join the club to hear first when
              the real schedule drops.
            </p>
          </Reveal>

          {/* Filters */}
          <Reveal delay={0.12} className="shrink-0">
            <div className="flex flex-wrap gap-2">
              {(["All", "Beginner", "Advanced"] as LevelFilter[]).map((l) => (
                <button
                  key={l}
                  onClick={() => setLevel(l)}
                  aria-pressed={level === l}
                  className={`rounded-full px-4 py-2 text-xs font-bold transition-all duration-300 ${
                    level === l
                      ? "bg-lagoon-400 text-abyss-950"
                      : "border border-foam-50/15 text-foam-100/65 hover:border-lagoon-300/40 hover:text-foam-50"
                  }`}
                >
                  {l === "All" ? "All levels" : l}
                </button>
              ))}
            </div>
            <div className="mt-2.5 flex flex-wrap gap-2">
              {(["All", ...EVENT_CATEGORIES] as ("All" | EventCategory)[]).map(
                (c) => (
                  <button
                    key={c}
                    onClick={() => setCategory(c)}
                    aria-pressed={category === c}
                    className={`rounded-full px-3.5 py-1.5 text-[11px] font-semibold transition-all duration-300 ${
                      category === c
                        ? "bg-foam-50 text-abyss-950"
                        : "bg-foam-50/8 text-foam-100/60 hover:bg-foam-50/15 hover:text-foam-50"
                    }`}
                  >
                    {c}
                  </button>
                )
              )}
            </div>
          </Reveal>
        </div>

        {/* Editorial grid */}
        <motion.div
          key={`${level}-${category}`}
          variants={staggerParent(0.1)}
          initial="hidden"
          animate="visible"
          className="mt-14 grid gap-6 md:grid-cols-2 xl:grid-cols-3"
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((event, i) => (
              <motion.article
                layout
                key={event.id}
                variants={fadeUp}
                className={`group relative overflow-hidden rounded-3xl border border-foam-50/10 bg-abyss-850/70 transition-all duration-500 hover:-translate-y-1.5 hover:border-lagoon-300/30 hover:shadow-[0_30px_60px_-20px_rgba(2,10,18,0.9)] ${
                  i === 0 && filtered.length > 2 ? "xl:col-span-2" : ""
                }`}
              >
                <div
                  className={`relative overflow-hidden ${
                    i === 0 && filtered.length > 2 ? "aspect-[16/8]" : "aspect-[16/10]"
                  }`}
                >
                  <Image
                    src={event.image}
                    alt={event.imageAlt}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 50vw"
                    className="object-cover transition-transform duration-[1.2s] ease-[cubic-bezier(0.21,0.65,0.26,0.99)] group-hover:scale-107"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-abyss-850 via-abyss-850/20 to-abyss-950/20" />
                  {/* date chip */}
                  <div className="absolute left-5 top-5 rounded-2xl bg-abyss-950/75 px-3.5 py-2 text-center backdrop-blur">
                    <p className="font-display text-2xl font-bold leading-none text-lagoon-300">
                      {new Date(event.date).getDate()}
                    </p>
                    <p className="mt-1 text-[10px] font-bold tracking-[0.2em] text-foam-100/75">
                      {new Date(event.date)
                        .toLocaleDateString("en-US", { month: "short" })
                        .toUpperCase()}
                    </p>
                  </div>
                  <div className="absolute right-5 top-5">
                    <LevelBadge level={event.level} />
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="font-display text-xl font-bold leading-snug text-foam-50">
                      {event.name}
                    </h3>
                    <span
                      className={`shrink-0 rounded-full px-2.5 py-1 text-[11px] font-bold ${
                        event.price === null
                          ? "bg-lagoon-400/15 text-lagoon-300"
                          : "bg-foam-50/8 text-foam-100/80"
                      }`}
                    >
                      {event.price === null ? "FREE" : formatIDR(event.price)}
                    </span>
                  </div>
                  <p className="mt-1.5 flex flex-wrap gap-x-4 gap-y-1 text-xs text-foam-100/60">
                    <span className="flex items-center gap-1.5">
                      <MapPin className="h-3.5 w-3.5 text-lagoon-300/80" />
                      {event.location}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Clock className="h-3.5 w-3.5 text-lagoon-300/80" />
                      {event.duration}
                    </span>
                  </p>

                  <p className="mt-3 line-clamp-2 text-[13px] leading-relaxed text-foam-100/65">
                    {event.description}
                  </p>

                  <div className="mt-4">
                    <QuotaBar event={event} />
                  </div>

                  <div className="mt-5 flex items-center gap-2.5">
                    <button
                      onClick={() => setDetail(event)}
                      className="flex-1 rounded-full bg-lagoon-400 py-2.5 text-xs font-bold text-abyss-950 transition-all hover:bg-lagoon-300"
                    >
                      {registered.has(event.id) ? "Registered ✓" : "Register"}
                    </button>
                    <button
                      onClick={() => setDetail(event)}
                      className="group/btn inline-flex items-center gap-1.5 rounded-full border border-foam-50/20 px-4 py-2.5 text-xs font-bold text-foam-50 transition-all hover:border-lagoon-300/50 hover:text-lagoon-300"
                    >
                      View Event
                      <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                    </button>
                  </div>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>

        {filtered.length === 0 && (
          <div className="mt-14 rounded-3xl border border-dashed border-foam-50/15 px-8 py-16 text-center">
            <h3 className="font-display text-xl font-bold text-foam-50">
              No expeditions match that filter
            </h3>
            <p className="mt-2 text-sm text-foam-100/60">
              Try &ldquo;All levels&rdquo; or a different category.
            </p>
          </div>
        )}
      </div>

      <EventDialog
        event={detail}
        onClose={() => setDetail(null)}
        registered={registered}
        onRegistered={(id) =>
          setRegistered((prev) => {
            const next = new Set(prev);
            next.add(id);
            return next;
          })
        }
      />
    </section>
  );
}
