"use client";

import { Img } from "@/components/ui/Img";
import { useEffect, useId, useRef, useState } from "react";

import { useMotion } from "@/components/providers/MotionProvider";
import { TransitionLink } from "@/components/providers/PageTransition";
import { ArrowUpRight, Minus, Plus } from "@/components/ui/icons";
import type { Area } from "@/lib/content";
import { ROUTES } from "@/lib/site";

const PIN_VIEWPORTS = 2.4; // stays under the 4-viewport pin budget

/** Each photograph wipes in from a different side and slowly pushes into its own focal point. */
const WIPES = [
  "inset(0 0 100% 0)",
  "inset(0 100% 0 0)",
  "inset(100% 0 0 0)",
  "inset(0 0 0 100%)",
];
const FOCI = ["70% 38%", "28% 62%", "52% 30%", "38% 72%", "66% 66%", "30% 34%"];

function areaImage(slug: string) {
  return `area-${slug}`;
}

/**
 * Practice Areas index, the signature list (DESIGN.md).
 * Full tier: pinned scene. The index stays put while photographs cross-fade (opacity,
 * 480ms) and the oxblood numeral advances with scroll progress; hover also selects a row.
 * Lite / reduced: an ordinary stacked index; each row expands on tap to show its photo
 * (grid-template-rows, 320ms). Summaries and links are always visible, so the pin is never
 * needed to understand the content.
 */
export function Areas({ areas }: { areas: Area[] }) {
  const { ready, tier, motion } = useMotion();
  const pinRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [open, setOpen] = useState<string | null>(null);
  /** Pinned content taller than the viewport: only the active row shows its summary. */
  const [compact, setCompact] = useState(false);
  const baseId = useId();

  const pinned = ready && tier === "full";

  useEffect(() => {
    const el = pinRef.current;
    if (!pinned || !motion || !el) return;
    const { ScrollTrigger } = motion;
    const st = ScrollTrigger.create({
      trigger: el,
      start: "top top",
      end: () => `+=${Math.round(window.innerHeight * PIN_VIEWPORTS)}`,
      pin: true,
      // Measure first, so every trigger below the pin is computed with its spacing.
      refreshPriority: 1,
      invalidateOnRefresh: true,
      onRefresh: () =>
        // Hysteresis: hiding summaries frees ~120px, so do not flip back until they would fit.
        setCompact((prev) => el.scrollHeight + (prev ? 120 : 0) > window.innerHeight + 1),
      onUpdate: (self) => {
        setActive(Math.min(areas.length - 1, Math.floor(self.progress * areas.length)));
      },
    });
    // Pin spacing changes the page height: recompute triggers created for later sections.
    const raf = requestAnimationFrame(() => ScrollTrigger.refresh());
    return () => {
      cancelAnimationFrame(raf);
      st.kill();
    };
  }, [pinned, motion, areas.length]);

  const pad = (n: number) => String(n + 1).padStart(2, "0");

  return (
    <section id="areas" aria-labelledby="areas-title" className="relative z-20 bg-paper">
      <div
        ref={pinRef}
        className="container-page flex flex-col justify-center py-[clamp(64px,8vw,128px)] lg:min-h-svh lg:py-12"
      >
        <div className="grid grid-cols-4 gap-x-4 sm:grid-cols-8 sm:gap-x-5 lg:grid-cols-12 lg:gap-x-6">
          {/* Margin: inline numeral on small screens, advancing numeral when pinned */}
          <p className="type-label margin-label col-span-4 mb-6 text-ink-mute sm:col-span-8 lg:col-span-2 lg:mb-0 lg:text-right">
            Áreas de atuação
          </p>
          <div className="col-span-4 sm:col-span-8 lg:col-span-10">
            <h2 id="areas-title" data-reveal="lines" className="type-headline">
              Áreas em que atuamos.
            </h2>
          </div>

          <div
            aria-hidden="true"
            className="relative hidden lg:col-span-2 lg:mt-12 lg:block"
          >
            {pinned ? (
              <p className="type-headline absolute right-6 top-0 text-oxblood tabular-nums">
                {pad(active)}
              </p>
            ) : null}
          </div>

          <ul
            className={`col-span-4 mt-10 sm:col-span-8 lg:mt-8 ${
              pinned ? "lg:col-span-5" : "lg:col-span-10"
            }`}
          >
            {areas.map((area, i) => {
              const isActive = pinned && i === active;
              const expanded = open === area.slug;
              const panelId = `${baseId}-${area.slug}`;
              return (
                <li
                  key={area.slug}
                  className="relative border-t border-rule last:border-b"
                  onMouseEnter={pinned ? () => setActive(i) : undefined}
                >
                  {pinned ? (
                    <span
                      aria-hidden="true"
                      className={`absolute -left-4 bottom-3 top-3 w-[3px] origin-top bg-oxblood transition-transform duration-[500ms] ease-drawer ${
                        isActive ? "scale-y-100" : "scale-y-0"
                      }`}
                    />
                  ) : null}
                  <div
                    className={`grid grid-cols-[2.5rem_1fr_auto] items-start gap-x-4 py-5 sm:grid-cols-[3.5rem_1fr_auto] lg:py-3.5 ${
                      pinned ? "transition-transform duration-[500ms] ease-drawer" : ""
                    } ${isActive ? "lg:translate-x-3" : ""}`}
                  >
                    <span
                      className={`type-label pt-3 tabular-nums transition-colors duration-[160ms] ${
                        isActive ? "text-oxblood" : "text-ink-mute"
                      }`}
                    >
                      {pad(i)}
                    </span>
                    <div>
                      <TransitionLink
                        href={ROUTES.area(area.slug)}
                        className={`type-title inline-block origin-left py-1 transition-[transform,color] duration-[500ms] ease-drawer ${
                          !pinned ? "text-ink" : isActive ? "scale-[1.14] text-oxblood" : "text-ink-mute"
                        }`}
                      >
                        {area.name}
                      </TransitionLink>
                      <p
                        className={`type-small mt-1 max-w-[70ch] transition-colors duration-[500ms] ease-drawer ${
                          isActive ? "text-ink" : "text-ink-mute"
                        } ${compact && !isActive ? "hidden" : ""}`}
                      >{area.summary}</p>
                    </div>
                    {pinned ? (
                      <ArrowUpRight
                        aria-hidden
                        className={`mt-3 transition-opacity duration-[160ms] ${isActive ? "opacity-100" : "opacity-30"}`}
                      />
                    ) : (
                      <button
                        type="button"
                        className="-mr-3 -mt-1 flex h-11 w-11 items-center justify-center text-ink transition-transform duration-[120ms] ease-out active:scale-[0.9]"
                        aria-expanded={expanded}
                        aria-controls={panelId}
                        onClick={() => setOpen(expanded ? null : area.slug)}
                      >
                        {expanded ? <Minus /> : <Plus />}
                        <span className="sr-only">
                          {expanded ? "Ocultar" : "Mostrar"} imagem de {area.name}
                        </span>
                      </button>
                    )}
                  </div>

                  {!pinned ? (
                    <div
                      id={panelId}
                      className={`grid transition-[grid-template-rows] ease-drawer ${expanded ? "duration-[320ms]" : "duration-[200ms]"}`}
                      style={{ gridTemplateRows: expanded ? "1fr" : "0fr" }}
                      inert={!expanded}
                    >
                      <div className="overflow-hidden">
                        <div className="relative mb-6 aspect-[3/2] sm:ml-[3.5rem]">
                          <Img
                            name={areaImage(area.slug)}
                            alt={`Ilustração de demonstração para ${area.name}`}
                            sizes="(min-width: 640px) 80vw, 100vw"
                            loading="eager"
                            className="object-cover"
                          />
                        </div>
                      </div>
                    </div>
                  ) : null}
                </li>
              );
            })}
          </ul>

          {pinned ? (
            <div className="relative lg:col-span-5 lg:mt-8">
              <div className="relative h-[min(66svh,41rem)] overflow-hidden bg-paper-deep">
                {areas.map((area, i) => {
                  const on = i === active;
                  return (
                    <div
                      key={area.slug}
                      className="area-shot absolute inset-0"
                      data-on={on ? "" : undefined}
                      style={
                        {
                          "--wipe": WIPES[i % WIPES.length],
                          "--focus": FOCI[i % FOCI.length],
                          zIndex: on ? 2 : 1,
                        } as React.CSSProperties
                      }
                    >
                      <Img
                        name={areaImage(area.slug)}
                        alt={on ? `Ilustração de demonstração para ${area.name}` : ""}
                        aria-hidden={on ? undefined : true}
                        sizes="45vw"
                        className="object-cover"
                      />
                    </div>
                  );
                })}
                <div
                  key={active}
                  aria-hidden="true"
                  className="area-caption pointer-events-none absolute inset-x-0 bottom-0 z-10 flex items-end justify-between gap-4 bg-gradient-to-t from-ink/70 to-transparent p-5 text-paper"
                >
                  <span className="type-label">{areas[active]?.name}</span>
                  <span className="font-serif text-3xl leading-none tabular-nums">{pad(active)}</span>
                </div>
              </div>
              <div aria-hidden="true" className="mt-3 h-px w-full bg-rule">
                <div
                  className="h-px origin-left bg-oxblood transition-transform duration-[600ms] ease-drawer"
                  style={{ transform: `scaleX(${(active + 1) / areas.length})` }}
                />
              </div>
              <p className="type-small mt-3 text-ink-mute">Imagens ilustrativas de demonstração.</p>
            </div>
          ) : null}
        </div>

        {!pinned ? (
          <p className="type-small mt-8 text-ink-mute lg:ml-[calc(16.666%+0.5rem)]">
            Imagens ilustrativas de demonstração.
          </p>
        ) : null}
      </div>
    </section>
  );
}
