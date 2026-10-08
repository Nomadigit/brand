# Recipe: website or web app

## Fastest: one stylesheet

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/Nomadigit/brand@v1.1.0/dist/brand.css">
```

`brand.css` contains the fonts, all tokens as CSS variables (light and dark), and base styles for body, headings, links, code
and focus. A full starter page is in `templates/web/starter.html`.

## npm project (Vite, Next, etc.)

```bash
npm i git+https://github.com/Nomadigit/brand.git#v1.1.0
```

- Use the `git+https` form. `github:` shorthand writes an SSH URL into `package-lock.json`, and CI
  without an SSH key then fails.
- npm 12+ refuses git dependencies by default (`EALLOWGIT`). Add this to the project's `.npmrc`:
  `allow-git=root` (allows git only for dependencies the project itself declares).
- TypeScript with `moduleResolution: "node"` ignores `exports`. Import JSON by its file path, for example
  `@nomadigit/brand/tokens/brand.json`, or use `"moduleResolution": "bundler"` / `"node16"`.

```ts
import "@nomadigit/brand/fonts.css";
import "@nomadigit/brand/css";            // dist/tokens.css
```

```js
// tailwind.config.js (v3)
module.exports = { presets: [require("@nomadigit/brand/tailwind")], content: ["./src/**/*.{ts,tsx}"] };
```

Classes then map to brand roles: `bg-background text-text`, `bg-primary text-on-primary`, `border-border`,
`text-muted`, `bg-surface`, `rounded` (10px), `rounded-lg`, `font-display`, `font-mono`, `bg-primary-100`.
Colors are CSS variables, so dark mode works without `dark:` variants. Use `dark:` only for layout changes.

For Tailwind v4, use `@import "@nomadigit/brand/css";` and map the variables in `@theme` (for example
`--color-primary: var(--color-primary);`). Or skip Tailwind and use the variables directly.

## Theme switching

- Default: follow the OS.
- Manual toggle: set `document.documentElement.dataset.theme = "dark" | "light"` and remove the attribute to return to "system".
- Swap the logo by theme using `lockup-horizontal.svg` / `lockup-horizontal-dark.svg`. See the CSS in `templates/web/starter.html`.

## Components (patterns, not a library)

- **Primary button:** `background: var(--color-primary); color: var(--color-on-primary); border-radius: var(--radius-md);`
  padding 10px 16px, weight 600. Allow one primary button per view.
- **Secondary button:** primary text on a 12% primary tint.
- **Card:** surface background, 1px border, `--radius-lg`, padding 24px, no shadow.
- **Input:** surface-muted background with a transparent border that turns `--color-focus` on focus.
- **Badge / status:** pill radius, a semantic color for text and icon, and the same color at 12% for the background.

## Meta

```html
<meta name="theme-color" content="#F7FBFD" media="(prefers-color-scheme: light)">
<meta name="theme-color" content="#0A1113" media="(prefers-color-scheme: dark)">
<meta property="og:image" content="https://cdn.jsdelivr.net/gh/Nomadigit/brand@main/assets/social/og-default.png">
```

For page-specific cards, generate one with `npm run og`. See [social-images](social-images.md).
