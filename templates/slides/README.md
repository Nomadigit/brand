# Slides

Decks are Markdown files rendered with [Marp](https://marp.app) and the generated `dist/marp-theme.css`.

```bash
# from the brand repo root
npx @marp-team/marp-cli templates/slides/deck.md --theme dist/marp-theme.css --html --allow-local-files -o deck.html
npx @marp-team/marp-cli templates/slides/deck.md --theme dist/marp-theme.css --pdf  --allow-local-files -o deck.pdf
npx @marp-team/marp-cli templates/slides/deck.md --theme dist/marp-theme.css --pptx --allow-local-files -o deck.pptx
```

From another project, point `--theme` at the raw URL or the installed package:
`node_modules/@nomadigit/brand/dist/marp-theme.css`.

Slide classes: default (light), `lead` (title/closing slide on primary), `invert` (dark).
Fonts: install Onest and Geist Mono locally, or the PDF falls back to system fonts
(files in `assets/fonts/`).
