import type { ReactNode } from "react";

/**
 * Opening sheet of every inner page: same grammar as the home (margin label in columns
 * 1-2, headline on the grid, one lead). The h1 sets line by line through HomeMotion's
 * [data-reveal="lines"]; text is in the DOM from first paint.
 */
export function PageHeader({
  label,
  title,
  lead,
  children,
  id = "page-title",
}: {
  label: string;
  title: ReactNode;
  lead?: ReactNode;
  children?: ReactNode;
  id?: string;
}) {
  return (
    <header className="container-page pb-16 pt-36 lg:pb-24 lg:pt-48">
      <div className="grid grid-cols-4 gap-x-4 gap-y-8 sm:grid-cols-8 sm:gap-x-5 lg:grid-cols-12 lg:gap-x-6">
        <p className="type-label margin-label col-span-4 text-ink-mute sm:col-span-8 lg:col-span-2 lg:text-right">
          {label}
        </p>
        <h1
          id={id}
          data-reveal="lines"
          className="type-headline col-span-4 sm:col-span-8 lg:col-span-9"
        >
          {title}
        </h1>
        {lead ? (
          <div className="col-span-4 sm:col-span-6 lg:col-span-6 lg:col-start-3">
            <p data-reveal="block" className="type-lead text-ink-soft">
              {lead}
            </p>
            {children}
          </div>
        ) : null}
      </div>
    </header>
  );
}

/** A content band with the standard margin column. */
export function Band({
  label,
  children,
  tone = "paper",
  id,
  labelledBy,
  className = "",
}: {
  label?: string;
  children: ReactNode;
  tone?: "paper" | "light" | "deep";
  id?: string;
  labelledBy?: string;
  className?: string;
}) {
  const bg = tone === "light" ? "bg-paper-light" : tone === "deep" ? "bg-paper-deep" : "bg-paper";
  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      className={`relative ${bg} ${tone === "light" ? "border-t border-rule" : ""} ${className}`}
    >
      <div className="container-page section-minor">
        <div className="grid grid-cols-4 gap-x-4 gap-y-10 sm:grid-cols-8 sm:gap-x-5 lg:grid-cols-12 lg:gap-x-6">
          {label ? (
            <p className="type-label margin-label col-span-4 text-ink-mute sm:col-span-8 lg:col-span-2 lg:text-right">
              {label}
            </p>
          ) : null}
          {children}
        </div>
      </div>
    </section>
  );
}
