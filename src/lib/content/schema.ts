import { requireString, stringArray, type RawEntry } from "./load";

/* Stricter schema helpers on top of ./load. All failures throw at build time with the file path. */

export function failEntry(entry: RawEntry, message: string): never {
  throw new Error(`[content] ${entry.file}: ${message}`);
}

/** Reject keys the schema does not know (catches typos like "sumary"). */
export function onlyKeys(entry: RawEntry, allowed: readonly string[]): void {
  const unknown = Object.keys(entry.data).filter((key) => !allowed.includes(key));
  if (unknown.length > 0) failEntry(entry, `unknown frontmatter key(s): ${unknown.join(", ")}`);
}

export function requireLength(entry: RawEntry, key: string, value: string, min: number, max: number): string {
  if (value.length < min || value.length > max) {
    failEntry(entry, `frontmatter "${key}" must be ${min}-${max} characters (got ${value.length})`);
  }
  return value;
}

const SLUG = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export function requireSlug(entry: RawEntry, key: string): string {
  const value = requireString(entry, key);
  if (!SLUG.test(value)) failEntry(entry, `frontmatter "${key}" must be a kebab-case slug`);
  return value;
}

export function slugArray(entry: RawEntry, key: string): string[] {
  const values = stringArray(entry, key);
  for (const v of values) if (!SLUG.test(v)) failEntry(entry, `"${key}" item "${v}" is not a slug`);
  return values;
}

/**
 * OAB advertising guardrails (Provimento 205/2021): no promises of results, no
 * solicitation tone, no superlatives. Checked on every text field and body at build time.
 */
const FORBIDDEN_COPY =
  /(garant(?:e|ido|imos)\b|garantia de (?:resultado|sucesso)|100\s?%|sucesso garantido|causa ganha|ganhamos|melhor (?:escrit[óo]rio|advogad[oa])|ligue agora|aproveite|promo[çc][ãa]o|desconto|resultado certo)/i;

export function assertCompliantCopy(entry: RawEntry, text: string): void {
  const hit = FORBIDDEN_COPY.exec(text);
  if (hit) failEntry(entry, `non-compliant advertising wording "${hit[0]}" (OAB rules)`);
}
