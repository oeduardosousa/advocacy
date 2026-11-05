import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { PagePlaceholder } from "@/components/layout/PagePlaceholder";
import { Mdx } from "@/components/mdx/Mdx";
import { getArea, getAreas } from "@/lib/content";

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
  return { title: area?.name ?? "Área de atuação" };
}

export default async function AreaPage({ params }: { params: Promise<Params> }) {
  const area = getArea((await params).slug);
  if (!area) notFound();

  return (
    <PagePlaceholder title={area.name} description={area.summary}>
      <Mdx source={area.body} />
    </PagePlaceholder>
  );
}
