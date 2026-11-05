/** Typed shapes of the three MDX collections (content/posts, content/team, content/areas). */

interface BaseEntry {
  /** File name without extension; used in the URL. */
  slug: string;
  /** Raw MDX body (frontmatter removed), rendered with next-mdx-remote. */
  body: string;
  /** All content is fictional. Must stay true in v1 and be labeled in the UI. */
  demo: boolean;
}

export interface Post extends BaseEntry {
  title: string;
  /** One or two neutral sentences. No promises of results (OAB). */
  summary: string;
  /** ISO date (YYYY-MM-DD). */
  date: string;
  tags: string[];
  /** Slug of a practice area, optional. */
  area?: string;
  /** Slug of a team member, optional. */
  author?: string;
  /** Whole minutes, computed from the body. */
  readingTimeMinutes: number;
}

export interface TeamMember extends BaseEntry {
  name: string;
  role: string;
  /** Fictional OAB number, always shown with a "fictício" label. */
  oab?: string;
  summary: string;
  /** Lower comes first. */
  order: number;
  /** Alt text for the (fictional) portrait, when one exists. */
  portraitAlt?: string;
}

export interface Area extends BaseEntry {
  name: string;
  summary: string;
  /** Lower comes first; also drives the margin numeral (01..06). */
  order: number;
}

export type CollectionName = "posts" | "team" | "areas";
