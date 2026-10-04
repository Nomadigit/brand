/**
 * Builds everything under assets/ from tokens/brand.json:
 * logo SVGs (outlined, font-independent), favicons, app/bot icons, the default OG image,
 * and self-hosted font files with their @font-face stylesheet.
 */
import fs from "node:fs";
import path from "node:path";
import { Resvg } from "@resvg/resvg-js";
import pngToIco from "png-to-ico";
import { validateBrand, resolveColors } from "../src";
import { appIconSvg, lockupSvg, markSvg, wordmarkSvg, type MarkColors } from "./lib/logo";
import { ogSvg } from "./lib/og";
import { GLYPHS } from "./lib/products";

const ROOT = path.resolve(__dirname, "..");
const brand = validateBrand(JSON.parse(fs.readFileSync(path.join(ROOT, "tokens/brand.json"), "utf8")));
const light = resolveColors(brand, "light");
const dark = resolveColors(brand, "dark");

const out = (rel: string) => {
  const file = path.join(ROOT, "assets", rel);
  fs.mkdirSync(path.dirname(file), { recursive: true });
  return file;
};
const writeSvg = (rel: string, svg: string) => fs.writeFileSync(out(rel), svg);
const png = (svg: string, width: number) => new Resvg(svg, { fitTo: { mode: "width", value: width } }).render().asPng();
const writePng = (rel: string, svg: string, width: number) => fs.writeFileSync(out(rel), png(svg, width));

// The inverse dot sits on primary, so it takes the lighter dark-mode accent to keep 3:1.
const C = {
  light: { route: light.primary, dot: light.accent } satisfies MarkColors,
  dark: { route: dark.primary, dot: dark.accent } satisfies MarkColors,
  mono: { route: "currentColor", dot: "currentColor" } satisfies MarkColors,
  inverse: { route: light["on-primary"] ?? "#FFFFFF", dot: dark.accent } satisfies MarkColors,
};

// Logo
writeSvg("logo/mark.svg", markSvg(C.light));
writeSvg("logo/mark-dark.svg", markSvg(C.dark));
writeSvg("logo/mark-mono.svg", markSvg(C.mono));
writeSvg("logo/mark-inverse.svg", markSvg(C.inverse));
writeSvg("logo/wordmark.svg", wordmarkSvg(light.text));
writeSvg("logo/wordmark-dark.svg", wordmarkSvg(dark.text));
writeSvg("logo/wordmark-mono.svg", wordmarkSvg("currentColor"));
writeSvg("logo/lockup-horizontal.svg", lockupSvg(C.light, light.text));
writeSvg("logo/lockup-horizontal-dark.svg", lockupSvg(C.dark, dark.text));
writeSvg("logo/lockup-horizontal-mono.svg", lockupSvg(C.mono, "currentColor"));
const appIcon = appIconSvg(light.primary, C.inverse);
writeSvg("logo/app-icon.svg", appIcon);
writePng("logo/mark-512.png", markSvg(C.light), 512);
writePng("logo/lockup-horizontal.png", lockupSvg(C.light, light.text), 1200);
writePng("logo/lockup-horizontal-dark.png", lockupSvg(C.dark, dark.text), 1200);

// Favicons: the app icon reads on any tab color; 16px gets a bigger mark for legibility.
writeSvg("favicon/favicon.svg", appIcon);
const favicon16 = appIconSvg(light.primary, C.inverse, 512, 0.7, 0.2);
const icoSizes = [16, 32, 48];
const icoPngs = icoSizes.map((s) => png(s === 16 ? favicon16 : appIcon, s));
icoSizes.forEach((s, i) => fs.writeFileSync(out(`favicon/favicon-${s}.png`), icoPngs[i]));
const icoReady = pngToIco(icoPngs).then((ico) => fs.writeFileSync(out("favicon/favicon.ico"), ico));
writePng("favicon/apple-touch-icon.png", appIconSvg(light.primary, C.inverse, 512, 0.58, 0), 180);
writePng("favicon/icon-192.png", appIcon, 192);
writePng("favicon/icon-512.png", appIcon, 512);
// Maskable icons are cropped to a circle-ish safe zone (80%); keep the mark inside it.
writePng("favicon/icon-maskable-512.png", appIconSvg(light.primary, C.inverse, 512, 0.46, 0), 512);

// Social: Telegram crops avatars to a circle, so the mark stays inside the inscribed circle.
writePng("social/avatar-telegram.png", appIconSvg(light.primary, C.inverse, 640, 0.5, 0), 640);
writePng("social/avatar-github.png", appIconSvg(light.primary, C.inverse, 460, 0.56, 0), 460);
const og = ogSvg(brand, { title: brand.identity.tagline ?? brand.meta.name, kicker: brand.identity.website?.replace(/^https?:\/\//, "") });
writeSvg("social/og-default.svg", og);
writePng("social/og-default.png", og, 1200);

// Product icons: master mark + one cue, same colors and sizes as the brand's own icons.
fs.rmSync(path.join(ROOT, "assets/products"), { recursive: true, force: true });
for (const product of (brand.products ?? []) as { id: string; name: string; glyph: string; displayName?: string }[]) {
  const glyph = GLYPHS[product.glyph];
  if (!glyph) throw new Error(`products: unknown glyph "${product.glyph}" for "${product.id}" (see scripts/lib/products.ts)`);
  const title = product.displayName ?? product.name;
  const dir = `products/${product.id}`;
  writeSvg(`${dir}/mark.svg`, markSvg(C.light, title, glyph));
  writeSvg(`${dir}/mark-dark.svg`, markSvg(C.dark, title, glyph));
  writeSvg(`${dir}/mark-mono.svg`, markSvg(C.mono, title, glyph));
  writeSvg(`${dir}/mark-inverse.svg`, markSvg(C.inverse, title, glyph));
  const icon = appIconSvg(light.primary, C.inverse, 512, 0.6, 0.225, title, glyph);
  writeSvg(`${dir}/app-icon.svg`, icon);
  writeSvg(`${dir}/favicon.svg`, icon);
  writePng(`${dir}/icon-192.png`, icon, 192);
  writePng(`${dir}/icon-512.png`, icon, 512);
  writePng(`${dir}/apple-touch-icon.png`, appIconSvg(light.primary, C.inverse, 512, 0.58, 0, title, glyph), 180);
  writePng(`${dir}/avatar-telegram.png`, appIconSvg(light.primary, C.inverse, 640, 0.52, 0, title, glyph), 640);
}

// Fonts: copy the woff2 subsets this brand uses and write one stylesheet for them.
function copyFonts() {
  const pkgs: { pkg: string; weights: number[] }[] = [
    { pkg: "onest", weights: brand.typography.webFont.weights ?? [400, 600, 700] },
    { pkg: "jetbrains-mono", weights: brand.typography.monoFont?.weights ?? [400, 500] },
  ];
  const keep = /-(latin|latin-ext|cyrillic|cyrillic-ext)-\d+-normal/;
  const fontDir = out("fonts/x").replace(/x$/, "");
  for (const f of fs.readdirSync(fontDir).filter((f) => f.endsWith(".woff2"))) fs.unlinkSync(path.join(fontDir, f));

  let css = "/* Generated by scripts/render-assets.ts. Fonts: SIL Open Font License 1.1, see OFL-*.txt. */\n";
  for (const { pkg, weights } of pkgs) {
    const base = path.join(ROOT, "node_modules/@fontsource", pkg);
    for (const w of weights) {
      const blocks = fs.readFileSync(path.join(base, `${w}.css`), "utf8").split(/(?=\/\*)/);
      for (const block of blocks) {
        const file = block.match(/url\(\.\/files\/([^)]+\.woff2)\)/)?.[1];
        if (!file || !keep.test(file)) continue;
        fs.copyFileSync(path.join(base, "files", file), path.join(fontDir, file));
        css += block.replace(/src: url\(\.\/files\/([^)]+\.woff2)\) format\('woff2'\)[^;]*;/, "src: url(./$1) format('woff2');").trimEnd() + "\n\n";
      }
    }
  }
  fs.writeFileSync(path.join(fontDir, "fonts.css"), css.trimEnd() + "\n");
  for (const { pkg } of pkgs) {
    fs.copyFileSync(path.join(ROOT, "node_modules/@fontsource", pkg, "LICENSE"), path.join(fontDir, `OFL-${pkg}.txt`));
  }
}
copyFonts();

icoReady.then(() => console.log("assets written to", path.join(ROOT, "assets")));
