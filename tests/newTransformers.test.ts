import { describe, expect, it } from "vitest";
import { toWebCss } from "../src/transformers/toWebCss";
import { toTailwindConfig } from "../src/transformers/toTailwindConfig";
import { toFlatJson } from "../src/transformers/toFlatJson";
import { toDtcgJson } from "../src/transformers/toDtcgJson";
import { toTelegramTheme } from "../src/transformers/toTelegramTheme";
import { toMarpTheme } from "../src/transformers/toMarpTheme";
import { toPptxTheme } from "../src/transformers/toPptxTheme";
import { resolveColors } from "../src/transformers/shared";
import { fullBrand, minimalBrand } from "./fixtures";

describe("resolveColors", () => {
  it("layers dark overrides on top of the light palette so no role goes missing", () => {
    const dark = resolveColors(fullBrand, "dark");
    expect(dark.background).toBe("#202124");
    expect(dark.surface).toBe("#292a2d");
    expect(dark["surface-muted"]).toBe("#f1f3f4"); // not overridden in darkMode -> light value
    expect(dark.error).toBe("#f28b82");
    expect(dark.success).toBe("#188038");
  });
});

describe("toWebCss (extended tokens)", () => {
  it("emits roles, scale, extra fonts, spacing, radius and motion variables", () => {
    const css = toWebCss(fullBrand);
    expect(css).toContain("--color-surface-muted: #f1f3f4;");
    expect(css).toContain("--color-on-primary: #ffffff;");
    expect(css).toContain("--color-primary-500: #1a73e8;");
    expect(css).toContain('--font-display-family: "Space Display", sans-serif;');
    expect(css).toContain('--font-mono-family: "JetBrains Mono", monospace;');
    expect(css).toContain("--space-2: 8px;");
    expect(css).toContain("--radius-lg: 16px;");
    expect(css).toContain("--duration-fast: 120ms;");
  });

  it("lets data-theme pin either theme regardless of the OS setting", () => {
    const css = toWebCss(fullBrand);
    expect(css).toContain(':root:not([data-theme="light"]) {');
    expect(css).toContain(':root[data-theme="dark"] {');
    expect(css).toContain("color-scheme: dark;");
    expect(css).toContain("--color-error: #f28b82;");
  });

  it("falls back to the web font for display and omits mono when not set", () => {
    const css = toWebCss(minimalBrand);
    expect(css).toContain("--font-display-family: Inter, sans-serif;");
    expect(css).not.toContain("--font-mono-family");
  });
});

describe("toTailwindConfig (extended tokens)", () => {
  it("adds roles, flat scale keys, display/mono fonts and spacing", () => {
    const { theme } = toTailwindConfig(fullBrand);
    expect(theme.extend.colors["surface-muted"]).toBe("#f1f3f4");
    expect(theme.extend.colors["primary-900"]).toBe("#0b3d91");
    expect(theme.extend.fontFamily.mono).toEqual(["JetBrains Mono", "monospace"]);
    expect(theme.extend.borderRadius).toEqual({ DEFAULT: "6px", sm: "4px", lg: "16px" });
    expect(theme.extend.spacing).toEqual({ "1": "4px", "2": "8px" });
  });

  it("points colors at CSS variables and enables selector dark mode when asked", () => {
    const config = toTailwindConfig(fullBrand, { useCssVariables: true });
    expect(config.theme.extend.colors.primary).toBe("var(--color-primary)");
    expect(config.theme.extend.colors["primary-100"]).toBe("var(--color-primary-100)");
    expect(config.darkMode).toEqual(["selector", '[data-theme="dark"]']);
  });
});

describe("toFlatJson", () => {
  it("flattens colors per mode, fonts and spacing into dot keys", () => {
    const flat = toFlatJson(fullBrand);
    expect(flat["color.light.primary"]).toBe("#1a73e8");
    expect(flat["color.dark.primary"]).toBe("#8ab4f8");
    expect(flat["color.scale.primary.500"]).toBe("#1a73e8");
    expect(flat["font.mono.family"]).toBe("JetBrains Mono");
    expect(flat["font.size.body"]).toBe("16px");
    expect(flat["brand.signature"]).toBe("Jane Doe · Acme");
  });

  it("skips dark keys when the brand has no dark mode", () => {
    const flat = toFlatJson(minimalBrand);
    expect(Object.keys(flat).some((k) => k.startsWith("color.dark."))).toBe(false);
  });
});

describe("toDtcgJson", () => {
  it("emits typed W3C design tokens", () => {
    const tokens = toDtcgJson(fullBrand) as any;
    expect(tokens.color.light.primary).toEqual({ $type: "color", $value: "#1a73e8" });
    expect(tokens.color.dark.background).toEqual({ $type: "color", $value: "#202124" });
    expect(tokens.fontFamily.mono.$value).toEqual(["JetBrains Mono", "monospace"]);
    expect(tokens.fontWeight.bold).toEqual({ $type: "fontWeight", $value: 700 });
  });
});

describe("toTelegramTheme", () => {
  it("maps brand roles to Telegram themeParams for both schemes", () => {
    const theme = toTelegramTheme(fullBrand);
    expect(theme.light.button_color).toBe("#1a73e8");
    expect(theme.light.secondary_bg_color).toBe("#f1f3f4");
    expect(theme.dark.bg_color).toBe("#202124");
    expect(theme.dark.button_text_color).toBe("#202124");
  });

  it("reuses the light theme when there is no dark mode", () => {
    const theme = toTelegramTheme(minimalBrand);
    expect(theme.dark).toEqual(theme.light);
  });
});

describe("toMarpTheme", () => {
  it("produces a named Marp theme with brand fonts and lead/invert classes", () => {
    const css = toMarpTheme(fullBrand, "acme");
    expect(css.startsWith("/* @theme acme */")).toBe(true);
    expect(css).toContain('"Space Display", sans-serif');
    expect(css).toContain("section.lead { background: #1a73e8;");
    expect(css).toContain("section.invert { background: #202124;");
  });
});

describe("toPptxTheme", () => {
  it("fills Office theme slots with hex values without '#'", () => {
    const theme = toPptxTheme(fullBrand);
    expect(theme.colors.accent1).toBe("1A73E8");
    expect(theme.colors.accent2).toBe("FBBC04");
    expect(theme.colors.dk1).toBe("111111");
    expect(theme.fonts).toEqual({ major: "Space Display", minor: "Inter", mono: "JetBrains Mono" });
  });
});
