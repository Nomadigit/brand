/**
 * Open Graph / social card, 1200x630. Lead style: primary background, inverse lockup,
 * title outlined from Onest so the PNG renders identically everywhere.
 */
import type { BrandFile } from "../../src";
import { resolveColors } from "../../src";
import { lockupBody, markShapes, round, svgDoc } from "./logo";
import { fontFaces, textPath, wrap } from "./text";

export interface OgOptions {
  title: string;
  kicker?: string;
  width?: number;
  height?: number;
}

export function ogSvg(brand: BrandFile, opts: OgOptions): string {
  const W = opts.width ?? 1200;
  const H = opts.height ?? 630;
  const M = 72;
  const light = resolveColors(brand, "light");
  const dark = resolveColors(brand, "dark");
  const onPrimary = light["on-primary"] ?? "#FFFFFF";
  const scale = brand.colors.scale?.primary ?? {};
  const inverse = { route: onPrimary, dot: dark.accent };

  // Oversized route from the mark as a quiet background shape, bleeding off the top right.
  const bgScale = (H * 1.25) / 32;
  const deco = `<g transform="translate(${round(W - 22 * bgScale)} ${round(-6 * bgScale)}) scale(${round(bgScale)})" opacity="0.14">${markShapes({ route: onPrimary, dot: "none" })}</g>`;

  const lock = lockupBody(inverse, onPrimary, 44, M, M);

  const bold = fontFaces("onest", 700);
  let size = 72;
  let lines = wrap(opts.title, bold, size, W - M * 2 - 120, -0.02);
  while (lines.length > 3 && size > 44) {
    size -= 6;
    lines = wrap(opts.title, bold, size, W - M * 2 - 120, -0.02);
  }
  const lineH = size * 1.12;
  const kickerSize = 24;
  const bottom = H - M - (opts.kicker ? kickerSize + 28 : 0);
  const firstBaseline = bottom - lineH * (lines.length - 1);
  const title = lines
    .map((line, i) => `<path transform="translate(${M} ${round(firstBaseline + i * lineH)})" d="${textPath(line, bold, size, -0.02).d}" fill="${onPrimary}"/>`)
    .join("");

  let kicker = "";
  if (opts.kicker) {
    const mono = fontFaces("geist-mono", 400);
    kicker = `<path transform="translate(${M} ${H - M})" d="${textPath(opts.kicker, mono, kickerSize).d}" fill="${scale["200"] ?? onPrimary}"/>`;
  }

  return svgDoc(W, H, `<rect width="${W}" height="${H}" fill="${light.primary}"/>${deco}${lock.body}${title}${kicker}`, opts.title);
}
