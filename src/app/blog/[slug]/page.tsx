import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ReadingProgress } from "@/components/blog/ReadingProgress";
import { ClosingCta } from "@/components/home/ClosingCta";
import { HomeMotion } from "@/components/home/HomeMotion";
import { Band } from "@/components/layout/PageHeader";
import { Mdx } from "@/components/mdx/Mdx";
import { TransitionLink } from "@/components/providers/PageTransition";
import { ArrowRight } from "@/components/ui/icons";
import { Photo } from "@/components/ui/Photo";
import { getArea, getPost, getPosts, getTeamMember } from "@/lib/content";
import { formatDate, topicTag } from "@/lib/demo-images";
import { ROUTES, SITE } from "@/lib/site";

type Params = { slug: string };

export const dynamicParams = false;

export function generateStaticParams(): Params[] {
  return getPosts().map(({ slug }) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const post = getPost((await params).slug);
  return { title: post?.title ?? "Blog", description: post?.summary };
}

export default async function PostPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const posts = getPosts();
  const index = posts.findIndex((p) => p.slug === slug);
  const next = posts[(index + 1) % posts.length];
  const author = post.author ? getTeamMember(post.author) : undefined;
  const area = post.area ? getArea(post.area) : undefined;

  return (
    <>
      <ReadingProgress targetId="article-body" />

      <header className="container-page pb-14 pt-36 lg:pb-20 lg:pt-48">
        <div className="grid grid-cols-4 gap-x-4 gap-y-8 sm:grid-cols-8 sm:gap-x-5 lg:grid-cols-12 lg:gap-x-6">
          <p className="type-label margin-label col-span-4 text-ink-mute sm:col-span-8 lg:col-span-2 lg:text-right">
            {topicTag(post.tags)}
          </p>
          <h1
            id="page-title"
            data-reveal="lines"
            className="type-headline col-span-4 sm:col-span-8 lg:col-span-9 lg:max-w-[20ch]"
          >
            {post.title}
          </h1>
          <div className="col-span-4 sm:col-span-6 lg:col-span-6 lg:col-start-3">
            <p data-reveal="block" className="type-lead text-ink-soft">
              {post.summary}
            </p>
            <p data-reveal="block" className="type-small mt-6 text-ink-mute">
              <time dateTime={post.date}>{formatDate(post.date)}</time> ·{" "}
              {post.readingTimeMinutes} min de leitura
              {author ? ` · ${author.name}` : ""}
            </p>
          </div>
        </div>
      </header>

      <div className="container-page pb-14 lg:pb-20">
        <div className="grid grid-cols-4 gap-x-4 sm:grid-cols-8 sm:gap-x-5 lg:grid-cols-12 lg:gap-x-6">
          <div className="col-span-4 sm:col-span-8 lg:col-span-9 lg:col-start-3">
            <Photo
              src={post.cover}
              alt={post.coverAlt}
              ratio="aspect-[16/9]"
              sizes="(min-width: 1024px) 70vw, 100vw"
              priority
              parallax
            />
            <p className="type-small mt-3 text-ink-mute">Imagem ilustrativa de demonstração.</p>
          </div>
        </div>
      </div>

      <Band tone="light" labelledBy="article-heading">
        <h2 id="article-heading" className="sr-only">
          Texto do artigo
        </h2>
        <article
          id="article-body"
          className="article-body col-span-4 sm:col-span-8 lg:col-span-7 lg:col-start-3"
        >
          <Mdx source={post.body} />

          <aside className="mt-14 max-w-[65ch] border-t border-rule pt-6" aria-label="Aviso">
            <p className="type-small text-ink-mute">
              {SITE.disclaimer} {SITE.notice}
            </p>
          </aside>
        </article>

        <aside
          aria-label="Sobre o artigo"
          className="col-span-4 sm:col-span-8 lg:col-span-3 lg:col-start-10"
        >
          <dl className="space-y-6 lg:sticky lg:top-28">
            {author ? (
              <div>
                <dt className="type-label text-ink-mute">Autoria</dt>
                <dd className="mt-2">
                  <TransitionLink href={ROUTES.member(author.slug)} className="type-title link-underline">
                    {author.name}
                  </TransitionLink>
                  <span className="type-small mt-1 block text-ink-mute">Perfil fictício</span>
                </dd>
              </div>
            ) : null}
            {area ? (
              <div>
                <dt className="type-label text-ink-mute">Área</dt>
                <dd className="mt-2">
                  <TransitionLink href={ROUTES.area(area.slug)} className="type-body link-underline">
                    {area.name}
                  </TransitionLink>
                </dd>
              </div>
            ) : null}
            <div>
              <dt className="type-label text-ink-mute">Temas</dt>
              <dd className="type-body mt-2 text-ink-soft">{post.tags.join(", ")}</dd>
            </div>
          </dl>
        </aside>
      </Band>

      <Band>
        <div className="col-span-4 sm:col-span-8 lg:col-span-8 lg:col-start-3">
          <p className="type-label text-ink-mute">Próximo artigo</p>
          <TransitionLink
            href={ROUTES.post(next.slug)}
            className="row-link group mt-3 inline-flex max-w-[24ch] items-start gap-4 py-2"
          >
            <span className="type-headline">{next.title}</span>
            <ArrowRight aria-hidden className="row-arrow mt-3 shrink-0" />
          </TransitionLink>
          <div className="mt-8">
            <TransitionLink href={ROUTES.blog} className="link-quiet text-ink">
              Todos os artigos
            </TransitionLink>
          </div>
        </div>
      </Band>

      <ClosingCta />
      <HomeMotion />
    </>
  );
}
