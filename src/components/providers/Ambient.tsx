"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

import { useMotion } from "@/components/providers/MotionProvider";

/**
 * Site-wide "always moving" layer (Full tier only; reduced motion keeps everything static):
 *   - scroll progress bar at the top
 *   - figures tilt toward the pointer
 *   - the seal turns with the page
 * The pinned areas scene is left alone: transforms there fight the pin.
 * Everything lives in gsap.context(), so it reverts on tier change and on navigation.
 */
export function Ambient() {
  const { ready, motion, tier } = useMotion();
  const pathname = usePathname();
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ready || !motion || tier !== "full") return;
    const { gsap, ScrollTrigger } = motion;
    const bar = barRef.current;
    const cleanups: Array<() => void> = [];

    const ctx = gsap.context(() => {
      if (bar) {
        gsap.set(bar, { scaleX: 0, transformOrigin: "left center" });
        gsap.to(bar, {
          scaleX: 1,
          ease: "none",
          scrollTrigger: { start: 0, end: "max", scrub: 0.3 },
        });
      }

      const main = document.querySelector("main");
      if (!main) return;
      const free = (el: Element) => !el.closest("#areas");

      // Figures: pointer tilt only (no scroll-coupled transforms, they made the page feel unstable).
      Array.from(main.querySelectorAll<HTMLElement>("figure"))
        .filter(free)
        .forEach((fig) => {
          gsap.set(fig, { transformPerspective: 900 });
          const rx = gsap.quickTo(fig, "rotationX", { duration: 0.6, ease: "power3.out" });
          const ry = gsap.quickTo(fig, "rotationY", { duration: 0.6, ease: "power3.out" });
          const onMove = (e: PointerEvent) => {
            const r = fig.getBoundingClientRect();
            ry(((e.clientX - r.left) / r.width - 0.5) * 8);
            rx(((e.clientY - r.top) / r.height - 0.5) * -8);
          };
          const onLeave = () => {
            rx(0);
            ry(0);
          };
          fig.addEventListener("pointermove", onMove);
          fig.addEventListener("pointerleave", onLeave);
          cleanups.push(() => {
            fig.removeEventListener("pointermove", onMove);
            fig.removeEventListener("pointerleave", onLeave);
          });
        });

      // Seal turns as it scrolls into view and lands upright (360°) once it is at rest,
      // so the lettering is never left flipped when the visitor stops on it.
      document.querySelectorAll<SVGElement>("[data-spin]").forEach((seal) => {
        gsap.fromTo(
          seal,
          { rotation: 0 },
          {
            rotation: 360,
            ease: "power2.out",
            transformOrigin: "50% 50%",
            scrollTrigger: { trigger: seal, start: "top bottom", end: "top 60%", scrub: 0.8 },
          },
        );
      });
    });

    // Pin spacing from the areas scene changes the page height: measure again once it exists.
    const refresh = window.setTimeout(() => ScrollTrigger.refresh(), 600);
    return () => {
      window.clearTimeout(refresh);
      cleanups.forEach((fn) => fn());
      ctx.revert();
    };
  }, [ready, motion, tier, pathname]);

  return (
    <div
      ref={barRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-x-0 top-0 z-[60] h-[3px] origin-left scale-x-0 bg-oxblood"
    />
  );
}
