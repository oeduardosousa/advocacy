"use client";

import { useEffect, useRef } from "react";

import { useMotion } from "@/components/providers/MotionProvider";

/**
 * Custom cursor (DESIGN.md "Custom cursor"): a 10px Ink dot with a 40px ring follower
 * (quickTo 0.35s). The native cursor stays visible. The ring grows to 56px with a label
 * ("Ver", "Ler") over elements marked `data-cursor="Ver"`. Full tier only (fine pointer,
 * motion allowed); hidden over form fields. Decorative, aria-hidden. Transform/opacity only.
 */
export function Cursor() {
  const { motion, tier } = useMotion();
  const ringRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const ring = ringRef.current;
    const dot = dotRef.current;
    const label = labelRef.current;
    if (!motion || tier !== "full" || !ring || !dot || !label) return;
    const { gsap } = motion;

    gsap.set([ring, dot], { xPercent: -50, yPercent: -50 });
    const ringX = gsap.quickTo(ring, "x", { duration: 0.35, ease: "power3.out" });
    const ringY = gsap.quickTo(ring, "y", { duration: 0.35, ease: "power3.out" });
    // The dot tracks the pointer 1:1 (no lag), the ring trails it.
    const setDotX = gsap.quickSetter(dot, "x", "px") as (v: number) => void;
    const setDotY = gsap.quickSetter(dot, "y", "px") as (v: number) => void;

    let shown = false;
    const show = (on: boolean) => {
      if (shown === on) return;
      shown = on;
      ring.dataset.visible = on ? "true" : "false";
      dot.dataset.visible = on ? "true" : "false";
    };

    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      if (!shown) {
        // First move: place the ring without a long trail from 0,0.
        gsap.set(ring, { x: e.clientX, y: e.clientY });
      }
      setDotX(e.clientX);
      setDotY(e.clientY);
      ringX(e.clientX);
      ringY(e.clientY);
      show(true);
    };

    const onOver = (e: PointerEvent) => {
      const target = e.target as Element | null;
      if (!target?.closest) return;
      const onField = !!target.closest("input, textarea, select, [contenteditable='true']");
      const hint = target.closest<HTMLElement>("[data-cursor]")?.dataset.cursor ?? "";
      ring.dataset.hint = hint && !onField ? "true" : "false";
      dot.dataset.hint = hint && !onField ? "true" : "false";
      label.textContent = hint;
      ring.dataset.hidden = onField ? "true" : "false";
      dot.dataset.hidden = onField ? "true" : "false";
    };

    const onLeaveDoc = () => show(false);

    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerover", onOver, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeaveDoc);
    return () => {
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerover", onOver);
      document.documentElement.removeEventListener("pointerleave", onLeaveDoc);
      gsap.killTweensOf([ring, dot]);
      show(false);
    };
  }, [motion, tier]);

  if (tier !== "full") return null;

  return (
    <>
      <div ref={ringRef} aria-hidden="true" className="cursor-ring" data-visible="false">
        <span className="cursor-ring-shape" />
        <span ref={labelRef} className="cursor-label type-label" />
      </div>
      <div ref={dotRef} aria-hidden="true" className="cursor-dot" data-visible="false" />
    </>
  );
}
