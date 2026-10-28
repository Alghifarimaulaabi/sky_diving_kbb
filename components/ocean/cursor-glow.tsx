"use client";

import { useEffect, useRef } from "react";

/**
 * Subtle underwater spotlight — a soft turquoise glow that lazily
 * follows the pointer. Lerped with rAF so it feels like moving through
 * water. Pointer-fine devices only; skipped for reduced motion.
 */
export function CursorGlow() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduced) return;

    let raf = 0;
    let tx = window.innerWidth / 2;
    let ty = window.innerHeight * 0.35;
    let x = tx;
    let y = ty;
    let visible = false;

    const onMove = (e: PointerEvent) => {
      tx = e.clientX;
      ty = e.clientY;
      if (!visible) {
        visible = true;
        el.style.opacity = "1";
      }
    };

    const loop = () => {
      // lazy lerp = "underwater drag"
      x += (tx - x) * 0.06;
      y += (ty - y) * 0.06;
      el.style.transform = `translate3d(${x - 350}px, ${y - 350}px, 0)`;
      raf = requestAnimationFrame(loop);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    raf = requestAnimationFrame(loop);
    return () => {
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[5] h-[700px] w-[700px] opacity-0 transition-opacity duration-700 will-change-transform"
      style={{
        background:
          "radial-gradient(circle, rgba(45,217,199,0.055) 0%, rgba(45,217,199,0.02) 38%, transparent 65%)",
        mixBlendMode: "screen",
      }}
    />
  );
}
