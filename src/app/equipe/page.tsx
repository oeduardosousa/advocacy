import type { Metadata } from "next";

import { PagePlaceholder } from "@/components/layout/PagePlaceholder";
import { TransitionLink } from "@/components/providers/PageTransition";
import { getTeam } from "@/lib/content";
import { ROUTES } from "@/lib/site";

export const metadata: Metadata = { title: "Equipe" };

export default function TeamPage() {
  const team = getTeam();
  return (
    <PagePlaceholder title="Equipe" description="Perfis fictícios de demonstração.">
      <ul className="border-t border-rule">
        {team.map((member) => (
          <li key={member.slug} className="border-b border-rule py-4">
            <TransitionLink href={ROUTES.member(member.slug)} className="type-title">
              {member.name}
            </TransitionLink>
            <p className="type-small text-ink-mute">{member.role}</p>
          </li>
        ))}
      </ul>
    </PagePlaceholder>
  );
}
