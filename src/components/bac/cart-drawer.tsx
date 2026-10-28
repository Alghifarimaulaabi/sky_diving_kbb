"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import {
  CalendarDays,
  Minus,
  Plus,
  ShoppingBag,
  Trash2,
  X,
  CheckCircle2,
  TriangleAlert,
  Waves,
} from "lucide-react";
import {
  cartSubtotal,
  lineTotal,
  rentItemIncomplete,
  useCartStore,
  type CartItem,
} from "@/lib/cart-store";
import { formatIDR, rentDays, todayISO, formatDateLabel } from "@/lib/format";
import { toast } from "sonner";
import { useEscapeKey } from "@/lib/use-escape-key";

function RentDatePicker({ item }: { item: CartItem }) {
  const updateRentDates = useCartStore((s) => s.updateRentDates);
  const days = rentDays(item.startDate, item.endDate);
  const invalid =
    item.startDate &&
    item.endDate &&
    new Date(item.endDate) < new Date(item.startDate);

  return (
    <div className="mt-3 rounded-xl border border-ocean-400/25 bg-abyss-800/60 p-3">
      <div className="mb-2 flex items-center gap-1.5 text-[11px] font-bold tracking-wider text-ocean-300">
        <CalendarDays className="h-3.5 w-3.5" />
        RENTAL PERIOD
      </div>
      <div className="grid grid-cols-2 gap-2">
        <label className="block">
          <span className="mb-1 block text-[10px] font-semibold uppercase tracking-wider text-foam-100/60">
            Start
          </span>
          <input
            type="date"
            value={item.startDate ?? ""}
            min={todayISO()}
            onChange={(e) =>
              updateRentDates(item.id, e.target.value, item.endDate ?? "")
            }
            className="w-full rounded-lg border border-foam-50/15 bg-abyss-900/80 px-2.5 py-1.5 text-xs text-foam-50 [color-scheme:dark] focus:border-lagoon-400/60 focus:outline-none"
            aria-label={`Rental start date for ${item.name}`}
          />
        </label>
        <label className="block">
          <span className="mb-1 block text-[10px] font-semibold uppercase tracking-wider text-foam-100/60">
            Return
          </span>
          <input
            type="date"
            value={item.endDate ?? ""}
            min={item.startDate ?? todayISO()}
            onChange={(e) =>
              updateRentDates(item.id, item.startDate ?? "", e.target.value)
            }
            className="w-full rounded-lg border border-foam-50/15 bg-abyss-900/80 px-2.5 py-1.5 text-xs text-foam-50 [color-scheme:dark] focus:border-lagoon-400/60 focus:outline-none"
            aria-label={`Rental return date for ${item.name}`}
          />
        </label>
      </div>
      <div className="mt-2 flex items-center justify-between text-[11px]">
        {invalid ? (
          <span className="flex items-center gap-1 font-semibold text-reef-400">
            <TriangleAlert className="h-3.5 w-3.5" /> Return date is before start
          </span>
        ) : days ? (
          <span className="text-foam-100/70">
            {days} day{days > 1 ? "s" : ""} × {formatIDR(item.unitPrice)}/day
          </span>
        ) : (
          <span className="text-foam-100/50">Pick dates to confirm pricing</span>
        )}
        {days && !invalid && (
          <span className="font-bold text-lagoon-300">
            {formatIDR(days * item.unitPrice * item.quantity)}
          </span>
        )}
      </div>
    </div>
  );
}

function CartLine({ item }: { item: CartItem }) {
  const updateQuantity = useCartStore((s) => s.updateQuantity);
  const removeItem = useCartStore((s) => s.removeItem);

  return (
    <motion.li
      layout
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: 30, transition: { duration: 0.25 } }}
      className="relative overflow-hidden rounded-2xl border border-foam-50/10 bg-abyss-850/80 p-3"
    >
      <div className="flex gap-3">
        <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-abyss-800">
          <Image
            src={item.image}
            alt={item.name}
            fill
            sizes="80px"
            className="object-cover"
          />
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0">
              <p className="truncate text-sm font-bold text-foam-50">{item.name}</p>
              <p className="mt-0.5 text-[11px] text-foam-100/55">{item.category}</p>
            </div>
            <button
              onClick={() => {
                removeItem(item.id);
                toast(`${item.name} removed from cart`);
              }}
              className="grid h-7 w-7 shrink-0 place-items-center rounded-full text-foam-100/50 transition-colors hover:bg-reef-500/15 hover:text-reef-400"
              aria-label={`Remove ${item.name} from cart`}
            >
              <Trash2 className="h-3.5 w-3.5" />
            </button>
          </div>
          <div className="mt-1.5 flex items-center justify-between">
            <span
              className={`rounded-full px-2 py-0.5 text-[10px] font-bold tracking-wider ${
                item.mode === "rent"
                  ? "bg-ocean-400/20 text-ocean-300"
                  : "bg-lagoon-400/20 text-lagoon-300"
              }`}
            >
              {item.mode === "rent"
                ? `RENT · ${formatIDR(item.unitPrice)}/day`
                : "BUY"}
            </span>
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                className="grid h-7 w-7 place-items-center rounded-full border border-foam-50/15 text-foam-100/80 transition-colors hover:border-lagoon-300/50 hover:text-lagoon-300"
                aria-label={`Decrease quantity of ${item.name}`}
              >
                <Minus className="h-3 w-3" />
              </button>
              <span className="w-5 text-center text-sm font-bold tabular-nums">
                {item.quantity}
              </span>
              <button
                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                className="grid h-7 w-7 place-items-center rounded-full border border-foam-50/15 text-foam-100/80 transition-colors hover:border-lagoon-300/50 hover:text-lagoon-300"
                aria-label={`Increase quantity of ${item.name}`}
              >
                <Plus className="h-3 w-3" />
              </button>
            </div>
          </div>
        </div>
      </div>
      {item.mode === "rent" && <RentDatePicker item={item} />}
      {item.mode === "buy" && (
        <p className="mt-2 text-right text-sm font-bold text-lagoon-300">
          {formatIDR(lineTotal(item))}
        </p>
      )}
    </motion.li>
  );
}

export function CartDrawer() {
  const { items, isOpen, setOpen, clear } = useCartStore();
  const [checkoutState, setCheckoutState] = useState<
    "idle" | "processing" | "done"
  >("idle");
  useEscapeKey(() => setOpen(false), isOpen);

  const incompleteRent = items.filter(rentItemIncomplete);
  const invalidRent = items.some(
    (i) =>
      i.startDate &&
      i.endDate &&
      new Date(i.endDate) < new Date(i.startDate)
  );
  const subtotal = cartSubtotal(items);

  const handleCheckout = () => {
    if (incompleteRent.length > 0 || invalidRent) {
      toast.error("Please set valid rental dates first", {
        description: "Every rental item needs a start and return date.",
      });
      return;
    }
    setCheckoutState("processing");
    // Simulated checkout — no payment gateway is connected (honest demo).
    setTimeout(() => {
      setCheckoutState("done");
    }, 1400);
  };

  const resetAfterDone = () => {
    clear();
    setCheckoutState("idle");
    setOpen(false);
    toast.success("Booking summary saved locally — see you at the dive shop!");
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[80] bg-abyss-950/70 backdrop-blur-sm"
            onClick={() => setOpen(false)}
            aria-hidden="true"
          />
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 33 }}
            className="fixed inset-y-0 right-0 z-[90] flex w-full max-w-md flex-col border-l border-foam-50/10 bg-abyss-900/95 backdrop-blur-2xl"
            role="dialog"
            aria-modal="true"
            aria-label="Shopping cart"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-foam-50/10 px-6 py-5">
              <div className="flex items-center gap-2.5">
                <span className="grid h-9 w-9 place-items-center rounded-full bg-lagoon-400/15 text-lagoon-300">
                  <ShoppingBag className="h-4 w-4" />
                </span>
                <div>
                  <h2 className="font-display text-lg font-bold tracking-wide text-foam-50">
                    Your Cart
                  </h2>
                  <p className="text-[11px] text-foam-100/55">
                    {items.length === 0
                      ? "Nothing here yet"
                      : `${items.length} line${items.length > 1 ? "s" : ""} ready`}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="grid h-10 w-10 place-items-center rounded-full text-foam-100 transition-colors hover:bg-foam-50/10"
                aria-label="Close cart"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Body */}
            {checkoutState === "done" ? (
              <div className="flex flex-1 flex-col items-center justify-center gap-4 px-8 text-center">
                <motion.div
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: "spring", stiffness: 260, damping: 18 }}
                  className="grid h-20 w-20 place-items-center rounded-full bg-lagoon-400/15 text-lagoon-300"
                >
                  <CheckCircle2 className="h-10 w-10" strokeWidth={1.6} />
                </motion.div>
                <h3 className="font-display text-2xl font-bold text-foam-50">
                  Order Summary Created
                </h3>
                <p className="text-sm leading-relaxed text-foam-100/70">
                  This demo does <strong className="text-foam-50">not</strong>{" "}
                  process real payments — no money moved and nothing was
                  confirmed with the shop yet. In production, this step would
                  connect to our booking & payment system.
                </p>
                <button
                  onClick={resetAfterDone}
                  className="mt-2 rounded-full bg-lagoon-400 px-6 py-3 text-sm font-bold text-abyss-950 transition-colors hover:bg-lagoon-300"
                >
                  Back to exploring
                </button>
              </div>
            ) : items.length === 0 ? (
              <div className="flex flex-1 flex-col items-center justify-center gap-4 px-8 text-center">
                <div className="grid h-20 w-20 place-items-center rounded-full border border-dashed border-foam-50/20 text-foam-100/40">
                  <Waves className="h-9 w-9" strokeWidth={1.4} />
                </div>
                <h3 className="font-display text-xl font-bold text-foam-50">
                  Your cart is empty
                </h3>
                <p className="text-sm leading-relaxed text-foam-100/60">
                  Dive into the gear catalog — masks, fins, full packages and
                  more are waiting to join your next adventure.
                </p>
                <a
                  href="#gear"
                  onClick={() => setOpen(false)}
                  className="rounded-full bg-lagoon-400 px-6 py-3 text-sm font-bold text-abyss-950 transition-colors hover:bg-lagoon-300"
                >
                  Browse gear
                </a>
              </div>
            ) : (
              <>
                <ul className="flex-1 space-y-3 overflow-y-auto px-5 py-5">
                  <AnimatePresence initial={false}>
                    {items.map((item) => (
                      <CartLine key={item.id} item={item} />
                    ))}
                  </AnimatePresence>
                </ul>

                {/* Footer */}
                <div className="border-t border-foam-50/10 px-6 py-5">
                  {(incompleteRent.length > 0 || invalidRent) && (
                    <p className="mb-3 flex items-start gap-2 rounded-xl border border-reef-500/30 bg-reef-500/10 px-3 py-2.5 text-[12px] font-semibold text-reef-300">
                      <TriangleAlert className="mt-0.5 h-4 w-4 shrink-0" />
                      {invalidRent
                        ? "A rental return date is before its start date."
                        : "Set rental dates for every RENT item to continue."}
                    </p>
                  )}
                  <div className="mb-1 flex items-center justify-between text-sm">
                    <span className="text-foam-100/70">Subtotal</span>
                    <span className="font-bold text-foam-50 tabular-nums">
                      {formatIDR(subtotal)}
                    </span>
                  </div>
                  <p className="mb-4 text-[11px] leading-relaxed text-foam-100/50">
                    Rentals are priced per day × selected period. No hidden
                    fees — deposits and delivery, if any, are always shown
                    here first.
                  </p>
                  <button
                    onClick={handleCheckout}
                    disabled={checkoutState === "processing"}
                    className="flex w-full items-center justify-center gap-2 rounded-full bg-lagoon-400 py-3.5 text-sm font-bold text-abyss-950 transition-all duration-300 hover:bg-lagoon-300 hover:shadow-[0_0_30px_-8px_rgba(45,217,199,0.6)] disabled:opacity-70"
                  >
                    {checkoutState === "processing" ? (
                      <>
                        <span className="h-4 w-4 animate-spin rounded-full border-2 border-abyss-950/30 border-t-abyss-950" />
                        Preparing summary…
                      </>
                    ) : (
                      "Complete booking — demo"
                    )}
                  </button>
                </div>
              </>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
