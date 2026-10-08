<!-- GitHub picks the variant by its own theme via #gh-*-mode-only; <picture> media queries follow the OS instead and can show the dark logo on a light page. -->
<p>
  <img src="assets/logo/lockup-horizontal.svg#gh-light-mode-only" alt="Nomadigit" height="48">
  <img src="assets/logo/lockup-horizontal-dark.svg#gh-dark-mode-only" alt="Nomadigit" height="48">
</p>

# Nomadigit brand

One stamp for every Nomadigit project: sites, Telegram bots and Mini Apps, apps, slide decks, the CV, logos and
images. Everything comes from one file, [`tokens/brand.json`](tokens/brand.json), and is generated into ready-to-use
formats for every stack, plus guidelines that people and AI agents follow.

**Live guide:** https://nomadigit.github.io/brand/ · **For agents:** [`AGENTS.md`](AGENTS.md) · [`llms.txt`](llms.txt)

## What's inside

| Path | What |
|---|---|
| `tokens/brand.json` | The brand: colors (light/dark), Onest + Geist Mono, sizes, spacing, logo rules, voice |
| `dist/` | Generated: `tokens.css`, `brand.css`, `tailwind.preset.cjs`, `tokens.flat.json`, `tokens.json` (W3C), `telegram-theme.json`, `telegram-mini-app.js`, `marp-theme.css`, `pptx-theme.json`, `docx-styles.json`, `pdf.css`, `email.json`, `bundle/` |
| `assets/` | Generated: logo SVG/PNG, favicons, app icon, Telegram/GitHub avatars, OG image, self-hosted fonts |
| `guidelines/` | Logo, color, typography, layout, icons, motion, imagery, voice, and recipes per medium |
| `templates/` | Web starter, Telegram Mini App CSS, Marp slide deck |
| `skill/brand/` | Claude Code skill (`scripts/install-skill.sh`) |
| `src/`, `lib/` | TypeScript API: `validateBrand`, `toWebCss`, `toTailwindConfig`, … ([docs/api.md](docs/api.md)) |

## Use it

```html
<!-- any web page -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/Nomadigit/brand@v1.1.0/dist/brand.css">
```

```bash
npm i git+https://github.com/Nomadigit/brand.git#v1.1.0      # npm projects: CSS, Tailwind preset, API
curl -fsSL https://raw.githubusercontent.com/Nomadigit/brand/v1.1.0/dist/tokens.flat.json   # Go, Kotlin, anything
```

The recipes in [`guidelines/recipes/`](guidelines/recipes/) cover web, Telegram, slides, CV and docs, social images, and native code.

## Change the brand

```bash
npm ci
# edit tokens/brand.json
npm run build      # lib/ + assets/ + dist/
npm test           # schema + transformers + WCAG contrast of every color pair, light and dark
npm run og -- "Title" --out card.png   # social card
```

`dist/`, `assets/` and `lib/` are committed, so consumers never need a build step. CI fails if they are stale.
Release by tagging `vX.Y.Z`. Consumers pin tags.

## License

Code: [MIT](LICENSE). The Nomadigit name, logo and mark are not covered by the MIT license; see [TRADEMARKS.md](TRADEMARKS.md).
Fonts: SIL Open Font License 1.1 ([Onest](assets/fonts/OFL-onest.txt), [Geist Mono](assets/fonts/OFL-geist-mono.txt)).
