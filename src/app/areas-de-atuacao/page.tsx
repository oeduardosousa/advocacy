import type { Metadata } from "next";

import { PagePlaceholder } from "@/components/layout/PagePlaceholder";
import { TransitionLink } from "@/components/providers/PageTransition";
import { getAreas } from "@/lib/content";
import { ROUTES } from "@/lib/site";

export const metadata: Metadata = { title: "Áreas de Atuação" };

export default function AreasPage() {
  const areas = getAreas();
  return (
    <PagePlaceholder
      title="Áreas de Atuação"
      description="Índice das áreas (conteúdo de demonstração)."
    >
      <ul className="border-t border-rule">
        {areas.map((area) => (
          <li key={area.slug} className="border-b border-rule py-4">
            <TransitionLink href={ROUTES.area(area.slug)} className="type-title">
              {area.name}
            </TransitionLink>
          </li>
        ))}
      </ul>
    </PagePlaceholder>
  );
}
