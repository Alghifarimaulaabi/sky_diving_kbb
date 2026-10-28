"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import { fadeUp, staggerParent, viewportOnce } from "@/lib/motion";
import type { ReactNode } from "react";

/**
 * Scroll-triggered reveal wrapper — the site's signature entrance.
 * Respects prefers-reduced-motion (renders instantly, no movement).
 */
export function Reveal({
  children,
  className = "",
  variants = fadeUp,
  delay = 0,
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  variants?: Variants;
  delay?: number;
  as?: "div" | "section" | "article" | "li" | "span";
}) {
  const reduced = useReducedMotion();
  const Comp = (motion as never as Record<string, typeof motion.div>)[as];

  if (reduced) {
    const Tag = as;
    return <Tag className={className}>{children}</Tag>;
  }

  return (
    <Comp
      className={className}
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      transition={{ delay }}
    >
      {children}
    </Comp>
  );
}

/** Staggered children container — children use `Reveal`-style variants. */
export function RevealGroup({
  children,
  className = "",
  stagger = 0.12,
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  stagger?: number;
  as?: "div" | "ul" | "section";
}) {
  const reduced = useReducedMotion();
  const Comp = (motion as never as Record<string, typeof motion.div>)[as];

  if (reduced) {
    const Tag = as;
    return <Tag className={className}>{children}</Tag>;
  }

  return (
    <Comp
      className={className}
      variants={staggerParent(stagger)}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
    >
      {children}
    </Comp>
  );
}

/** Simple child item for RevealGroup (uses fadeUp by default). */
export function RevealItem({
  children,
  className = "",
  variants = fadeUp,
}: {
  children: ReactNode;
  className?: string;
  variants?: Variants;
}) {
  const reduced = useReducedMotion();
  if (reduced) return <div className={className}>{children}</div>;
  return (
    <motion.div className={className} variants={variants}>
      {children}
    </motion.div>
  );
}
