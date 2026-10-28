"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { Check, Package, ShoppingCart, X } from "lucide-react";
import { GEAR_PACKAGES, type GearPackage } from "@/data/gear";
import { formatIDR } from "@/lib/format";
import { useCartStore } from "@/lib/cart-store";
import { toast } from "sonner";
import { useEscapeKey } from "@/lib/use-escape-key";
import { fadeUp, staggerParent } from "@/lib/motion";
import { RevealGroup, RevealItem } from "@/components/ocean/reveal";

function PackageDialog({
  pkg,
  mode,
  onClose,
}: {
  pkg: GearPackage | null;
  mode: "buy" | "rent";
  onClose: () => void;
}) {
  const addItem = useCartStore((s) => s.addItem);
  const setOpen = useCartStore((s) => s.setOpen);
  const [picked, setPicked] = useState<"buy" | "rent">(mode);
  useEscapeKey(onClose, !!pkg);

  return (
    <AnimatePresence>
      {pkg && (
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
            initial={{ opacity: 0, scale: 0.96, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97, y: 20 }}
            className="fixed inset-x-4 top-1/2 z-[90] mx-auto max-w-xl -translate-y-1/2 overflow-hidden rounded-3xl border border-foam-50/12 bg-abyss-900"
            role="dialog"
            aria-modal="true"
            aria-label={`Package details: ${pkg.name}`}
          >
            <div className="relative h-52">
              <Image
                src={pkg.image}
                alt={pkg.imageAlt}
                fill
                sizes="(max-width: 640px) 100vw, 576px"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-abyss-900 via-abyss-900/25 to-transparent" />
              <button
                onClick={onClose}
                className="absolute right-4 top-4 grid h-9 w-9 place-items-center rounded-full bg-abyss-950/60 text-foam-50 backdrop-blur transition-colors hover:bg-abyss-950/95"
                aria-label="Close package details"
              >
                <X className="h-4.5 w-4.5" />
              </button>
              <div className="absolute bottom-4 left-6">
                <p className="text-[10px] font-bold tracking-[0.28em] text-lagoon-300">
                  {pkg.level.toUpperCase()} PACKAGE
                </p>
                <h3 className="mt-1 font-display text-2xl font-bold text-foam-50">
                  {pkg.name}
                </h3>
              </div>
            </div>
            <div className="px-6 py-6">
              <p className="text-sm leading-relaxed text-foam-100/75">
                {pkg.description}
              </p>
              <h4 className="mt-5 text-[11px] font-bold tracking-[0.24em] text-lagoon-300">
                WHAT&rsquo;S INCLUDED
              </h4>
              <ul className="mt-3 grid gap-2 sm:grid-cols-2">
                {pkg.items.map((item) => (
                  <li
                    key={item}
                    className="flex items-center gap-2 rounded-xl bg-abyss-850/80 px-3 py-2.5 text-[13px] font-semibold text-foam-100/85"
                  >
                    <Check className="h-3.5 w-3.5 shrink-0 text-lagoon-300" />
                    {item}
                  </li>
                ))}
              </ul>

              <div className="mt-5 grid grid-cols-2 gap-1.5 rounded-2xl border border-foam-50/10 bg-abyss-850 p-1.5">
                <button
                  onClick={() => setPicked("buy")}
                  aria-pressed={picked === "buy"}
                  className={`rounded-xl px-3 py-3 text-left transition-all ${
                    picked === "buy"
                      ? "bg-abyss-950 ring-1 ring-lagoon-300/40"
                      : "hover:bg-abyss-950/60"
                  }`}
                >
                  <span className="block text-[10px] font-bold tracking-wider text-foam-100/50">
                    BUY — OWN IT
                  </span>
                  <span className="block font-display text-lg font-bold text-lagoon-300">
                    {formatIDR(pkg.buyPrice)}
                  </span>
                </button>
                <button
                  onClick={() => setPicked("rent")}
                  aria-pressed={picked === "rent"}
                  className={`rounded-xl px-3 py-3 text-left transition-all ${
                    picked === "rent"
                      ? "bg-abyss-950 ring-1 ring-lagoon-300/40"
                      : "hover:bg-abyss-950/60"
                  }`}
                >
                  <span className="block text-[10px] font-bold tracking-wider text-foam-100/50">
                    RENT — PER DAY
                  </span>
                  <span className="block font-display text-lg font-bold text-reef-300">
                    {formatIDR(pkg.rentPricePerDay)}
                    <span className="text-xs font-semibold text-foam-100/50">
                      {" "}
                      /day
                    </span>
                  </span>
                </button>
              </div>
              <p className="mt-2 text-center text-[11px] text-foam-100/50">
                {pkg.rentDurationNote} · {pkg.rentStock} kits available for rent
                (example data)
              </p>

              <button
                onClick={() => {
                  addItem({
                    productId: pkg.id,
                    name: pkg.name,
                    image: pkg.image,
                    category: "Package",
                    mode: picked,
                    unitPrice:
                      picked === "rent" ? pkg.rentPricePerDay : pkg.buyPrice,
                    quantity: 1,
                  });
                  onClose();
                  toast.success(`${pkg.name} added to cart`, {
                    description:
                      picked === "rent"
                        ? "Rental mode — pick your dates in the cart."
                        : "Purchase mode — the full kit is yours.",
                    action: { label: "View cart", onClick: () => setOpen(true) },
                  });
                }}
                className="mt-5 flex w-full items-center justify-center gap-2 rounded-full bg-lagoon-400 py-3.5 text-sm font-bold text-abyss-950 transition-all hover:bg-lagoon-300"
              >
                <ShoppingCart className="h-4 w-4" />
                Add {picked === "rent" ? "Rental" : "Purchase"} to Cart
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

function PackageCard({
  pkg,
  onView,
}: {
  pkg: GearPackage;
  onView: (p: GearPackage) => void;
}) {
  const addItem = useCartStore((s) => s.addItem);
  const setOpen = useCartStore((s) => s.setOpen);

  const quickAdd = () => {
    addItem({
      productId: pkg.id,
      name: pkg.name,
      image: pkg.image,
      category: "Package",
      mode: "rent",
      unitPrice: pkg.rentPricePerDay,
      quantity: 1,
    });
    toast.success(`${pkg.name} added as rental`, {
      description: "Pick your rental dates in the cart — or switch to buy.",
      action: { label: "View cart", onClick: () => setOpen(true) },
    });
  };

  return (
    <RevealItem
      className={`group relative overflow-hidden rounded-3xl border bg-abyss-850/80 transition-all duration-500 hover:-translate-y-1.5 ${
        pkg.featured
          ? "border-lagoon-300/35 shadow-[0_24px_60px_-24px_rgba(20,194,174,0.35)]"
          : "border-foam-50/10 hover:border-lagoon-300/25"
      }`}
    >
      {pkg.featured && (
        <span className="absolute right-4 top-4 z-20 rounded-full bg-lagoon-400 px-3 py-1 text-[10px] font-bold tracking-wider text-abyss-950">
          MOST CHOSEN
        </span>
      )}
      <div className="relative aspect-[16/9] overflow-hidden">
        <Image
          src={pkg.image}
          alt={pkg.imageAlt}
          fill
          sizes="(max-width: 1024px) 100vw, 33vw"
          className="object-cover transition-transform duration-[1.2s] ease-[cubic-bezier(0.21,0.65,0.26,0.99)] group-hover:scale-107"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-abyss-850 via-abyss-850/20 to-transparent" />
      </div>
      <div className="p-6">
        <p className="text-[11px] font-bold tracking-[0.22em] text-lagoon-300">
          {pkg.level.toUpperCase()} · {pkg.rentDurationNote.toUpperCase()}
        </p>
        <h3 className="mt-1.5 font-display text-xl font-bold text-foam-50">
          {pkg.name}
        </h3>
        <p className="mt-1 text-[13px] text-foam-100/60">{pkg.tagline}</p>

        <ul className="mt-4 space-y-1.5">
          {pkg.items.map((item) => (
            <li
              key={item}
              className="flex items-center gap-2 text-[12.5px] text-foam-100/75"
            >
              <Check className="h-3.5 w-3.5 shrink-0 text-lagoon-300" />
              {item}
            </li>
          ))}
        </ul>

        <div className="mt-5 flex items-end justify-between border-t border-foam-50/8 pt-4">
          <div>
            <span className="block text-[10px] font-bold tracking-wider text-foam-100/45">
              BUY {formatIDR(pkg.buyPrice)}
            </span>
            <span className="block text-[10px] font-bold tracking-wider text-foam-100/45">
              RENT{" "}
              <span className="text-reef-300">
                {formatIDR(pkg.rentPricePerDay)}/day
              </span>
            </span>
            <span className="mt-1 block text-[10px] text-foam-100/40">
              {pkg.rentStock} kits ready (example)
            </span>
          </div>
          <span className="flex items-center gap-1.5 rounded-full bg-foam-50/6 px-2.5 py-1 text-[10px] font-bold text-foam-100/70 ring-1 ring-foam-50/10">
            <Package className="h-3 w-3" />
            {pkg.items.length} ITEMS
          </span>
        </div>

        <div className="mt-4 flex gap-2">
          <button
            onClick={quickAdd}
            className="flex-1 rounded-full bg-lagoon-400 py-2.5 text-xs font-bold text-abyss-950 transition-all hover:bg-lagoon-300"
          >
            Add to Cart
          </button>
          <button
            onClick={() => onView(pkg)}
            className="flex-1 rounded-full border border-foam-50/20 py-2.5 text-xs font-bold text-foam-50 transition-all hover:border-lagoon-300/50 hover:text-lagoon-300"
          >
            View Package
          </button>
        </div>
      </div>
    </RevealItem>
  );
}

export function PackageSelector() {
  const [viewPkg, setViewPkg] = useState<GearPackage | null>(null);
  const [viewMode, setViewMode] = useState<"buy" | "rent">("rent");

  return (
    <div className="relative z-10 mx-auto max-w-7xl px-5 lg:px-8">
      <RevealGroup
        className="grid gap-6 lg:grid-cols-3"
        variants={staggerParent(0.12)}
      >
        {GEAR_PACKAGES.map((pkg) => (
          <PackageCard
            key={pkg.id}
            pkg={pkg}
            onView={(p) => {
              setViewMode("rent");
              setViewPkg(p);
            }}
          />
        ))}
      </RevealGroup>
      <PackageDialog pkg={viewPkg} mode={viewMode} onClose={() => setViewPkg(null)} />
    </div>
  );
}

export { fadeUp };
