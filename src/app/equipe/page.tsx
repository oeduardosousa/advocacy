import type { Metadata } from "next";

import { ClosingCta } from "@/components/home/ClosingCta";
import { HomeMotion } from "@/components/home/HomeMotion";
import { Band, PageHeader } from "@/components/layout/PageHeader";
import { TransitionLink } from "@/components/providers/PageTransition";
import { Photo } from "@/components/ui/Photo";
import { getTeam } from "@/lib/content";
import { portraitImage } from "@/lib/demo-images";
import { ROUTES } from "@/lib/site";

export const metadata: Metadata = {
  title: "Equipe",
  description: "Perfis de demonstração. Nomes, números de OAB e retratos são fictícios.",
};

// Uneven editorial grid: tall and short in alternation, never equal cards (DESIGN.md Layout).
const SLOTS = [
  "lg:col-span-4 lg:col-start-3",
  "lg:col-span-4 lg:col-start-8 lg:mt-24",
  "lg:col-span-4 lg:col-start-3 lg:-mt-8",
  "lg:col-span-4 lg:col-start-8 lg:mt-16",
] as const;

export default function TeamPage() {
  const members = getTeam();
  return (
    <>
      <PageHeader
        label="Equipe"
        title={
          <>
            Pessoas que <em className="italic">conduzem cada caso.</em>
          </>
        }
        lead="Perfis de demonstração: nomes, números de OAB e retratos são fictícios."
      />

      <Band labelledBy="team-list" className="pb-8">
        <h2 id="team-list" className="sr-only">
          Integrantes da equipe
        </h2>
        {members.map((member, i) => (
          <article
            key={member.slug}
            data-reveal="block"
            className={`col-span-4 sm:col-span-5 ${SLOTS[i % SLOTS.length]} ${i % 2 ? "sm:col-start-4" : ""}`}
          >
            <TransitionLink href={ROUTES.member(member.slug)} className="group block">
              <Photo
                src={portraitImage(member.order)}
                alt={member.portraitAlt ?? "Retrato fictício de demonstração"}
                ratio="aspect-[4/5]"
                sizes="(min-width: 1024px) 33vw, 80vw"
                hoverZoom
              />
              <h3 className="type-title mt-5">
                <span className="link-underline">{member.name}</span>
              </h3>
            </TransitionLink>
            <p className="type-small mt-1 text-ink-soft">{member.role}</p>
            {member.oab ? <p className="type-small text-ink-mute">{member.oab}</p> : null}
            <p className="type-small text-ink-mute">Retrato fictício</p>
          </article>
        ))}
      </Band>

      <ClosingCta />
      <HomeMotion />
    </>
  );
}
