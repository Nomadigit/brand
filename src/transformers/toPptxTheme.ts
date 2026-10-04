import type { BrandFile } from "../types";
import { hexNoHash, resolveColors } from "./shared";

export interface PptxTheme {
  name: string;
  /** Office theme color slots, hex without '#'. */
  colors: {
    dk1: string; lt1: string; dk2: string; lt2: string;
    accent1: string; accent2: string; accent3: string; accent4: string; accent5: string; accent6: string;
    hlink: string; folHlink: string;
  };
  fonts: { major: string; minor: string; mono?: string };
}

/** Office theme slots for python-pptx / PptxGenJS / a hand-made .thmx. */
export function toPptxTheme(brand: BrandFile): PptxTheme {
  const l = resolveColors(brand, "light");
  const scale = brand.colors.scale?.primary ?? {};
  const pick = (...values: (string | undefined)[]) => hexNoHash(values.find((v): v is string => !!v) ?? l.primary);
  const t = brand.typography;
  return {
    name: brand.meta.name,
    colors: {
      dk1: pick(l.text),
      lt1: pick(l.surface, "#FFFFFF"),
      dk2: pick(l.primary),
      lt2: pick(l.background),
      accent1: pick(l.primary),
      accent2: pick(l.accent),
      accent3: pick(scale["400"], l.secondary),
      accent4: pick(scale["200"]),
      accent5: pick(l.success),
      accent6: pick(l.warning),
      hlink: pick(l.link, l.primary),
      folHlink: pick(scale["700"], l.primary),
    },
    fonts: {
      major: (t.displayFont ?? t.webFont).family,
      minor: t.webFont.family,
      ...(t.monoFont ? { mono: t.monoFont.family } : {}),
    },
  };
}
