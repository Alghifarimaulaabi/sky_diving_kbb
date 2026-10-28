"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, ShoppingBag, Waves, X, ArrowRight } from "lucide-react";
import { NAV_LINKS } from "@/data/site";
import { cartCount, useCartStore } from "@/lib/cart-store";

function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <Link
      href="#home"
      className="group flex items-center gap-2.5"
      aria-label="Blue Abyss Club — back to top"
    >
      <span className="relative grid h-9 w-9 place-items-center rounded-full border border-lagoon-300/40 bg-lagoon-400/10 text-lagoon-300 transition-colors duration-300 group-hover:bg-lagoon-400/25">
        <Waves className="h-4.5 w-4.5" strokeWidth={1.8} />
        <span className="absolute inset-0 rounded-full border border-lagoon-300/20 scale-110" />
      </span>
      <span className="font-display leading-none">
        <span
          className={`block font-bold tracking-[0.22em] text-foam-50 transition-all duration-300 ${
            compact ? "text-sm" : "text-[15px]"
          }`}
        >
          BLUE ABYSS
        </span>
        <span className="mt-1 block text-[9px] font-semibold tracking-[0.5em] text-lagoon-300/90">
          CLUB · BAC
        </span>
      </span>
    </Link>
  );
}

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState("#home");
  const items = useCartStore((s) => s.items);
  const setOpenCart = useCartStore((s) => s.setOpen);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const raf = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(raf);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32);
    // initial check deferred out of the effect body
    const raf = requestAnimationFrame(onScroll);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  // Scrollspy — highlight the section currently in view
  useEffect(() => {
    const ids = NAV_LINKS.map((l) => l.href.slice(1));
    const observer = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) setActive(`#${e.target.id}`);
        }
      },
      { rootMargin: "-38% 0px -55% 0px" }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const count = cartCount(items);

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.21, 0.65, 0.26, 0.99], delay: 0.2 }}
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          scrolled
            ? "border-b border-foam-50/10 bg-abyss-950/85 backdrop-blur-xl shadow-[0_10px_40px_-15px_rgba(2,10,18,0.8)]"
            : "border-b border-transparent bg-gradient-to-b from-abyss-950/60 to-transparent"
        }`}
      >
        <nav
          className="mx-auto flex h-[72px] max-w-7xl items-center justify-between gap-4 px-5 lg:px-8"
          aria-label="Main navigation"
        >
          <Logo />

          {/* Desktop links */}
          <ul className="hidden items-center gap-1 xl:flex">
            {NAV_LINKS.map((link) => {
              const isActive = active === link.href;
              return (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className={`relative rounded-full px-3.5 py-2 text-[13px] font-semibold tracking-wide transition-colors duration-300 ${
                      isActive
                        ? "text-lagoon-300"
                        : "text-foam-100/75 hover:text-foam-50"
                    }`}
                  >
                    {link.label}
                    {isActive && (
                      <motion.span
                        layoutId="nav-pill"
                        className="absolute inset-0 -z-10 rounded-full bg-foam-50/8 ring-1 ring-lagoon-300/25"
                        transition={{ type: "spring", stiffness: 380, damping: 32 }}
                      />
                    )}
                  </a>
                </li>
              );
            })}
          </ul>

          <div className="flex items-center gap-2.5">
            {/* Cart */}
            <button
              onClick={() => setOpenCart(true)}
              className="relative grid h-11 w-11 place-items-center rounded-full text-foam-100/85 transition-all duration-300 hover:bg-foam-50/10 hover:text-lagoon-300 focus-visible:outline-2 focus-visible:outline-lagoon-300"
              aria-label={`Open shopping cart, ${count} item${count === 1 ? "" : "s"}`}
            >
              <ShoppingBag className="h-5 w-5" strokeWidth={1.8} />
              {mounted && count > 0 && (
                <motion.span
                  key={count}
                  initial={{ scale: 0.4, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="absolute -right-0.5 -top-0.5 grid h-5 min-w-5 place-items-center rounded-full bg-reef-500 px-1 text-[10px] font-bold text-white shadow-lg shadow-reef-500/40"
                >
                  {count > 99 ? "99+" : count}
                </motion.span>
              )}
            </button>

            {/* CTA */}
            <a
              href="#learn"
              className="group hidden items-center gap-2 rounded-full bg-lagoon-400 px-5 py-2.5 text-[13px] font-bold tracking-wide text-abyss-950 transition-all duration-300 hover:bg-lagoon-300 hover:shadow-[0_0_28px_-6px_rgba(45,217,199,0.55)] sm:inline-flex"
            >
              Start Your Dive
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
            </a>

            {/* Mobile menu button */}
            <button
              onClick={() => setMenuOpen(true)}
              className="grid h-11 w-11 place-items-center rounded-full text-foam-100 transition-colors hover:bg-foam-50/10 xl:hidden"
              aria-label="Open menu"
              aria-expanded={menuOpen}
            >
              <Menu className="h-5.5 w-5.5" strokeWidth={1.8} />
            </button>
          </div>
        </nav>
      </motion.header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 z-[60] bg-abyss-950/70 backdrop-blur-sm"
              onClick={() => setMenuOpen(false)}
              aria-hidden="true"
            />
            <motion.aside
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 320, damping: 34 }}
              className="fixed inset-y-0 right-0 z-[70] flex w-[86vw] max-w-sm flex-col border-l border-foam-50/10 bg-abyss-900/95 backdrop-blur-2xl"
              role="dialog"
              aria-modal="true"
              aria-label="Navigation menu"
            >
              <div className="flex items-center justify-between border-b border-foam-50/10 px-6 py-5">
                <Logo compact />
                <button
                  onClick={() => setMenuOpen(false)}
                  className="grid h-10 w-10 place-items-center rounded-full text-foam-100 transition-colors hover:bg-foam-50/10"
                  aria-label="Close menu"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              <nav className="flex-1 overflow-y-auto px-6 py-6">
                <ul className="space-y-1">
                  {NAV_LINKS.map((link, i) => (
                    <motion.li
                      key={link.href}
                      initial={{ opacity: 0, x: 24 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.08 + i * 0.05, duration: 0.4 }}
                    >
                      <a
                        href={link.href}
                        onClick={() => setMenuOpen(false)}
                        className="group flex items-center justify-between rounded-xl px-4 py-3.5 font-display text-lg font-semibold tracking-wide text-foam-100/85 transition-colors hover:bg-foam-50/5 hover:text-lagoon-300"
                      >
                        {link.label}
                        <ArrowRight className="h-4 w-4 opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100" />
                      </a>
                    </motion.li>
                  ))}
                </ul>
              </nav>
              <div className="border-t border-foam-50/10 p-6">
                <a
                  href="#learn"
                  onClick={() => setMenuOpen(false)}
                  className="flex w-full items-center justify-center gap-2 rounded-full bg-lagoon-400 py-3.5 text-sm font-bold text-abyss-950 transition-colors hover:bg-lagoon-300"
                >
                  Start Your Dive
                  <ArrowRight className="h-4 w-4" />
                </a>
                <p className="mt-4 text-center text-[11px] tracking-[0.3em] text-foam-100/40">
                  FIND YOUR DEPTH. PROTECT THE BLUE.
                </p>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
