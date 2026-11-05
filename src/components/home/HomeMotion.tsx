"use client";

import { useEffect } from "react";

import { useMotion } from "@/components/providers/MotionProvider";
import { splitType, titleTween, TITLE_VARIANTS, type TitleVariant } from "@/lib/motion/variants";
import { dur, ease, LITE_STAGGER_FACTOR, scale, shift, stagger } from "@/lib/motion/tokens";

/**
 * Scroll reveals for the home sections, driven by data attributes so sections stay
 * server components with static markup:
 *   [data-reveal="lines"]  headline: line mask rise (SplitText), once
 *   [data-reveal="block"]  paragraph / block: fade + 16px rise, once
 *   [data-reveal="items"]  children: fade + rise with 70ms stagger, once
 *   [data-image-reveal]    paper-cover image reveal (see Photo), once
 *   [data-parallax]        up to 8% travel, Full tier only
 *   [data-margin-rule]     oxblood margin rule, scaleY scrubbed to progress (Full tier)
 * Reduced motion: nothing runs, content is in its final state (DESIGN.md fallback).
 * Everything is created inside gsap.matchMedia() so it reverts on tier/breakpoint change.
 */
export function HomeMotion() {
  const { ready, motion } = useMotion();

  useEffect(() => {
    if (!ready || !motion) return;
    const { createMotionMatcher, gsap, SplitText, ScrollTrigger } = motion;
    const main = document.querySelector("main");
    if (!main) return;

    const all = <T extends Element>(sel: string) => Array.from(main.querySelectorAll<T>(sel));

    const reveals = (lite: boolean) => {
      const k = lite ? LITE_STAGGER_FACTOR : 1;

      // Each headline gets a different entrance; the walk starts at a random point per visit.
      const startAt = Math.floor(Math.random() * TITLE_VARIANTS.length);
      // SplitText (lines + chars) forces layout and creates hundreds of spans, so it runs
      // lazily when each headline is about to enter, never for all of them at startup.
      // Until then it is only transparent (never visibility:hidden, so it stays in the accessibility tree).
      all<HTMLElement>('[data-reveal="lines"]').forEach((el, index) => {
        const variant: TitleVariant = lite ? "cascade" : TITLE_VARIANTS[(startAt + index) % TITLE_VARIANTS.length];
        gsap.set(el, { opacity: 0 });
        ScrollTrigger.create({
          trigger: el,
          start: "top 85%",
          once: true,
          onEnter: () => {
            gsap.set(el, { opacity: 1 });
            if (lite) {
              // Phones and tablets: lines rise and fade in (~0.5s) instead of letter-by-letter,
              // so a headline is never half-written while the text below is already readable.
              const split = SplitText.create(el, { type: "lines", linesClass: "rv-line" });
              gsap.from(split.lines, {
                opacity: 0,
                y: shift.fade,
                duration: 0.45,
                stagger: 0.08,
                ease: ease.out,
                onComplete: () => split.revert(),
              });
              return;
            }
            const split = SplitText.create(el, {
              type: splitType(),
              linesClass: "rv-line",
            });
            const { targets, vars } = titleTween(variant, split, k);
            gsap.from(targets, {
              ...vars,
              ease: ease.out,
              onComplete: () => split.revert(),
            });
          },
        });
      });

      all<HTMLElement>('[data-reveal="block"]').forEach((el) => {
        gsap.from(el, {
          opacity: 0,
          y: shift.fade,
          duration: 0.6,
          ease: ease.out,
          scrollTrigger: { trigger: el, start: "top 90%", once: true },
        });
      });

      all<HTMLElement>('[data-reveal="items"]').forEach((el) => {
        gsap.from(Array.from(el.children), {
          opacity: 0,
          y: shift.fade,
          duration: 0.6,
          stagger: stagger.items * k,
          ease: ease.out,
          scrollTrigger: { trigger: el, start: "top 88%", once: true },
        });
      });
    };

    const images = (lite: boolean) => {
      all<HTMLElement>("[data-image-reveal]").forEach((frame) => {
        const cover = frame.querySelector<HTMLElement>("[data-image-cover]");
        const settle = frame.querySelector<HTMLElement>("[data-image-settle]");
        if (!settle) return;
        const scrollTrigger = { trigger: frame, start: "top 82%", once: true };

        if (lite) {
          if (cover) gsap.set(cover, { display: "none" });
          gsap.from(settle, { opacity: 0, y: shift.fade, duration: 0.6, ease: ease.out, scrollTrigger });
          return;
        }
        const tl = gsap.timeline({ scrollTrigger });
        if (cover) tl.fromTo(cover, { scaleY: 1 }, { scaleY: 0, duration: dur.scene, ease: ease.drawer }, 0);
        tl.fromTo(settle, { scale: scale.develop }, { scale: 1, duration: dur.scene, ease: ease.drawer }, 0);
        tl.set(frame, { clearProps: "willChange" });
      });
    };

    const parallax = () => {
      all<HTMLElement>("[data-parallax]").forEach((wrap) => {
        const frame = wrap.parentElement;
        if (!frame || frame.offsetHeight < window.innerHeight * 0.4) return; // DESIGN.md: only frames taller than 40vh
        // Wrapper is 116% of the frame: +-8% of the frame == +-6.9% of the wrapper.
        gsap.fromTo(
          wrap,
          { yPercent: -6.9 },
          {
            yPercent: 6.9,
            ease: "none",
            scrollTrigger: { trigger: frame, start: "top bottom", end: "bottom top", scrub: 1 },
          },
        );
      });
    };

    const marginRules = () => {
      all<HTMLElement>("[data-margin-rule]").forEach((rule) => {
        const scope = rule.closest<HTMLElement>("[data-margin-scope]") ?? rule.parentElement;
        if (!scope) return;
        gsap.fromTo(
          rule,
          { scaleY: 0 },
          {
            scaleY: 1,
            transformOrigin: "top",
            ease: "none",
            scrollTrigger: { trigger: scope, start: "top 70%", end: "bottom 40%", scrub: 0.6 },
          },
        );
      });
    };

    const mm = createMotionMatcher({
      full: () => {
        reveals(false);
        images(false);
        parallax();
        marginRules();
      },
      lite: () => {
        reveals(true);
        images(true);
      },
      reduced: () => {},
    });

    // Layout settles after fonts and images; refresh once so start/end positions are exact.
    const refresh = () => ScrollTrigger.refresh();
    if (document.fonts?.ready) document.fonts.ready.then(refresh);
    window.addEventListener("load", refresh);

    return () => {
      window.removeEventListener("load", refresh);
      mm.revert();
    };
  }, [ready, motion]);

  return null;
}
