"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

import { useMotion } from "@/components/providers/MotionProvider";

/**
 * Site-wide "always moving" layer (Full tier only; reduced motion keeps everything static):
 *   - scroll progress bar at the top
 *   - cursor aura that follows the pointer and swells over links and buttons
 *   - endless marquee that speeds up with scroll velocity
 *   - big headlines drift sideways as they cross the screen
 *   - figures skew with scroll velocity and tilt toward the pointer
 *   - the seal turns with the page
 * Everything lives in gsap.matchMedia(), so it reverts on tier change and on navigation.
 */
export function Ambient() {
  const { ready, motion, tier } = useMotion();
  const pathname = usePathname();
  const barRef = useRef<HTMLDivElement>(null);
  const auraRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ready || !motion || tier !== "full") return;
    const { gsap, ScrollTrigger } = motion;
    const bar = barRef.current;
    const aura = auraRef.current;
    const cleanups: Array<() => void> = [];

    const ctx = gsap.context(() => {
      // Progress bar.
      if (bar) {
        gsap.set(bar, { scaleX: 0, transformOrigin: "left center" });
        gsap.to(bar, {
          scaleX: 1,
          ease: "none",
          scrollTrigger: { start: 0, end: "max", scrub: 0.3 },
        });
      }

      // Cursor aura (fine pointers only).
      if (aura && window.matchMedia("(pointer: fine)").matches) {
        gsap.set(aura, { opacity: 0, xPercent: -50, yPercent: -50 });
        const xTo = gsap.quickTo(aura, "x", { duration: 0.5, ease: "power3.out" });
        const yTo = gsap.quickTo(aura, "y", { duration: 0.5, ease: "power3.out" });
        const onMove = (e: PointerEvent) => {
          xTo(e.clientX);
          yTo(e.clientY);
          gsap.to(aura, { opacity: 1, duration: 0.3, overwrite: "auto" });
          const hot = (e.target as Element | null)?.closest("a, button, [role=button], summary");
          gsap.to(aura, { scale: hot ? 2.2 : 1, duration: 0.35, ease: "power3.out", overwrite: "auto" });
        };
        const onLeave = () => gsap.to(aura, { opacity: 0, duration: 0.3 });
        window.addEventListener("pointermove", onMove, { passive: true });
        document.documentElement.addEventListener("pointerleave", onLeave);
        cleanups.push(() => {
          window.removeEventListener("pointermove", onMove);
          document.documentElement.removeEventListener("pointerleave", onLeave);
        });
      }

      const main = document.querySelector("main");
      if (!main) return;

      // Marquee: constant drift, boosted and reversed by scroll velocity.
      main.querySelectorAll<HTMLElement>("[data-marquee]").forEach((track) => {
        const row = track.firstElementChild as HTMLElement | null;
        if (!row) return;
        const width = row.offsetWidth;
        const loop = gsap.to(track, {
          x: -width,
          duration: Math.max(width / 90, 12),
          ease: "none",
          repeat: -1,
        });
        ScrollTrigger.create({
          trigger: track,
          start: "top bottom",
          end: "bottom top",
          onUpdate: (self) => {
            const boost = gsap.utils.clamp(-6, 6, self.getVelocity() / 250);
            gsap.to(loop, { timeScale: self.direction * (1 + Math.abs(boost)), duration: 0.4, overwrite: true });
          },
        });
      });

      // Headlines drift sideways while crossing the viewport.
      main.querySelectorAll<HTMLElement>(".type-headline").forEach((h) => {
        gsap.fromTo(
          h,
          { x: -36 },
          {
            x: 36,
            ease: "none",
            scrollTrigger: { trigger: h, start: "top bottom", end: "bottom top", scrub: 0.8 },
          },
        );
      });

      // Figures: velocity skew + pointer tilt.
      main.querySelectorAll<HTMLElement>("figure").forEach((fig) => {
        gsap.set(fig, { transformPerspective: 900 });
        const skewTo = gsap.quickTo(fig, "skewY", { duration: 0.5, ease: "power3.out" });
        ScrollTrigger.create({
          trigger: fig,
          start: "top bottom",
          end: "bottom top",
          onUpdate: (self) => skewTo(gsap.utils.clamp(-3, 3, self.getVelocity() / -400)),
          onLeave: () => skewTo(0),
          onLeaveBack: () => skewTo(0),
        });
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

      // Seal turns with the page.
      document.querySelectorAll<SVGElement>("[data-spin]").forEach((seal) => {
        gsap.to(seal, {
          rotation: 360,
          ease: "none",
          transformOrigin: "50% 50%",
          scrollTrigger: { trigger: seal, start: "top bottom", end: "bottom top", scrub: 1 },
        });
      });
    });

    const refresh = window.setTimeout(() => ScrollTrigger.refresh(), 400);
    return () => {
      window.clearTimeout(refresh);
      cleanups.forEach((fn) => fn());
      ctx.revert();
    };
  }, [ready, motion, tier, pathname]);

  return (
    <>
      <div
        ref={barRef}
        aria-hidden="true"
        className="pointer-events-none fixed inset-x-0 top-0 z-[60] h-[3px] origin-left scale-x-0 bg-oxblood"
      />
      <div
        ref={auraRef}
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[55] h-16 w-16 rounded-full bg-oxblood/25 opacity-0 mix-blend-multiply max-lg:hidden"
      />
    </>
  );
}
