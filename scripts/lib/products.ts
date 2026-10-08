/**
 * Product marks: the master Waypoint mark plus exactly one cue for what the product does,
 * drawn in the accent color with the same rounded strokes. Products get an icon, never their
 * own palette, typeface or wordmark — the name next to it is plain text ("Reminder · Nomadigit").
 */
import { markShapes, round, type Glyph, type MarkColors } from "./logo";

// The master arch is centred on (15.25, 14.25) with radius 8; cues sit on concentric circles.
const ARCH = { cx: 15.25, cy: 14.25 };

function arcPoint(r: number, deg: number): [number, number] {
  const a = (deg * Math.PI) / 180;
  return [round(ARCH.cx + r * Math.cos(a)), round(ARCH.cy - r * Math.sin(a))];
}

/** Two short "ringing" arcs above the arch, symmetric about its centre. */
function ringing(c: MarkColors): string {
  const r = 12.5;
  const arc = (from: number, to: number) => {
    const [x1, y1] = arcPoint(r, from);
    const [x2, y2] = arcPoint(r, to);
    return `M${x1} ${y1}A${r} ${r} 0 0 1 ${x2} ${y2}`;
  };
  return (
    markShapes(c) +
    `<path d="${arc(150, 115)}${arc(65, 30)}" fill="none" stroke="${c.dot}" stroke-width="3" stroke-linecap="round"/>`
  );
}

/**
 * A pie slice inside the arch, apex on its centre, opening to the upper right: one piece of
 * the shared whole. Filled, with a round-joined outline so the corners match the strokes.
 */
function slice(c: MarkColors): string {
  const r = 4;
  const [x1, y1] = arcPoint(r, 80);
  const [x2, y2] = arcPoint(r, 10);
  return (
    markShapes(c) +
    `<path d="M${ARCH.cx} ${ARCH.cy}L${x1} ${y1}A${r} ${r} 0 0 1 ${x2} ${y2}Z" fill="${c.dot}" stroke="${c.dot}" stroke-width="2" stroke-linejoin="round"/>`
  );
}

export const GLYPHS: Record<string, Glyph> = {
  // Left arc starts at 150° (x 4.42) and the right one ends at 30° (x 26.08); both peak at y 2.92.
  ringing: { shapes: ringing, bounds: { x0: 2.92, y0: 1.42, x1: 27.58, y1: 27.75 } },
  // Outer edge sits at r 5 (4 + half the outline), 1 unit clear of the arch's inner edge (r 6).
  slice: { shapes: slice, bounds: { x0: 5.25, y0: 4.25, x1: 26.75, y1: 27.75 } },
};
