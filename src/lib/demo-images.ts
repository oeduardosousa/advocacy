/**
 * Demo illustrations live in /public/img/demo. Content files do not carry image paths,
 * so the mapping is derived here and stays deterministic (same slug, same image).
 */

export const areaImage = (slug: string) => `area-${slug}`;

/** Portraits 1..4, assigned by the member's order (1-based, wrapping). */
export const portraitImage = (order: number) => `portrait-${((order - 1) % 4) + 1}`;


/** Format an ISO date (YYYY-MM-DD) as "15 de janeiro de 2025" without timezone drift. */
export function formatDate(iso: string): string {
  const [y, m, d] = iso.split("-").map(Number);
  return new Intl.DateTimeFormat("pt-BR", { dateStyle: "long", timeZone: "UTC" }).format(
    new Date(Date.UTC(y, m - 1, d)),
  );
}

/** The topical tag shown on cards; "Demonstração" is the placeholder tag on every post. */
export function topicTag(tags: string[]): string {
  return tags.find((tag) => tag !== "Demonstração") ?? "Demonstração";
}
