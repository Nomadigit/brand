# Recipe: social cards, OG images, covers

```bash
# in the brand repo
npm run og -- "Напоминания, которые понимают людей" --kicker "t.me/reminder · Nomadigit" --out og.png
npm run og -- "Title" --size square --out post.png    # 1080×1080
npm run og -- "Title" --size story  --out story.png   # 1080×1920
npm run og -- "Senior Backend Developer" --kicker "Java · Kotlin · Spring Boot" --size linkedin --out cover.png   # 1584×396
npm run og -- "Software made on the move" --size linkedin-company --out cover.png                               # 1128×191
```

The layout is fixed: a petrol background, a large faint route from the mark bleeding off the corner, the inverse lockup
top-left, the title in Onest 700 bottom-left (auto-wrapped, up to 3 lines), and a Mono kicker. The text is outlined,
so the PNG renders identically everywhere. The default card is `assets/social/og-default.png`.

## LinkedIn covers

`--size linkedin` (profile, 1584×396) and `--size linkedin-company` (page, 1128×191) use the same style laid out in a
row: the title and kicker start at 27% of the width and sit vertically centered, the inverse lockup closes the row on
the right, and the faint route frames it, bleeding off the bottom right. The left 27% stays empty on purpose: LinkedIn
draws the profile photo over the bottom-left corner. On a personal profile the name is already shown under the photo,
so the title is the role ("Senior Backend Developer") and the kicker the stack, not the name.

## Rules

- Titles are 2–8 words, one statement, and no trailing period.
- Margins are 72px. Keep text out of the right 120px, where the route shape sits.
- If you build a card by hand (Figma, HTML), use the same structure. Never put the accent on the title.
- Screenshots go on a surface panel with the brand radius and a 1px border, and are never tilted or given 3D mockups.
