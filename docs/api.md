# API reference: @nomadigit/brand

Single source of truth for a brand (`brand.json`), validated against a JSON Schema and
translated into ready-to-use outputs for the web, documents (DOCX/PDF), and HTML email —
without any of the three channels needing to know about the other two.

## Install

```bash
npm i git+https://github.com/Nomadigit/brand.git#v1.1.0
```

## Usage

```ts
import {
  validateBrand,
  toWebCss,
  toTailwindConfig,
  toDocxStyles,
  toPdfCss,
  toEmailInline,
} from "@nomadigit/brand";
import brandJson from "@nomadigit/brand/tokens.json";

const brand = validateBrand(brandJson); // throws with a detailed message if brandJson is invalid

toWebCss(brand); //         -> ":root { --color-primary: ...; } \n @media (prefers-color-scheme: dark) { ... }"
toTailwindConfig(brand, { useCssVariables?: boolean }); // -> { theme: { extend: { colors, fontFamily, ... } } }
toDocxStyles(brand); //     -> { colors, heading1, heading2, heading3, body, small? } for docx.Document
toPdfCss(brand); //         -> "@page { size: A4; margin: ...; } body { font-family: ...; } ..."
toEmailInline(brand); //    -> { inline: {...}, styleTag: "<style>...</style>", table: { open, close } }
toFlatJson(brand); //       -> { "color.light.primary": "#04556D", "font.web.family": "Onest", ... }
toDtcgJson(brand); //       -> W3C design tokens { color: { light: { primary: { $type, $value } } } }
toTelegramTheme(brand); //  -> { light: { bg_color, button_color, ... }, dark: { ... } }
toMarpTheme(brand, name); // -> Marp theme CSS ("/* @theme name */ ...")
toPptxTheme(brand); //      -> { colors: { dk1, lt1, accent1..6, hlink }, fonts: { major, minor } }
resolveColors(brand, "dark"); // -> every color role for one mode, dark layered over light
```

Every transformer is a pure function: `(brand: BrandFile) => string | object`. None of them
read files, mutate their input, or throw on missing *optional* fields — they fall back to
sane defaults instead. Validation is a separate, explicit step (`validateBrand`), so a
transformer never has to guard against malformed data itself.

### Validation

```ts
import { validateBrand, checkBrand } from "@nomadigit/brand";

validateBrand(data); // BrandFile, or throws Error("brand.json failed schema validation:\n  - /colors/text must be string\n  ...")
checkBrand(data); //    { valid: boolean; errors: string } — non-throwing variant
```

### Forward compatibility

The schema keeps `additionalProperties: true` throughout, and every generated TypeScript
type carries a `[k: string]: unknown` index signature. Adding a new field to `brand.json` in
the future will pass validation and won't break existing transformers — they simply won't
read the new field until you teach them to.

## Field → output reference

| `brand.json` field                 | `toWebCss`                              | `toTailwindConfig`               | `toDocxStyles`                | `toPdfCss`                     | `toEmailInline`                  |
| ----------------------------------- | ---------------------------------------- | --------------------------------- | ------------------------------ | -------------------------------- | ---------------------------------- |
| `colors.primary/secondary/accent`   | `--color-primary` etc.                   | `theme.extend.colors.*`           | `colors.*` (hex, no `#`)       | heading color                    | `heading` color                    |
| `colors.semantic.*`                 | `--color-success` etc.                   | `theme.extend.colors.success` etc. | —                               | —                                 | —                                   |
| `colors.text` / `background`        | `--color-text` / `--color-background`    | `theme.extend.colors.*`           | `colors.text` / `colors.background` | `body` color/background     | `body`/`container`/`text` colors   |
| `colors.border`                     | `--color-border`                         | `theme.extend.colors.border`      | `colors.border`                | —                                 | —                                   |
| `colors.roles.*`                    | `--color-surface`, `--color-on-primary` … (kebab-case) | `theme.extend.colors.*`  | —                               | —                                 | —                                   |
| `colors.scale.<name>.<step>`        | `--color-<name>-<step>`                  | `theme.extend.colors["<name>-<step>"]` | —                         | —                                 | —                                   |
| `colors.darkMode.*` (incl. `roles`, `semantic`) | `@media (prefers-color-scheme: dark)` + `[data-theme="dark"]` blocks | via CSS variables (`useCssVariables`) | —   | —                                 | —                                   |
| `typography.displayFont` / `monoFont` | `--font-display-family` / `--font-mono-family` | `fontFamily.display` / `fontFamily.mono` | —                     | —                                 | —                                   |
| `typography.letterSpacing.*`        | `--letter-spacing-*`                     | `theme.extend.letterSpacing`      | —                               | —                                 | —                                   |
| `spacing.scale.*` / `spacing.radius.*` | `--space-*` / `--radius-*`            | `spacing` / `borderRadius`        | —                               | —                                 | —                                   |
| `motion.durations.*` / `easing.*`   | `--duration-*` / `--easing-*`            | `transitionDuration` / `transitionTimingFunction` | —               | —                                 | —                                   |
| `typography.webFont`                | `--font-web-family`                      | `theme.extend.fontFamily.web`     | —                               | —                                 | `font-family` on body/heading/text |
| `typography.printFont`              | —                                         | —                                  | `font` on every style           | `body { font-family }`           | —                                   |
| `typography.sizes.*`                | `--font-size-*`                          | `theme.extend.fontSize`           | `size` (converted to half-points) | `font-size` on body/h1/h2/h3   | `heading`/`text` `font-size`       |
| `typography.weights.*`              | `--font-weight-*`                        | `theme.extend.fontWeight`         | `bold` flag on headings         | —                                 | `heading` `font-weight`            |
| `typography.lineHeight.*`           | `--line-height-*`                        | `theme.extend.lineHeight`         | —                               | `line-height` on body/headings   | `text` `line-height`               |
| `spacing.unit`                      | `--spacing-unit`                         | —                                  | —                               | —                                 | —                                   |
| `spacing.borderRadius`              | `--radius`                               | `theme.extend.borderRadius`       | —                               | —                                 | —                                   |
| `layout.document.pageSize/margins`  | —                                         | —                                  | —                               | `@page { size; margin }`         | —                                   |
| `layout.email.maxWidth/contentPadding` | —                                      | —                                  | —                               | —                                 | `container` width/padding, `<style>` media query |

`toFlatJson`, `toDtcgJson`, `toTelegramTheme`, `toMarpTheme` and `toPptxTheme` read the resolved
color roles (`resolveColors`) and fonts. `logo`, `brandArchitecture`, `iconography`, `imagery` and `voice`
are guidance: `AGENTS.md` and `guidelines/` explain them, and `scripts/render-assets.ts` reads `logo` and the colors.

## Structure

```
tokens/brand.json           the brand (single source of truth)
schema/brand.schema.json    JSON Schema (draft-07): validation + generated TS types
src/                        validate.ts, transformers/*.ts, index.ts (compiled to lib/, committed)
scripts/build.ts            tokens -> dist/*
scripts/render-assets.ts    tokens -> assets/* (logo SVG/PNG, favicons, avatars, OG image, fonts)
scripts/og.ts               social card CLI
examples/acme-brand.json    a generic example brand, exercised by tests
tests/                      vitest: transformers + tokens contrast checks
```

## Tests

Each transformer has at least three cases: a fully-populated brand, a brand with only
required fields (checking defaults), and confirmation that `validateBrand` rejects invalid
data before it ever reaches a transformer. Run them with:

```bash
npm test
```
