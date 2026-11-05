import type { Metadata } from "next";

import { PagePlaceholder } from "@/components/layout/PagePlaceholder";
import { TransitionLink } from "@/components/providers/PageTransition";
import { getPosts } from "@/lib/content";
import { ROUTES } from "@/lib/site";

export const metadata: Metadata = { title: "Blog" };

export default function BlogPage() {
  const posts = getPosts();
  return (
    <PagePlaceholder title="Blog" description="Artigos informativos de demonstração.">
      <ul className="border-t border-rule">
        {posts.map((post) => (
          <li key={post.slug} className="border-b border-rule py-4">
            <TransitionLink href={ROUTES.post(post.slug)} className="type-title">
              {post.title}
            </TransitionLink>
            <p className="type-small text-ink-mute">{post.readingTimeMinutes} min de leitura</p>
          </li>
        ))}
      </ul>
    </PagePlaceholder>
  );
}
