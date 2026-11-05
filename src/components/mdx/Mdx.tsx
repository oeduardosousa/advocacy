import { MDXRemote } from "next-mdx-remote/rsc";
import type { ComponentProps } from "react";

/**
 * MDX element mapping, article typography from DESIGN.md: Newsreader, 20px/1.65,
 * max 65ch, italics (never bold) for emphasis.
 */
const components = {
  h2: (props: ComponentProps<"h2">) => <h2 className="type-title mt-12 mb-4" {...props} />,
  h3: (props: ComponentProps<"h3">) => (
    <h3 className="type-title mt-8 mb-3 text-ink-soft" {...props} />
  ),
  p: (props: ComponentProps<"p">) => <p className="type-article mb-6 text-ink-soft" {...props} />,
  em: (props: ComponentProps<"em">) => <em className="italic" {...props} />,
  strong: (props: ComponentProps<"strong">) => (
    <strong className="font-normal italic" {...props} />
  ),
  ul: (props: ComponentProps<"ul">) => (
    <ul className="type-article mb-6 list-disc pl-6 text-ink-soft" {...props} />
  ),
  ol: (props: ComponentProps<"ol">) => (
    <ol className="type-article mb-6 list-decimal pl-6 text-ink-soft" {...props} />
  ),
  a: (props: ComponentProps<"a">) => (
    <a
      className="underline decoration-rule underline-offset-4 hover:decoration-oxblood"
      {...props}
    />
  ),
  hr: () => <hr className="my-12 border-rule" />,
};

export function Mdx({ source }: { source: string }) {
  return <MDXRemote source={source} components={components} />;
}
