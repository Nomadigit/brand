# Logo

The **Waypoint** mark is a lowercase *n* drawn as one route line that ends in a red waypoint dot.
It stands for moving and arriving. The name "Nomadigit" comes from *nomad* and *digit*.

## Files (`assets/logo/`)

| File | Use |
|---|---|
| `mark.svg` / `mark-dark.svg` | Mark alone, on light / dark backgrounds |
| `mark-inverse.svg` | Mark on a primary (petrol) fill: white route, light-red dot |
| `mark-mono.svg` | One color (`currentColor`): embossing, tray icons, single-color print |
| `wordmark*.svg` | Name alone, when the mark already appears nearby |
| `lockup-horizontal*.svg` / `.png` | Default logo: mark + name |
| `app-icon.svg` | Rounded square: app icons, PWA, favicons |
| `../favicon/*` | `favicon.svg`, `favicon.ico` (16/32/48), `apple-touch-icon.png`, `icon-192/512.png`, `icon-maskable-512.png` |
| `../social/avatar-telegram.png`, `avatar-github.png` | Avatars (safe for circular crop) |

All SVGs are outlined, so they never depend on installed fonts.

## Rules

- **Mark alone at 16–48px** (favicons, avatars, small UI). Use the **lockup** when the name fits.
- **Minimum size:** the mark is 16px tall, the lockup is 20px tall.
- **Clear space:** at least half the mark's height on every side. Keep text, edges and other logos out of it.
- **Backgrounds:** use the light variant on background or surface, and the dark variant on dark surfaces.
  On photos, gradients or mid-tones, put `mark-inverse` on a solid petrol chip.
- **Product lockups** are written as text next to the logo, never merged into it: `[logo] Reminder`.
  In bot names and titles, use the form "Reminder · Nomadigit".

## Never

- Recolor the route or the dot, swap their colors, or use colors outside the palette.
- Stretch, rotate, skew, outline, add shadow, glow or gradient, or animate the dot.
- Retype "nomadigit" in a font. Always use the SVG.
- Put the light mark where contrast with the background is below 3:1.

## Code

```html
<img src="https://cdn.jsdelivr.net/gh/Nomadigit/brand@main/assets/logo/lockup-horizontal.svg" alt="Nomadigit" height="28">
<link rel="icon" href="https://cdn.jsdelivr.net/gh/Nomadigit/brand@main/assets/favicon/favicon.svg" type="image/svg+xml">
<link rel="icon" href="https://cdn.jsdelivr.net/gh/Nomadigit/brand@main/assets/favicon/favicon.ico" sizes="32x32">
<link rel="apple-touch-icon" href="https://cdn.jsdelivr.net/gh/Nomadigit/brand@main/assets/favicon/apple-touch-icon.png">
```
