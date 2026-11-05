import { TransitionLink } from "@/components/providers/PageTransition";
import { ArrowRight } from "@/components/ui/icons";
import { Photo } from "@/components/ui/Photo";
import type { TeamMember } from "@/lib/content";
import { ROUTES } from "@/lib/site";

// Uneven editorial grid: one tall, one short, in alternation (DESIGN.md Layout).
const SLOTS = [
  "lg:col-span-4 lg:col-start-3",
  "lg:col-span-3 lg:col-start-7 lg:mt-32",
  "lg:col-span-3 lg:col-start-10 lg:mt-12",
] as const;

/** Sheet 5 — team preview. All people, OAB numbers and portraits are fictional and labeled. */
export function Team({ members }: { members: TeamMember[] }) {
  const preview = members.slice(0, 3);
  return (
    <section id="equipe" aria-labelledby="team-title" className="relative z-20 bg-paper">
      <div className="container-page section-major">
        <div className="grid grid-cols-4 gap-x-4 gap-y-12 sm:grid-cols-8 sm:gap-x-5 lg:grid-cols-12 lg:gap-x-6">
          <p className="type-label col-span-4 text-ink-mute sm:col-span-8 lg:col-span-2 lg:text-right">
            Equipe
          </p>
          <div className="col-span-4 sm:col-span-8 lg:col-span-9">
            <h2 id="team-title" data-reveal="lines" className="type-headline">
              Pessoas que conduzem cada caso.
            </h2>
            <p data-reveal="block" className="type-small mt-6 text-ink-mute">
              Perfis de demonstração: nomes, números de OAB e retratos são fictícios.
            </p>
          </div>

          {preview.map((member, i) => (
            <article
              key={member.slug}
              className={`col-span-4 grid grid-cols-[6.5rem_1fr] items-start gap-x-5 sm:col-span-4 sm:block ${SLOTS[i]}`}
            >
              <Photo
                src={`/img/demo/portrait-${i + 1}.svg`}
                alt={member.portraitAlt ?? "Retrato fictício de demonstração"}
                ratio="aspect-[4/5]"
                sizes="(min-width: 1024px) 28vw, 50vw"
              />
              <div>
              <h3 className="type-title mt-0 sm:mt-5">
                <TransitionLink href={ROUTES.member(member.slug)}>{member.name}</TransitionLink>
              </h3>
              <p className="type-small mt-1 text-ink-soft">{member.role}</p>
              {member.oab ? <p className="type-small text-ink-mute">{member.oab}</p> : null}
              <p className="type-small text-ink-mute">Retrato fictício</p>
              </div>
            </article>
          ))}

          <div className="col-span-4 sm:col-span-8 lg:col-span-4 lg:col-start-3">
            <TransitionLink href={ROUTES.team} className="link-quiet text-ink">
              Ver toda a equipe
              <ArrowRight />
            </TransitionLink>
          </div>
        </div>
      </div>
    </section>
  );
}
