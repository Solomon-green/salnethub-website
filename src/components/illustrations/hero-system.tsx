"use client";

import { useRef } from "react";
import { gsap, prefersReducedMotion, useGSAP } from "@/components/motion/gsap";
import { boxFaces, iso, pts } from "./iso";

const U = 40;
const blocks = [
  { id: "form", label: "Web form", meta: "New lead", x: 0, y: 4, h: 0.9 },
  { id: "crm", label: "CRM", meta: "Record created", x: 4, y: 4, h: 1.5 },
  { id: "email", label: "Email", meta: "Reply in 2 min", x: 4, y: 0, h: 0.9 },
  { id: "sheet", label: "Sheets", meta: "Row added", x: 8, y: 0, h: 1.15 },
  { id: "report", label: "Report", meta: "Updated live", x: 8, y: 4, h: 1.25 },
];
const FOOT = 1.8;

// Bounding box of every projected corner, so the viewBox fits the drawing exactly.
const corners = blocks.flatMap((b) =>
  [-1, 1].flatMap((sx) =>
    [-1, 1].flatMap((sy) =>
      [0, b.h].map((z) => iso([b.x + (sx * FOOT) / 2, b.y + (sy * FOOT) / 2, z], U)),
    ),
  ),
);
const minX = Math.min(...corners.map((c) => c[0])) - 40;
const maxX = Math.max(...corners.map((c) => c[0])) + 40;
const minY = Math.min(...corners.map((c) => c[1])) - 84;
const maxY = Math.max(...corners.map((c) => c[1])) + 40;
const OX = -minX;
const OY = -minY;
const W = maxX - minX;
const H = maxY - minY;

const P = (x: number, y: number) => iso([x, y, 0], U, OX, OY);
const route = blocks.map((b) => P(b.x, b.y));
const routeD = "M" + route.map(([x, y]) => `${x.toFixed(2)} ${y.toFixed(2)}`).join(" L");

const grid: string[] = [];
for (let gx = -2; gx <= 10; gx++) {
  const [a, b] = [P(gx, -2), P(gx, 6.5)];
  grid.push(`M${a[0]} ${a[1]} L${b[0]} ${b[1]}`);
}
for (let gy = -2; gy <= 6.5; gy++) {
  const [a, b] = [P(-2, gy), P(10, gy)];
  grid.push(`M${a[0]} ${a[1]} L${b[0]} ${b[1]}`);
}

const moduleShape = pts([
  iso([-0.32, -0.32, 0], U),
  iso([0.32, -0.32, 0], U),
  iso([0.32, 0.32, 0], U),
  iso([-0.32, 0.32, 0], U),
]);

export function HeroSystem({ className = "" }: { className?: string }) {
  const root = useRef<SVGSVGElement>(null);

  useGSAP(
    () => {
      const tops = gsap.utils.toArray<SVGPolygonElement>(".blk-top");
      const metas = gsap.utils.toArray<SVGTextElement>(".blk-meta");
      if (prefersReducedMotion()) {
        gsap.set(tops, { fill: "#D4E1D9" });
        gsap.set(".data-module", { opacity: 0 });
        return;
      }

      gsap.from(".blk", { opacity: 0, y: 18, duration: 0.9, ease: "power3.out", stagger: 0.08, delay: 0.15 });
      gsap.from(".route-line", { drawSVG: "0%", duration: 1.6, ease: "power2.inOut", delay: 0.4 });

      const tl = gsap.timeline({ repeat: -1, delay: 1.4, repeatDelay: 0.4 });
      tl.set(".data-module", { opacity: 1 });
      tl.set(tops, { fill: "#FFFFFF" });
      tl.set(metas, { fill: "#5A5D60" });
      tl.to(tops[0], { fill: "#D4E1D9", duration: 0.25 });
      for (let i = 1; i < route.length; i++) {
        tl.to(".data-module", {
          duration: 1.05,
          ease: "power2.inOut",
          motionPath: { path: routeD, start: (i - 1) / (route.length - 1), end: i / (route.length - 1) },
        });
        tl.to(tops[i], { fill: i === 1 ? "#4F6B5C" : "#6C8C7A", duration: 0.25 }, "<0.8");
        tl.to(metas[i], { fill: "#4F6B5C", duration: 0.25 }, "<");
      }
      tl.to(".data-module", { opacity: 0, duration: 0.3 }, "+=0.2");
      tl.to(tops, { fill: "#FFFFFF", duration: 0.6, stagger: 0.05 }, "+=1.4");
      tl.to(metas, { fill: "#5A5D60", duration: 0.4 }, "<");
    },
    { scope: root },
  );

  return (
    <svg
      ref={root}
      viewBox={`0 0 ${W.toFixed(0)} ${H.toFixed(0)}`}
      className={className}
      role="img"
      aria-label="Diagram: a new lead moves from a web form to the CRM, a reply email, a spreadsheet and a live report, automatically."
    >
      <defs>
        <radialGradient id="grid-fade" cx="50%" cy="55%" r="60%">
          <stop offset="0%" stopColor="#fff" stopOpacity="1" />
          <stop offset="100%" stopColor="#fff" stopOpacity="0" />
        </radialGradient>
        <mask id="grid-mask">
          <rect width="100%" height="100%" fill="url(#grid-fade)" />
        </mask>
      </defs>

      <g mask="url(#grid-mask)" stroke="#4F6B5C" strokeOpacity="0.18" strokeWidth="1">
        {grid.map((d, i) => (
          <path key={i} d={d} />
        ))}
      </g>

      <path className="route-line" d={routeD} fill="none" stroke="#17191C" strokeWidth="1.25" />
      {route.map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="2.5" fill="#17191C" />
      ))}

      <g className="data-module" style={{ opacity: 0 }} transform={`translate(${route[0][0]} ${route[0][1]})`}>
        <polygon points={moduleShape} fill="#C8754A" />
      </g>

      {blocks.map((b) => {
        const f = boxFaces(b.x, b.y, FOOT, FOOT, b.h, U, OX, OY);
        const [lx, ly] = f.labelAnchor;
        return (
          <g key={b.id} className="blk">
            <polygon points={f.left} fill="#E3EBE6" stroke="#17191C" strokeWidth="1.25" strokeLinejoin="round" />
            <polygon points={f.right} fill="#B9CCC1" stroke="#17191C" strokeWidth="1.25" strokeLinejoin="round" />
            <polygon className="blk-top" points={f.top} fill="#FFFFFF" stroke="#17191C" strokeWidth="1.25" strokeLinejoin="round" />
            <text x={lx} y={ly - U * 1.62} textAnchor="middle" fontSize="13" fontWeight="700" fill="#17191C">
              {b.label}
            </text>
            <text className="blk-meta" x={lx} y={ly - U * 1.62 + 15} textAnchor="middle" fontSize="11" fill="#5A5D60">
              {b.meta}
            </text>
          </g>
        );
      })}
    </svg>
  );
}
