import type { ReactNode } from "react";

import { SITE } from "@/lib/site";

/** Temporary page body used by foundation routes until real sections are built. */
export function PagePlaceholder({
  title,
  description,
  children,
}: {
  title: string;
  description?: string;
  children?: ReactNode;
}) {
  return (
    <div className="container-page section-minor">
      <p className="type-label text-ink-mute">Em construção</p>
      <h1 className="type-headline mt-4">{title}</h1>
      {description ? <p className="type-lead mt-6 text-ink-soft">{description}</p> : null}
      {children ? <div className="mt-12">{children}</div> : null}
      <p className="type-small mt-12 text-ink-mute">{SITE.notice}</p>
    </div>
  );
}
