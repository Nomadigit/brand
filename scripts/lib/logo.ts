/**
 * The Waypoint mark and everything built from it. Geometry lives on a 32-unit grid:
 * a lowercase "n" drawn as one route line, ending in a waypoint dot.
 */
import { fontFaces, textPath } from "./text";

export interface MarkColors {
  route: string;
  dot: string;
}

// Visual bounds of the mark inside its 32x32 grid (stroke caps and dot included).
export const MARK = { x0: 5.25, y0: 4.25, x1: 26.75, y1: 27.75, grid: 32 };
const ROUTE = "M7.25 25.25V14.25a8 8 0 0 1 16 0v3";
const STROKE = 4;
const DOT = { cx: 23.25, cy: 24.25, r: 3.5 };

/** Mark shapes in grid units; wrap in a transform to place them. */
export function markShapes(c: MarkColors): string {
  return (
    `<path d="${ROUTE}" fill="none" stroke="${c.route}" stroke-width="${STROKE}" stroke-linecap="round"/>` +
    `<circle cx="${DOT.cx}" cy="${DOT.cy}" r="${DOT.r}" fill="${c.dot}"/>`
  );
}

export function svgDoc(width: number, height: number, body: string, title: string): string {
  const w = round(width);
  const h = round(height);
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}" role="img" aria-label="${title}"><title>${title}</title>${body}</svg>\n`;
}

export const round = (n: number) => Math.round(n * 100) / 100;

/** Mark scaled so its visual height is `h`, visual top-left at (x, y). */
export function placeMark(c: MarkColors, x: number, y: number, h: number): string {
  const s = h / (MARK.y1 - MARK.y0);
  return `<g transform="translate(${round(x - MARK.x0 * s)} ${round(y - MARK.y0 * s)}) scale(${round(s * 1000) / 1000})">${markShapes(c)}</g>`;
}

export function markWidth(h: number): number {
  return ((MARK.x1 - MARK.x0) / (MARK.y1 - MARK.y0)) * h;
}

export function markSvg(c: MarkColors, title = "Nomadigit"): string {
  return svgDoc(MARK.grid, MARK.grid, markShapes(c), title);
}

/** Rounded-square app icon: inverse mark centered on the primary color. */
export function appIconSvg(bg: string, c: MarkColors, size = 512, markRatio = 0.6, radiusRatio = 0.225, title = "Nomadigit"): string {
  const h = size * markRatio;
  const w = markWidth(h);
  const rect = radiusRatio > 0 ? `<rect width="${size}" height="${size}" rx="${round(size * radiusRatio)}" fill="${bg}"/>` : `<rect width="${size}" height="${size}" fill="${bg}"/>`;
  return svgDoc(size, size, rect + placeMark(c, (size - w) / 2, (size - h) / 2, h), title);
}

const WORD = "nomadigit";
const WORD_TRACKING = -0.02;

/** Wordmark outlined from Onest Bold; baseline-relative metrics for the lockup. */
export function wordmark(size: number) {
  return textPath(WORD, fontFaces("onest", 700), size, WORD_TRACKING);
}

export function wordmarkSvg(color: string, size = 96, title = "Nomadigit"): string {
  const run = wordmark(size);
  const descent = run.descent;
  const pad = size * 0.02;
  const body = `<path transform="translate(${round(pad)} ${round(run.ascender + pad)})" d="${run.d}" fill="${color}"/>`;
  return svgDoc(run.width + pad * 2, run.ascender + descent + pad * 2, body, title);
}

/**
 * Horizontal lockup: mark as tall as the wordmark's ascender, sitting on the baseline,
 * separated by 40% of its height.
 */
export function lockupBody(c: MarkColors, wordColor: string, size: number, x = 0, y = 0) {
  const run = wordmark(size);
  const h = run.ascender * 1.12;
  const gap = h * 0.4;
  const baseline = y + h;
  const mw = markWidth(h);
  const body =
    placeMark(c, x, y, h) +
    `<path transform="translate(${round(x + mw + gap)} ${round(baseline)})" d="${run.d}" fill="${wordColor}"/>`;
  // The "g" descender hangs below the baseline (and below the mark); the box must include it.
  return { body, width: mw + gap + run.width, height: Math.max(h, h + run.descent) };
}

export function lockupSvg(c: MarkColors, wordColor: string, size = 96, title = "Nomadigit"): string {
  const pad = size * 0.04;
  const { body, width, height } = lockupBody(c, wordColor, size, pad, pad);
  return svgDoc(width + pad * 2, height + pad * 2, body, title);
}
