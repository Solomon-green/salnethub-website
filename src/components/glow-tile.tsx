"use client";

/** Bento tile whose radial highlight follows the pointer (sets --mx/--my for the .bento::after glow). */
export function GlowTile({ className = "", children }: { className?: string; children: React.ReactNode }) {
  return (
    <div
      className={`bento ${className}`}
      onPointerMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
        e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
      }}
    >
      {children}
    </div>
  );
}
