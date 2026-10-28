"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  BadgeCheck,
  CalendarCheck,
  Clock,
  Info,
  MapPin,
  Sparkles,
  X,
} from "lucide-react";
import { COURSES, type Course, type CourseLevel } from "@/data/courses";
import { formatIDR } from "@/lib/format";
import { fadeUp, staggerParent, viewportOnce, EASE_OUT } from "@/lib/motion";
import { toast } from "sonner";
import { useEscapeKey } from "@/lib/use-escape-key";
import { Bubbles } from "@/components/ocean/bubbles";
import { Reveal } from "@/components/ocean/reveal";

type Tab = CourseLevel;

function LevelPill({ level }: { level: CourseLevel }) {
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[10px] font-bold tracking-wider ${
        level === "Beginner"
          ? "bg-lagoon-400/15 text-lagoon-300 ring-1 ring-lagoon-300/30"
          : "bg-reef-500/15 text-reef-300 ring-1 ring-reef-500/30"
      }`}
    >
      <Sparkles className="h-3 w-3" />
      {level.toUpperCase()}
    </span>
  );
}

function CourseDialog({
  course,
  onClose,
}: {
  course: Course | null;
  onClose: () => void;
}) {
  const [form, setForm] = useState({ name: "", email: "", date: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");
  useEscapeKey(onClose, !!course);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !/.+@.+\..+/.test(form.email) || !form.date) {
      toast.error("Please complete all fields", {
        description: "Name, a valid email and a preferred date are required.",
      });
      return;
    }
    setStatus("sending");
    // Simulated booking — no backend connected (honest demo).
    setTimeout(() => setStatus("sent"), 1200);
  };

  return (
    <AnimatePresence>
      {course && (
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
            initial={{ opacity: 0, y: 48, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 32, scale: 0.98 }}
            transition={{ duration: 0.4, ease: EASE_OUT }}
            className="fixed inset-x-0 bottom-0 top-[4vh] z-[90] mx-auto max-w-2xl overflow-hidden rounded-t-3xl border border-foam-50/12 bg-abyss-900 sm:bottom-auto sm:top-1/2 sm:-translate-y-1/2 sm:rounded-3xl"
            role="dialog"
            aria-modal="true"
            aria-label={`Course details: ${course.name}`}
          >
            <button
              onClick={onClose}
              className="absolute right-4 top-4 z-20 grid h-10 w-10 place-items-center rounded-full bg-abyss-950/60 text-foam-50 backdrop-blur transition-colors hover:bg-abyss-950/90"
              aria-label="Close course details"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="max-h-[92vh] overflow-y-auto">
              <div className="relative h-56 sm:h-64">
                <Image
                  src={course.image}
                  alt={course.imageAlt}
                  fill
                  sizes="(max-width: 640px) 100vw, 672px"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-abyss-900 via-abyss-900/30 to-transparent" />
                <div className="absolute bottom-4 left-6 right-6">
                  <LevelPill level={course.level} />
                  <h3 className="mt-2 font-display text-3xl font-bold text-foam-50">
                    {course.name}
                  </h3>
                </div>
              </div>

              <div className="px-6 py-6 sm:px-8">
                <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-foam-100/75">
                  <span className="flex items-center gap-1.5">
                    <Clock className="h-4 w-4 text-lagoon-300" /> {course.duration}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <MapPin className="h-4 w-4 text-lagoon-300" /> {course.location}
                  </span>
                </div>

                <p className="mt-4 leading-relaxed text-foam-100/80">
                  {course.description}
                </p>

                <div className="mt-6 grid gap-5 sm:grid-cols-2">
                  <div>
                    <h4 className="text-xs font-bold tracking-[0.2em] text-lagoon-300">
                      REQUIREMENTS
                    </h4>
                    <ul className="mt-2.5 space-y-1.5">
                      {course.requirements.map((r) => (
                        <li
                          key={r}
                          className="flex items-start gap-2 text-[13px] text-foam-100/75"
                        >
                          <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-reef-400" />
                          {r}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-xs font-bold tracking-[0.2em] text-lagoon-300">
                      SKILLS YOU&rsquo;LL LEARN
                    </h4>
                    <ul className="mt-2.5 flex flex-wrap gap-1.5">
                      {course.skills.map((s) => (
                        <li
                          key={s}
                          className="rounded-full border border-foam-50/12 px-2.5 py-1 text-[11px] font-semibold text-foam-100/80"
                        >
                          {s}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <p className="mt-5 flex items-start gap-2 rounded-xl border border-ocean-400/25 bg-ocean-500/10 px-3.5 py-3 text-[12px] leading-relaxed text-ocean-300">
                  <Info className="mt-0.5 h-4 w-4 shrink-0" />
                  {course.certification}
                </p>

                {status === "sent" ? (
                  <div className="mt-6 rounded-2xl border border-lagoon-300/30 bg-lagoon-400/10 p-5 text-center">
                    <BadgeCheck className="mx-auto h-9 w-9 text-lagoon-300" />
                    <h4 className="mt-2 font-display text-xl font-bold text-foam-50">
                      Request received!
                    </h4>
                    <p className="mx-auto mt-1.5 max-w-sm text-[13px] leading-relaxed text-foam-100/70">
                      This is a demo booking — nothing was sent yet. Our team
                      would normally reach out within 24 hours to confirm your
                      {form.date ? ` ${form.date}` : ""} slot.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={submit} className="mt-6">
                    <div className="mb-3 flex items-center justify-between">
                      <span className="text-[11px] font-bold tracking-[0.2em] text-foam-100/60">
                        BOOK THIS COURSE
                      </span>
                      <span className="font-display text-lg font-bold text-lagoon-300">
                        {formatIDR(course.price)}
                      </span>
                    </div>
                    <div className="grid gap-2.5 sm:grid-cols-3">
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
                      <input
                        value={form.date}
                        onChange={(e) =>
                          setForm((f) => ({ ...f, date: e.target.value }))
                        }
                        type="date"
                        className="rounded-xl border border-foam-50/15 bg-abyss-850 px-3.5 py-3 text-sm text-foam-50 [color-scheme:dark] focus:border-lagoon-300/60 focus:outline-none"
                        aria-label="Preferred start date"
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={status === "sending"}
                      className="mt-3.5 flex w-full items-center justify-center gap-2 rounded-full bg-lagoon-400 py-3.5 text-sm font-bold text-abyss-950 transition-all hover:bg-lagoon-300 disabled:opacity-70"
                    >
                      {status === "sending" ? (
                        <>
                          <span className="h-4 w-4 animate-spin rounded-full border-2 border-abyss-950/30 border-t-abyss-950" />
                          Sending request…
                        </>
                      ) : (
                        <>
                          <CalendarCheck className="h-4 w-4" />
                          Request booking — demo
                        </>
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

function CourseCard({
  course,
  onView,
}: {
  course: Course;
  onView: (c: Course) => void;
}) {
  return (
    <motion.article
      variants={fadeUp}
      className="group relative flex flex-col overflow-hidden rounded-3xl border border-foam-50/10 bg-abyss-850/70 transition-all duration-500 hover:-translate-y-1.5 hover:border-lagoon-300/30 hover:shadow-[0_30px_60px_-20px_rgba(2,10,18,0.9)]"
    >
      <div className="relative aspect-[16/10] overflow-hidden">
        <Image
          src={course.image}
          alt={course.imageAlt}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
          className="object-cover transition-transform duration-[1.2s] ease-[cubic-bezier(0.21,0.65,0.26,0.99)] group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-abyss-850 via-transparent to-abyss-950/25" />
        <div className="absolute left-4 top-4">
          <LevelPill level={course.level} />
        </div>
        {course.featured && (
          <span className="absolute right-4 top-4 rounded-full bg-reef-500 px-2.5 py-1 text-[10px] font-bold tracking-wider text-white shadow-lg shadow-reef-500/40">
            POPULAR
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col p-6">
        <h3 className="font-display text-xl font-bold text-foam-50">
          {course.name}
        </h3>
        <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs text-foam-100/60">
          <span className="flex items-center gap-1.5">
            <Clock className="h-3.5 w-3.5 text-lagoon-300/90" />
            {course.duration}
          </span>
          <span className="flex items-center gap-1.5">
            <MapPin className="h-3.5 w-3.5 text-lagoon-300/90" />
            {course.location}
          </span>
        </div>

        <p className="mt-3 line-clamp-2 text-[13px] leading-relaxed text-foam-100/70">
          {course.description}
        </p>

        <ul className="mt-3.5 flex flex-wrap gap-1.5">
          {course.skills.slice(0, 3).map((s) => (
            <li
              key={s}
              className="rounded-full bg-foam-50/6 px-2.5 py-1 text-[10px] font-semibold text-foam-100/70 ring-1 ring-foam-50/8"
            >
              {s}
            </li>
          ))}
        </ul>

        <div className="mt-auto flex items-end justify-between pt-5">
          <div>
            <p className="text-[10px] font-bold tracking-wider text-foam-100/50">
              FROM
            </p>
            <p className="font-display text-2xl font-bold text-lagoon-300">
              {formatIDR(course.price)}
            </p>
          </div>
          <button
            onClick={() => onView(course)}
            className="group/btn inline-flex items-center gap-1.5 rounded-full border border-lagoon-300/40 px-4.5 py-2.5 text-xs font-bold text-lagoon-300 transition-all duration-300 hover:bg-lagoon-400 hover:text-abyss-950"
          >
            View Course
            <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
          </button>
        </div>
      </div>
    </motion.article>
  );
}

export function LearningSection() {
  const [tab, setTab] = useState<Tab>("Beginner");
  const [selected, setSelected] = useState<Course | null>(null);

  const courses = COURSES.filter((c) => c.level === tab);

  return (
    <section
      id="learn"
      className="grain relative overflow-hidden bg-abyss-900 py-24 sm:py-32"
      aria-label="Diving courses"
    >
      {/* ambient depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-abyss-950 via-abyss-900 to-abyss-850" />
      <div className="pointer-events-none absolute -left-40 top-1/3 h-[540px] w-[540px] rounded-full bg-ocean-500/10 blur-[130px]" />
      <Bubbles count={10} seed={21} className="opacity-60" />

      <div className="relative z-10 mx-auto max-w-7xl px-5 lg:px-8">
        {/* Header */}
        <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
          <Reveal className="max-w-2xl">
            <p className="mb-4 flex items-center gap-3 text-[11px] font-bold tracking-[0.42em] text-lagoon-300">
              <span className="h-px w-10 bg-lagoon-300/70" />
              LEARN
            </p>
            <h2 className="font-display text-4xl font-bold leading-[1.04] tracking-tight text-foam-50 sm:text-5xl lg:text-6xl">
              Your first breath,
              <br />
              <span className="text-gradient-lagoon">underwater.</span>
            </h2>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-foam-100/70">
              Whether it&rsquo;s your very first dive or your fiftieth
              expedition, there&rsquo;s a program built for your level — taught
              by instructors who put safety and joy in equal measure.
            </p>
          </Reveal>

          {/* Segmented control */}
          <Reveal delay={0.15}>
            <div
              className="relative grid grid-cols-2 rounded-full border border-foam-50/12 bg-abyss-850/80 p-1.5 backdrop-blur"
              role="tablist"
              aria-label="Course level"
            >
              {(["Beginner", "Advanced"] as Tab[]).map((t) => (
                <button
                  key={t}
                  role="tab"
                  aria-selected={tab === t}
                  onClick={() => setTab(t)}
                  className={`relative z-10 rounded-full px-7 py-3 font-display text-sm font-bold tracking-wide transition-colors duration-300 ${
                    tab === t ? "text-abyss-950" : "text-foam-100/60 hover:text-foam-50"
                  }`}
                >
                  {tab === t && (
                    <motion.span
                      layoutId="learn-tab"
                      className="absolute inset-0 -z-10 rounded-full bg-lagoon-400"
                      transition={{ type: "spring", stiffness: 380, damping: 34 }}
                    />
                  )}
                  {t}
                </button>
              ))}
            </div>
          </Reveal>
        </div>

        {/* Cards */}
        <motion.div
          key={tab}
          variants={staggerParent(0.1)}
          initial="hidden"
          animate="visible"
          className="mt-14 grid gap-6 md:grid-cols-2 xl:grid-cols-3"
        >
          <AnimatePresence mode="popLayout">
            {courses.map((course) => (
              <CourseCard
                key={course.id}
                course={course}
                onView={setSelected}
              />
            ))}
          </AnimatePresence>
        </motion.div>

        <Reveal className="mt-12 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-foam-50/10 bg-abyss-850/50 px-6 py-5">
          <p className="flex items-start gap-3 text-sm text-foam-100/70">
            <Info className="mt-0.5 h-4.5 w-4.5 shrink-0 text-lagoon-300" />
            Certification wording describes training aligned with recognized
            standards — exact affiliation is configurable per location and
            always confirmed before you book.
          </p>
          <a
            href="#faq"
            className="group inline-flex shrink-0 items-center gap-2 text-sm font-bold text-lagoon-300 transition-colors hover:text-lagoon-200"
          >
            Certification questions?
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </a>
        </Reveal>
      </div>

      <CourseDialog course={selected} onClose={() => setSelected(null)} />
    </section>
  );
}
