# Recipe: social cards, OG images, covers

```bash
# in the brand repo
npm run og -- "Напоминания, которые понимают людей" --kicker "t.me/reminder · Nomadigit" --out og.png
npm run og -- "Title" --size square --out post.png    # 1080×1080
npm run og -- "Title" --size story  --out story.png   # 1080×1920
```

The layout is fixed: a petrol background, a large faint route from the mark bleeding off the corner, the inverse lockup
top-left, the title in Onest 700 bottom-left (auto-wrapped, up to 3 lines), and a Mono kicker. The text is outlined,
so the PNG renders identically everywhere. The default card is `assets/social/og-default.png`.

## Rules

- Titles are 2–8 words, one statement, and no trailing period.
- Margins are 72px. Keep text out of the right 120px, where the route shape sits.
- If you build a card by hand (Figma, HTML), use the same structure. Never put the accent on the title.
- Screenshots go on a surface panel with the brand radius and a 1px border, and are never tilted or given 3D mockups.
