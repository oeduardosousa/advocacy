"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

import { useMotion } from "@/components/providers/MotionProvider";
import { TransitionLink } from "@/components/providers/PageTransition";
import { Magnetic } from "@/components/ui/Magnetic";
import { ArrowRight, WhatsAppGlyph } from "@/components/ui/icons";
import { whenVeilDone } from "@/lib/motion/gate";
import { dur, ease, LITE_STAGGER_FACTOR, scale, shift, stagger } from "@/lib/motion/tokens";
import { CONTACT, ROUTES } from "@/lib/site";

/**
 * "A Tese" — the signature moment (DESIGN.md).
 * Beats: 0 Settle (CSS, nav/CTA) · 1 Typeset · 2 Rule · 3 Develop · 4 Turn (scroll).
 * Text and image are in the DOM from first render; motion only masks their entrance.
 */
export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const { ready, motion } = useMotion();

  useEffect(() => {
    const section = sectionRef.current;
    if (!ready || !motion || !section) return;
    const { createMotionMatcher, gsap, SplitText, ScrollTrigger } = motion;

    const q = <T extends Element>(sel: string) => section.querySelector<T>(sel);
    const qa = <T extends Element>(sel: string) => Array.from(section.querySelectorAll<T>(sel));

    /** Runs the five-beat intro. `lite` shortens it (< 1.6s) and swaps the cover for a fade. */
    const playIntro = (lite: boolean) => {
      const title = q<HTMLElement>("[data-hero-title]");
      const rule = q<HTMLElement>("[data-hero-rule]");
      const marginals = qa("[data-hero-marginal]");
      const blocks = qa("[data-hero-block]");
      const cover = q<HTMLElement>("[data-hero-cover]");
      const image = q<HTMLElement>("[data-hero-image]");
      if (!title) return () => {};

      const k = lite ? LITE_STAGGER_FACTOR : 1;
      const tl = gsap.timeline({ defaults: { ease: ease.out } });

      const split = SplitText.create(title, {
        type: "lines",
        mask: "lines",
        linesClass: "hero-line",
        maskClass: "line-mask",
      });

      // 1. Typeset
      tl.from(split.lines, { yPercent: shift.text, duration: dur.reveal, stagger: stagger.lines * k }, 0.2);

      // 2. Rule (desktop margin) + numerals
      if (rule) tl.fromTo(rule, { scaleY: 0 }, { scaleY: 1, duration: dur.reveal }, 0.6);
      if (marginals.length) tl.from(marginals, { opacity: 0, duration: 0.6, stagger: 0.1 }, 1.0);

      // Lead, actions
      if (blocks.length) {
        tl.from(blocks, { opacity: 0, y: shift.fade, duration: 0.6, stagger: stagger.items * k }, lite ? 0.5 : 0.9);
      }

      // 3. Develop
      if (image) {
        if (lite) {
          if (cover) gsap.set(cover, { display: "none" });
          tl.from(image, { opacity: 0, y: shift.fade, duration: 0.6 }, 0.4);
        } else {
          if (cover) tl.fromTo(cover, { scaleY: 1 }, { scaleY: 0, duration: dur.scene, ease: ease.drawer }, 0.8);
          tl.fromTo(image, { scale: scale.develop }, { scale: 1, duration: dur.scene, ease: ease.drawer }, 0.8);
        }
      } else if (cover) {
        gsap.set(cover, { display: "none" });
      }

      // Scrolling or any input during the intro fast-forwards it to the end state.
      const finish = () => tl.progress(1);
      const events = ["wheel", "touchstart", "keydown", "pointerdown"] as const;
      events.forEach((e) => window.addEventListener(e, finish, { once: true, passive: true }));

      tl.eventCallback("onComplete", () => {
        split.revert(); // one SplitText per heading, reverted when done
        events.forEach((e) => window.removeEventListener(e, finish));
      });

      return () => {
        events.forEach((e) => window.removeEventListener(e, finish));
        tl.kill();
        split.revert();
      };
    };

    let cancelGate = () => {};
    let teardownIntro = () => {};

    const mm = createMotionMatcher(
      {
        full: () => {
          // Beat 4 — Turn: the hero sheet stays put, lifts and recedes as the next sheet covers it.
          section.classList.add("is-stacked");
          const next = document.querySelector<HTMLElement>("[data-sheet='next']");
          const inner = q<HTMLElement>("[data-hero-inner]");

          const setTop = () => {
            const top = Math.min(0, window.innerHeight - section.offsetHeight);
            section.style.setProperty("--hero-top", `${top}px`);
          };
          setTop();
          ScrollTrigger.addEventListener("refreshInit", setTop);

          if (next && inner) {
            gsap.to(inner, {
              scale: scale.recede,
              opacity: 0.6,
              ease: "none",
              transformOrigin: "50% 100%",
              scrollTrigger: {
                trigger: next,
                start: "top bottom",
                end: "top top",
                scrub: 0.6,
                onToggle: (self) => next.toggleAttribute("data-lifted", self.isActive),
              },
            });
          }

          cancelGate = whenVeilDone(() => {
            teardownIntro = playIntro(false);
          });

          return () => {
            cancelGate();
            teardownIntro();
            ScrollTrigger.removeEventListener("refreshInit", setTop);
            section.classList.remove("is-stacked");
            section.style.removeProperty("--hero-top");
            next?.removeAttribute("data-lifted");
          };
        },
        lite: () => {
          cancelGate = whenVeilDone(() => {
            teardownIntro = playIntro(true);
          });
          return () => {
            cancelGate();
            teardownIntro();
          };
        },
        reduced: () => {
          // Static: final state, no cover, no sheet turn (cover is display:none via CSS).
        },
      },
      section,
    );

    return () => mm.revert();
  }, [ready, motion]);

  return (
    <section
      ref={sectionRef}
      aria-labelledby="hero-title"
      className="hero relative z-0 bg-paper"
    >
      <div data-hero-inner className="container-page">
        <div className="grid min-h-svh grid-cols-4 content-between gap-x-4 gap-y-12 pb-12 pt-28 sm:grid-cols-8 sm:gap-x-5 lg:grid-cols-12 lg:gap-x-6 lg:gap-y-0 lg:pb-16 lg:pt-36">
          {/* Margin column (marginalia): decorative, desktop only */}
          <div aria-hidden="true" className="relative hidden lg:col-span-2 lg:row-span-2 lg:block">
            <div
              data-hero-rule
              className="absolute bottom-0 right-0 top-0 w-px origin-top bg-oxblood"
            />
            <p data-hero-marginal className="type-label absolute right-6 top-2 text-ink-mute">
              01
            </p>
            <p data-hero-marginal className="type-label absolute bottom-0 right-6 text-right text-ink-mute">
              02
            </p>
            <p
              data-hero-marginal
              className="type-small absolute bottom-10 right-6 max-w-[16ch] text-right text-ink-mute"
            >
              Conteúdo de demonstração. Escritório fictício.
            </p>
          </div>

          {/* Thesis */}
          <div className="col-span-4 sm:col-span-8 lg:col-span-10">
            <p className="type-label settle mb-8 text-ink-mute lg:hidden">
              01 — Escritório de advocacia
            </p>
            <p className="type-label settle mb-8 hidden text-ink-mute lg:block">
              Escritório de advocacia · Projeto conceito
            </p>
            <h1 id="hero-title" data-hero-title className="type-display max-w-[14ch] text-ink lg:max-w-none">
              Cada caso começa por <em className="italic">escutar.</em>
            </h1>
          </div>

          {/* Lead and actions */}
          <div className="col-span-4 self-end sm:col-span-5 lg:col-span-5 lg:col-start-3">
            <p data-hero-block className="type-lead text-ink-soft">
              Seis áreas do direito, atendimento próximo e linguagem clara. Conte o seu contexto: analisamos
              com cuidado e explicamos cada etapa.
            </p>
            <div data-hero-block className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-2">
              <Magnetic className="hidden lg:inline-block">
                <a
                  href={CONTACT.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-whatsapp settle"
                >
                  <WhatsAppGlyph />
                  Conversar no WhatsApp
                  <span className="sr-only">(abre em nova aba)</span>
                </a>
              </Magnetic>
              <TransitionLink href={ROUTES.areas} className="link-quiet text-ink">
                Conhecer as áreas
                <ArrowRight />
              </TransitionLink>
            </div>
          </div>

          {/* Photograph (demo illustration) */}
          <figure className="col-span-4 sm:col-span-8 lg:col-span-5 lg:col-start-8 lg:self-end">
            <div className="relative aspect-[3/2] overflow-hidden bg-paper-deep">
              <div data-hero-image className="absolute inset-0">
                <Image
                  src="/img/hero-demo.svg"
                  alt="Ilustração de demonstração: luz de janela sobre uma mesa, com folhas de papel e uma caneta-tinteiro."
                  fill
                  priority
                  sizes="(min-width: 1024px) 40vw, 100vw"
                  className="object-cover"
                />
              </div>
              <div data-hero-cover aria-hidden="true" className="hero-cover absolute inset-0 bg-paper-deep" />
            </div>
            <figcaption className="type-small mt-3 text-ink-mute">
              Imagem ilustrativa de demonstração.
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}
