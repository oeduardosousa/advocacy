"use client";

import { useEffect, useRef, type ReactNode } from "react";

import { useMotion } from "@/components/providers/MotionProvider";

const FIELD = 80; // px around the button where the pull applies
const STRENGTH = 0.25;

/**
 * Magnetic pull for the WhatsApp and nav CTA (DESIGN.md "Magnetic buttons").
 * Full tier only (fine pointer). quickTo 0.6s power3.out, springs back on leave.
 * Disabled while the button has keyboard focus. Wraps the button so the button's own
 * :active transform is not overwritten.
 */
export function Magnetic({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const { motion, tier } = useMotion();

  useEffect(() => {
    const el = ref.current;
    if (!motion || tier !== "full" || !el) return;
    const { gsap } = motion;

    const xTo = gsap.quickTo(el, "x", { duration: 0.6, ease: "power3.out" });
    const yTo = gsap.quickTo(el, "y", { duration: 0.6, ease: "power3.out" });

    const onMove = (event: PointerEvent) => {
      const rect = el.getBoundingClientRect();
      // Measure from the un-translated centre so the field does not drift with the pull.
      const x = (gsap.getProperty(el, "x") as number) || 0;
      const y = (gsap.getProperty(el, "y") as number) || 0;
      const cx = rect.left - x + rect.width / 2;
      const cy = rect.top - y + rect.height / 2;
      const dx = event.clientX - cx;
      const dy = event.clientY - cy;
      const inside =
        Math.abs(dx) < rect.width / 2 + FIELD && Math.abs(dy) < rect.height / 2 + FIELD;
      const keyboardFocused = el.contains(document.activeElement) && el.matches(":has(:focus-visible)");
      if (inside && !keyboardFocused) {
        xTo(dx * STRENGTH);
        yTo(dy * STRENGTH);
      } else {
        xTo(0);
        yTo(0);
      }
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      gsap.killTweensOf(el);
      gsap.set(el, { x: 0, y: 0 });
    };
  }, [motion, tier]);

  return (
    <span ref={ref} className={className ?? "inline-block"}>
      {children}
    </span>
  );
}
