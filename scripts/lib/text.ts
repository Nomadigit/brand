/**
 * Turns text into SVG outlines with Onest, so generated logos and images never depend on
 * fonts installed on the viewer's machine. Fontsource splits a family into unicode subsets;
 * every character is drawn with the first subset that actually contains it.
 */
import fs from "node:fs";
import path from "node:path";
import opentype from "opentype.js";

const ROOT = path.resolve(__dirname, "../..");
const SUBSETS = ["latin", "latin-ext", "cyrillic", "cyrillic-ext"];

type Font = opentype.Font;
const cache = new Map<string, Font[]>();

export function fontFaces(family: "onest" | "jetbrains-mono", weight: number): Font[] {
  const key = `${family}-${weight}`;
  const hit = cache.get(key);
  if (hit) return hit;
  const faces = SUBSETS.map((subset) => {
    const file = path.join(ROOT, "node_modules/@fontsource", family, "files", `${family}-${subset}-${weight}-normal.woff`);
    if (!fs.existsSync(file)) return undefined;
    const buf = fs.readFileSync(file);
    return opentype.parse(buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength));
  }).filter((f): f is Font => !!f);
  cache.set(key, faces);
  return faces;
}

const num = (n: number) => String(Math.round(n * 100) / 100);

/** opentype.js 2.0's toPathData() double-flips Y and can emit NaN; serialize commands directly. */
function pathData(p: opentype.Path): string {
  let d = "";
  for (const c of p.commands as any[]) {
    if (c.type === "M" || c.type === "L") d += `${c.type}${num(c.x)} ${num(c.y)}`;
    else if (c.type === "Q") d += `Q${num(c.x1)} ${num(c.y1)} ${num(c.x)} ${num(c.y)}`;
    else if (c.type === "C") d += `C${num(c.x1)} ${num(c.y1)} ${num(c.x2)} ${num(c.y2)} ${num(c.x)} ${num(c.y)}`;
    else if (c.type === "Z") d += "Z";
  }
  return d;
}

function pickFace(faces: Font[], ch: string): Font {
  return faces.find((f) => f.charToGlyph(ch).index !== 0) ?? faces[0];
}

export interface TextRun {
  d: string;
  width: number;
  /** Distance from baseline to the top of the tallest ascender ("d", "t"), in px. */
  ascender: number;
  /** How far the drawn glyphs actually reach below the baseline ("g", "y", "р"), in px. */
  descent: number;
  xHeight: number;
}

/** One line of text as a single path, baseline at y=0, starting at x=0. */
export function textPath(text: string, faces: Font[], size: number, tracking = 0): TextRun {
  let x = 0;
  let d = "";
  let prev: { face: Font; glyph: opentype.Glyph } | undefined;
  let maxY = 0;
  for (const ch of Array.from(text)) {
    const face = pickFace(faces, ch);
    const glyph = face.charToGlyph(ch);
    const scale = size / face.unitsPerEm;
    if (prev && prev.face === face) x += face.getKerningValue(prev.glyph, glyph) * scale;
    const glyphPath = face.getPath(ch, x, 0, size, { kerning: false });
    maxY = Math.max(maxY, glyphPath.getBoundingBox().y2);
    d += pathData(glyphPath);
    x += (glyph.advanceWidth ?? 0) * scale + tracking * size;
    prev = { face, glyph };
  }
  const main = faces[0];
  const scale = size / main.unitsPerEm;
  const os2 = main.tables.os2 as { sxHeight?: number; sCapHeight?: number } | undefined;
  const dBox = main.charToGlyph("d").getBoundingBox();
  return {
    d,
    width: x - tracking * size,
    ascender: dBox.y2 * scale,
    descent: maxY,
    xHeight: (os2?.sxHeight || main.charToGlyph("x").getBoundingBox().y2) * scale,
  };
}

/** Greedy word wrap measured with the real glyph advances. */
export function wrap(text: string, faces: Font[], size: number, maxWidth: number, tracking = 0): string[] {
  const lines: string[] = [];
  let line = "";
  for (const word of text.split(/\s+/).filter(Boolean)) {
    const candidate = line ? `${line} ${word}` : word;
    if (line && textPath(candidate, faces, size, tracking).width > maxWidth) {
      lines.push(line);
      line = word;
    } else {
      line = candidate;
    }
  }
  if (line) lines.push(line);
  return lines;
}
