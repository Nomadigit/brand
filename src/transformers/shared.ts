import type { BrandFile, FontStack } from "../types";

export type ColorMode = "light" | "dark";

/** "surfaceMuted" -> "surface-muted" */
export function kebab(key: string): string {
  return key.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();
}

export function fontFamilyValue(font: FontStack): string {
  const stack = [font.family, ...(font.fallback ?? [])];
  return stack.map((name) => (name.includes(" ") ? `"${name}"` : name)).join(", ");
}

function stringEntries(obj: unknown): [string, string][] {
  if (!obj || typeof obj !== "object") return [];
  return Object.entries(obj as Record<string, unknown>).filter(
    (entry): entry is [string, string] => typeof entry[1] === "string"
  );
}

/**
 * Every color role resolved for one mode, keyed by kebab-case role name.
 * Dark mode starts from the light palette and overrides whatever darkMode defines,
 * so a partial darkMode block never leaves a role undefined.
 */
export function resolveColors(brand: BrandFile, mode: ColorMode): Record<string, string> {
  const c = brand.colors;
  const out: Record<string, string> = {
    primary: c.primary,
    text: c.text,
    background: c.background,
  };
  if (c.secondary) out.secondary = c.secondary;
  if (c.accent) out.accent = c.accent;
  if (c.border) out.border = c.border;
  for (const [k, v] of stringEntries(c.roles)) out[kebab(k)] = v;
  for (const [k, v] of stringEntries(c.semantic)) out[kebab(k)] = v;

  if (mode === "dark" && c.darkMode) {
    const d = c.darkMode;
    for (const key of ["primary", "secondary", "accent", "text", "background", "border"] as const) {
      const v = d[key];
      if (typeof v === "string") out[key] = v;
    }
    for (const [k, v] of stringEntries(d.roles)) out[kebab(k)] = v;
    for (const [k, v] of stringEntries(d.semantic)) out[kebab(k)] = v;
  }
  return out;
}

export function hasDarkMode(brand: BrandFile): boolean {
  return !!brand.colors.darkMode && Object.keys(brand.colors.darkMode).length > 0;
}

export function colorScale(brand: BrandFile): Record<string, Record<string, string>> {
  const out: Record<string, Record<string, string>> = {};
  for (const [name, steps] of Object.entries(brand.colors.scale ?? {})) {
    out[kebab(name)] = Object.fromEntries(stringEntries(steps));
  }
  return out;
}

export function hexNoHash(color: string): string {
  return color.startsWith("#") ? color.slice(1).toUpperCase() : color.toUpperCase();
}
