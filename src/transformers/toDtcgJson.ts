import type { BrandFile } from "../types";
import { colorScale, hasDarkMode, resolveColors } from "./shared";

type Token = { $type: string; $value: unknown };
type Group = { [key: string]: Token | Group };

/** W3C Design Tokens Community Group format, for Figma Tokens Studio, Style Dictionary and similar tools. */
export function toDtcgJson(brand: BrandFile): Group {
  const colorGroup = (values: Record<string, string>): Group =>
    Object.fromEntries(Object.entries(values).map(([k, v]) => [k, { $type: "color", $value: v }]));

  const color: Group = { light: colorGroup(resolveColors(brand, "light")) };
  if (hasDarkMode(brand)) color.dark = colorGroup(resolveColors(brand, "dark"));
  for (const [name, steps] of Object.entries(colorScale(brand))) color[name] = colorGroup(steps);

  const t = brand.typography;
  const fontFamily: Group = {};
  const fonts = { web: t.webFont, print: t.printFont, display: t.displayFont, mono: t.monoFont };
  for (const [role, font] of Object.entries(fonts)) {
    if (font) fontFamily[role] = { $type: "fontFamily", $value: [font.family, ...(font.fallback ?? [])] };
  }
  const dim = (obj: Record<string, unknown> | undefined): Group =>
    Object.fromEntries(Object.entries(obj ?? {}).map(([k, v]) => [k, { $type: "dimension", $value: String(v) }]));

  const out: Group = {
    color,
    fontFamily,
    fontSize: dim(t.sizes),
    fontWeight: Object.fromEntries(Object.entries(t.weights).map(([k, v]) => [k, { $type: "fontWeight", $value: v }])),
  };
  if (brand.spacing.scale) out.spacing = dim(brand.spacing.scale);
  if (brand.spacing.radius) out.radius = dim(brand.spacing.radius);
  if (brand.motion?.durations) {
    out.duration = Object.fromEntries(
      Object.entries(brand.motion.durations).map(([k, v]) => [k, { $type: "duration", $value: String(v) }])
    );
  }
  if (brand.motion?.easing) {
    out.easing = Object.fromEntries(
      Object.entries(brand.motion.easing).map(([k, v]) => [k, { $type: "cubicBezier", $value: String(v) }])
    );
  }
  return out;
}
