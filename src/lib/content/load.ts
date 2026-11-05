import fs from "node:fs";
import path from "node:path";

import matter from "gray-matter";

import type { CollectionName } from "./types";

/**
 * Low-level collection reader. Runs only at build time in Server Components
 * (static export), never in the browser. Typed, validated loaders live in ./index.ts.
 */

const CONTENT_ROOT = path.join(process.cwd(), "content");
const EXTENSIONS = new Set([".mdx", ".md"]);

export interface RawEntry {
  slug: string;
  file: string;
  data: Record<string, unknown>;
  body: string;
}

export function readCollection(collection: CollectionName): RawEntry[] {
  const dir = path.join(CONTENT_ROOT, collection);
  if (!fs.existsSync(dir)) return [];

  return fs
    .readdirSync(dir)
    .filter((file) => EXTENSIONS.has(path.extname(file)))
    .sort()
    .map((file) => {
      const source = fs.readFileSync(path.join(dir, file), "utf8");
      const { data, content } = matter(source);
      return {
        slug: path.basename(file, path.extname(file)),
        file: `content/${collection}/${file}`,
        data,
        body: content,
      };
    });
}

/* ---------- Frontmatter validation helpers (fail the build with a clear message) ---------- */

function fail(entry: RawEntry, message: string): never {
  throw new Error(`[content] ${entry.file}: ${message}`);
}

export function requireString(entry: RawEntry, key: string): string {
  const value = entry.data[key];
  if (typeof value !== "string" || value.trim() === "") {
    fail(entry, `frontmatter "${key}" must be a non-empty string`);
  }
  return value;
}

export function optionalString(entry: RawEntry, key: string): string | undefined {
  const value = entry.data[key];
  if (value === undefined || value === null) return undefined;
  if (typeof value !== "string") fail(entry, `frontmatter "${key}" must be a string`);
  return value;
}

export function requireNumber(entry: RawEntry, key: string): number {
  const value = entry.data[key];
  if (typeof value !== "number" || Number.isNaN(value)) {
    fail(entry, `frontmatter "${key}" must be a number`);
  }
  return value;
}

export function requireDate(entry: RawEntry, key: string): string {
  const value = entry.data[key];
  // YAML parses bare dates (2025-01-31) into Date objects.
  const iso =
    value instanceof Date
      ? value.toISOString().slice(0, 10)
      : typeof value === "string"
        ? value
        : "";
  if (!/^\d{4}-\d{2}-\d{2}$/.test(iso)) {
    fail(entry, `frontmatter "${key}" must be a date like 2025-01-31`);
  }
  return iso;
}

export function stringArray(entry: RawEntry, key: string): string[] {
  const value = entry.data[key];
  if (value === undefined || value === null) return [];
  if (!Array.isArray(value) || value.some((item) => typeof item !== "string")) {
    fail(entry, `frontmatter "${key}" must be a list of strings`);
  }
  return value as string[];
}

/** All v1 content is fictional; the flag must be explicit so it can never be forgotten. */
export function requireDemo(entry: RawEntry): boolean {
  if (entry.data.demo !== true) {
    fail(entry, 'frontmatter "demo" must be true (all v1 content is fictional)');
  }
  return true;
}
