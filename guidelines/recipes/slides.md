# Recipe: slides and presentations

## Default: Markdown + Marp

Write the deck in Markdown and export it to HTML, PDF or PPTX. Start from `templates/slides/deck.md`.

```bash
npx @marp-team/marp-cli deck.md --theme <brand>/dist/marp-theme.css --pdf --allow-local-files
```

- Front matter: `marp: true`, `theme: nomadigit`, `paginate: true`, `footer: Danil Shubin · Nomadigit`.
- `<!-- _class: lead -->` for title and closing slides (petrol background), and `<!-- _class: invert -->` for a dark
  slide that changes the pace.
- **One idea per slide.** Use a title plus at most 3 bullets or one visual. Put the main number in a large H1.
- The red accent appears at most once per slide, for example in `**bold**` emphasis (rendered in primary) or a single highlighted
  chart value.
- Images: real screenshots or brand-style illustrations ([imagery](../imagery.md)). No stock photos.

## PowerPoint / Keynote / Google Slides

Use the Office theme slots from `dist/pptx-theme.json` (dk1, lt1, accent1..6, fonts) to create a theme,
or pass them to python-pptx / PptxGenJS. Headings use Onest Bold and body text Onest Regular. Install the fonts first.

## Claude artifacts / HTML decks

Load `dist/brand.css` and build 16:9 sections with the same rules. Use `assets/logo/lockup-horizontal.svg` on light
slides and `mark-inverse.svg` on petrol slides.
