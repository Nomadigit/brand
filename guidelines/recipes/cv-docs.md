# Recipe: CV, letters, PDF and DOCX

- **Name block:** "Danil Shubin" in Onest 700. The role goes on one line in primary. Contacts go on one line in Geist Mono.
- **Signature:** footer or closing line "Danil Shubin · Nomadigit", optionally with `mark-mono.svg` at 12–14px.
- **Type sizes (print):** name 20–22pt, section headings 12–14pt in primary, body 10.5–11pt, meta 9pt in muted.
- **Color:** text, muted and primary only. No accent red in documents except the dot in the mark.
- **Page:** A4 with 15mm margins (the CV may use 10mm). Single column, generous spacing between sections.

## Sources

- `dist/docx-styles.json`: fonts, half-point sizes and colors (hex without `#`) for the `docx` npm package.
- `dist/pdf.css`: `@page` and base print styles for HTML → PDF (Playwright/Chromium).
- The `my-cv` repo consumes `@nomadigit/brand` and keeps CV-specific print sizes as overrides in its own
  `data/brand.json`.

## Voice

Use «вы» in Russian. Write in the active voice and lead with results:
"Built X that does Y for Z (stack)." No adjectives about yourself.
