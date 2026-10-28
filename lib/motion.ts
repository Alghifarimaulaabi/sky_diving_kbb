import type { Variants } from "framer-motion";

/** Shared viewport config — reveal once, slightly before fully visible. */
export const viewportOnce = { once: true, margin: "-70px" } as const;

/** Fade + rise, the signature reveal of the site. */
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 36 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.85, ease: [0.21, 0.65, 0.26, 0.99] },
  },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 1, ease: "easeOut" } },
};

export const slideInLeft: Variants = {
  hidden: { opacity: 0, x: -44 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.9, ease: [0.21, 0.65, 0.26, 0.99] },
  },
};

export const slideInRight: Variants = {
  hidden: { opacity: 0, x: 44 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.9, ease: [0.21, 0.65, 0.26, 0.99] },
  },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.94 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.9, ease: [0.21, 0.65, 0.26, 0.99] },
  },
};

/** Parent that staggers its children reveals. */
export const staggerParent = (staggerChildren = 0.12, delayChildren = 0.05): Variants => ({
  hidden: {},
  visible: {
    transition: { staggerChildren, delayChildren },
  },
});

/** Letter-by-letter blur reveal for oversized display headings. */
export const letterBlur: Variants = {
  hidden: { opacity: 0, y: 26, filter: "blur(10px)" },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { delay: i * 0.045, duration: 0.7, ease: [0.21, 0.65, 0.26, 0.99] },
  }),
};

export const EASE_OUT = [0.21, 0.65, 0.26, 0.99] as const;
