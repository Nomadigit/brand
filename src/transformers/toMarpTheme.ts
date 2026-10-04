import type { BrandFile } from "../types";
import { fontFamilyValue, resolveColors } from "./shared";

/**
 * A Marp (https://marp.app) theme: write decks in Markdown, export to PDF/PPTX/HTML.
 * Classes: default (light), `lead` (title slide on primary), `invert` (dark).
 */
export function toMarpTheme(brand: BrandFile, name = "brand"): string {
  const l = resolveColors(brand, "light");
  const d = resolveColors(brand, "dark");
  const t = brand.typography;
  const display = fontFamilyValue(t.displayFont ?? t.webFont);
  const body = fontFamilyValue(t.webFont);
  const mono = t.monoFont ? fontFamilyValue(t.monoFont) : "ui-monospace, monospace";
  const displayWeight = t.weights.display ?? t.weights.bold ?? 700;
  const tight = t.letterSpacing?.display ?? "-0.02em";

  return `/* @theme ${name} */
/* Generated from brand.json by @nomadigit/brand. Do not edit; edit tokens/brand.json and rebuild. */

section {
  width: 1280px;
  height: 720px;
  padding: 72px 88px;
  background: ${l.background};
  color: ${l.text};
  font-family: ${body};
  font-size: 28px;
  line-height: 1.45;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 20px;
}
h1, h2, h3 { font-family: ${display}; font-weight: ${displayWeight}; letter-spacing: ${tight}; line-height: 1.1; margin: 0; color: ${l.text}; }
h1 { font-size: 64px; }
h2 { font-size: 44px; }
h3 { font-size: 32px; color: ${l.primary}; }
p, li { max-width: 46ch; }
strong { color: ${l.primary}; font-weight: ${t.weights.bold ?? 600}; }
a { color: ${l.link ?? l.primary}; }
code { font-family: ${mono}; font-size: 0.85em; background: ${l["surface-muted"] ?? l.surface ?? l.background}; padding: 0.1em 0.35em; border-radius: 6px; }
pre { font-family: ${mono}; font-size: 22px; background: ${d.background}; color: ${d.text}; padding: 24px 28px; border-radius: 12px; }
pre code { background: none; padding: 0; }
blockquote { margin: 0; padding-left: 24px; border-left: 4px solid ${l.accent ?? l.primary}; color: ${l.muted ?? l.text}; }
section::after { position: absolute; padding: 0; line-height: 1; font-family: ${mono}; font-size: 16px; color: ${l.muted ?? l.text}; right: 88px; bottom: 36px; }
header, footer { position: absolute; margin: 0; padding: 0; line-height: 1; font-family: ${mono}; font-size: 16px; color: ${l.muted ?? l.text}; left: 88px; right: 160px; }
header { top: 36px; }
footer { bottom: 36px; }

section.lead { background: ${l.primary}; color: ${l["on-primary"] ?? "#FFFFFF"}; justify-content: flex-end; padding-bottom: 96px; }
section.lead h1, section.lead h2, section.lead h3, section.lead strong { color: ${l["on-primary"] ?? "#FFFFFF"}; }
section.lead::after, section.lead header, section.lead footer { color: ${l["on-primary"] ?? "#FFFFFF"}; opacity: 0.75; }

section.invert { background: ${d.background}; color: ${d.text}; }
section.invert h1, section.invert h2 { color: ${d.text}; }
section.invert h3, section.invert strong, section.invert a { color: ${d.primary}; }
section.invert code { background: ${d["surface-muted"] ?? d.surface ?? d.background}; }
section.invert::after, section.invert header, section.invert footer, section.invert blockquote { color: ${d.muted ?? d.text}; }
`;
}
