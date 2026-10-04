# Layout

- **Grid:** 4/8px. Spacing tokens are `--space-1` (4) `-2` (8) `-3` (12) `-4` (16) `-6` (24) `-8` (32) `-12` (48) `-16` (64).
- **Web container:** max width 1120px, side padding 24px (16px on phones).
- **Radius:** `--radius-sm` 6px for chips and inputs, `--radius-md` 10px (the default) for buttons and cards, `--radius-lg` 16px for sheets and
  large cards, `--radius-pill` for tags. Nested radius equals the outer radius minus the padding.
- **Elevation:** borders, not shadows. If a shadow is needed (popovers), make it one soft shadow tinted with
  primary at ≤12% opacity.
- **Density:** generous. When in doubt, add space instead of a divider.
- **Documents:** A4 with 15mm margins by default. The CV may tighten to 10mm.
- **Email:** 600px column with 24px padding, built with `dist/email.json` inline styles.
- **Alignment:** left-aligned by default. Center only short hero statements and empty states.
