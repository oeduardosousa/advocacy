import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { PagePlaceholder } from "@/components/layout/PagePlaceholder";
import { Mdx } from "@/components/mdx/Mdx";
import { getTeam, getTeamMember } from "@/lib/content";

type Params = { slug: string };

export const dynamicParams = false;

export function generateStaticParams(): Params[] {
  return getTeam().map(({ slug }) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const member = getTeamMember((await params).slug);
  return { title: member?.name ?? "Equipe" };
}

export default async function TeamMemberPage({ params }: { params: Promise<Params> }) {
  const member = getTeamMember((await params).slug);
  if (!member) notFound();

  return (
    <PagePlaceholder title={member.name} description={member.summary}>
      <p className="type-small mb-8 text-ink-mute">
        {member.role}
        {member.oab ? ` · ${member.oab}` : ""}
      </p>
      <Mdx source={member.body} />
    </PagePlaceholder>
  );
}
