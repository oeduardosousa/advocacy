import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { PagePlaceholder } from "@/components/layout/PagePlaceholder";
import { Mdx } from "@/components/mdx/Mdx";
import { getPost, getPosts } from "@/lib/content";
import { SITE } from "@/lib/site";

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
  return { title: post?.title ?? "Blog" };
}

export default async function PostPage({ params }: { params: Promise<Params> }) {
  const post = getPost((await params).slug);
  if (!post) notFound();

  return (
    <PagePlaceholder title={post.title} description={post.summary}>
      <p className="type-small mb-8 text-ink-mute">
        {post.readingTimeMinutes} min de leitura · {post.tags.join(", ")}
      </p>
      <Mdx source={post.body} />
      <p className="type-small mt-12 text-ink-mute">{SITE.disclaimer}</p>
    </PagePlaceholder>
  );
}
