# Typography

**One family: Onest** (SIL OFL 1.1, Latin and Cyrillic) for everything people read, and **Geist Mono** for
code and machine data. Hierarchy comes from weight and size, never from a second font.

| Role | Font | Weight | Size / line-height | Tracking |
|---|---|---|---|---|
| Display | Onest | 700 | 48px / 1.1 | −0.02em |
| H1 | Onest | 700 | 36px / 1.2 | −0.02em |
| H2 | Onest | 700 | 28px / 1.2 | −0.01em |
| H3 | Onest | 600 | 20px / 1.2 | −0.01em |
| Body | Onest | 400 | 16px / 1.55 | 0 |
| Small | Onest | 400 | 14px / 1.5 | 0 |
| Label / eyebrow, table headers | Onest | 600 | 12px, UPPERCASE | 0.06em |
| Code, commands, IDs, hashes, timestamps | Geist Mono | 400 | 0.95em of context | 0 |

## Loading

- **Web:** `dist/brand.css` already imports `assets/fonts/fonts.css`. These are self-hosted woff2 files, subset to Latin, Latin Ext,
  Cyrillic and Cyrillic Ext, at weights 400/500/600/700 for Onest and 400/500 for Mono. Don't load the fonts from Google
  Fonts in products. Self-hosting is faster and keeps working offline.
- **npm:** `@nomadigit/brand/fonts.css`, or `@fontsource/onest` + `@fontsource/geist-mono`.
- **Desktop (slides, DOCX, Figma):** install Onest from https://fonts.google.com/specimen/Onest and
  Geist Mono from https://fonts.google.com/specimen/Geist+Mono.
- **Android:** Google Fonts provider (`GoogleFont("Onest")`) or bundle the TTFs. See [native](recipes/native.md).

## Rules

- Running text stays under 70 characters per line. Headings use `text-wrap: balance`.
- Emphasis uses weight 600. Italics are not part of the brand.
- Numbers that line up in columns use Onest with `font-variant-numeric: tabular-nums`. Mono is for strings a person
  copies or types (code, commands, IDs), not for ordinary numbers.
- Labels are Onest, not Mono. Geist Mono was picked because its x-height and cap height match Onest (0.53 / 0.71 of
  the em) and its weight 400 has the same color as Onest 400, so the two sit on one line without a visible seam.
- Russian typography: «ёлочки» for quotes, an em dash surrounded by spaces, and a non-breaking space after one-letter prepositions in headings.
