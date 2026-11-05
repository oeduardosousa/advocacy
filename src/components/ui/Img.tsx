import { getImageProps, type ImageProps } from "next/image";
import { preload } from "react-dom";

type Props = Omit<ImageProps, "src" | "width" | "height" | "fill" | "loader" | "unoptimized"> & {
  /** Logical image name from assets/images-src (e.g. "post-1"). */
  name: string;
};

/**
 * Optimized, art-directed image: AVIF with WebP fallback via <picture>, srcset from the
 * offline pipeline, `fill` inside a ratio box (so no layout shift). `alt=""` marks decorative images.
 */
export function Img({ name, alt, sizes, priority, ...rest }: Props) {
  // `priority` marks the LCP image: eager, high fetch priority and a preload of the AVIF
  // source (getImageProps does not emit next/image's own preload, so it is done here).
  const common = {
    alt,
    sizes,
    fill: true as const,
    ...(priority ? { loading: "eager" as const, fetchPriority: "high" as const } : {}),
    ...rest,
  };
  const { props: webp } = getImageProps({ ...common, src: name });
  const { props: avif } = getImageProps({ ...common, src: `${name}.avif` });
  const { srcSet: avifSet } = avif;
  if (priority && avifSet) {
    preload(avif.src, {
      as: "image",
      imageSrcSet: avifSet,
      imageSizes: sizes,
      type: "image/avif",
      fetchPriority: "high",
    });
  }
  return (
    <picture>
      <source type="image/avif" srcSet={avifSet} sizes={sizes} />
      {/* eslint-disable-next-line jsx-a11y/alt-text */}
      <img {...webp} />
    </picture>
  );
}
