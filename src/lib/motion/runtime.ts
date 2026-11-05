/**
 * Motion runtime: the ONLY module that statically imports GSAP, its plugins and Lenis.
 * It is loaded with a dynamic import() after first paint by MotionProvider, so motion
 * JS never sits in the critical path (DESIGN.md performance budget).
 *
 * Do not import this file from server components or from code that runs before paint.
 */
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { CustomEase } from "gsap/CustomEase";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import type Lenis from "lenis";

import { easeCurves } from "./tokens";
import { isLowEndDevice, MEDIA, type MotionTier } from "./tier";

let initialized = false;

/** Register plugins and custom eases exactly once. Safe to call repeatedly. */
export function initMotion(): void {
  if (initialized || typeof window === "undefined") return;
  initialized = true;

  gsap.registerPlugin(useGSAP, ScrollTrigger, SplitText, CustomEase);

  for (const [name, curve] of Object.entries(easeCurves)) {
    CustomEase.create(name, curve);
  }

  // Mobile address-bar resizes must not refresh every trigger.
  ScrollTrigger.config({ ignoreMobileResize: true });
}

export type MotionHandler = (context: gsap.Context) => void | (() => void);

export interface MotionHandlers {
  /** Desktop, fine pointer, capable device. */
  full?: MotionHandler;
  /** Mobile, coarse pointer or low-end device. */
  lite?: MotionHandler;
  /** prefers-reduced-motion: reduce. Static or opacity-only equivalents. */
  reduced?: MotionHandler;
}

/**
 * The single place where tiers are decided (DESIGN.md: gsap.matchMedia()).
 * Each handler runs when its tier matches; everything created inside it (tweens,
 * ScrollTriggers, SplitText with context.add) is reverted automatically when the tier
 * or breakpoint changes and when the returned matcher is reverted/killed.
 *
 * Low-end devices matching "full" are routed to the "lite" handler.
 */
export function createMotionMatcher(
  handlers: MotionHandlers,
  scope?: Element | string | object,
): gsap.MatchMedia {
  initMotion();
  const lowEnd = isLowEndDevice();
  const mm = gsap.matchMedia(scope);

  mm.add(
    { full: MEDIA.full, lite: MEDIA.lite, reduced: MEDIA.reduced },
    (context) => {
      const flags = context.conditions ?? {};
      const tier: MotionTier = flags.reduced
        ? "reduced"
        : flags.full && !lowEnd
          ? "full"
          : "lite";
      return handlers[tier]?.(context);
    },
  );

  return mm;
}

export interface LenisHandle {
  lenis: Lenis;
  destroy: () => void;
}

/**
 * One Lenis instance, driven by the GSAP ticker and synced with ScrollTrigger
 * (DESIGN.md "Libraries and ownership"). Only call from the Full tier.
 */
export async function startLenis(): Promise<LenisHandle> {
  initMotion();

  // Own chunk: Lenis is only needed on the Full tier, so mobile never downloads or parses it.
  const { default: LenisCtor } = await import("lenis");
  const lenis = new LenisCtor({
    autoRaf: false,
    smoothWheel: true,
    duration: 1.15,
  });

  lenis.on("scroll", ScrollTrigger.update);

  const tick = (time: number) => lenis.raf(time * 1000);
  gsap.ticker.add(tick);
  gsap.ticker.lagSmoothing(0);

  return {
    lenis,
    destroy: () => {
      gsap.ticker.remove(tick);
      gsap.ticker.lagSmoothing(500, 33); // restore GSAP defaults
      lenis.destroy();
    },
  };
}

export { CustomEase, gsap, ScrollTrigger, SplitText, useGSAP };
export type MotionRuntime = typeof import("./runtime");
