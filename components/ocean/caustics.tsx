"use client";

/**
 * Soft underwater caustics — layered radial gradients slowly panning,
 * like sunlight refracted through the surface. Pure CSS, GPU friendly.
 */
export function Caustics({
  className = "",
  intensity = 1,
}: {
  className?: string;
  intensity?: number;
}) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
    >
      <div
        className="absolute -inset-[20%] animate-caustics"
        style={{
          opacity: 0.5 * intensity,
          background:
            "radial-gradient(38% 28% at 22% 18%, rgba(143,226,255,0.20) 0%, transparent 70%)," +
            "radial-gradient(30% 24% at 68% 10%, rgba(174,244,231,0.16) 0%, transparent 70%)," +
            "radial-gradient(46% 30% at 50% 40%, rgba(90,180,220,0.10) 0%, transparent 72%)," +
            "radial-gradient(24% 18% at 84% 34%, rgba(255,232,190,0.10) 0%, transparent 70%)",
          filter: "blur(6px)",
        }}
      />
      <div
        className="absolute -inset-[15%] animate-caustics"
        style={{
          animationDuration: "31s",
          animationDelay: "-9s",
          opacity: 0.4 * intensity,
          background:
            "radial-gradient(26% 20% at 40% 26%, rgba(190,240,255,0.14) 0%, transparent 70%)," +
            "radial-gradient(34% 22% at 78% 55%, rgba(120,214,236,0.10) 0%, transparent 70%)",
          filter: "blur(10px)",
        }}
      />
    </div>
  );
}

/**
 * Volumetric god-rays — light shafts penetrating from the surface.
 * Very subtle; used in hero and a few dark sections.
 */
export function GodRays({ className = "" }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
    >
      {[
        { left: "12%", width: 120, delay: "0s", dur: "11s", o: 0.1 },
        { left: "30%", width: 70, delay: "-4s", dur: "14s", o: 0.07 },
        { left: "52%", width: 150, delay: "-8s", dur: "12s", o: 0.09 },
        { left: "72%", width: 90, delay: "-2s", dur: "16s", o: 0.06 },
        { left: "88%", width: 130, delay: "-6s", dur: "13s", o: 0.08 },
      ].map((r, i) => (
        <div
          key={i}
          className="absolute -top-[10%] h-[120%] animate-float-slow"
          style={{
            left: r.left,
            width: r.width,
            opacity: r.o,
            transformOrigin: "top center",
            background:
              "linear-gradient(180deg, rgba(224,247,255,0.5) 0%, rgba(180,230,250,0.14) 45%, transparent 85%)",
            filter: "blur(18px)",
            transform: "rotate(9deg)",
            animationDuration: r.dur,
            animationDelay: r.delay,
          }}
        />
      ))}
    </div>
  );
}
