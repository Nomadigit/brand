import type { BrandFile } from "../types";
import { colorScale, fontFamilyValue, hasDarkMode, kebab, resolveColors } from "./shared";

export type FlatTokens = Record<string, string | number>;

/**
 * Dot-separated keys with primitive values, for languages without a CSS pipeline
 * (Go templates, Kotlin/Compose, Python scripts): "color.light.primary" -> "#04556D".
 */
export function toFlatJson(brand: BrandFile): FlatTokens {
  const out: FlatTokens = {};
  const put = (key: string, value: unknown) => {
    if (typeof value === "string" || typeof value === "number") out[key] = value;
  };

  put("meta.name", brand.meta.name);
  put("meta.version", brand.meta.version);
  put("identity.displayName", brand.identity.displayName);
  put("identity.tagline", brand.identity.tagline);
  put("brand.signature", brand.brandArchitecture?.signature);

  for (const [k, v] of Object.entries(resolveColors(brand, "light"))) put(`color.light.${k}`, v);
  if (hasDarkMode(brand)) for (const [k, v] of Object.entries(resolveColors(brand, "dark"))) put(`color.dark.${k}`, v);
  for (const [name, steps] of Object.entries(colorScale(brand))) {
    for (const [step, v] of Object.entries(steps)) put(`color.scale.${name}.${step}`, v);
  }

  const t = brand.typography;
  const fonts = { web: t.webFont, print: t.printFont, display: t.displayFont, mono: t.monoFont };
  for (const [role, font] of Object.entries(fonts)) {
    if (!font) continue;
    put(`font.${role}.family`, font.family);
    put(`font.${role}.stack`, fontFamilyValue(font));
  }
  for (const [k, v] of Object.entries(t.sizes)) put(`font.size.${k}`, v);
  for (const [k, v] of Object.entries(t.weights)) put(`font.weight.${k}`, v);
  for (const [k, v] of Object.entries(t.lineHeight ?? {})) put(`font.lineHeight.${k}`, v);

  put("spacing.unit", brand.spacing.unit);
  put("radius.default", brand.spacing.borderRadius);
  for (const [k, v] of Object.entries(brand.spacing.scale ?? {})) put(`spacing.${k}`, v);
  for (const [k, v] of Object.entries(brand.spacing.radius ?? {})) put(`radius.${kebab(k)}`, v);
  for (const [k, v] of Object.entries(brand.motion?.durations ?? {})) put(`motion.duration.${k}`, v);
  for (const [k, v] of Object.entries(brand.motion?.easing ?? {})) put(`motion.easing.${k}`, v);
  return out;
}
