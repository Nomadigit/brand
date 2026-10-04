# Imagery

**Style:** flat geometric illustration built from the mark's vocabulary: thick rounded routes, waypoint
dots, arcs and grids. Shapes are petrol and its scale. One red dot is the focal point. Leave plenty of empty space.

## Do

- Build images from simple vector shapes in palette colors, with a single red focal point.
- Show the real product: screenshots inside a plain surface frame with the brand radius.
- Text inside images is set in Onest and kept inside the safe area (64px margin on 1200×630).

## Don't

- Stock photos of people at laptops, 3D blobs, purple-blue gradients, neon glow.
- AI-generated photorealism that stands in for the product.
- More than two palette hues plus neutrals in one illustration.

## Generating images

- **Social cards:** use `npm run og -- "Title" --kicker "url" --size og|square|story --out card.png`.
  This generates the image itself and needs no AI.
- **Vector illustrations by an agent:** write SVG by hand from circles, rounded strokes (stroke-linecap round),
  and arcs on a 32-unit grid. Use colors only from `dist/tokens.flat.json`.
- **Image models:** use `imagery.promptTemplate` from `tokens/brand.json` and replace `{{subject}}`:

> Flat vector illustration, geometric, thick rounded strokes and dots like a route on a map, color palette deep
> petrol blue #04556D, light petrol #96DDF9, off-white #F7FBFD, single signal red #FC5950 accent, lots of
> negative space, no text, no gradients, no shadows, no people. Subject: {{subject}}

Generated images must never contain the logo. Place the real SVG logo on top afterwards.
