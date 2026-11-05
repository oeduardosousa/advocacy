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
import type { Area, Post, TeamMember } from "./types";

export type { Area, Post, TeamMember } from "./types";

/* ------------------------------ Areas ------------------------------ */

function toArea(entry: RawEntry): Area {
  return {
    slug: entry.slug,
    body: entry.body,
    demo: requireDemo(entry),
    name: requireString(entry, "name"),
    summary: requireString(entry, "summary"),
    order: requireNumber(entry, "order"),
  };
}

export function getAreas(): Area[] {
  return readCollection("areas")
    .map(toArea)
    .sort((a, b) => a.order - b.order);
}

export function getArea(slug: string): Area | undefined {
  return getAreas().find((area) => area.slug === slug);
}

/* ------------------------------ Team ------------------------------- */

function toTeamMember(entry: RawEntry): TeamMember {
  return {
    slug: entry.slug,
    body: entry.body,
    demo: requireDemo(entry),
    name: requireString(entry, "name"),
    role: requireString(entry, "role"),
    oab: optionalString(entry, "oab"),
    summary: requireString(entry, "summary"),
    order: requireNumber(entry, "order"),
    portraitAlt: optionalString(entry, "portraitAlt"),
  };
}

export function getTeam(): TeamMember[] {
  return readCollection("team")
    .map(toTeamMember)
    .sort((a, b) => a.order - b.order);
}

export function getTeamMember(slug: string): TeamMember | undefined {
  return getTeam().find((member) => member.slug === slug);
}

/* ------------------------------ Posts ------------------------------ */

function toPost(entry: RawEntry): Post {
  return {
    slug: entry.slug,
    body: entry.body,
    demo: requireDemo(entry),
    title: requireString(entry, "title"),
    summary: requireString(entry, "summary"),
    date: requireDate(entry, "date"),
    tags: stringArray(entry, "tags"),
    area: optionalString(entry, "area"),
    author: optionalString(entry, "author"),
    readingTimeMinutes: Math.max(1, Math.ceil(readingTime(entry.body).minutes)),
  };
}

/** Newest first. */
export function getPosts(): Post[] {
  return readCollection("posts")
    .map(toPost)
    .sort((a, b) => b.date.localeCompare(a.date));
}

export function getPost(slug: string): Post | undefined {
  return getPosts().find((post) => post.slug === slug);
}

export function getPostTags(): string[] {
  return [...new Set(getPosts().flatMap((post) => post.tags))].sort((a, b) =>
    a.localeCompare(b, "pt-BR"),
  );
}
