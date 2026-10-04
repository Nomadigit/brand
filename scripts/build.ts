/**
 * Validates tokens/brand.json and writes every derived format to dist/.
 * dist/ is committed so non-npm consumers (Go, Kotlin, agents) can fetch files by raw URL.
 */
import fs from "node:fs";
import path from "node:path";
import {
  validateBrand,
  toWebCss,
  toTailwindConfig,
  toDocxStyles,
  toPdfCss,
  toEmailInline,
  toFlatJson,
  toDtcgJson,
  toTelegramTheme,
  toMarpTheme,
  toPptxTheme,
} from "../src";
import { siteHtml } from "./lib/site";

const ROOT = path.resolve(__dirname, "..");
const DIST = path.join(ROOT, "dist");
const HEADER = "Generated from tokens/brand.json by @nomadigit/brand. Do not edit; edit the tokens and run `npm run build`.";

const brand = validateBrand(JSON.parse(fs.readFileSync(path.join(ROOT, "tokens/brand.json"), "utf8")));
fs.rmSync(DIST, { recursive: true, force: true });
fs.mkdirSync(DIST, { recursive: true });

const write = (name: string, content: string) => fs.writeFileSync(path.join(DIST, name), content.endsWith("\n") ? content : content + "\n");
const json = (name: string, data: unknown) => write(name, JSON.stringify(data, null, 2));

write("tokens.css", `/* ${HEADER} */\n${toWebCss(brand)}`);
// tokens.css + fonts + a minimal base, for pages that want the brand with one <link>.
write(
  "brand.css",
  `/* ${HEADER} */
@import url("../assets/fonts/fonts.css");
@import url("./tokens.css");

html { color-scheme: light; }
:root[data-theme="dark"] { color-scheme: dark; }
body {
  margin: 0;
  background: var(--color-background);
  color: var(--color-text);
  font-family: var(--font-web-family);
  font-size: var(--font-size-body);
  line-height: var(--line-height-body);
  -webkit-font-smoothing: antialiased;
}
h1, h2, h3 { font-family: var(--font-display-family); line-height: var(--line-height-heading); letter-spacing: var(--letter-spacing-heading); text-wrap: balance; }
h1 { font-size: var(--font-size-h1); font-weight: var(--font-weight-display); letter-spacing: var(--letter-spacing-display); }
h2 { font-size: var(--font-size-h2); font-weight: var(--font-weight-display); }
h3 { font-size: var(--font-size-h3); font-weight: var(--font-weight-bold); }
a { color: var(--color-link); text-underline-offset: 3px; }
code, kbd, pre, samp { font-family: var(--font-mono-family); }
:focus-visible { outline: 2px solid var(--color-focus); outline-offset: 2px; }
@media (prefers-reduced-motion: reduce) { *, *::before, *::after { transition-duration: 1ms !important; animation-duration: 1ms !important; } }
`
);
write("tailwind.preset.cjs", `// ${HEADER}\n// Use with dist/tokens.css on the page: colors are CSS variables, so dark mode follows [data-theme] / OS.\nmodule.exports = ${JSON.stringify(toTailwindConfig(brand, { useCssVariables: true }), null, 2)};`);
json("tailwind.literal.json", toTailwindConfig(brand));
json("tokens.json", toDtcgJson(brand));
json("tokens.flat.json", toFlatJson(brand));
json("telegram-theme.json", toTelegramTheme(brand));
json("docx-styles.json", toDocxStyles(brand));
json("pptx-theme.json", toPptxTheme(brand));
json("email.json", toEmailInline(brand));
write("pdf.css", `/* ${HEADER} */\n${toPdfCss(brand)}`);
write("marp-theme.css", toMarpTheme(brand, "nomadigit"));

const tg = toTelegramTheme(brand);
const tgColors = (m: "light" | "dark") => ({ header: tg[m].header_color, background: tg[m].bg_color, bottomBar: tg[m].bottom_bar_color });
write(
  "telegram-mini-app.js",
  `// ${HEADER}
// Telegram decides light vs dark; the brand supplies the colors. Include after telegram-web-app.js.
(function () {
  var THEME = ${JSON.stringify({ light: tgColors("light"), dark: tgColors("dark") })};
  var tg = window.Telegram && window.Telegram.WebApp;
  function apply() {
    var scheme = tg && tg.colorScheme === "dark" ? "dark" : "light";
    document.documentElement.setAttribute("data-theme", scheme);
    if (!tg) return;
    var t = THEME[scheme];
    try { tg.setHeaderColor(t.header); tg.setBackgroundColor(t.background); if (tg.setBottomBarColor) tg.setBottomBarColor(t.bottomBar); } catch (e) {}
  }
  apply();
  if (tg) { tg.onEvent("themeChanged", apply); tg.ready(); }
})();`
);

// Self-contained folder for vendoring (Go embed, static sites): no paths outside itself.
const BUNDLE = path.join(DIST, "bundle");
const FONTS = path.join(ROOT, "assets/fonts");
if (!fs.existsSync(path.join(FONTS, "fonts.css"))) throw new Error("assets/fonts missing: run `npm run build:assets` first");
fs.mkdirSync(path.join(BUNDLE, "fonts"), { recursive: true });
for (const f of fs.readdirSync(FONTS)) fs.copyFileSync(path.join(FONTS, f), path.join(BUNDLE, "fonts", f));
for (const f of ["tokens.css", "telegram-mini-app.js"]) fs.copyFileSync(path.join(DIST, f), path.join(BUNDLE, f));
fs.writeFileSync(path.join(BUNDLE, "brand.css"), fs.readFileSync(path.join(DIST, "brand.css"), "utf8").replace("../assets/fonts/fonts.css", "./fonts/fonts.css"));
fs.copyFileSync(path.join(ROOT, "templates/telegram/mini-app.css"), path.join(BUNDLE, "mini-app.css"));
for (const f of ["favicon.svg", "favicon.ico", "apple-touch-icon.png"]) fs.copyFileSync(path.join(ROOT, "assets/favicon", f), path.join(BUNDLE, f));
for (const f of ["lockup-horizontal.svg", "lockup-horizontal-dark.svg", "mark.svg", "mark-dark.svg"]) fs.copyFileSync(path.join(ROOT, "assets/logo", f), path.join(BUNDLE, f));

fs.mkdirSync(path.join(ROOT, "site"), { recursive: true });
fs.writeFileSync(path.join(ROOT, "site/index.html"), siteHtml(brand));

console.log("dist written:", fs.readdirSync(DIST).join(", "));
