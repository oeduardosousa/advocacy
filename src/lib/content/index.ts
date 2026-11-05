import fs from "node:fs";
import path from "node:path";

import readingTime from "reading-time";

import {
  optionalString,
  readCollection,
  requireDate,
  requireDemo,
  requireNumber,
  requireString,
  stringArray,
  type RawEntry,
} from "./load";
import {
  assertCompliantCopy,
  failEntry,
  onlyKeys,
  requireLength,
  requireSlug,
  slugArray,
} from "./schema";
import type { Area, Post, TeamMember } from "./types";

export type { Area, Post, TeamMember } from "./types";

/**
 * Typed, validated collections. Every failure throws at build time with the file path,
 * so a bad frontmatter or a broken reference can never reach the static export.
 * Results are memoized per build process.
 */

const DISCLAIMER = /não constitui aconselhamento jur[ií]dico/i;
const today = () => new Date().toISOString().slice(0, 10);

function uniqueOrder(entries: { slug: string; order: number }[], label: string): void {
  const seen = new Map<number, string>();
  for (const { slug, order } of entries) {
    const clash = seen.get(order);
    if (clash) throw new Error(`[content] ${label}: "${slug}" and "${clash}" share order ${order}`);
    seen.set(order, slug);
  }
}

/* ------------------------------ Areas ------------------------------ */

function toArea(entry: RawEntry): Area {
  onlyKeys(entry, ["name", "summary", "order", "demo"]);
  const area: Area = {
    slug: entry.slug,
    body: entry.body,
    demo: requireDemo(entry),
    name: requireString(entry, "name"),
    summary: requireLength(entry, "summary", requireString(entry, "summary"), 20, 200),
    order: requireNumber(entry, "order"),
  };
  assertCompliantCopy(entry, `${area.summary}\n${area.body}`);
  if (!DISCLAIMER.test(area.body)) failEntry(entry, 'body must include "não constitui aconselhamento jurídico"');
  return area;
}

let areasCache: Area[] | undefined;
export function getAreas(): Area[] {
  areasCache ??= (() => {
    const areas = readCollection("areas")
      .map(toArea)
      .sort((a, b) => a.order - b.order);
    uniqueOrder(areas, "areas");
    return areas;
  })();
  return areasCache;
}

export function getArea(slug: string): Area | undefined {
  return getAreas().find((area) => area.slug === slug);
}

/* ------------------------------ Team ------------------------------- */

function toTeamMember(entry: RawEntry): TeamMember {
  onlyKeys(entry, ["name", "role", "oab", "summary", "order", "portraitAlt", "areas", "demo"]);
  const member: TeamMember = {
    slug: entry.slug,
    body: entry.body,
    demo: requireDemo(entry),
    name: requireString(entry, "name"),
    role: requireString(entry, "role"),
    oab: optionalString(entry, "oab"),
    summary: requireLength(entry, "summary", requireString(entry, "summary"), 20, 200),
    order: requireNumber(entry, "order"),
    portraitAlt: optionalString(entry, "portraitAlt"),
    areas: slugArray(entry, "areas"),
  };
  if (member.oab && !/fictício/i.test(member.oab)) failEntry(entry, '"oab" must be labeled "(fictício)"');
  if (!/fictício/i.test(member.body)) failEntry(entry, 'body must state that the profile is fictional ("fictício")');
  assertCompliantCopy(entry, `${member.summary}\n${member.body}`);
  return member;
}

let teamCache: TeamMember[] | undefined;
export function getTeam(): TeamMember[] {
  teamCache ??= (() => {
    const team = readCollection("team")
      .map(toTeamMember)
      .sort((a, b) => a.order - b.order);
    uniqueOrder(team, "team");
    const areaSlugs = new Set(getAreas().map((a) => a.slug));
    for (const member of team) {
      for (const slug of member.areas) {
        if (!areaSlugs.has(slug)) {
          throw new Error(`[content] content/team/${member.slug}.mdx: unknown area "${slug}"`);
        }
      }
    }
    return team;
  })();
  return teamCache;
}

export function getTeamMember(slug: string): TeamMember | undefined {
  return getTeam().find((member) => member.slug === slug);
}

/* ------------------------------ Posts ------------------------------ */

function toPost(entry: RawEntry): Post {
  onlyKeys(entry, ["title", "summary", "date", "tags", "area", "author", "cover", "coverAlt", "demo"]);
  const post: Post = {
    slug: entry.slug,
    body: entry.body,
    demo: requireDemo(entry),
    title: requireLength(entry, "title", requireString(entry, "title"), 10, 90),
    summary: requireLength(entry, "summary", requireString(entry, "summary"), 40, 200),
    date: requireDate(entry, "date"),
    tags: stringArray(entry, "tags"),
    area: optionalString(entry, "area"),
    author: optionalString(entry, "author"),
    cover: requireSlug(entry, "cover"),
    coverAlt: requireLength(entry, "coverAlt", requireString(entry, "coverAlt"), 30, 160),
    readingTimeMinutes: Math.max(1, Math.ceil(readingTime(entry.body).minutes)),
  };
  if (post.date > today()) failEntry(entry, `"date" ${post.date} is in the future`);
  if (post.tags.length === 0) failEntry(entry, '"tags" needs at least one tag');
  if (!DISCLAIMER.test(post.body)) failEntry(entry, 'body must include "não constitui aconselhamento jurídico"');
  if (!post.coverAlt.startsWith("Ilustração de demonstração")) {
    failEntry(entry, '"coverAlt" must start with "Ilustração de demonstração"');
  }
  if (!fs.existsSync(path.join(process.cwd(), "public", "img", "opt", `${post.cover}-800.webp`))) {
    failEntry(entry, `cover "${post.cover}" has no optimized file; run "npm run images"`);
  }
  assertCompliantCopy(entry, `${post.title}\n${post.summary}\n${post.body}`);
  return post;
}

let postsCache: Post[] | undefined;
/** Newest first. */
export function getPosts(): Post[] {
  postsCache ??= (() => {
    const posts = readCollection("posts")
      .map(toPost)
      .sort((a, b) => b.date.localeCompare(a.date));
    const areaSlugs = new Set(getAreas().map((a) => a.slug));
    const teamSlugs = new Set(getTeam().map((m) => m.slug));
    for (const post of posts) {
      if (post.area && !areaSlugs.has(post.area)) {
        throw new Error(`[content] content/posts/${post.slug}.mdx: unknown area "${post.area}"`);
      }
      if (post.author && !teamSlugs.has(post.author)) {
        throw new Error(`[content] content/posts/${post.slug}.mdx: unknown author "${post.author}"`);
      }
    }
    if (posts.length < 6 || posts.length > 8) {
      throw new Error(`[content] expected 6-8 articles, found ${posts.length}`);
    }
    return posts;
  })();
  return postsCache;
}

export function getPost(slug: string): Post | undefined {
  return getPosts().find((post) => post.slug === slug);
}

export function getPostTags(): string[] {
  return [...new Set(getPosts().flatMap((post) => post.tags))].sort((a, b) =>
    a.localeCompare(b, "pt-BR"),
  );
}
