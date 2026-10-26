"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

// GSAP and all its plugins are free to use, including commercially, since 3.13.
// Only the core plugins every page needs are registered here; illustrations register
// their own extras (DrawSVG, MotionPath) so those stay out of the shared bundle.
gsap.registerPlugin(ScrollTrigger, useGSAP);

export const prefersReducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export { gsap, ScrollTrigger, useGSAP };
