import type { Metadata } from "next";

import { TransitionLink } from "@/components/providers/PageTransition";
import { ArrowRight } from "@/components/ui/icons";
import { ROUTES, SITE } from "@/lib/site";

export const metadata: Metadata = { title: "Página não encontrada" };

/** 404 in the site's own voice: margin column, headline on the grid, two ways out. */
export default function NotFound() {
  return (
    <div className="container-page pb-24 pt-36 lg:pb-32 lg:pt-48">
      <div className="grid grid-cols-4 gap-x-4 gap-y-8 sm:grid-cols-8 sm:gap-x-5 lg:grid-cols-12 lg:gap-x-6">
        <p className="type-label margin-label col-span-4 text-ink-mute sm:col-span-8 lg:col-span-2 lg:text-right">
          Erro 404
        </p>
        <h1 className="type-headline col-span-4 sm:col-span-8 lg:col-span-9">
          Não encontramos esta página.
        </h1>
        <div className="col-span-4 sm:col-span-6 lg:col-span-6 lg:col-start-3">
          <p className="type-lead text-ink-soft">
            O endereço pode ter mudado ou nunca ter existido neste site de demonstração. Volte ao
            início ou veja as áreas de atuação.
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-2">
            <TransitionLink href={ROUTES.home} className="btn btn-primary">
              Voltar ao início
            </TransitionLink>
            <TransitionLink href={ROUTES.areas} className="link-quiet text-ink">
              Ver áreas de atuação
              <ArrowRight />
            </TransitionLink>
          </div>
          <p className="type-small mt-12 text-ink-mute">{SITE.notice}</p>
        </div>
      </div>
    </div>
  );
}
