import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ClosingCta } from "@/components/home/ClosingCta";
import { HomeMotion } from "@/components/home/HomeMotion";
import { Band } from "@/components/layout/PageHeader";
import { Mdx } from "@/components/mdx/Mdx";
import { TransitionLink } from "@/components/providers/PageTransition";
import { ArrowRight } from "@/components/ui/icons";
import { Photo } from "@/components/ui/Photo";
import { getPosts, getTeam, getTeamMember } from "@/lib/content";
import { portraitImage, topicTag } from "@/lib/demo-images";
import { ROUTES } from "@/lib/site";

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
  return { title: member?.name ?? "Equipe", description: member?.summary };
}

export default async function TeamMemberPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const member = getTeamMember(slug);
  if (!member) notFound();

  const posts = getPosts().filter((post) => post.author === slug);
  const team = getTeam();
  const next = team[(team.findIndex((m) => m.slug === slug) + 1) % team.length];

  return (
    <>
      <header className="container-page pb-16 pt-36 lg:pb-24 lg:pt-48">
        <div className="grid grid-cols-4 gap-x-4 gap-y-10 sm:grid-cols-8 sm:gap-x-5 lg:grid-cols-12 lg:gap-x-6">
          <p className="type-label margin-label col-span-4 text-ink-mute sm:col-span-8 lg:col-span-2 lg:text-right">
            Equipe
          </p>
          <div className="col-span-4 sm:col-span-8 lg:col-span-6 lg:col-start-3">
            <h1 id="page-title" data-reveal="lines" className="type-headline">
              {member.name}
            </h1>
            <p data-reveal="block" className="type-lead mt-6 text-ink-soft">
              {member.role}
            </p>
            <p data-reveal="block" className="type-small mt-4 text-ink-mute">
              {member.oab ? `${member.oab} · ` : ""}Retrato fictício
            </p>
          </div>
          <div className="col-span-4 sm:col-span-5 lg:col-span-3 lg:col-start-10 lg:row-span-1 lg:-mt-6">
            <Photo
              src={portraitImage(member.order)}
              alt={member.portraitAlt ?? "Retrato fictício de demonstração"}
              ratio="aspect-[4/5]"
              sizes="(min-width: 1024px) 26vw, 80vw"
            />
          </div>
        </div>
      </header>

      <Band tone="light" labelledBy="bio">
        <h2 id="bio" className="sr-only">
          Biografia
        </h2>
        <div className="col-span-4 sm:col-span-8 lg:col-span-6 lg:col-start-3">
          <div data-reveal="block">
            <Mdx source={member.body} />
          </div>
        </div>
      </Band>

      {posts.length > 0 ? (
        <Band label="Escreve sobre" labelledBy="member-posts">
          <h2
            id="member-posts"
            data-reveal="lines"
            className="type-title col-span-4 sm:col-span-8 lg:col-span-9"
          >
            Artigos de {member.name}.
          </h2>
          <ul
            data-reveal="items"
            className="col-span-4 sm:col-span-8 lg:col-span-8 lg:col-start-3"
          >
            {posts.map((post) => (
              <li key={post.slug} className="border-t border-rule last:border-b">
                <TransitionLink
                  href={ROUTES.post(post.slug)}
                  className="row-link group grid grid-cols-[1fr_auto] items-start gap-x-6 py-6"
                >
                  <span>
                    <span className="type-label block text-ink-mute">{topicTag(post.tags)}</span>
                    <span className="type-title mt-2 block">{post.title}</span>
                  </span>
                  <ArrowRight aria-hidden className="row-arrow mt-6" />
                </TransitionLink>
              </li>
            ))}
          </ul>
        </Band>
      ) : null}

      <Band>
        <div className="col-span-4 flex flex-wrap items-center gap-x-10 gap-y-2 sm:col-span-8 lg:col-span-8 lg:col-start-3">
          <TransitionLink href={ROUTES.team} className="link-quiet text-ink">
            Toda a equipe
          </TransitionLink>
          <TransitionLink href={ROUTES.member(next.slug)} className="link-quiet text-ink">
            Próximo perfil
            <ArrowRight />
          </TransitionLink>
        </div>
      </Band>

      <ClosingCta />
      <HomeMotion />
    </>
  );
}
