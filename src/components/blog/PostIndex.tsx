"use client";

import { useMemo, useState } from "react";

import { TransitionLink } from "@/components/providers/PageTransition";
import { Img } from "@/components/ui/Img";
import { formatDate, topicTag } from "@/lib/demo-images";
import { ROUTES } from "@/lib/site";

export interface PostSummary {
  slug: string;
  title: string;
  summary: string;
  date: string;
  tags: string[];
  readingTimeMinutes: number;
  cover: string;
  coverAlt: string;
}

/**
 * Blog index with tag filter. Filtering is client-side over the full static list, so
 * with no JS every article is still listed. Chips are toggle buttons (aria-pressed);
 * the result count is announced through a polite live region.
 */
export function PostIndex({ posts, tags }: { posts: PostSummary[]; tags: string[] }) {
  const [tag, setTag] = useState<string | null>(null);

  const visible = useMemo(
    () => (tag ? posts.filter((post) => post.tags.includes(tag)) : posts),
    [posts, tag],
  );

  return (
    <>
      <div className="col-span-4 sm:col-span-8 lg:col-span-9 lg:col-start-3">
        <div role="group" aria-label="Filtrar por tema" className="flex flex-wrap gap-2">
          <Chip pressed={tag === null} onClick={() => setTag(null)}>
            Todos
          </Chip>
          {tags.map((t) => (
            <Chip key={t} pressed={tag === t} onClick={() => setTag(tag === t ? null : t)}>
              {t}
            </Chip>
          ))}
        </div>
        <p className="type-small mt-4 text-ink-mute" role="status" aria-live="polite">
          {visible.length === 1 ? "1 artigo" : `${visible.length} artigos`}
          {tag ? ` em ${tag}` : ""}
        </p>
      </div>

      <ul className="col-span-4 sm:col-span-8 lg:col-span-10 lg:col-start-3">
        {visible.map((post, i) => (
          <li
            key={post.slug}
            className="post-row border-t border-rule last:border-b"
            style={{ ["--i" as string]: i }}
          >
            <article className="group grid grid-cols-4 gap-x-4 gap-y-5 py-8 sm:grid-cols-8 sm:gap-x-5 lg:grid-cols-10 lg:gap-x-6 lg:py-10">
              <div className="col-span-4 sm:col-span-3 lg:col-span-3">
                <div className="relative aspect-[3/2] overflow-hidden bg-paper-deep">
                  <Img
                    name={post.cover}
                    alt=""
                    sizes="(min-width: 1024px) 24vw, (min-width: 640px) 36vw, 100vw"
                    className="object-cover transition-transform duration-[600ms] ease-out group-hover:scale-[1.03]"
                  />
                </div>
              </div>
              <div className="col-span-4 sm:col-span-5 lg:col-span-7 lg:max-w-[52ch]">
                <p className="type-label text-ink-mute">{topicTag(post.tags)}</p>
                <h2 className="type-title mt-2">
                  <TransitionLink href={ROUTES.post(post.slug)} className="link-underline">
                    {post.title}
                  </TransitionLink>
                </h2>
                <p className="type-body mt-3 text-ink-soft">{post.summary}</p>
                <p className="type-small mt-4 text-ink-mute">
                  <time dateTime={post.date}>{formatDate(post.date)}</time> ·{" "}
                  {post.readingTimeMinutes} min de leitura · Conteúdo de demonstração
                </p>
              </div>
            </article>
          </li>
        ))}
      </ul>
    </>
  );
}

function Chip({
  pressed,
  onClick,
  children,
}: {
  pressed: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button type="button" aria-pressed={pressed} onClick={onClick} className="chip">
      {children}
    </button>
  );
}
