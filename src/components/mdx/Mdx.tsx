import { MDXRemote } from "next-mdx-remote/rsc";
import type { ComponentProps } from "react";

import { TransitionLink } from "@/components/providers/PageTransition";

/**
 * MDX element mapping, article typography from DESIGN.md: Newsreader, 20px/1.65,
 * max 65ch, italics (never bold) for emphasis. Rhythm is set here, not in the content.
 */
const components = {
  h2: (props: ComponentProps<"h2">) => (
    <h2 className="type-title mt-14 mb-5 max-w-[28ch] text-ink first:mt-0" {...props} />
  ),
  h3: (props: ComponentProps<"h3">) => (
    <h3 className="type-title mt-10 mb-4 max-w-[34ch] text-ink-soft italic" {...props} />
  ),
  p: (props: ComponentProps<"p">) => <p className="type-article mb-6 text-ink-soft" {...props} />,
  em: (props: ComponentProps<"em">) => <em className="italic" {...props} />,
  strong: (props: ComponentProps<"strong">) => <strong className="font-normal italic" {...props} />,
  ul: (props: ComponentProps<"ul">) => (
    <ul
      className="type-article mb-6 list-disc space-y-2 pl-6 text-ink-soft marker:text-ink-mute"
      {...props}
    />
  ),
  ol: (props: ComponentProps<"ol">) => (
    <ol
      className="type-article mb-6 list-decimal space-y-2 pl-6 text-ink-soft marker:text-ink-mute"
      {...props}
    />
  ),
  blockquote: (props: ComponentProps<"blockquote">) => (
    <blockquote
      className="my-10 max-w-[34ch] border-l border-oxblood pl-6 font-serif text-[length:var(--text-title)] italic leading-[1.3] tracking-[-0.01em] text-ink [&>p]:mb-0 [&>p]:max-w-none [&>p]:text-ink [&>p]:text-[length:inherit] [&>p]:leading-[inherit]"
      {...props}
    />
  ),
  a: ({ href = "", children, ...rest }: ComponentProps<"a">) => {
    const className =
      "underline decoration-ink-dim underline-offset-4 transition-colors duration-[160ms] hover:decoration-oxblood";
    if (href.startsWith("/")) {
      return (
        <TransitionLink href={href} className={className}>
          {children}
        </TransitionLink>
      );
    }
    return (
      <a href={href} className={className} {...rest}>
        {children}
      </a>
    );
  },
  hr: () => <hr className="my-12 max-w-[65ch] border-rule" />,
};

export function Mdx({ source }: { source: string }) {
  return <MDXRemote source={source} components={components} />;
}
