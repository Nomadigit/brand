# Color

Petrol carries the brand. Signal red marks a single point of attention. Neutrals are cool greys,
slightly tinted toward petrol. All values live in `tokens/brand.json` and reach code through `dist/`.

## Roles

| Token (CSS var) | Light | Dark | Use for |
|---|---|---|---|
| `--color-background` | `#F7FBFD` | `#0A1113` | Page background |
| `--color-surface` | `#FFFFFF` | `#131B1E` | Cards, sheets, inputs |
| `--color-surface-muted` | `#EDF3F6` | `#1A2428` | Secondary surfaces, code, chips |
| `--color-border` | `#D6E2E7` | `#2A3539` | Dividers, outlines |
| `--color-text` | `#101D22` | `#E6ECEF` | Body text, headings |
| `--color-muted` | `#526066` | `#9FAAAE` | Secondary text, captions, hints |
| `--color-primary` | `#04556D` | `#7ACAE9` | Buttons, links, active states, the mark |
| `--color-on-primary` | `#FFFFFF` | `#0A1113` | Text and icons on primary |
| `--color-accent` | `#FC5950` | `#FE8B7F` | Waypoint dot, one focal point, highlighted data point |
| `--color-on-accent` | `#101D22` | `#0A1113` | Text on accent (rare) |
| `--color-link` / `--color-focus` | `#04556D` / `#2F829F` | `#7ACAE9` / `#96DDF9` | Links / focus rings |
| `--color-success` · `warning` · `error` · `info` | `#1D7D3E` · `#B87609` · `#9D203A` · `#0470A5` | `#65C67D` · `#F2AF48` · `#E8809A` · `#5FB8F2` | Status only |
| `--color-primary-50 … 900` | scale | (same) | Charts, illustrations, tints |

## Rules

- **Proportions:** about 70% neutrals, 25% petrol (primary and its scale), 5% red at most.
- **Accent red:** one focal point per view, such as the dot, a "new" badge, or the key bar in a chart.
  Never use it for text paragraphs, large backgrounds or errors.
- **Errors are burgundy (`error`), not accent red,** and always come with an icon and text. Color is never
  the only signal of state.
- **Charts:** use the primary scale for series. Highlight one value with accent and leave the rest neutral.
- **Tints:** for a soft primary background use `color-mix(in srgb, var(--color-primary) 12%, transparent)`.
  Don't invent new hex values.
- **Contrast:** `tests/tokens.test.ts` asserts AA for every text pair and 3:1 for marks, in both themes.
  If you add a new pairing, add it to that test.
