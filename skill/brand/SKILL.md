---
name: brand
description: Nomadigit brand guidelines and assets. Use for ANY visual or copy work on Nomadigit or Danil Shubin projects — styling a site, web app, Telegram bot or Mini App, Android/desktop app, slide deck or presentation, CV, resume, cover letter, document, email, logo placement, favicon, app icon, avatar, social/OG image or illustration; choosing colors, fonts, spacing, icons or dark mode; writing UI text, bot messages or project descriptions. Triggers (en/ru) — brand, style, design, theme, colors, logo, icon, slides, deck, presentation, CV, image, UI, bot; бренд, стиль, стилизуй, дизайн, цвета, шрифт, логотип, иконка, презентация, слайды, картинка, обложка, интерфейс, бот, резюме.
---

# Nomadigit brand

The brand kit lives in the repository **Nomadigit/brand**. Use the local clone if it exists, otherwise fetch it over the web.

- Local: `~/projects/brand` (check with `ls ~/projects/brand/AGENTS.md`)
- Remote: `https://raw.githubusercontent.com/Nomadigit/brand/main/<path>`

## Steps

1. **Read `AGENTS.md`** in the brand repo before anything else. It has the non-negotiables, brand architecture, a task → file
   table and a done checklist.
2. Open the recipe that matches the task (`guidelines/recipes/*.md`) and any topic guide it links.
3. Take every value from generated files, never from memory:
   - CSS: `dist/brand.css` (fonts + tokens + base) or `dist/tokens.css`; Tailwind: `dist/tailwind.preset.cjs`
   - Any other language: `dist/tokens.flat.json`; Telegram: `dist/telegram-theme.json`, `dist/telegram-mini-app.js`
   - Slides: `templates/slides/deck.md` + `dist/marp-theme.css`; docs: `dist/docx-styles.json`, `dist/pdf.css`
   - Logo/icons: `assets/logo/*`, `assets/favicon/*`, `assets/social/*` (copy the files, never redraw them)
4. For social cards, run `npm run og -- "Title" --kicker "..." --out file.png` inside the brand repo.
5. Before finishing, go through the done checklist in `AGENTS.md`.

## Never

- Hardcode hex colors or font names in product code, add a second text typeface, or use the red accent for text,
  large fills or errors.
- Redraw, retype or recolor the logo, or put the logo inside AI-generated images.
- Edit `dist/` or `assets/` by hand. Brand changes go into `tokens/brand.json`, followed by `npm run build && npm test`
  in the brand repo, and only when the user asks to change the brand itself.
