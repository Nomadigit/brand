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

export interface BannerOptions extends OgOptions {
  /** Share of the width (from the left) the host overlays with a profile photo: nothing is drawn there. */
  avatarSafe?: number;
}

/**
 * Wide cover (LinkedIn profile 1584x396, company page 1128x191). Same style as the card, laid out in a
 * row: the bottom-left is left empty for the profile photo LinkedIn draws over it, the title and kicker
 * sit after it, vertically centered, and the inverse lockup closes the row on the right.
 */
export function bannerSvg(brand: BrandFile, opts: BannerOptions): string {
  const W = opts.width ?? 1584;
  const H = opts.height ?? 396;
  const M = round(H * 0.12);
  const light = resolveColors(brand, "light");
  const dark = resolveColors(brand, "dark");
  const onPrimary = light["on-primary"] ?? "#FFFFFF";
  const scale = brand.colors.scale?.primary ?? {};
  const inverse = { route: onPrimary, dot: dark.accent };

  // The route from the mark, oversized and faint, frames the lockup and bleeds off the bottom right.
  const lockSize = round(H * 0.11);
  const probe = lockupBody(inverse, onPrimary, lockSize);
  const lockX = W - M - probe.width;
  const bgScale = (H * 2) / 32;
  const deco = `<g transform="translate(${round(lockX + probe.width / 2 - 15.25 * bgScale)} ${round(-4 * bgScale)}) scale(${round(bgScale)})" opacity="0.14">${markShapes({ route: onPrimary, dot: "none" })}</g>`;

  const lock = lockupBody(inverse, onPrimary, lockSize, lockX, (H - probe.height) / 2);

  const left = round(W * (opts.avatarSafe ?? 0.27));
  const maxWidth = lockX - M - left;
  const bold = fontFaces("onest", 700);
  let size = round(H * 0.16);
  let lines = wrap(opts.title, bold, size, maxWidth, -0.02);
  while (lines.length > 2 && size > H * 0.1) {
    size -= 4;
    lines = wrap(opts.title, bold, size, maxWidth, -0.02);
  }
  const lineH = size * 1.12;
  const kickerSize = round(H * 0.06);
  const kickerGap = kickerSize * 1.4;
  const blockH = size * 0.72 + lineH * (lines.length - 1) + (opts.kicker ? kickerGap + kickerSize * 0.72 : 0);
  const firstBaseline = (H - blockH) / 2 + size * 0.72;
  const title = lines
    .map((line, i) => `<path transform="translate(${left} ${round(firstBaseline + i * lineH)})" d="${textPath(line, bold, size, -0.02).d}" fill="${onPrimary}"/>`)
    .join("");

  let kicker = "";
  if (opts.kicker) {
    const mono = fontFaces("geist-mono", 400);
    const y = firstBaseline + lineH * (lines.length - 1) + kickerGap + kickerSize * 0.72;
    kicker = `<path transform="translate(${left} ${round(y)})" d="${textPath(opts.kicker, mono, kickerSize).d}" fill="${scale["200"] ?? onPrimary}"/>`;
  }

  return svgDoc(W, H, `<rect width="${W}" height="${H}" fill="${light.primary}"/>${deco}${lock.body}${title}${kicker}`, opts.title);
}
