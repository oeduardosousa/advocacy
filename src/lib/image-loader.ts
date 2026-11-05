/**
 * Custom next/image loader for the static export (no image server).
 * Images are produced offline by `npm run images` (scripts/optimize-images.mjs) into
 * /public/img/opt/<name>-<width>.<avif|webp>. `src` is the logical name, optionally with
 * an ".avif" suffix; WebP is the default (and the <img> fallback).
 */
export const IMAGE_WIDTHS = [480, 800, 1200, 1600] as const;

export default function imageLoader({ src, width }: { src: string; width: number }): string {
  const match = /^([\w-]+)(?:\.(avif|webp))?$/.exec(src);
  if (!match) throw new Error(`[images] invalid image name "${src}" (expected e.g. "post-1")`);
  const [, name, ext = "webp"] = match;
  const snapped = IMAGE_WIDTHS.find((w) => w >= width) ?? IMAGE_WIDTHS[IMAGE_WIDTHS.length - 1];
  return `/img/opt/${name}-${snapped}.${ext}`;
}
