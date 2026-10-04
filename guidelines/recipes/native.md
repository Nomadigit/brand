# Recipe: Android, Kotlin, Go and other non-web code

Use the flat tokens: `dist/tokens.flat.json` (dot keys like `color.light.primary`) or the W3C file
`dist/tokens.json` (for Style Dictionary or Tokens Studio). Fetch a pinned tag, don't copy values by hand:

```bash
curl -fsSL https://raw.githubusercontent.com/Nomadigit/brand/v1.0.1/dist/tokens.flat.json -o brand-tokens.json
```

## Jetpack Compose

Generate `BrandColors.kt` from `tokens.flat.json` in a Gradle task, or paste the values once with a comment linking
the tag:

```kotlin
// Nomadigit brand v1.0.1 — from dist/tokens.flat.json; update via the brand repo, not by hand.
val LightColors = lightColorScheme(
    primary = Color(0xFF04556D), onPrimary = Color(0xFFFFFFFF),
    background = Color(0xFFF7FBFD), surface = Color(0xFFFFFFFF), onSurface = Color(0xFF101D22),
    surfaceVariant = Color(0xFFEDF3F6), onSurfaceVariant = Color(0xFF526066), outline = Color(0xFFD6E2E7),
    tertiary = Color(0xFFFC5950), error = Color(0xFF9D203A),
)
val DarkColors = darkColorScheme(
    primary = Color(0xFF7ACAE9), onPrimary = Color(0xFF0A1113),
    background = Color(0xFF0A1113), surface = Color(0xFF131B1E), onSurface = Color(0xFFE6ECEF),
    surfaceVariant = Color(0xFF1A2428), onSurfaceVariant = Color(0xFF9FAAAE), outline = Color(0xFF2A3539),
    tertiary = Color(0xFFFE8B7F), error = Color(0xFFE8809A),
)
val Onest = FontFamily(Font(GoogleFont("Onest"), provider, FontWeight.Normal), Font(GoogleFont("Onest"), provider, FontWeight.Bold))
```

The accent maps to `tertiary`, so Material components never use it for buttons or errors by default.

## Go (server-rendered HTML, images, CLIs)

- For HTML, vendor `dist/brand.css` (see [telegram-bot](telegram-bot.md) for the sync script) and embed it with `//go:embed`.
- For colors in code (charts, terminal output, generated images), load `tokens.flat.json` at build time with
  `go:embed` and read keys such as `color.light.primary`.
