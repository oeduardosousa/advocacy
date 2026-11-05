import type { Metadata } from "next";

import { ClosingCta } from "@/components/home/ClosingCta";
import { HomeMotion } from "@/components/home/HomeMotion";
import { Band, PageHeader } from "@/components/layout/PageHeader";
import { TransitionLink } from "@/components/providers/PageTransition";
import { ArrowUpRight } from "@/components/ui/icons";
import { getAreas } from "@/lib/content";
import { ROUTES } from "@/lib/site";

export const metadata: Metadata = {
  title: "Áreas de Atuação",
  description: "Áreas de atuação do escritório. Conteúdo de demonstração, escritório fictício.",
};

export default function AreasPage() {
  const areas = getAreas();
  return (
    <>
      <PageHeader
        label="Áreas de atuação"
        title={
          <>
            Seis áreas, <em className="italic">uma mesma escuta.</em>
          </>
        }
        lead="Cada área tem uma página própria, com os temas mais comuns e a forma como o trabalho costuma ser conduzido."
      />

      <Band labelledBy="areas-index" className="pb-8">
        <h2 id="areas-index" className="sr-only">
          Lista de áreas
        </h2>
        <ul
          data-reveal="items"
          className="col-span-4 sm:col-span-8 lg:col-span-10 lg:col-start-3"
        >
          {areas.map((area, i) => (
            <li key={area.slug} data-cursor="Ver" className="border-t border-rule last:border-b">
              <TransitionLink
                href={ROUTES.area(area.slug)}
                className="row-link group grid grid-cols-[2.5rem_1fr_auto] items-start gap-x-4 py-7 sm:grid-cols-[3.5rem_1fr_auto] lg:grid-cols-[3.5rem_minmax(0,1fr)_minmax(0,1.1fr)_auto] lg:gap-x-8 lg:py-9"
              >
                <span className="type-label pt-3 tabular-nums text-ink-mute transition-colors duration-[160ms] group-hover:text-oxblood">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="type-title">{area.name}</span>
                <span className="type-small col-start-2 mt-2 max-w-[56ch] text-ink-mute lg:col-start-3 lg:mt-1.5">
                  {area.summary}
                </span>
                <ArrowUpRight
                  aria-hidden
                  className="row-arrow row-arrow-up col-start-3 row-start-1 mt-3 text-ink lg:col-start-4"
                />
              </TransitionLink>
            </li>
          ))}
        </ul>
        <p className="type-small col-span-4 text-ink-mute sm:col-span-8 lg:col-span-10 lg:col-start-3">
          Conteúdo de demonstração. Os textos são informativos e não constituem aconselhamento
          jurídico.
        </p>
      </Band>

      <ClosingCta />
      <HomeMotion />
    </>
  );
}
