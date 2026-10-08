/**
 * The public guideline page (GitHub Pages). Generated from the tokens so it can never drift;
 * styled only with dist/brand.css, which makes the page itself the first consumer of the brand.
 */
import type { BrandFile } from "../../src";
import { resolveColors } from "../../src";

const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

const ROLE_NOTES: Record<string, string> = {
  background: "Page background",
  surface: "Cards, sheets, inputs",
  "surface-muted": "Secondary surfaces, chips, code",
  border: "Dividers, outlines",
  text: "Body text, headings",
  muted: "Secondary text, hints",
  primary: "Actions, links, the mark",
  "on-primary": "Text on primary",
  accent: "One focal point: the waypoint dot",
  "on-accent": "Text on accent",
  link: "Links",
  focus: "Focus rings",
  success: "Status",
  warning: "Status",
  error: "Errors (never the accent)",
  info: "Status",
};

export function siteHtml(brand: BrandFile): string {
  const light = resolveColors(brand, "light");
  const dark = resolveColors(brand, "dark");
  const roles = Object.keys(light).filter((k) => k in ROLE_NOTES);
  const scale = brand.colors.scale?.primary ?? {};
  const t = brand.typography;
  const v = brand.meta.version;

  const swatch = (c: string) => `<span class="sw" style="background:${c}"></span><code>${c}</code>`;
  const colorRows = roles
    .map((r) => `<tr><th scope="row"><code>--color-${r}</code></th><td>${swatch(light[r])}</td><td>${swatch(dark[r])}</td><td class="muted">${ROLE_NOTES[r]}</td></tr>`)
    .join("");
  const scaleStrip = Object.entries(scale)
    .map(([k, c]) => `<div class="step" style="background:${c};color:${Number(k) >= 500 ? "#fff" : light.text}"><span>${k}</span></div>`)
    .join("");
  const sizes = Object.entries(t.sizes)
    .reverse()
    .map(([k, s]) => `<div class="size-row"><code>${k} · ${s}</code><span style="font-size:${s};font-weight:${["display", "h1", "h2"].includes(k) ? "var(--font-weight-display)" : k === "h3" ? "var(--font-weight-bold)" : "400"};line-height:1.15">Кочевник пишет код · Nomad writes code</span></div>`)
    .join("");
  const voiceRows = (brand.voice?.examples ?? [])
    .map((e: any) => `<tr><th scope="row">${esc(e.context)}</th><td>${esc(e.do)}</td><td class="muted"><s>${esc(e.dont)}</s></td></tr>`)
    .join("");
  const list = (items: string[] = []) => items.map((i) => `<li>${esc(i)}</li>`).join("");

  const downloads: [string, string][] = [
    ["dist/brand.css", "Fonts + tokens + base styles, one link"],
    ["dist/tokens.css", "CSS variables, light + dark"],
    ["dist/tailwind.preset.cjs", "Tailwind preset (CSS-variable colors)"],
    ["dist/tokens.flat.json", "Flat tokens for Go, Kotlin, scripts"],
    ["dist/tokens.json", "W3C design tokens (Figma Tokens, Style Dictionary)"],
    ["dist/telegram-theme.json", "Telegram Mini App colors"],
    ["dist/marp-theme.css", "Slide theme (Marp)"],
    ["dist/pptx-theme.json", "PowerPoint theme slots"],
    ["dist/docx-styles.json", "Word document styles"],
    ["assets/logo/lockup-horizontal.svg", "Logo (light)"],
    ["assets/logo/lockup-horizontal-dark.svg", "Logo (dark)"],
    ["assets/logo/app-icon.svg", "App icon"],
    ["assets/social/avatar-telegram.png", "Telegram avatar"],
    ["assets/social/og-default.png", "Default social card"],
    ["assets/fonts/fonts.css", "Self-hosted Onest + Geist Mono"],
  ];

  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Nomadigit Brand</title>
<meta name="description" content="${esc(brand.meta.description ?? "Nomadigit brand guidelines")}">
<meta property="og:image" content="assets/social/og-default.png">
<meta name="theme-color" content="${light.background}" media="(prefers-color-scheme: light)">
<meta name="theme-color" content="${dark.background}" media="(prefers-color-scheme: dark)">
<link rel="icon" href="assets/favicon/favicon.svg" type="image/svg+xml">
<link rel="stylesheet" href="dist/brand.css">
<style>
  .wrap { max-width: 1120px; margin: 0 auto; padding-inline: var(--space-6); }
  @media (max-width: 600px) { .wrap { padding-inline: var(--space-4); } }
  header.top { position: sticky; top: 0; z-index: 2; background: color-mix(in srgb, var(--color-background) 88%, transparent); backdrop-filter: blur(8px); border-bottom: 1px solid var(--color-border); }
  header.top .wrap { display: flex; align-items: center; justify-content: space-between; gap: var(--space-4); padding-block: var(--space-3); }
  header.top nav { display: flex; flex-wrap: wrap; gap: var(--space-4); font-size: var(--font-size-sm); }
  header.top nav a { color: var(--color-muted); text-decoration: none; }
  header.top nav a:hover { color: var(--color-text); }
  .logo { height: 26px; display: block; }
  .logo-dark { display: none; }
  @media (prefers-color-scheme: dark) { :root:not([data-theme="light"]) .logo-light { display: none; } :root:not([data-theme="light"]) .logo-dark { display: block; } }
  :root[data-theme="dark"] .logo-light { display: none; } :root[data-theme="dark"] .logo-dark { display: block; }
  .theme-btn { font: var(--font-weight-bold) var(--font-size-xs)/1 var(--font-web-family); letter-spacing: var(--letter-spacing-label); text-transform: uppercase; background: var(--color-surface-muted); color: var(--color-text); border: 0; border-radius: var(--radius-pill); padding: 8px 12px; cursor: pointer; }
  main section { padding-block: var(--space-12); border-bottom: 1px solid var(--color-border); display: grid; gap: var(--space-6); }
  .eyebrow { font: var(--font-weight-bold) var(--font-size-xs)/1 var(--font-web-family); letter-spacing: var(--letter-spacing-label); text-transform: uppercase; color: var(--color-muted); }
  .hero h1 { font-size: clamp(36px, 6vw, var(--font-size-display)); max-width: 18ch; margin: 0; }
  .hero p { margin: 0; max-width: 60ch; color: var(--color-muted); font-size: var(--font-size-lg); }
  h2 { margin: 0; }
  .muted { color: var(--color-muted); }
  .grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(min(100%, 240px), 1fr)); gap: var(--space-4); }
  .tile { border-radius: var(--radius-lg); padding: var(--space-6); display: grid; place-items: center; min-height: 160px; border: 1px solid var(--color-border); }
  .tile img { max-width: 100%; max-height: 64px; }
  .tile.l { background: ${light.background}; } .tile.d { background: ${dark.background}; border-color: ${dark.border}; } .tile.p { background: ${light.primary}; border-color: ${light.primary}; }
  .tile.s { background: var(--color-surface); }
  .table-wrap { overflow-x: auto; }
  table { border-collapse: collapse; width: 100%; font-size: var(--font-size-sm); }
  th, td { text-align: left; padding: 10px 12px; border-bottom: 1px solid var(--color-border); vertical-align: middle; }
  thead th { font: var(--font-weight-bold) var(--font-size-xs)/1 var(--font-web-family); letter-spacing: var(--letter-spacing-label); text-transform: uppercase; color: var(--color-muted); }
  th[scope="row"] { font-weight: 400; white-space: nowrap; }
  .sw { display: inline-block; width: 22px; height: 22px; border-radius: 6px; vertical-align: middle; margin-right: 8px; box-shadow: inset 0 0 0 1px color-mix(in srgb, var(--color-text) 15%, transparent); }
  td code, th code { font-size: 12.5px; }
  .scale { display: grid; grid-template-columns: repeat(10, minmax(0, 1fr)); border-radius: var(--radius-md); overflow: hidden; }
  .step { height: 64px; display: flex; align-items: flex-end; padding: 6px; font: 11px/1 var(--font-mono-family); }
  .size-row { display: grid; grid-template-columns: 120px minmax(0, 1fr); gap: var(--space-4); align-items: baseline; padding-block: var(--space-2); border-bottom: 1px solid var(--color-border); overflow: hidden; }
  .size-row span { white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  .size-row code { color: var(--color-muted); font-size: 12px; }
  .demo { display: flex; flex-wrap: wrap; gap: var(--space-3); align-items: center; }
  .btn { font: var(--font-weight-bold) var(--font-size-sm)/1 var(--font-web-family); padding: 12px 16px; border-radius: var(--radius-md); border: 0; cursor: pointer; }
  .btn.primary { background: var(--color-primary); color: var(--color-on-primary); }
  .btn.secondary { background: color-mix(in srgb, var(--color-primary) 12%, transparent); color: var(--color-primary); }
  .badge { font: var(--font-weight-medium) var(--font-size-xs)/1 var(--font-web-family); padding: 6px 10px; border-radius: var(--radius-pill); }
  .card { background: var(--color-surface); border: 1px solid var(--color-border); border-radius: var(--radius-lg); padding: var(--space-6); display: grid; gap: var(--space-3); max-width: 420px; }
  .card .dot { width: 10px; height: 10px; border-radius: 50%; background: var(--color-accent); }
  input.field { font: inherit; color: inherit; background: var(--color-surface-muted); border: 1px solid transparent; border-radius: var(--radius-md); padding: 12px; min-width: 0; width: 100%; box-sizing: border-box; }
  input.field:focus-visible { outline: none; border-color: var(--color-focus); }
  .cols { display: grid; grid-template-columns: repeat(auto-fit, minmax(min(100%, 320px), 1fr)); gap: var(--space-6); }
  ul.rules { margin: 0; padding-left: 20px; display: grid; gap: var(--space-2); }
  .dl a { display: grid; gap: 2px; padding: var(--space-4); border: 1px solid var(--color-border); border-radius: var(--radius-md); text-decoration: none; background: var(--color-surface); }
  .dl a span { color: var(--color-muted); font-size: var(--font-size-sm); }
  .dl code { color: var(--color-text); }
  pre { background: var(--color-surface-muted); border-radius: var(--radius-md); padding: var(--space-4); overflow-x: auto; font-size: 13px; margin: 0; }
  footer.foot { padding-block: var(--space-8); color: var(--color-muted); font-size: var(--font-size-sm); }
</style>
</head>
<body>
<header class="top"><div class="wrap">
  <a href="./" aria-label="Nomadigit"><img class="logo logo-light" src="assets/logo/lockup-horizontal.svg" alt="Nomadigit"><img class="logo logo-dark" src="assets/logo/lockup-horizontal-dark.svg" alt="Nomadigit"></a>
  <nav aria-label="Sections"><a href="#logo">Logo</a><a href="#color">Color</a><a href="#type">Type</a><a href="#ui">UI</a><a href="#voice">Voice</a><a href="#use">Use</a></nav>
  <button class="theme-btn" id="theme" type="button">Theme: auto</button>
</div></header>

<main class="wrap">
  <section class="hero">
    <span class="eyebrow">Brand guidelines · v${esc(v)}</span>
    <h1>${esc(brand.identity.tagline ?? brand.identity.displayName)}</h1>
    <p>${esc(brand.meta.description ?? "")} Built from one file, <code>tokens/brand.json</code>. Agents start at <a href="AGENTS.md">AGENTS.md</a> or <a href="llms.txt">llms.txt</a>.</p>
  </section>

  <section id="logo">
    <span class="eyebrow">Logo</span>
    <h2>Waypoint</h2>
    <p class="muted" style="margin:0;max-width:62ch">A lowercase n drawn as one route that ends in a red waypoint dot. It stands for moving and arriving.</p>
    <div class="grid">
      <div class="tile l"><img src="assets/logo/lockup-horizontal.svg" alt="Lockup on light"></div>
      <div class="tile d"><img src="assets/logo/lockup-horizontal-dark.svg" alt="Lockup on dark"></div>
      <div class="tile p"><img src="assets/logo/mark-inverse.svg" alt="Inverse mark on petrol" width="72" height="72"></div>
      <div class="tile s"><img src="assets/logo/app-icon.svg" alt="App icon" style="max-height:96px;border-radius:22%"></div>
    </div>
    ${(brand.products ?? []).length ? `<h3 style="margin:0">Product icons</h3>
    <p class="muted" style="margin:0;max-width:62ch">The master mark plus one cue for what the product does. The name next to it stays plain text.</p>
    <div class="grid">${(brand.products as any[]).map((p) => `<div class="tile s" style="gap:12px"><img src="assets/products/${p.id}/avatar-telegram.png" alt="${esc(p.name)} icon" width="96" height="96" style="border-radius:50%;max-height:none"><strong>${esc(p.displayName ?? p.name)}</strong></div>`).join("")}</div>` : ""}
    <div class="cols">
      <div><h3>Do</h3><ul class="rules">${list(brand.logo?.usage?.do)}</ul></div>
      <div><h3>Don't</h3><ul class="rules">${list(brand.logo?.usage?.dont)}</ul></div>
    </div>
  </section>

  <section id="color">
    <span class="eyebrow">Color</span>
    <h2>Petrol, one red dot, quiet neutrals</h2>
    <div class="table-wrap"><table>
      <thead><tr><th>Token</th><th>Light</th><th>Dark</th><th>Use</th></tr></thead>
      <tbody>${colorRows}</tbody>
    </table></div>
    <div class="scale" aria-label="Primary scale 50–900">${scaleStrip}</div>
    <p class="muted" style="margin:0">Every text pair passes WCAG AA (4.5:1) and every mark passes 3:1, in both themes. <code>npm test</code> enforces it.</p>
  </section>

  <section id="type">
    <span class="eyebrow">Typography</span>
    <h2>One family: ${esc(t.webFont.family)}</h2>
    <p class="muted" style="margin:0;max-width:62ch">Hierarchy comes from weight and size. Code, dates and IDs use <code>${esc(t.monoFont?.family ?? "monospace")}</code>. Both fonts are SIL OFL 1.1 and support Latin and Cyrillic.</p>
    <div>${sizes}</div>
    <pre><code>0123456789  04.10.2026  15:30  /remind через 30 минут
const brand = require("@nomadigit/brand");</code></pre>
  </section>

  <section id="ui">
    <span class="eyebrow">Interface</span>
    <h2>Patterns</h2>
    <div class="demo">
      <button class="btn primary" type="button">Создать напоминание</button>
      <button class="btn secondary" type="button">Отложить</button>
      <span class="badge" style="color:var(--color-success);background:color-mix(in srgb,var(--color-success) 12%,transparent)">Готово</span>
      <span class="badge" style="color:var(--color-warning);background:color-mix(in srgb,var(--color-warning) 14%,transparent)">Скоро</span>
      <span class="badge" style="color:var(--color-error);background:color-mix(in srgb,var(--color-error) 12%,transparent)">Ошибка</span>
    </div>
    <div class="card">
      <div style="display:flex;align-items:center;gap:8px"><span class="dot" aria-hidden="true"></span><span class="eyebrow">Сегодня · 15:00</span></div>
      <strong style="font-size:var(--font-size-lg)">Созвон с командой</strong>
      <span class="muted">Напомню за 15 минут.</span>
      <label class="muted" for="when" style="font-size:var(--font-size-sm)">Когда напомнить</label>
      <input class="field" id="when" value="завтра в 10">
    </div>
  </section>

  <section id="voice">
    <span class="eyebrow">Voice</span>
    <h2>${esc((brand.voice?.tone ?? []).join(", ").replace(/^./, (c: string) => c.toUpperCase()))}</h2>
    <ul class="rules">${list(brand.voice?.principles)}</ul>
    <div class="table-wrap"><table><thead><tr><th>Context</th><th>Do</th><th>Don't</th></tr></thead><tbody>${voiceRows}</tbody></table></div>
  </section>

  <section id="use">
    <span class="eyebrow">Use it</span>
    <h2>Files</h2>
    <pre><code>&lt;link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/Nomadigit/brand@v${esc(v)}/dist/brand.css"&gt;
npm i git+https://github.com/Nomadigit/brand.git#v${esc(v)}</code></pre>
    <div class="grid dl">${downloads.map(([p, d]) => `<a href="${p}"><code>${p}</code><span>${d}</span></a>`).join("")}</div>
  </section>
</main>
<footer class="foot wrap">© Nomadigit · Code MIT · Logo all rights reserved · Fonts SIL OFL 1.1 · <a href="https://github.com/Nomadigit/brand">GitHub</a></footer>
<script>
  (function () {
    var btn = document.getElementById("theme"), root = document.documentElement, order = ["auto", "light", "dark"];
    var cur = "auto"; try { cur = localStorage.getItem("ndg-theme") || "auto"; } catch (e) {}
    function apply() { if (cur === "auto") root.removeAttribute("data-theme"); else root.setAttribute("data-theme", cur); btn.textContent = "Theme: " + cur; }
    btn.addEventListener("click", function () { cur = order[(order.indexOf(cur) + 1) % 3]; try { localStorage.setItem("ndg-theme", cur); } catch (e) {} apply(); });
    apply();
  })();
</script>
</body>
</html>
`;
}
