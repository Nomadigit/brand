import type { BrandFile } from "../types";
import { colorScale, kebab, resolveColors } from "./shared";

export interface TailwindThemeExtend {
  colors: Record<string, string>;
  fontFamily: Record<string, string[]>;
  fontSize?: Record<string, string>;
  fontWeight?: Record<string, string>;
  lineHeight?: Record<string, string>;
  letterSpacing?: Record<string, string>;
  borderRadius?: Record<string, string>;
  spacing?: Record<string, string>;
  transitionDuration?: Record<string, string>;
  transitionTimingFunction?: Record<string, string>;
}

export interface TailwindConfigFragment {
  darkMode?: [string, string];
  theme: { extend: TailwindThemeExtend };
}

export interface TailwindOptions {
  /**
   * Point colors at the CSS variables from toWebCss() instead of literal values, so
   * light/dark switching comes for free. Requires tokens.css on the page.
   */
  useCssVariables?: boolean;
}

export function toTailwindConfig(brand: BrandFile, options: TailwindOptions = {}): TailwindConfigFragment {
  const colorOf = (key: string, value: string) => (options.useCssVariables ? `var(--color-${key})` : value);

  const colors: Record<string, string> = {};
  for (const [key, value] of Object.entries(resolveColors(brand, "light"))) colors[key] = colorOf(key, value);
  for (const [name, steps] of Object.entries(colorScale(brand))) {
    for (const [step, value] of Object.entries(steps)) colors[`${name}-${step}`] = colorOf(`${name}-${step}`, value);
  }

  const t = brand.typography;
  const stack = (f: { family: string; fallback?: string[] }) => [f.family, ...(f.fallback ?? [])];
  const fontFamily: Record<string, string[]> = { web: stack(t.webFont) };
  if (t.displayFont) fontFamily.display = stack(t.displayFont);
  if (t.monoFont) fontFamily.mono = stack(t.monoFont);

  const extend: TailwindThemeExtend = { colors, fontFamily };
  const strings = (obj: Record<string, unknown> | undefined) =>
    Object.fromEntries(Object.entries(obj ?? {}).map(([k, v]) => [kebab(k), String(v)]));

  if (Object.keys(t.sizes).length > 0) extend.fontSize = { ...t.sizes };
  if (Object.keys(t.weights).length > 0) extend.fontWeight = strings(t.weights);
  if (t.lineHeight && Object.keys(t.lineHeight).length > 0) extend.lineHeight = strings(t.lineHeight);
  if (t.letterSpacing && Object.keys(t.letterSpacing).length > 0) extend.letterSpacing = strings(t.letterSpacing);

  const s = brand.spacing;
  if (s.borderRadius !== undefined || s.radius) {
    extend.borderRadius = {
      ...(s.borderRadius !== undefined ? { DEFAULT: `${s.borderRadius}px` } : {}),
      ...strings(s.radius),
    };
  }
  if (s.scale) extend.spacing = strings(s.scale);
  if (brand.motion?.durations) extend.transitionDuration = strings(brand.motion.durations);
  if (brand.motion?.easing) extend.transitionTimingFunction = strings(brand.motion.easing);

  const config: TailwindConfigFragment = { theme: { extend } };
  if (options.useCssVariables) config.darkMode = ["selector", '[data-theme="dark"]'];
  return config;
}
