/**
 * Social card generator.
 *   npm run og -- "Напоминания, которые понимают людей" --kicker "t.me/reminder_bot" --out card.png
 * Sizes: --size og (1200x630, default) | square (1080x1080) | story (1080x1920)
 */
import fs from "node:fs";
import path from "node:path";
import { Resvg } from "@resvg/resvg-js";
import { validateBrand } from "../src";
import { ogSvg } from "./lib/og";

const args = process.argv.slice(2);
const flag = (name: string) => {
  const i = args.indexOf(`--${name}`);
  return i >= 0 ? args.splice(i, 2)[1] : undefined;
};
const kicker = flag("kicker");
const outFile = flag("out") ?? "og.png";
const sizes = { og: [1200, 630], square: [1080, 1080], story: [1080, 1920] } as const;
const [width, height] = sizes[(flag("size") ?? "og") as keyof typeof sizes] ?? sizes.og;
const title = args.join(" ").trim();
if (!title) {
  console.error('Usage: npm run og -- "Title" [--kicker text] [--size og|square|story] [--out file.png|file.svg]');
  process.exit(1);
}

const brand = validateBrand(JSON.parse(fs.readFileSync(path.resolve(__dirname, "../tokens/brand.json"), "utf8")));
const svg = ogSvg(brand, { title, kicker, width, height });
fs.writeFileSync(outFile, outFile.endsWith(".svg") ? svg : new Resvg(svg, { fitTo: { mode: "width", value: width } }).render().asPng());
console.log(`wrote ${outFile} (${width}x${height})`);
