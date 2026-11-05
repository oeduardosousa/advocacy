import type { Metadata } from "next";

import { PostIndex } from "@/components/blog/PostIndex";
import { ClosingCta } from "@/components/home/ClosingCta";
import { HomeMotion } from "@/components/home/HomeMotion";
import { Band, PageHeader } from "@/components/layout/PageHeader";
import { getPostTags, getPosts } from "@/lib/content";

export const metadata: Metadata = {
  title: "Blog",
  description: "Artigos informativos de demonstração. Conteúdo fictício, sem aconselhamento jurídico.",
};

export default function BlogPage() {
  const posts = getPosts().map(({ slug, title, summary, date, tags, readingTimeMinutes }) => ({
    slug,
    title,
    summary,
    date,
    tags,
    readingTimeMinutes,
  }));
  const tags = getPostTags().filter((tag) => tag !== "Demonstração");

  return (
    <>
      <PageHeader
        label="Insights"
        title={
          <>
            Textos para <em className="italic">entender melhor.</em>
          </>
        }
        lead="Artigos informativos, em linguagem simples. Conteúdo de demonstração: não constitui aconselhamento jurídico."
      />

      <Band tone="light" labelledBy="blog-list" className="min-h-[60svh]">
        <h2 id="blog-list" className="sr-only">
          Artigos
        </h2>
        {posts.length === 0 ? (
          <p className="type-body col-span-4 text-ink-soft sm:col-span-8 lg:col-span-8 lg:col-start-3">
            Ainda não há artigos publicados. Volte em breve.
          </p>
        ) : (
          <PostIndex posts={posts} tags={tags} />
        )}
      </Band>

      <ClosingCta />
      <HomeMotion />
    </>
  );
}
