/**
 * Motion tiers (DESIGN.md): Full, Lite, Reduced.
 * Pure browser checks, no GSAP import, safe to import from anywhere.
 *
 * The media queries below are the single definition of each tier. The GSAP runtime
 * feeds the same strings to gsap.matchMedia() (see runtime.ts > createMotionMatcher).
 */

export type MotionTier = "full" | "lite" | "reduced";

export const MEDIA = {
  /** Desktop, fine pointer, motion allowed. */
  full: "(min-width: 1024px) and (hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)",
  /** Mobile/tablet or coarse pointer, motion allowed. */
  lite: "(prefers-reduced-motion: no-preference) and ((max-width: 1023px) or (pointer: coarse))",
  /** User asked for less motion. Wins over everything else. */
  reduced: "(prefers-reduced-motion: reduce)",
} as const;

type NavigatorWithMemory = Navigator & { deviceMemory?: number };

/** Low-end devices get the Lite tier even on desktop-class viewports. */
export function isLowEndDevice(): boolean {
  if (typeof navigator === "undefined") return false;
  const nav = navigator as NavigatorWithMemory;
  const cores = nav.hardwareConcurrency;
  const memory = nav.deviceMemory;
  return (
    (typeof cores === "number" && cores <= 4) ||
    (typeof memory === "number" && memory <= 4)
  );
}

export function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia(MEDIA.reduced).matches;
}

/** Resolve the current tier synchronously (client only; SSR returns "reduced" = static). */
export function getMotionTier(): MotionTier {
  if (typeof window === "undefined") return "reduced";
  if (window.matchMedia(MEDIA.reduced).matches) return "reduced";
  if (window.matchMedia(MEDIA.full).matches && !isLowEndDevice()) return "full";
  return "lite";
}
