import { TransitionLink } from "@/components/providers/PageTransition";
import { ArrowRight } from "@/components/ui/icons";
import { Photo } from "@/components/ui/Photo";
import type { Post } from "@/lib/content";
import { ROUTES } from "@/lib/site";

function PostCard({ post, index, large }: { post: Post; index: number; large?: boolean }) {
  return (
    <article className="group">
      <Photo
        src={`/img/demo/post-${(index % 3) + 1}.svg`}
        alt=""
        sizes={large ? "(min-width: 1024px) 50vw, 100vw" : "(min-width: 1024px) 33vw, 100vw"}
        hoverZoom
      />
      <p className="type-label mt-5 text-ink-mute">{post.tags.find((t) => t !== "Demonstração") ?? "Demonstração"}</p>
      <h3 className={`mt-2 ${large ? "type-headline max-w-[18ch] !text-[clamp(1.75rem,1.2rem+2vw,3rem)]" : "type-title"}`}>
        <TransitionLink href={ROUTES.post(post.slug)}>{post.title}</TransitionLink>
      </h3>
      <p className="type-small mt-3 text-ink-mute">
        {post.readingTimeMinutes} min de leitura · Conteúdo de demonstração
      </p>
    </article>
  );
}

/** Sheet 6 — latest articles (MDX). Asymmetric: one large, two supporting. */
export function Articles({ posts }: { posts: Post[] }) {
  const [first, ...rest] = posts.slice(0, 3);
  if (!first) return null;
  return (
    <section id="insights" aria-labelledby="articles-title" className="relative z-20 bg-paper-light">
      <div className="container-page section-major border-t border-rule">
        <div className="grid grid-cols-4 gap-x-4 gap-y-12 sm:grid-cols-8 sm:gap-x-5 lg:grid-cols-12 lg:gap-x-6">
          <p className="type-label col-span-4 text-ink-mute sm:col-span-8 lg:col-span-2 lg:text-right">
            Insights
          </p>
          <h2
            id="articles-title"
            data-reveal="lines"
            className="type-headline col-span-4 sm:col-span-8 lg:col-span-9"
          >
            Textos para entender melhor.
          </h2>

          <div className="col-span-4 sm:col-span-8 lg:col-span-6 lg:col-start-3">
            <PostCard post={first} index={0} large />
            <TransitionLink href={ROUTES.blog} className="link-quiet mt-10 text-ink">
              Ver todos os artigos
              <ArrowRight />
            </TransitionLink>
          </div>
          <div className="col-span-4 flex flex-col gap-12 sm:col-span-8 lg:col-span-4 lg:col-start-9 lg:mt-24">
            {rest.map((post, i) => (
              <PostCard key={post.slug} post={post} index={i + 1} />
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
