"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowDownWideNarrow, RotateCcw, Search, Waves } from "lucide-react";
import {
  GEAR_CATEGORIES,
  GEAR_PRODUCTS,
  type GearCategory,
} from "@/data/gear";
import { GearProductCard } from "@/components/bac/gear-product-card";
import { PackageSelector } from "@/components/bac/package-selector";
import { Reveal } from "@/components/ocean/reveal";
import { Bubbles } from "@/components/ocean/bubbles";

type LevelFilter = "All" | "Beginner" | "Advanced";
type ModeFilter = "All" | "Buy" | "Rent";
type CategoryFilter = "All" | GearCategory;
type SortKey = "popular" | "price-asc" | "price-desc";

function Chip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      aria-pressed={active}
      className={`relative rounded-full px-4 py-2 text-xs font-bold tracking-wide transition-all duration-300 ${
        active
          ? "bg-abyss-900 text-foam-50 shadow-[0_8px_20px_-8px_rgba(4,21,34,0.5)]"
          : "border border-abyss-950/12 bg-white/70 text-abyss-900/70 hover:border-ocean-500/40 hover:text-ocean-600"
      }`}
    >
      {children}
    </button>
  );
}

export function GearCatalog() {
  const [level, setLevel] = useState<LevelFilter>("All");
  const [mode, setMode] = useState<ModeFilter>("All");
  const [category, setCategory] = useState<CategoryFilter>("All");
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState<SortKey>("popular");

  const reset = () => {
    setLevel("All");
    setMode("All");
    setCategory("All");
    setSearch("");
    setSort("popular");
  };

  const hasActiveFilters =
    level !== "All" || mode !== "All" || category !== "All" || search !== "";

  const filtered = useMemo(() => {
    let list = [...GEAR_PRODUCTS];

    if (level !== "All") list = list.filter((p) => p.level === level);
    if (mode === "Buy") list = list.filter((p) => p.buyPrice > 0);
    if (mode === "Rent")
      list = list.filter((p) => p.rentPricePerDay !== null);
    if (category !== "All") list = list.filter((p) => p.category === category);
    if (search.trim()) {
      const q = search.trim().toLowerCase();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q)
      );
    }

    const sortPrice = (p: (typeof GEAR_PRODUCTS)[number]) =>
      mode === "Rent" ? (p.rentPricePerDay ?? p.buyPrice) : p.buyPrice;

    switch (sort) {
      case "price-asc":
        list.sort((a, b) => sortPrice(a) - sortPrice(b));
        break;
      case "price-desc":
        list.sort((a, b) => sortPrice(b) - sortPrice(a));
        break;
      default:
        list.sort((a, b) => b.popularity - a.popularity);
    }
    return list;
  }, [level, mode, category, search, sort]);

  return (
    <section
      id="gear"
      className="relative overflow-hidden bg-foam-50 py-24 text-abyss-900 sm:py-32"
      aria-label="Gear catalog"
    >
      {/* ambient light ocean blobs */}
      <div className="pointer-events-none absolute -right-48 top-24 h-[480px] w-[480px] rounded-full bg-lagoon-200/50 blur-[120px]" />
      <div className="pointer-events-none absolute -left-40 bottom-40 h-[420px] w-[420px] rounded-full bg-foam-200/80 blur-[110px]" />

      <div className="relative z-10 mx-auto max-w-7xl px-5 lg:px-8">
        <Reveal className="max-w-3xl">
          <p className="mb-4 flex items-center gap-3 text-[11px] font-bold tracking-[0.42em] text-ocean-600">
            <span className="h-px w-10 bg-ocean-600/60" />
            GEAR CATALOG
          </p>
          <h2 className="font-display text-4xl font-bold leading-[1.04] tracking-tight sm:text-5xl lg:text-6xl">
            Find your <span className="text-gradient-lagoon">dive gear.</span>
          </h2>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-abyss-900/65">
            Buy it once or rent it per day — every piece is professionally
            maintained, fitted by our crew and ready for your next trip. Filter,
            compare and build your kit below.
          </p>
        </Reveal>

        {/* ── A. Packages ── */}
        <div className="mt-16">
          <Reveal className="mb-8 flex items-center gap-4">
            <h3 className="font-display text-2xl font-bold tracking-tight">
              Starter Packages
            </h3>
            <span className="h-px flex-1 bg-abyss-950/10" />
            <span className="text-xs font-semibold text-abyss-900/50">
              Buy or rent — your call
            </span>
          </Reveal>
          <PackageSelector />
        </div>

        {/* ── B+C. Catalog with filters ── */}
        <div className="mt-24">
          <Reveal className="mb-8 flex items-center gap-4">
            <h3 className="font-display text-2xl font-bold tracking-tight">
              Individual Gear
            </h3>
            <span className="h-px flex-1 bg-abyss-950/10" />
            <span
              className="text-xs font-semibold text-abyss-900/50"
              aria-live="polite"
            >
              Showing {filtered.length} of {GEAR_PRODUCTS.length} products
            </span>
          </Reveal>

          {/* Filter bar */}
          <Reveal
            delay={0.1}
            className="sticky top-[84px] z-30 mb-10 rounded-3xl border border-abyss-950/8 bg-white/80 p-4 shadow-[0_16px_40px_-18px_rgba(4,21,34,0.25)] backdrop-blur-xl sm:p-5"
          >
            <div className="flex flex-col gap-4">
              {/* search + sort */}
              <div className="flex flex-col gap-3 sm:flex-row">
                <label className="relative flex-1">
                  <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-abyss-900/40" />
                  <input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search gear — mask, regulator, torch…"
                    className="w-full rounded-full border border-abyss-950/12 bg-white py-2.5 pl-11 pr-4 text-sm text-abyss-900 placeholder:text-abyss-900/35 focus:border-ocean-500/60 focus:outline-none"
                    aria-label="Search products"
                  />
                </label>
                <div className="flex gap-2">
                  <label className="relative flex-1 sm:w-52">
                    <ArrowDownWideNarrow className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-abyss-900/40" />
                    <select
                      value={sort}
                      onChange={(e) => setSort(e.target.value as SortKey)}
                      className="w-full appearance-none rounded-full border border-abyss-950/12 bg-white py-2.5 pl-10 pr-4 text-sm font-semibold text-abyss-900 focus:border-ocean-500/60 focus:outline-none"
                      aria-label="Sort products"
                    >
                      <option value="popular">Most popular</option>
                      <option value="price-asc">Price: lowest first</option>
                      <option value="price-desc">Price: highest first</option>
                    </select>
                  </label>
                  {hasActiveFilters && (
                    <button
                      onClick={reset}
                      className="flex items-center gap-1.5 rounded-full border border-reef-500/30 bg-reef-500/8 px-4 py-2.5 text-xs font-bold text-reef-600 transition-colors hover:bg-reef-500/15"
                    >
                      <RotateCcw className="h-3.5 w-3.5" />
                      Reset
                    </button>
                  )}
                </div>
              </div>

              {/* chips */}
              <div className="flex flex-wrap items-center gap-2" role="group" aria-label="Filter by level and transaction">
                <Chip active={level === "All"} onClick={() => setLevel("All")}>
                  All products
                </Chip>
                <Chip
                  active={level === "Beginner"}
                  onClick={() => setLevel("Beginner")}
                >
                  Beginner
                </Chip>
                <Chip
                  active={level === "Advanced"}
                  onClick={() => setLevel("Advanced")}
                >
                  Advanced
                </Chip>
                <span className="mx-1 hidden h-5 w-px bg-abyss-950/10 sm:block" />
                <Chip active={mode === "Buy"} onClick={() => setMode("Buy")}>
                  Buy
                </Chip>
                <Chip active={mode === "Rent"} onClick={() => setMode("Rent")}>
                  Rent
                </Chip>
              </div>
              <div
                className="flex flex-wrap items-center gap-2"
                role="group"
                aria-label="Filter by category"
              >
                <Chip
                  active={category === "All"}
                  onClick={() => setCategory("All")}
                >
                  All categories
                </Chip>
                {GEAR_CATEGORIES.map((c) => (
                  <Chip
                    key={c}
                    active={category === c}
                    onClick={() => setCategory(c)}
                  >
                    {c}
                  </Chip>
                ))}
              </div>
            </div>
          </Reveal>

          {/* Grid */}
          {filtered.length > 0 ? (
            <motion.ul
              layout
              className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
            >
              <AnimatePresence mode="popLayout">
                {filtered.map((p) => (
                  <li key={p.id} className="list-none">
                    <GearProductCard product={p} />
                  </li>
                ))}
              </AnimatePresence>
            </motion.ul>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col items-center gap-4 rounded-3xl border border-dashed border-abyss-950/15 bg-white/60 px-8 py-16 text-center"
            >
              <span className="grid h-16 w-16 place-items-center rounded-full bg-foam-100 text-ocean-500">
                <Waves className="h-8 w-8" strokeWidth={1.5} />
              </span>
              <h4 className="font-display text-xl font-bold">
                Nothing surfaced for that combination
              </h4>
              <p className="max-w-sm text-sm leading-relaxed text-abyss-900/60">
                Try widening your filters — for example a different category or
                &ldquo;All products&rdquo; — or search for something else like
                &ldquo;mask&rdquo; or &ldquo;fins&rdquo;.
              </p>
              <button
                onClick={reset}
                className="mt-1 rounded-full bg-abyss-900 px-6 py-3 text-sm font-bold text-foam-50 transition-colors hover:bg-ocean-600"
              >
                Clear all filters
              </button>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}
