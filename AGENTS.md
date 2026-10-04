# Nomadigit brand: agent guide

You are styling something for **Nomadigit**: a site, a Telegram bot or Mini App, an app screen, a slide
deck, a CV or document, a logo placement, or an image. This file contains the rules. The detailed
guides are in [`guidelines/`](guidelines/) and the values are in [`tokens/brand.json`](tokens/brand.json).

**Raw base URL** (for agents without a local clone):
`https://raw.githubusercontent.com/Nomadigit/brand/main/`
**CDN base** (for `<link>`/`<img>` in pages): `https://cdn.jsdelivr.net/gh/Nomadigit/brand@main/`

## Non-negotiables

1. **Never hardcode brand values.** Take colors, fonts, sizes, radii and spacing from the generated files
   in `dist/` (CSS variables, Tailwind preset, flat JSON). Never retype a hex code from this page
   into product code. A hex value that doesn't come from the tokens is a bug.
2. **One typeface: Onest.** Headings use 700, emphasis 600, text 400. Code, dates, IDs and tabular
   numbers use **JetBrains Mono**. Never add a second text font, a serif, or a "display" font.
3. **Colors have roles.** Petrol `primary` is used for actions, links and the mark. Red `accent` is
   the waypoint dot and **at most one focal point per screen**. Never use accent for body text, large
   fills or errors. Errors use `error` (burgundy) plus an icon and text.
4. **Both themes always.** Every UI ships light and dark, using the roles in `dist/tokens.css`.
   `prefers-color-scheme` is the default and `<html data-theme="light|dark">` overrides it. Contrast
   is pre-checked in tests (text AA 4.5:1, marks 3:1). Stay inside the role pairs and it holds.
5. **Logo from SVG files only.** Use `assets/logo/*`. Never redraw, retype, recolor, stretch,
   outline, shadow or animate the mark.
6. **Voice: clear, friendly, short.** Say what happens, then stop. No hype, no exclamation marks, no
   emoji in system text, no apologies in errors. See [voice](guidelines/voice.md).

## Brand architecture

- Master brand: **Nomadigit**. The product name comes first: "Reminder · Nomadigit".
- Personal documents (CV, talks, cover letters) lead with **Danil Shubin** and are signed
  **"Danil Shubin · Nomadigit"**.
- No sub-brands: a product never gets its own palette, typeface or wordmark.
- A product **may** get a **product icon**: the master mark plus exactly one cue for what the product does, drawn in the
  accent. Product icons are listed in `tokens/brand.json` → `products`, drawn in `scripts/lib/products.ts` and generated
  into `assets/products/<id>/`. Never draw one by hand in a product repo. To add a product, add a glyph there and an entry
  in `products`, then rebuild. Current products: **Reminder** (`assets/products/reminder/`, ringing arcs).

## What to read for the task at hand

| Task | Read | Use |
|---|---|---|
| Website, landing, web app | [recipes/web.md](guidelines/recipes/web.md) | `dist/brand.css` or `dist/tokens.css` + `dist/tailwind.preset.cjs` |
| Telegram bot / Mini App | [recipes/telegram-bot.md](guidelines/recipes/telegram-bot.md) | `templates/telegram/`, `dist/telegram-mini-app.js`, `assets/social/avatar-telegram.png` |
| Slides / presentation | [recipes/slides.md](guidelines/recipes/slides.md) | `templates/slides/deck.md` + `dist/marp-theme.css` (or `dist/pptx-theme.json`) |
| CV, letter, PDF/DOCX | [recipes/cv-docs.md](guidelines/recipes/cv-docs.md) | `dist/docx-styles.json`, `dist/pdf.css` |
| Social card / OG / image | [recipes/social-images.md](guidelines/recipes/social-images.md), [imagery](guidelines/imagery.md) | `npm run og -- "Title"`, `imagery.promptTemplate` |
| Android / Kotlin / Go / other | [recipes/native.md](guidelines/recipes/native.md) | `dist/tokens.flat.json`, `dist/tokens.json` (W3C) |
| Logo placement | [logo.md](guidelines/logo.md) | `assets/logo/*`, `assets/favicon/*` |
| Product icon (bot avatar, app icon) | [logo.md → Product icons](guidelines/logo.md#product-icons) | `assets/products/<id>/*` |
| Colors, type, layout, icons, motion | [color](guidelines/color.md), [typography](guidelines/typography.md), [layout](guidelines/layout.md), [icons](guidelines/icons.md), [motion](guidelines/motion.md) | |

## Quick reference (read-only summary; the tokens are the source)

| Role | Light | Dark |
|---|---|---|
| primary | `#04556D` petrol | `#7ACAE9` |
| accent | `#FC5950` signal red | `#FE8B7F` |
| background / surface | `#F7FBFD` / `#FFFFFF` | `#0A1113` / `#131B1E` |
| text / muted | `#101D22` / `#526066` | `#E6ECEF` / `#9FAAAE` |
| error | `#9D203A` | `#E8809A` |

Type scale (px): 12 · 14 · **16 body** · 18 · 20 h3 · 28 h2 · 36 h1 · 48 display. Spacing on a 4/8px
grid. Radius 6 / **10 default** / 16 / pill. Icons: Lucide, stroke 1.75.

## Done checklist

- [ ] No literal brand colors or font names in product code. Everything goes through tokens.
- [ ] Light and dark both checked, focus states visible, `prefers-reduced-motion` respected.
- [ ] At most one accent focal point per view, and accent never used for text or errors.
- [ ] Logo from `assets/logo`, with clear space ≥ half the mark height, and the mark not below 16px.
- [ ] Copy follows [voice](guidelines/voice.md) in the right language (ru products: «ты»; CV/formal: «вы»).

## Changing the brand itself

Edit `tokens/brand.json` only, then run `npm run build` (this regenerates `lib/`, `dist/` and `assets/`)
and `npm test` (schema + contrast). Never hand-edit anything in `dist/` or `assets/`.
