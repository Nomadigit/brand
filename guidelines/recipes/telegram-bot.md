# Recipe: Telegram bot and Mini App

## Bot profile (BotFather)

- **Avatar:** `assets/social/avatar-telegram.png` (640×640, the mark sits inside the circular crop).
- **Name:** `<Product> · Nomadigit`, for example `Reminder · Nomadigit`.
- **Description / about:** one or two short sentences in the [voice](../voice.md). Lead with what the bot does,
  then how to start. No emoji walls.
  > Напоминаю о делах вовремя и в твоём часовом поясе. Напиши, например: «завтра в 10 созвон».
- **Commands:** lowercase verbs (`/new`, `/list`, `/settings`), with short descriptions and no trailing dots.

## Messages

- Confirm with the result: «Готово. Напомню завтра в 10:00.»
- Inline keyboard labels: 1–2 words, verb-first («Отложить», «Готово», «+15 мин»).
- Emoji: at most one functional emoji per message (⏰ for a firing reminder). Never decorative.
- Times are 24h and dates are `04.10`. Use the user's language (ru/en) and «ты» in Russian.

## Mini App

Telegram decides light or dark. The brand supplies the colors.

```html
<link rel="stylesheet" href="brand/brand.css">
<link rel="stylesheet" href="brand/mini-app.css">
<script src="https://telegram.org/js/telegram-web-app.js"></script>
<script src="brand/telegram-mini-app.js"></script>
```

- `dist/brand.css` covers tokens, fonts and base styles. `templates/telegram/mini-app.css` provides sections, rows, buttons,
  chips and inputs (`.tg-section`, `.tg-row`, `.tg-button`, `.tg-chip`).
- `dist/telegram-mini-app.js` sets `data-theme` from `WebApp.colorScheme`, follows `themeChanged`, and
  sets the header, background and bottom-bar colors from the brand. The raw values are in `dist/telegram-theme.json`.
- Prefer Telegram's `MainButton` / `SecondaryButton` for the primary action, and set their color to
  `button_color` from `telegram-theme.json`.

### Go projects (embedded static files)

Vendor a pinned copy of `dist/bundle/` instead of loading from the CDN, so the binary stays self-contained.
The bundle has no paths outside itself: `brand.css`, `tokens.css`, `mini-app.css`, `telegram-mini-app.js`, `fonts/`, the favicons
and the logos.

```bash
#!/usr/bin/env bash
# scripts/sync-brand.sh: re-run when bumping the brand version
set -euo pipefail
VERSION=${1:-v1.0.1}
DEST=internal/webapp/static/brand
rm -rf "$DEST" && mkdir -p "$DEST"
curl -fsSL "https://codeload.github.com/Nomadigit/brand/tar.gz/refs/tags/$VERSION" \
  | tar -xz -C "$DEST" --strip-components=3 "brand-${VERSION#v}/dist/bundle"
echo "$VERSION" > "$DEST/VERSION"
```

```html
<link rel="stylesheet" href="brand/brand.css">
<link rel="stylesheet" href="brand/mini-app.css">
<link rel="icon" href="brand/favicon.svg" type="image/svg+xml">
<script src="https://telegram.org/js/telegram-web-app.js"></script>
<script src="brand/telegram-mini-app.js"></script>
```
