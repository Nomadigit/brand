import { describe, expect, it } from "vitest";
import tokens from "../tokens/brand.json";
import { validateBrand } from "../src/validate";
import { resolveColors } from "../src/transformers/shared";

/** WCAG 2.x relative-luminance contrast ratio for #RRGGBB colors. */
function contrast(a: string, b: string): number {
  const lum = (hex: string) => {
    const [r, g, bl] = [1, 3, 5].map((i) => {
      const v = parseInt(hex.slice(i, i + 2), 16) / 255;
      return v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4;
    });
    return 0.2126 * r + 0.7152 * g + 0.0722 * bl;
  };
  const [x, y] = [lum(a), lum(b)].sort((p, q) => q - p);
  return (x + 0.05) / (y + 0.05);
}

const brand = validateBrand(tokens);

// [foreground, background, minimum ratio]: AA for text, 3:1 for non-text marks.
const PAIRS: [string, string, number][] = [
  ["text", "background", 4.5],
  ["text", "surface", 4.5],
  ["text", "surface-muted", 4.5],
  ["muted", "background", 4.5],
  ["muted", "surface", 4.5],
  ["primary", "background", 4.5],
  ["link", "surface", 4.5],
  ["on-primary", "primary", 4.5],
  ["on-accent", "accent", 4.5],
  ["accent", "background", 3],
  ["error", "surface", 4.5],
  ["success", "surface", 4.5],
  ["info", "surface", 4.5],
  ["warning", "surface", 3],
];

describe("tokens/brand.json", () => {
  it("validates against the schema", () => {
    expect(brand.meta.name).toBe("Nomadigit");
  });

  for (const mode of ["light", "dark"] as const) {
    const colors = resolveColors(brand, mode);
    it.each(PAIRS)(`${mode}: %s on %s meets %d:1`, (fg, bg, min) => {
      expect(colors[fg], `${fg} missing`).toBeDefined();
      expect(colors[bg], `${bg} missing`).toBeDefined();
      expect(contrast(colors[fg], colors[bg])).toBeGreaterThanOrEqual(min);
    });
  }
});
