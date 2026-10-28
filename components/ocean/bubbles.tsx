"use client";

import { useEffect, useMemo, useState } from "react";
import { useReducedMotion } from "framer-motion";

interface BubbleSpec {
  left: number;
  size: number;
  duration: number;
  delay: number;
  sway: number;
  opacity: number;
  blur: number;
}

/** Seeded pseudo-random so values are stable per instance. */
function makeBubbles(count: number, seed: number): BubbleSpec[] {
  let s = seed;
  const rand = () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
  return Array.from({ length: count }, () => {
    const size = 4 + rand() * 18;
    return {
      left: rand() * 100,
      size,
      duration: 12 + rand() * 16,
      delay: rand() * 18,
      sway: 12 + rand() * 34,
      opacity: 0.14 + rand() * 0.3,
      blur: size > 14 ? 1 : 0,
    };
  });
}

/**
 * Ambient rising air bubbles. Rendered client-side only to avoid
 * hydration mismatch. Depth layers: small sharp foreground + large
 * blurred background bubbles.
 */
export function Bubbles({
  count = 16,
  seed = 42,
  className = "",
}: {
  count?: number;
  seed?: number;
  className?: string;
}) {
  const reduced = useReducedMotion();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // defer so we never setState synchronously inside the effect body
    const raf = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(raf);
  }, []);

  const bubbles = useMemo(() => makeBubbles(count, seed), [count, seed]);

  if (reduced || !mounted) return null;

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
    >
      {bubbles.map((b, i) => (
        <span
          key={i}
          className="absolute bottom-[-8vh] rounded-full border border-foam-50/40"
          style={{
            left: `${b.left}%`,
            width: b.size,
            height: b.size,
            filter: b.blur ? "blur(1.5px)" : undefined,
            background:
              "radial-gradient(circle at 32% 30%, rgba(255,255,255,0.55), rgba(174,233,244,0.08) 55%, rgba(255,255,255,0.05))",
            animation: `bubble-rise ${b.duration}s linear ${b.delay}s infinite`,
            ["--bubble-sway" as string]: `${b.sway}px`,
            ["--bubble-opacity" as string]: b.opacity,
          }}
        >
          {/* inner sway so the rise + wobble combine naturally */}
          <span
            className="block h-full w-full"
            style={{
              animation: `bubble-sway ${2.4 + (i % 5) * 0.7}s ease-in-out infinite`,
            }}
          />
        </span>
      ))}
    </div>
  );
}
