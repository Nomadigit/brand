import type { BrandFile } from "../types";
import { colorScale, fontFamilyValue, hasDarkMode, kebab, resolveColors } from "./shared";

export type CssVariables = Record<string, string>;

export function brandToCssVariables(brand: BrandFile): CssVariables {
  const t = brand.typography;
  const vars: CssVariables = {};

  for (const [key, value] of Object.entries(resolveColors(brand, "light"))) {
    vars[`--color-${key}`] = value;
  }
  for (const [name, steps] of Object.entries(colorScale(brand))) {
    for (const [step, value] of Object.entries(steps)) vars[`--color-${name}-${step}`] = value;
  }

  vars["--font-web-family"] = fontFamilyValue(t.webFont);
  vars["--font-display-family"] = fontFamilyValue(t.displayFont ?? t.webFont);
  if (t.monoFont) vars["--font-mono-family"] = fontFamilyValue(t.monoFont);
  vars["--font-weight-regular"] = String(t.weights.regular ?? 400);
  vars["--font-weight-medium"] = String(t.weights.medium ?? 500);
  vars["--font-weight-bold"] = String(t.weights.bold ?? 700);
  for (const [key, value] of Object.entries(t.weights)) {
    if (!["regular", "medium", "bold"].includes(key)) vars[`--font-weight-${kebab(key)}`] = String(value);
  }
  for (const [key, value] of Object.entries(t.sizes)) vars[`--font-size-${key}`] = value;
  for (const [key, value] of Object.entries(t.lineHeight ?? {})) vars[`--line-height-${key}`] = String(value);
  for (const [key, value] of Object.entries(t.letterSpacing ?? {})) vars[`--letter-spacing-${key}`] = String(value);

  const s = brand.spacing;
  if (s.unit !== undefined) vars["--spacing-unit"] = `${s.unit}px`;
  if (s.borderRadius !== undefined) vars["--radius"] = `${s.borderRadius}px`;
  for (const [key, value] of Object.entries(s.scale ?? {})) vars[`--space-${key}`] = String(value);
  for (const [key, value] of Object.entries(s.radius ?? {})) vars[`--radius-${key}`] = String(value);

  for (const [key, value] of Object.entries(brand.motion?.durations ?? {})) vars[`--duration-${key}`] = String(value);
  for (const [key, value] of Object.entries(brand.motion?.easing ?? {})) vars[`--easing-${key}`] = String(value);

  return vars;
}

/** Only the color variables whose dark value differs from light. */
export function darkModeCssVariables(brand: BrandFile): CssVariables {
  if (!hasDarkMode(brand)) return {};
  const light = resolveColors(brand, "light");
  const vars: CssVariables = {};
  for (const [key, value] of Object.entries(resolveColors(brand, "dark"))) {
    if (light[key] !== value) vars[`--color-${key}`] = value;
  }
  return vars;
}

export function cssVariablesToRootBlock(vars: CssVariables, selector = ":root"): string {
  const lines = Object.entries(vars).map(([key, value]) => `  ${key}: ${value};`);
  return `${selector} {\n${lines.join("\n")}\n}\n`;
}

function indent(block: string): string {
  return block
    .trimEnd()
    .split("\n")
    .map((line) => `  ${line}`)
    .join("\n");
}

/**
 * Light values on :root. Dark values follow the OS setting unless the page pins a theme
 * with <html data-theme="light|dark">, which wins in both directions.
 */
export function toWebCss(brand: BrandFile): string {
  const root = cssVariablesToRootBlock(brandToCssVariables(brand));
  const darkVars = darkModeCssVariables(brand);
  if (Object.keys(darkVars).length === 0) return root;

  const withScheme = { ...darkVars, "color-scheme": "dark" };
  const mediaBlock = cssVariablesToRootBlock(withScheme, ':root:not([data-theme="light"])');
  const forced = cssVariablesToRootBlock(withScheme, ':root[data-theme="dark"]');
  return `${root}\n@media (prefers-color-scheme: dark) {\n${indent(mediaBlock)}\n}\n\n${forced}`;
}
