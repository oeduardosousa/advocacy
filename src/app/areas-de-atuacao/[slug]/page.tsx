import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ClosingCta } from "@/components/home/ClosingCta";
import { HomeMotion } from "@/components/home/HomeMotion";
import { Band, PageHeader } from "@/components/layout/PageHeader";
import { Mdx } from "@/components/mdx/Mdx";
import { TransitionLink } from "@/components/providers/PageTransition";
import { ArrowRight } from "@/components/ui/icons";
import { Photo } from "@/components/ui/Photo";
import { getAreas, getArea, getPosts } from "@/lib/content";
import { areaImage, topicTag } from "@/lib/demo-images";
import { ROUTES, SITE } from "@/lib/site";

type Params = { slug: string };

export const dynamicParams = false;

export function generateStaticParams(): Params[] {
  return getAreas().map(({ slug }) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const area = getArea((await params).slug);
  return { title: area?.name ?? "Áreas de Atuação", description: area?.summary };
}

export default async function AreaPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const area = getArea(slug);
  if (!area) notFound();

  const areas = getAreas();
  const index = areas.findIndex((a) => a.slug === slug);
  const next = areas[(index + 1) % areas.length];
  const related = getPosts()
    .filter((post) => post.area === slug)
    .slice(0, 2);
  const numeral = String(index + 1).padStart(2, "0");

  return (
    <>
      <PageHeader label={`Área ${numeral}`} title={area.name} lead={area.summary} />

      <Band tone="light" labelledBy="area-body">
        <h2 id="area-body" className="sr-only">
          Sobre {area.name}
        </h2>
        <div className="col-span-4 sm:col-span-8 lg:col-span-6 lg:col-start-3">
          <div data-reveal="block">
            <Mdx source={area.body} />
          </div>
        </div>
        <aside
          aria-label="Imagem e artigos relacionados"
          className="col-span-4 sm:col-span-5 lg:col-span-3 lg:col-start-10"
        >
          <Photo
            src={areaImage(area.slug)}
            alt={`Ilustração de demonstração para ${area.name}.`}
            ratio="aspect-[4/5]"
            sizes="(min-width: 1024px) 26vw, 80vw"
          />
          <p className="type-small mt-3 text-ink-mute">Imagem ilustrativa de demonstração.</p>
        </aside>
      </Band>

      {related.length > 0 ? (
        <Band label="Leituras" labelledBy="area-reads">
          <h2
            id="area-reads"
            data-reveal="lines"
            className="type-title col-span-4 sm:col-span-8 lg:col-span-9"
          >
            Artigos sobre este tema.
          </h2>
          <ul
            data-reveal="items"
            className="col-span-4 sm:col-span-8 lg:col-span-8 lg:col-start-3"
          >
            {related.map((post) => (
              <li key={post.slug} className="border-t border-rule last:border-b">
                <TransitionLink
                  href={ROUTES.post(post.slug)}
                  className="row-link group grid grid-cols-[1fr_auto] items-start gap-x-6 py-6"
                >
                  <span>
                    <span className="type-label block text-ink-mute">{topicTag(post.tags)}</span>
                    <span className="type-title mt-2 block">{post.title}</span>
                    <span className="type-small mt-2 block text-ink-mute">
                      {post.readingTimeMinutes} min de leitura · Conteúdo de demonstração
                    </span>
                  </span>
                  <ArrowRight aria-hidden className="row-arrow mt-6" />
                </TransitionLink>
              </li>
            ))}
          </ul>
        </Band>
      ) : null}

      <Band>
        <div className="col-span-4 sm:col-span-8 lg:col-span-8 lg:col-start-3">
          <p className="type-label text-ink-mute">Próxima área</p>
          <TransitionLink
            href={ROUTES.area(next.slug)}
            className="row-link group mt-3 inline-flex items-center gap-4 py-2"
          >
            <span className="type-headline">{next.name}</span>
            <ArrowRight aria-hidden className="row-arrow shrink-0" />
          </TransitionLink>
          <p className="type-small mt-8 text-ink-mute">{SITE.disclaimer}</p>
        </div>
      </Band>

      <ClosingCta />
      <HomeMotion />
    </>
  );
}
