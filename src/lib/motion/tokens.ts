/**
 * Motion tokens for GSAP (seconds, not ms). Mirror of DESIGN.md "Motion System > Tokens"
 * and of the CSS custom properties in globals.css. Keep both in sync.
 * No GSAP import here: safe to import from anywhere without pulling motion JS.
 */

export const dur = {
  instant: 0.1,
  fast: 0.16,
  base: 0.24,
  slow: 0.48,
  reveal: 0.9,
  scene: 1.2,
} as const;

export const stagger = {
  lines: 0.09,
  words: 0.03,
  items: 0.07,
  max: 0.6,
} as const;

export const shift = {
  /** Line-mask rise, in percent (yPercent). */
  text: 105,
  /** Paragraph/block rise, in px. */
  fade: 16,
} as const;

export const scale = {
  press: 0.97,
  /** Previous sheet recedes to this scale during the page turn. */
  recede: 0.97,
  /** Image develop starts here and settles to 1. */
  develop: 1.15,
} as const;

/** Desktop image travel for parallax, as a fraction of the frame (8%). */
export const PARALLAX_MAX = 0.08;

/**
 * Easing names registered with CustomEase in the runtime (see runtime.ts).
 * CSS equivalents: --ease-out, --ease-inout, --ease-drawer.
 */
export const ease = {
  out: "adv-out",
  inOut: "adv-inout",
  drawer: "adv-drawer",
} as const;

/** Bezier definitions registered under the names above. */
export const easeCurves = {
  [ease.out]: "0.23,1,0.32,1",
  [ease.inOut]: "0.77,0,0.175,1",
  [ease.drawer]: "0.32,0.72,0,1",
} as const;

/** Page transition timings per tier (seconds). DESIGN.md "Page transitions". */
export const pageTransition = {
  full: { cover: 0.32, lift: 0.48 },
  lite: { cover: 0.2, lift: 0.3 },
  /** Reduced motion: instant swap with an opacity crossfade. */
  reducedFade: 0.15,
} as const;

/** Lite-tier stagger is one third shorter (DESIGN.md "Mobile and low-end fallback"). */
export const LITE_STAGGER_FACTOR = 2 / 3;
