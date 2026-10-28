"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ShoppingCart, Star, Eye } from "lucide-react";
import { formatIDR } from "@/lib/format";
import { useCartStore } from "@/lib/cart-store";
import { toast } from "sonner";
import type { GearProduct } from "@/data/gear";
import { fadeUp } from "@/lib/motion";

export function GearProductCard({ product }: { product: GearProduct }) {
  const addItem = useCartStore((s) => s.addItem);
  const setOpen = useCartStore((s) => s.setOpen);
  const canRent = product.rentPricePerDay !== null;
  const [mode, setMode] = useState<"buy" | "rent">(canRent ? "buy" : "buy");

  const add = () => {
    addItem({
      productId: product.id,
      name: product.name,
      image: product.image,
      category: product.category,
      mode,
      unitPrice: mode === "rent" ? (product.rentPricePerDay ?? 0) : product.buyPrice,
      quantity: 1,
    });
    toast.success(`${product.name} added to cart`, {
      description:
        mode === "rent"
          ? "Rental mode — pick your dates in the cart."
          : "Purchase mode — you keep it forever.",
      action: { label: "View cart", onClick: () => setOpen(true) },
    });
  };

  return (
    <motion.article
      layout
      variants={fadeUp}
      className="group flex flex-col overflow-hidden rounded-3xl border border-abyss-950/8 bg-white shadow-[0_2px_20px_-8px_rgba(4,21,34,0.12)] transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_30px_50px_-18px_rgba(4,21,34,0.28)]"
    >
      <div className="relative aspect-square overflow-hidden bg-foam-100">
        <Image
          src={product.image}
          alt={product.imageAlt}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1280px) 33vw, 25vw"
          className="object-cover transition-transform duration-[1.1s] ease-[cubic-bezier(0.21,0.65,0.26,0.99)] group-hover:scale-108"
        />
        {/* level + rating badges */}
        <div className="absolute left-3.5 top-3.5 flex flex-col items-start gap-1.5">
          <span
            className={`rounded-full px-2.5 py-1 text-[10px] font-bold tracking-wider backdrop-blur ${
              product.level === "Beginner"
                ? "bg-lagoon-400/90 text-abyss-950"
                : "bg-abyss-900/85 text-reef-300 ring-1 ring-reef-400/40"
            }`}
          >
            {product.level.toUpperCase()}
          </span>
        </div>
        <span className="absolute right-3.5 top-3.5 flex items-center gap-1 rounded-full bg-white/90 px-2 py-1 text-[11px] font-bold text-abyss-900 shadow-sm backdrop-blur">
          <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
          {product.rating.toFixed(1)}
        </span>

        {/* hover quick view hint */}
        <div className="absolute inset-x-3.5 bottom-3.5 flex translate-y-2 items-center justify-between opacity-0 transition-all duration-400 group-hover:translate-y-0 group-hover:opacity-100">
          <span className="rounded-full bg-abyss-950/70 px-3 py-1.5 text-[10px] font-bold tracking-wider text-foam-100 backdrop-blur">
            {product.rentStock > 0
              ? `${product.rentStock} units for rent`
              : `${product.buyStock} in stock`}
          </span>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <p className="text-[10px] font-bold tracking-[0.18em] text-ocean-500">
              {product.category.toUpperCase()}
            </p>
            <h3 className="mt-1 truncate font-display text-base font-bold text-abyss-900">
              {product.name}
            </h3>
          </div>
          <span className="shrink-0 text-[11px] font-semibold text-abyss-900/45">
            {product.reviews} reviews
          </span>
        </div>

        <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-abyss-900/60">
          {product.description}
        </p>

        {/* Buy / Rent mode toggle + prices */}
        {canRent ? (
          <div className="mt-3.5 grid grid-cols-2 gap-1.5 rounded-xl bg-foam-100 p-1">
            <button
              onClick={() => setMode("buy")}
              aria-pressed={mode === "buy"}
              className={`relative rounded-lg px-2 py-2 text-left transition-all duration-300 ${
                mode === "buy"
                  ? "bg-white shadow-md ring-1 ring-abyss-950/8"
                  : "hover:bg-white/60"
              }`}
            >
              <span className="block text-[9px] font-bold tracking-wider text-abyss-900/50">
                BUY
              </span>
              <span
                className={`block truncate text-[13px] font-bold ${
                  mode === "buy" ? "text-ocean-600" : "text-abyss-900/55"
                }`}
              >
                {formatIDR(product.buyPrice)}
              </span>
            </button>
            <button
              onClick={() => setMode("rent")}
              aria-pressed={mode === "rent"}
              className={`relative rounded-lg px-2 py-2 text-left transition-all duration-300 ${
                mode === "rent"
                  ? "bg-white shadow-md ring-1 ring-abyss-950/8"
                  : "hover:bg-white/60"
              }`}
            >
              <span className="block text-[9px] font-bold tracking-wider text-abyss-900/50">
                RENT / DAY
              </span>
              <span
                className={`block truncate text-[13px] font-bold ${
                  mode === "rent" ? "text-reef-600" : "text-abyss-900/55"
                }`}
              >
                {formatIDR(product.rentPricePerDay ?? 0)}
              </span>
            </button>
          </div>
        ) : (
          <div className="mt-3.5 rounded-xl bg-foam-100 px-3 py-2.5">
            <span className="block text-[9px] font-bold tracking-wider text-abyss-900/50">
              BUY ONLY · SALE
            </span>
            <span className="block text-[13px] font-bold text-ocean-600">
              {formatIDR(product.buyPrice)}
            </span>
          </div>
        )}

        <div className="mt-4 flex items-center gap-2">
          <button
            onClick={add}
            className="flex flex-1 items-center justify-center gap-2 rounded-full bg-abyss-900 py-2.5 text-xs font-bold text-foam-50 transition-all duration-300 hover:bg-ocean-600 hover:shadow-[0_10px_24px_-8px_rgba(13,74,112,0.6)]"
          >
            <ShoppingCart className="h-3.5 w-3.5" />
            Add to Cart
          </button>
          <button
            onClick={() =>
              toast.info(product.name, {
                description: product.description,
              })
            }
            className="grid h-9.5 w-9.5 shrink-0 place-items-center rounded-full border border-abyss-950/12 text-abyss-900/70 transition-colors hover:border-ocean-500/50 hover:text-ocean-600"
            aria-label={`Details for ${product.name}`}
          >
            <Eye className="h-4 w-4" />
          </button>
        </div>
      </div>
    </motion.article>
  );
}
